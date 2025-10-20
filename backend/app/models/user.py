"""
User model for blog authors and authentication.
Designed for personal blog with potential for guest authors.
"""

from datetime import datetime
from typing import Optional
from sqlalchemy import Column, String, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from passlib.context import CryptContext
from .base import Base

# Password hashing configuration using bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class BackendUser(Base):
    """
    User model for blog authors and admin authentication.
    
    Design Philosophy:
    - Primary use: Personal blog owner (admin)
    - Secondary use: Guest authors (future expansion)
    - Focus on author profile and authentication
    - Simple role-based permissions
    """
    
    # Authentication
    username = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
        doc="Unique username for login"
    )
    
    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
        doc="Email address for login and notifications"
    )
    
    password_hash = Column(
        String(255),
        nullable=False,
        doc="Hashed password (never store plain text!)"
    )
    
    # Author profile
    display_name = Column(
        String(100),
        nullable=False,
        doc="Display name shown on articles (e.g., 'Torpedo Chen')"
    )
    
    bio = Column(
        Text,
        nullable=True,
        doc="Author biography for about page and article bylines"
    )
    
    # Author branding
    avatar_url = Column(
        String(500),
        nullable=True,
        doc="Author avatar/profile image URL"
    )
    
    website_url = Column(
        String(500),
        nullable=True,
        doc="Author personal website or portfolio"
    )
    
    # Social media profiles
    github_username = Column(
        String(100),
        nullable=True,
        doc="GitHub username for social links"
    )
    
    twitter_username = Column(
        String(100),
        nullable=True,
        doc="Twitter/X username for social links"
    )
    
    linkedin_url = Column(
        String(500),
        nullable=True,
        doc="LinkedIn profile URL"
    )
    
    # Author metadata
    location = Column(
        String(100),
        nullable=True,
        doc="Author location (e.g., 'Shanghai, China')"
    )
    
    job_title = Column(
        String(100),
        nullable=True,
        doc="Current job title (e.g., 'Full-Stack Developer')"
    )
    
    company = Column(
        String(100),
        nullable=True,
        doc="Current company or organization"
    )
    
    # Permissions and status
    is_active = Column(
        Boolean,
        default=True,
        nullable=False,
        index=True,
        doc="Whether user account is active"
    )
    
    is_admin = Column(
        Boolean,
        default=False,
        nullable=False,
        doc="Whether user has admin privileges"
    )
    
    is_author = Column(
        Boolean,
        default=True,
        nullable=False,
        doc="Whether user can create and publish posts"
    )
    
    # Activity tracking
    last_login = Column(
        DateTime(timezone=True),
        nullable=True,
        doc="Last login timestamp"
    )
    
    post_count = Column(
        "post_count",
        default=0,
        nullable=False,
        doc="Number of published posts by this author (denormalized)"
    )
    
    # Relationships
    posts = relationship(
        "Post",
        back_populates="author",
        doc="Posts authored by this user"
    )
    
    def __repr__(self) -> str:
        """String representation."""
        role = "Admin" if self.is_admin else "Author"
        return f"<BackendUser(id={self.id}, username='{self.username}', role={role})>"
    
    @property
    def full_social_profile(self) -> dict:
        """
        Get complete social media profile for author cards.
        
        Returns:
            Dictionary with all available social links
        """
        social = {}
        
        if self.website_url:
            social['website'] = self.website_url
        if self.github_username:
            social['github'] = f"https://github.com/{self.github_username}"
        if self.twitter_username:
            social['twitter'] = f"https://twitter.com/{self.twitter_username}"
        if self.linkedin_url:
            social['linkedin'] = self.linkedin_url
            
        return social
    
    @property
    def author_byline(self) -> str:
        """
        Get formatted author byline for articles.
        
        Returns:
            Formatted string like "Torpedo Chen, Full-Stack Developer at Company"
        """
        byline_parts = [self.display_name]
        
        if self.job_title and self.company:
            byline_parts.append(f"{self.job_title} at {self.company}")
        elif self.job_title:
            byline_parts.append(self.job_title)
        elif self.company:
            byline_parts.append(f"at {self.company}")
            
        return ", ".join(byline_parts)
    
    @property
    def published_post_count(self) -> int:
        """
        Get count of published posts by this author.
        
        Note: This should use the denormalized post_count field in production
        for better performance.
        """
        return len([post for post in self.posts if post.is_published])
    
    def update_post_count(self) -> None:
        """
        Update the denormalized post count.
        
        This should be called when posts are published/unpublished.
        """
        self.post_count = self.published_post_count
    
    def can_edit_post(self, post) -> bool:
        """
        Check if user can edit a specific post.
        
        Args:
            post: Post instance to check
            
        Returns:
            True if user can edit the post
        """
        # Admin can edit all posts
        if self.is_admin:
            return True
        
        # Authors can edit their own posts
        if self.is_author and post.author_id == self.id:
            return True
        
        return False
    
    def can_delete_post(self, post) -> bool:
        """
        Check if user can delete a specific post.
        
        Args:
            post: Post instance to check
            
        Returns:
            True if user can delete the post
        """
        # Only admin can delete posts (safety measure)
        return self.is_admin
    
    @classmethod
    def get_primary_author(cls, session) -> Optional['BackendUser']:
        """
        Get the primary blog author (admin user).
        
        Args:
            session: Database session
            
        Returns:
            Primary author or None if not found
        """
        return session.query(cls)\
            .filter(cls.is_admin == True)\
            .filter(cls.is_active == True)\
            .first()
    
    def verify_password(self, password: str) -> bool:
        """
        Verify password against stored hash using bcrypt.

        Args:
            password: Plain text password to verify

        Returns:
            True if password matches, False otherwise

        Security:
            - Uses bcrypt for secure password comparison
            - Constant-time comparison to prevent timing attacks
            - Returns False if password_hash is not set
        """
        if not self.password_hash:
            return False
        return pwd_context.verify(password, self.password_hash)

    def set_password(self, password: str) -> None:
        """
        Set password hash for user using bcrypt.

        Args:
            password: Plain text password to hash and store

        Raises:
            ValueError: If password is too short (< 8 characters)

        Security:
            - Minimum password length: 8 characters
            - Uses bcrypt with automatic salt generation
            - Password is hashed before storage (never stored in plain text)
        """
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long")
        self.password_hash = pwd_context.hash(password) 