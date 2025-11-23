"""
Post model for blog articles.
"""

from datetime import datetime
from typing import Optional, Dict, Any, List
from sqlalchemy import Column, String, Text, Boolean, ForeignKey, Table, JSON, Integer, DateTime
from sqlalchemy.orm import relationship
from .base import Base


# Many-to-many association table for Post and Tag
post_tag_association = Table(
    'post_tag', 
    Base.metadata,
    Column('post_id', ForeignKey('post.id'), primary_key=True),
    Column('tag_id', ForeignKey('tag.id'), primary_key=True)
)


class Post(Base):
    """
    Blog post model supporting rich content from TipTap editor.
    
    Features:
    - Stores both JSON (TipTap ProseMirror format) and Markdown content
    - Support for SEO metadata (slug, meta description)
    - Publication status (draft/published)
    - Category and tag relationships
    - Reading time estimation
    """
    
    # Basic content fields
    title = Column(
        String(255), 
        nullable=False, 
        index=True,
        doc="Article title"
    )
    
    slug = Column(
        String(255), 
        unique=True, 
        nullable=False, 
        index=True,
        doc="URL-friendly identifier (auto-generated from title)"
    )
    
    # Rich content storage
    content_json = Column(
        JSON,
        nullable=True,
        doc="TipTap ProseMirror JSON format for rich editing"
    )
    
    content_markdown = Column(
        Text,
        nullable=True,
        doc="Markdown representation for export and backup"
    )
    
    excerpt = Column(
        Text,
        nullable=True,
        doc="Short article summary/preview (auto-generated or manual)"
    )
    
    # SEO and metadata
    meta_description = Column(
        String(160),
        nullable=True,
        doc="SEO meta description (max 160 chars)"
    )
    
    featured_image = Column(
        String(500),
        nullable=True,
        doc="URL or path to featured image"
    )
    
    # Publication status
    is_published = Column(
        Boolean,
        default=False,
        nullable=False,
        index=True,
        doc="Whether the post is published or draft"
    )
    
    published_at = Column(
        DateTime(timezone=True),
        nullable=True,
        doc="Publication timestamp (null for drafts)"
    )
    
    # Analytics and engagement
    view_count = Column(
        Integer,
        default=0,
        nullable=False,
        doc="Number of times the post has been viewed"
    )
    
    reading_time_minutes = Column(
        Integer,
        nullable=True,
        doc="Estimated reading time in minutes"
    )
    
    # Relationships
    author_id = Column(
        ForeignKey('backend_user.id'),
        nullable=False,
        index=True,
        doc="Author of the post (required)"
    )
    
    category_id = Column(
        ForeignKey('category.id'),
        nullable=True,
        index=True,
        doc="Associated category (optional)"
    )
    
    author = relationship(
        "BackendUser",
        back_populates="posts",
        doc="Post author relationship"
    )
    
    category = relationship(
        "Category", 
        back_populates="posts",
        doc="Category relationship"
    )
    
    tags = relationship(
        "Tag",
        secondary=post_tag_association,
        back_populates="posts",
        doc="Many-to-many tag relationships"
    )
    
    def __repr__(self) -> str:
        """String representation of the post."""
        status = "Published" if self.is_published else "Draft"
        return f"<Post(id={self.id}, title='{self.title[:30]}...', status={status})>"
    
    @property
    def is_draft(self) -> bool:
        """Check if the post is in draft status."""
        return not self.is_published
    
    def calculate_reading_time(self, words_per_minute: int = 200) -> int:
        """
        Calculate estimated reading time based on content.
        
        Args:
            words_per_minute: Average reading speed (default: 200 WPM)
            
        Returns:
            Estimated reading time in minutes
        """
        if not self.content_markdown:
            return 0
        
        # Simple word count estimation
        word_count = len(self.content_markdown.split())
        reading_time = max(1, word_count // words_per_minute)
        
        return reading_time
    
    def generate_excerpt(self, max_length: int = 160) -> str:
        """
        Generate excerpt from content if not manually set.
        
        Args:
            max_length: Maximum excerpt length
            
        Returns:
            Generated excerpt string
        """
        if self.excerpt:
            return self.excerpt
        
        if not self.content_markdown:
            return ""
        
        # Remove markdown formatting for plain text excerpt
        import re
        plain_text = re.sub(r'[#*_`\[\]()]', '', self.content_markdown)
        plain_text = ' '.join(plain_text.split())  # Normalize whitespace
        
        if len(plain_text) <= max_length:
            return plain_text
        
        # Truncate at word boundary
        truncated = plain_text[:max_length]
        last_space = truncated.rfind(' ')
        if last_space > max_length * 0.8:  # If we can find a reasonable word boundary
            truncated = truncated[:last_space]
        
        return truncated + "..." 