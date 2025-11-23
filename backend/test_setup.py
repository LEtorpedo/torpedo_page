#!/usr/bin/env python3
"""
后端环境配置测试脚本
用于验证环境配置是否正确
"""

import os
import sys

def test_imports():
    """测试关键依赖是否能正常导入"""
    print("🔍 测试依赖导入...")
    
    try:
        import fastapi
        print(f"✅ FastAPI: {fastapi.__version__}")
    except ImportError as e:
        print(f"❌ FastAPI导入失败: {e}")
        return False
    
    try:
        import sqlalchemy
        print(f"✅ SQLAlchemy: {sqlalchemy.__version__}")
    except ImportError as e:
        print(f"❌ SQLAlchemy导入失败: {e}")
        return False
    
    try:
        import pydantic
        print(f"✅ Pydantic: {pydantic.__version__}")
    except ImportError as e:
        print(f"❌ Pydantic导入失败: {e}")
        return False
    
    return True


def test_environment():
    """测试环境变量配置"""
    print("\n🔧 测试环境配置...")
    
    # 检查是否有.env文件
    env_file = ".env"
    if os.path.exists(env_file):
        print(f"✅ 找到环境配置文件: {env_file}")
    else:
        print(f"⚠️  未找到环境配置文件: {env_file}")
        print("   请运行: cp env.example .env")
        return False
    
    # 测试配置加载
    try:
        from app.core.config import settings
        print(f"✅ 应用名称: {settings.app_name}")
        print(f"✅ 环境: {settings.environment}")
        print(f"✅ 数据库URL: {settings.database_url}")
        return True
    except Exception as e:
        print(f"❌ 配置加载失败: {e}")
        return False


def test_models():
    """测试数据模型"""
    print("\n📊 测试数据模型...")
    
    try:
        from app.models import Post, Category, Tag, BackendUser
        print("✅ 所有模型导入成功")
        print(f"   - Post: {Post.__tablename__}")
        print(f"   - Category: {Category.__tablename__}")
        print(f"   - Tag: {Tag.__tablename__}")
        print(f"   - BackendUser: {BackendUser.__tablename__}")
        return True
    except Exception as e:
        print(f"❌ 模型导入失败: {e}")
        return False


def test_database():
    """测试数据库连接"""
    print("\n🗄️  测试数据库连接...")
    
    try:
        from app.core.database import engine, create_tables
        
        # 测试连接
        with engine.connect() as conn:
            print("✅ 数据库连接成功")
        
        # 测试表创建
        create_tables()
        print("✅ 数据库表创建成功")
        
        return True
    except Exception as e:
        print(f"❌ 数据库操作失败: {e}")
        return False


def main():
    """主测试函数"""
    print("🚀 Torpedo Blog Backend 环境测试")
    print("=" * 50)
    
    tests = [
        test_imports,
        test_environment,
        test_models,
        test_database,
    ]
    
    results = []
    for test in tests:
        try:
            result = test()
            results.append(result)
        except Exception as e:
            print(f"❌ 测试异常: {e}")
            results.append(False)
    
    print("\n" + "=" * 50)
    print("📋 测试结果总结:")
    
    if all(results):
        print("🎉 所有测试通过！后端环境配置正确。")
        print("\n🚀 你可以运行以下命令启动服务器:")
        print("   uvicorn app.main:app --reload --port 8000")
        return 0
    else:
        print("⚠️  部分测试失败，请检查配置。")
        return 1


if __name__ == "__main__":
    sys.exit(main()) 