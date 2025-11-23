"""
Base model classes and configurations for the blog application.
"""

from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, DateTime, func
from sqlalchemy.ext.declarative import declarative_base, declared_attr
from sqlalchemy.orm import as_declarative


@as_declarative()
class Base:
    """
    Base model class with common fields and configurations.
    
    This class provides:
    - Automatic table naming based on class name
    - Common timestamp fields (created_at, updated_at)
    - Primary key field (id)
    """
    
    # Automatically generate table names from class names
    @declared_attr
    def __tablename__(cls) -> str:
        # Convert CamelCase to snake_case
        # e.g., BlogPost -> blog_post
        import re
        return re.sub(r'(?<!^)(?=[A-Z])', '_', cls.__name__).lower()
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    # Timestamp fields
    created_at = Column(
        DateTime(timezone=True), 
        server_default=func.now(),
        nullable=False,
        doc="Record creation timestamp"
    )
    
    updated_at = Column(
        DateTime(timezone=True), 
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
        doc="Record last modification timestamp"
    )
    
    def __repr__(self) -> str:
        """String representation of the model instance."""
        return f"<{self.__class__.__name__}(id={self.id})>"


# For backwards compatibility and explicit imports
BaseModel = Base 