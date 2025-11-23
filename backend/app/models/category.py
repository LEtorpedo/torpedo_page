"""
Category model for blog classification.
Designed for personal blog with practical 2-3 level hierarchy.
"""

from typing import List, Optional
from sqlalchemy import Column, String, Text, Integer, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from .base import Base


class Category(Base):
    """
    Blog category model with simple hierarchy support.
    
    Design Philosophy:
    - Personal blog typically needs only 2-3 levels
    - Optimized for simplicity over complex nested operations
    - Focus on usability and maintainability
    """
    
    # Basic info
    name = Column(
        String(100), 
        nullable=False, 
        index=True,
        doc="Category name (e.g., '前端开发', 'React')"
    )
    
    slug = Column(
        String(100), 
        unique=True, 
        nullable=False, 
        index=True,
        doc="URL-friendly identifier"
    )
    
    description = Column(
        Text,
        nullable=True,
        doc="Category description for SEO and user understanding"
    )
    
    # Simple hierarchy (max 3 levels recommended)
    parent_id = Column(
        ForeignKey('category.id'),
        nullable=True,
        index=True,
        doc="Parent category ID (null for root categories)"
    )
    
    # Display and organization
    sort_order = Column(
        Integer,
        default=0,
        nullable=False,
        doc="Display order within same level"
    )
    
    # Category styling (for frontend)
    color = Column(
        String(7),  # Hex color: #RRGGBB
        nullable=True,
        doc="Category theme color for UI display"
    )
    
    icon = Column(
        String(50),
        nullable=True,
        doc="Icon identifier (e.g., 'code', 'book', 'heart')"
    )
    
    # Status
    is_active = Column(
        Boolean,
        default=True,
        nullable=False,
        index=True,
        doc="Whether category is active and visible"
    )
    
    # Relationships
    parent = relationship(
        "Category", 
        remote_side="Category.id",
        doc="Parent category relationship"
    )
    
    children = relationship(
        "Category",
        back_populates="parent",
        doc="Child categories"
    )
    
    posts = relationship(
        "Post",
        back_populates="category",
        doc="Posts in this category"
    )
    
    def __repr__(self) -> str:
        """String representation."""
        level = self.get_level()
        return f"<Category(id={self.id}, name='{self.name}', level={level})>"
    
    @property
    def is_root(self) -> bool:
        """Check if this is a root category (no parent)."""
        return self.parent_id is None
    
    @property
    def is_leaf(self) -> bool:
        """Check if this is a leaf category (no children)."""
        return len(self.children) == 0
    
    def get_level(self) -> int:
        """
        Get the hierarchy level of this category.
        
        Returns:
            0 for root categories, 1 for first level, etc.
        """
        if self.is_root:
            return 0
        
        level = 0
        current = self
        while current.parent_id is not None:
            level += 1
            current = current.parent
            # Safety check to prevent infinite loops
            if level > 10:  # Reasonable max depth
                break
        
        return level
    
    def get_breadcrumb(self) -> List[str]:
        """
        Get breadcrumb path from root to this category.
        
        Returns:
            List of category names from root to current
            e.g., ['技术文章', '前端开发', 'React']
        """
        breadcrumb = []
        current = self
        
        while current is not None:
            breadcrumb.insert(0, current.name)
            current = current.parent
            # Safety check
            if len(breadcrumb) > 10:
                break
        
        return breadcrumb
    
    def get_all_children(self) -> List['Category']:
        """
        Get all descendant categories (recursive).
        
        For personal blog, this is typically just direct children
        since we rarely go beyond 2-3 levels.
        """
        all_children = []
        
        def collect_children(category):
            for child in category.children:
                if child.is_active:
                    all_children.append(child)
                    collect_children(child)  # Recursive for deeper levels
        
        collect_children(self)
        return all_children
    
    @property
    def post_count(self) -> int:
        """
        Get total number of posts in this category and its children.
        
        Note: This should be computed via database query in production
        for better performance.
        """
        # Direct posts in this category
        direct_count = len([p for p in self.posts if p.is_published])
        
        # Posts in child categories
        child_count = sum(child.post_count for child in self.children)
        
        return direct_count + child_count
    
    def can_delete(self) -> bool:
        """
        Check if this category can be safely deleted.
        
        Returns:
            False if category has posts or active children
        """
        # Has published posts
        if any(post.is_published for post in self.posts):
            return False
        
        # Has active children
        if any(child.is_active for child in self.children):
            return False
        
        return True 