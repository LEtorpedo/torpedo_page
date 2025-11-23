"""
应用配置管理
使用 Pydantic Settings 从环境变量加载配置
"""
from typing import List
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """应用设置类"""
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        env_parse_none_str=None
    )
    
    # 应用基础设置
    app_name: str = Field(default="Torpedo Blog API", alias="APP_NAME")
    debug: bool = Field(default=False, alias="DEBUG")
    environment: str = Field(default="development", alias="ENVIRONMENT")
    
    # 服务器配置
    host: str = Field(default="0.0.0.0", alias="HOST")
    port: int = Field(default=8000, alias="PORT")
    
    # 数据库配置
    database_url: str = Field(default="sqlite:///./blog.db", alias="DATABASE_URL")
    
    # 安全配置
    secret_key: str = Field(alias="SECRET_KEY")
    algorithm: str = Field(default="HS256", alias="ALGORITHM")
    access_token_expire_minutes: int = Field(
        default=30, alias="ACCESS_TOKEN_EXPIRE_MINUTES"
    )
    
    # CORS配置 - 使用字符串存储，运行时解析
    allowed_origins_str: str = Field(
        default="http://localhost:3000,http://localhost:5173",
        alias="ALLOWED_ORIGINS"
    )
    
    # 管理员用户配置（初始化用）
    admin_username: str = Field(default="admin", alias="ADMIN_USERNAME")
    admin_email: str = Field(default="admin@example.com", alias="ADMIN_EMAIL")
    admin_password: str = Field(alias="ADMIN_PASSWORD")
    admin_display_name: str = Field(
        default="Torpedo Chen", alias="ADMIN_DISPLAY_NAME"
    )
    
    @property
    def allowed_origins(self) -> List[str]:
        """解析 CORS 允许的源列表"""
        origins_str = self.allowed_origins_str.strip('"\'')
        return [origin.strip() for origin in origins_str.split(',')]


# 全局设置实例
settings = Settings() 