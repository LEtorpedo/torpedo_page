# Torpedo Blog Backend Makefile
# 使用 uv 进行包管理的快捷命令

.PHONY: help setup install format lint test test-env serve clean check add add-dev update deps requirements docker-build docker-run docker-compose-up docker-compose-down docker-compose-logs

# 默认目标
help:
	@echo "🚀 Torpedo Blog Backend 开发命令"
	@echo ""
	@echo "📦 环境管理:"
	@echo "  setup     - 初始化开发环境"
	@echo "  install   - 安装依赖"
	@echo ""
	@echo "🎨 代码质量:"
	@echo "  format    - 格式化代码"
	@echo "  lint      - 代码质量检查"
	@echo "  check     - 完整检查流程 (format + lint + test)"
	@echo ""
	@echo "🧪 测试:"
	@echo "  test      - 运行测试"
	@echo "  test-env  - 测试环境配置"
	@echo ""
	@echo "🚀 运行:"
	@echo "  serve     - 启动开发服务器"
	@echo ""
	@echo "🧹 清理:"
	@echo "  clean     - 清理项目文件"
	@echo ""
	@echo "🐳 Docker:"
	@echo "  docker-build        - 构建 Docker 镜像"
	@echo "  docker-run          - 运行 Docker 容器"
	@echo "  docker-compose-up   - 启动 Docker Compose"
	@echo "  docker-compose-down - 停止 Docker Compose"
	@echo ""
	@echo "📚 示例:"
	@echo "  make setup    # 初始化项目"
	@echo "  make serve    # 启动服务器"
	@echo "  make check    # 完整检查"

# 初始化开发环境
setup:
	@echo "🚀 初始化开发环境..."
	@if [ ! -f .env ]; then \
		if [ -f env.example ]; then \
			cp env.example .env; \
			echo "✅ 已复制环境变量模板"; \
			echo "⚠️  请编辑 .env 文件设置环境变量"; \
		else \
			echo "❌ 未找到 env.example 文件"; \
			exit 1; \
		fi; \
	fi
	uv venv
	uv sync --all-extras
	@echo "🎉 开发环境初始化完成！"

# 安装依赖
install:
	uv sync --all-extras

# 格式化代码
format:
	@echo "🎨 格式化代码..."
	uv run black .
	uv run isort .

# 代码质量检查
lint:
	@echo "🔍 代码质量检查..."
	uv run flake8 .
	uv run mypy .

# 运行测试
test:
	@echo "🧪 运行测试..."
	uv run pytest --cov=app --cov-report=term-missing

# 测试环境配置
test-env:
	uv run python test_setup.py

# 启动开发服务器
serve:
	@echo "🚀 启动开发服务器..."
	uv run uvicorn app.main:app --reload --port 8000

# 清理项目
clean:
	@echo "🧹 清理项目..."
	find . -type d -name '__pycache__' -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name '*.pyc' -delete 2>/dev/null || true
	rm -rf .coverage htmlcov/ .pytest_cache/ 2>/dev/null || true
	@echo "✅ 清理完成"

# 完整检查流程
check: format lint test
	@echo "🎉 所有检查完成！"

# 添加依赖 (使用方式: make add PACKAGE=fastapi)
add:
	@if [ -z "$(PACKAGE)" ]; then \
		echo "❌ 请指定包名: make add PACKAGE=package-name"; \
		exit 1; \
	fi
	uv add $(PACKAGE)

# 添加开发依赖 (使用方式: make add-dev PACKAGE=pytest)
add-dev:
	@if [ -z "$(PACKAGE)" ]; then \
		echo "❌ 请指定包名: make add-dev PACKAGE=package-name"; \
		exit 1; \
	fi
	uv add --dev $(PACKAGE)

# 更新依赖
update:
	uv lock --upgrade

# 显示依赖树
deps:
	uv tree

# 生成 requirements.txt (兼容性)
requirements:
	uv export --format requirements-txt --output-file requirements.txt
	@echo "✅ 已生成 requirements.txt"

# Docker 相关命令
docker-build:
	@echo "🐳 构建 Docker 镜像..."
	docker build -t torpedo-blog-backend .

docker-run:
	@echo "🚀 运行 Docker 容器..."
	docker run -p 8000:8000 --env-file .env torpedo-blog-backend

docker-compose-up:
	@echo "🐳 启动 Docker Compose 服务..."
	docker-compose up -d

docker-compose-down:
	@echo "🛑 停止 Docker Compose 服务..."
	docker-compose down

docker-compose-logs:
	@echo "📋 查看 Docker Compose 日志..."
	docker-compose logs -f api 