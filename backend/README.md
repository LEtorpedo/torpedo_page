# 🚀 Torpedo Blog Backend

现代化个人博客后端，基于 FastAPI + SQLAlchemy，支持富文本内容管理。

## 🏗️ 技术栈

- **Web框架**: FastAPI
- **数据库**: SQLAlchemy + SQLite (开发) / PostgreSQL (生产)  
- **认证**: JWT + Passlib
- **内容处理**: TipTap JSON + Markdown 双格式支持
- **代码质量**: Black, isort, flake8, mypy
- **测试**: pytest + coverage

## 🚀 快速开始

### 方式一：使用 uv (推荐 - 极速包管理器)

```bash
# 1. 安装 uv
# macOS 和 Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# 或者使用 pip
pip install uv

# 2. 克隆并进入后端目录
cd backend

# 3. 创建虚拟环境并安装依赖
uv venv
source .venv/bin/activate  # Linux/macOS
# 或者 .venv\Scripts\activate  # Windows

# 4. 安装项目依赖（包括开发依赖）
uv sync --all-extras

# 5. 复制并配置环境变量
cp env.example .env
# 编辑 .env 文件，设置你的配置

# 6. 运行环境测试
uv run python test_setup.py

# 7. 启动开发服务器
uv run uvicorn app.main:app --reload --port 8000
```

### 方式二：使用 Poetry

```bash
# 1. 确保安装了 Poetry
curl -sSL https://install.python-poetry.org | python3 -

# 2. 克隆并进入后端目录
cd backend

# 3. 安装依赖
poetry install

# 4. 激活虚拟环境
poetry shell

# 5. 复制并配置环境变量
cp env.example .env
# 编辑 .env 文件，设置你的配置

# 6. 启动开发服务器
uvicorn app.main:app --reload --port 8000
```

### uv 常用命令

```bash
# 添加新依赖
uv add fastapi

# 添加开发依赖
uv add --dev pytest

# 移除依赖
uv remove package-name

# 更新依赖
uv lock --upgrade

# 运行脚本
uv run python script.py

# 运行测试
uv run pytest
```

## 📁 项目结构

```
backend/
├── app/
│   ├── models/          # 数据模型
│   │   ├── __init__.py
│   │   ├── base.py      # 基础模型类
│   │   ├── post.py      # 博客文章模型  
│   │   ├── category.py  # 分类模型
│   │   ├── tag.py       # 标签模型
│   │   └── user.py      # 用户模型
│   ├── api/             # API路由 (待实现)
│   ├── core/            # 核心配置 (待实现)
│   ├── schemas/         # Pydantic模型 (待实现) 
│   ├── services/        # 业务逻辑 (待实现)
│   └── main.py          # FastAPI应用入口 (待实现)
├── tests/               # 测试文件 (待实现)
├── alembic/             # 数据库迁移 (待实现)
├── pyproject.toml       # 项目配置和依赖
├── env.example          # 环境变量示例
└── README.md           # 项目文档
```

## 🔧 开发工具

### 代码格式化
```bash
# 使用 uv 运行格式化工具
uv run black app/
uv run isort app/

# 类型检查
uv run mypy app/

# 代码质量检查
uv run flake8 app/

# 一键格式化和检查
uv run black . && uv run isort . && uv run flake8 . && uv run mypy .
```

### 测试
```bash
# 运行测试
uv run pytest

# 测试覆盖率
uv run pytest --cov=app --cov-report=html

# 运行特定测试文件
uv run pytest tests/test_posts.py

# 运行特定测试函数
uv run pytest tests/test_posts.py::test_create_post
```

## 🌐 API文档

启动服务器后，访问：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🎯 开发目标

### 已完成 ✅
- [x] 项目结构设计
- [x] 数据模型定义（Post, Category, Tag, User）
- [x] 依赖管理配置

### 进行中 🔄
- [ ] FastAPI应用初始化
- [ ] 数据库连接和迁移
- [ ] API路由实现

### 待开始 ⏳
- [ ] 认证系统
- [ ] TipTap内容处理
- [ ] 测试覆盖

## 🤝 与前端的数据对接

### TipTap JSON 格式支持
后端 `Post.content_json` 字段直接存储前端TipTap编辑器的JSON输出：

```python
# 前端发送的数据格式
{
  "title": "我的文章",
  "content_json": {
    "type": "doc", 
    "content": [...]  # TipTap的ProseMirror格式
  },
  "content_markdown": "# 我的文章\n\n内容...",  # 自动转换或手动编辑
}
```

### API端点预览
```
POST /api/posts                 # 创建文章
GET  /api/posts                 # 获取文章列表  
GET  /api/posts/{slug}          # 获取文章详情
PUT  /api/posts/{id}            # 更新文章
DELETE /api/posts/{id}          # 删除文章
```

## 📝 开发笔记

- 使用双格式存储：JSON (TipTap) + Markdown (备份/导出)
- 反范式化统计字段提升查询性能
- 支持层级分类但保持简单（个人博客场景）
- 标签系统支持标签云和热度分析 