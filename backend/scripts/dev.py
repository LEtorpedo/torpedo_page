#!/usr/bin/env python3
"""
开发工具脚本
提供常用的开发命令快捷方式
"""

import subprocess
import sys
import argparse
from pathlib import Path


def run_command(cmd: str, description: str = None):
    """运行命令并处理错误"""
    if description:
        print(f"🔧 {description}")
    
    print(f"💻 执行: {cmd}")
    result = subprocess.run(cmd, shell=True)
    
    if result.returncode != 0:
        print(f"❌ 命令执行失败: {cmd}")
        sys.exit(1)
    else:
        print(f"✅ 完成: {description or cmd}")
    print()


def setup():
    """初始化开发环境"""
    print("🚀 初始化开发环境...")
    
    # 检查是否有 .env 文件
    if not Path(".env").exists():
        if Path("env.example").exists():
            run_command("cp env.example .env", "复制环境变量模板")
            print("⚠️  请编辑 .env 文件，设置必要的环境变量")
        else:
            print("❌ 未找到 env.example 文件")
            return
    
    # 创建虚拟环境
    run_command("uv venv", "创建虚拟环境")
    
    # 安装依赖
    run_command("uv sync --all-extras", "安装所有依赖")
    
    print("🎉 开发环境初始化完成！")
    print("📝 下一步:")
    print("   1. 编辑 .env 文件设置环境变量")
    print("   2. 运行: python scripts/dev.py test-env")
    print("   3. 运行: python scripts/dev.py serve")


def install():
    """安装依赖"""
    run_command("uv sync --all-extras", "安装所有依赖")


def format_code():
    """格式化代码"""
    print("🎨 格式化代码...")
    run_command("uv run black .", "Black 代码格式化")
    run_command("uv run isort .", "isort 导入排序")


def lint():
    """代码质量检查"""
    print("🔍 代码质量检查...")
    run_command("uv run flake8 .", "Flake8 代码检查")
    run_command("uv run mypy .", "MyPy 类型检查")


def test():
    """运行测试"""
    print("🧪 运行测试...")
    run_command("uv run pytest --cov=app --cov-report=term-missing", "运行测试并生成覆盖率报告")


def test_env():
    """测试环境配置"""
    run_command("uv run python test_setup.py", "测试环境配置")


def serve():
    """启动开发服务器"""
    run_command("uv run uvicorn app.main:app --reload --port 8000", "启动开发服务器")


def clean():
    """清理项目"""
    print("🧹 清理项目...")
    run_command("find . -type d -name '__pycache__' -exec rm -rf {} +", "删除 __pycache__ 目录")
    run_command("find . -type f -name '*.pyc' -delete", "删除 .pyc 文件")
    run_command("rm -rf .coverage htmlcov/ .pytest_cache/", "删除测试缓存")
    print("✅ 清理完成")


def check():
    """完整的代码检查流程"""
    print("🔄 执行完整代码检查...")
    format_code()
    lint()
    test()
    print("🎉 所有检查完成！")


def add_dep():
    """添加依赖"""
    if len(sys.argv) < 3:
        print("❌ 请指定要添加的包名")
        print("用法: python scripts/dev.py add <package-name>")
        return
    
    package = sys.argv[2]
    dev_flag = "--dev" if len(sys.argv) > 3 and sys.argv[3] == "--dev" else ""
    
    run_command(f"uv add {dev_flag} {package}", f"添加依赖: {package}")


def main():
    """主函数"""
    parser = argparse.ArgumentParser(description="Torpedo Blog 后端开发工具")
    parser.add_argument("command", choices=[
        "setup", "install", "format", "lint", "test", "test-env", 
        "serve", "clean", "check", "add"
    ], help="要执行的命令")
    
    if len(sys.argv) < 2:
        parser.print_help()
        return
    
    command = sys.argv[1]
    
    commands = {
        "setup": setup,
        "install": install,
        "format": format_code,
        "lint": lint,
        "test": test,
        "test-env": test_env,
        "serve": serve,
        "clean": clean,
        "check": check,
        "add": add_dep,
    }
    
    if command in commands:
        commands[command]()
    else:
        print(f"❌ 未知命令: {command}")
        parser.print_help()


if __name__ == "__main__":
    main() 