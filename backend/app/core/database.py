"""
数据库连接和会话管理
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator

from .config import settings

# 创建数据库引擎
engine = create_engine(
    settings.database_url,
    # SQLite特定配置
    connect_args={"check_same_thread": False} if "sqlite" in settings.database_url else {},
    echo=settings.debug,  # 在调试模式下打印SQL语句
)

# 创建会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """
    获取数据库会话
    用作FastAPI的依赖注入
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    """创建所有数据表"""
    # 导入所有模型，确保它们都被注册到Base.metadata中
    from ..models import Post, Category, Tag, BackendUser
    from ..models.base import Base
    
    Base.metadata.create_all(bind=engine)


def drop_tables():
    """删除所有数据表（开发时使用）"""
    from ..models.base import Base
    Base.metadata.drop_all(bind=engine) 