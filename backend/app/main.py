"""
Torpedo Blog Backend - FastAPI应用入口
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

from .core.config import settings
from .core.database import create_tables

# 创建FastAPI应用实例
app = FastAPI(
    title=settings.app_name,
    description="现代化个人博客后端API",
    version="0.1.0",
    debug=settings.debug,
    docs_url="/docs" if settings.debug else None,
    redoc_url="/redoc" if settings.debug else None,
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """应用启动时执行"""
    print(f"🚀 {settings.app_name} 正在启动...")
    print(f"📊 环境: {settings.environment}")
    print(f"🗄️  数据库: {settings.database_url}")
    
    # 创建数据库表
    create_tables()
    print("✅ 数据库表创建完成")


@app.get("/")
async def root():
    """根路径 - API信息"""
    return {
        "message": f"欢迎使用 {settings.app_name}",
        "version": "0.1.0",
        "environment": settings.environment,
        "docs": "/docs" if settings.debug else "API文档在生产环境中已禁用",
    }


@app.get("/health")
async def health_check():
    """健康检查端点"""
    return {
        "status": "healthy",
        "environment": settings.environment,
        "timestamp": "2024-01-01T00:00:00Z",  # 实际项目中使用 datetime.utcnow()
    }


# 全局异常处理器
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """HTTP异常处理"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "message": exc.detail,
            "status_code": exc.status_code,
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """通用异常处理"""
    if settings.debug:
        import traceback
        error_detail = traceback.format_exc()
    else:
        error_detail = "内部服务器错误"
    
    return JSONResponse(
        status_code=500,
        content={
            "error": True,
            "message": "服务器内部错误",
            "detail": error_detail if settings.debug else None,
        }
    )


if __name__ == "__main__":
    # 直接运行时的开发服务器
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level="debug" if settings.debug else "info",
    ) 