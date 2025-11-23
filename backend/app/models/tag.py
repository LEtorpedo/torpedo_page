"""
Tag model for flexible content labeling.
Complements Category with cross-cutting content organization.
"""

from typing import List, Optional
from sqlalchemy import Column, String, Text, Integer, Boolean, func
from sqlalchemy.orm import relationship
from .base import Base


class Tag(Base):
    """
    Blog tag model for flexible content labeling.
    
    Design Philosophy:
    - Flat structure (no hierarchy like categories)
    - Cross-cutting content organization
    - Flexible and user-friendly tagging
    - Support for tag analytics and trending
    """
    
    # Basic info
    name = Column(
        String(50), 
        unique=True,
        nullable=False, 
        index=True,
        doc="Tag name (e.g., '性能优化', 'React Hooks', '踩坑记录')"
    )
    
    slug = Column(
        String(50), 
        unique=True, 
        nullable=False, 
        index=True,
        doc="URL-friendly identifier"
    )
    
    description = Column(
        Text,
        nullable=True,
        doc="Tag description for SEO and user understanding"
    )
    
    # Visual styling
    color = Column(
        String(7),  # Hex color: #RRGGBB
        nullable=True,
        default="#6B7280",  # Default gray
        doc="Tag color for UI display (badge, chip, etc.)"
    )
    
    # Tag categorization (meta-tags)
    tag_type = Column(
        String(20),
        nullable=True,
        doc="Tag type: 'technology', 'topic', 'difficulty', 'series', etc."
    )
    
    # Analytics and trends
    usage_count = Column(
        Integer,
        default=0,
        nullable=False,
        index=True,
        doc="Number of times this tag has been used (denormalized for performance)"
    )
    
    # Status and management
    is_active = Column(
        Boolean,
        default=True,
        nullable=False,
        index=True,
        doc="Whether tag is active and visible"
    )
    
    is_featured = Column(
        Boolean,
        default=False,
        nullable=False,
        doc="Whether to feature this tag in tag cloud or navigation"
    )
    
    # Relationships
    posts = relationship(
        "Post",
        secondary="post_tag",  # The association table we defined in post.py
        back_populates="tags",
        doc="Posts tagged with this tag"
    )
    
    def __repr__(self) -> str:
        """String representation."""
        return f"<Tag(id={self.id}, name='{self.name}', usage={self.usage_count})>"
    
    @property
    def post_count(self) -> int:
        """
        Get number of published posts with this tag.
        
        Note: In production, this should be computed via database query
        for better performance, or kept in sync via the usage_count field.
        """
        return len([post for post in self.posts if post.is_published])
    
    @property
    def is_trending(self) -> bool:
        """
        Check if this tag is trending (used frequently in recent posts).
        
        Simple implementation: tags used in 3+ posts are considered trending.
        In production, this could be time-based or more sophisticated.
        """
        return self.usage_count >= 3
    
    @property
    def popularity_level(self) -> str:
        """
        Get popularity level for tag cloud sizing.
        
        Returns:
            'high', 'medium', 'low' based on usage count
        """
        if self.usage_count >= 10:
            return 'high'
        elif self.usage_count >= 3:
            return 'medium'
        else:
            return 'low'
    
    def increment_usage(self) -> None:
        """
        Increment usage count when tag is added to a post.
        
        This method should be called when a post is published with this tag.
        """
        self.usage_count += 1
    
    def decrement_usage(self) -> None:
        """
        Decrement usage count when tag is removed from a post.
        
        This method should be called when a post is unpublished or tag is removed.
        """
        if self.usage_count > 0:
            self.usage_count -= 1
    
    @classmethod
    def get_popular_tags(cls, session, limit: int = 10) -> List['Tag']:
        """
        Get most popular tags for tag cloud display.
        
        Args:
            session: Database session
            limit: Number of tags to return
            
        Returns:
            List of popular tags ordered by usage count
        """
        return session.query(cls)\
            .filter(cls.is_active == True)\
            .order_by(cls.usage_count.desc())\
            .limit(limit)\
            .all()
    
    @classmethod
    def get_trending_tags(cls, session, limit: int = 5) -> List['Tag']:
        """
        Get trending tags (could be enhanced with time-based analysis).
        
        Args:
            session: Database session  
            limit: Number of tags to return
            
        Returns:
            List of trending tags
        """
        return session.query(cls)\
            .filter(cls.is_active == True)\
            .filter(cls.usage_count >= 3)\
            .order_by(cls.usage_count.desc())\
            .limit(limit)\
            .all()
    
    @classmethod
    def get_featured_tags(cls, session) -> List['Tag']:
        """
        Get featured tags for special display areas.
        
        Args:
            session: Database session
            
        Returns:
            List of featured tags
        """
        return session.query(cls)\
            .filter(cls.is_active == True)\
            .filter(cls.is_featured == True)\
            .order_by(cls.usage_count.desc())\
            .all()
    
    def can_delete(self) -> bool:
        """
        Check if this tag can be safely deleted.
        
        Returns:
            False if tag is used by any published posts
        """
        return not any(post.is_published for post in self.posts) 