# 🚀 Torpedo Blog Backend 快速开始指南

使用 [uv](https://github.com/astral-sh/uv) 极速包管理器快速设置开发环境。

## 📋 前置要求

- Python 3.9+ 
- Git

## ⚡ 一键设置

### 1. 安装 uv

```bash
# macOS 和 Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# 或者使用 pip
pip install uv
```

### 2. 克隆项目并设置

```bash
# 克隆项目
git clone <repository-url>
cd torpedo-blog/backend

# 一键设置开发环境
make setup
```

### 3. 配置环境变量

```bash
# 编辑 .env 文件 (已自动复制)
nano .env

# 必须设置的变量:
# SECRET_KEY=your-secret-key-here
# ADMIN_PASSWORD=your-admin-password
```

### 4. 测试环境

```bash
# 测试环境配置
make test-env

# 启动开发服务器
make serve
```

## 🎯 常用命令

### 开发命令

```bash
# 查看所有可用命令
make help

# 格式化代码
make format

# 代码质量检查
make lint

# 运行测试
make test

# 完整检查流程
make check

# 清理项目
make clean
```

### 依赖管理

```bash
# 添加新依赖
make add PACKAGE=requests

# 添加开发依赖
make add-dev PACKAGE=pytest

# 更新所有依赖
make update

# 查看依赖树
make deps

# 生成 requirements.txt (兼容性)
make requirements
```

### 直接使用 uv

```bash
# 激活虚拟环境
source .venv/bin/activate  # Linux/macOS
# 或者 .venv\Scripts\activate  # Windows

# 安装依赖
uv sync --all-extras

# 运行脚本
uv run python script.py

# 添加依赖
uv add fastapi

# 移除依赖
uv remove package-name
```

## 🔧 开发工作流

### 日常开发

```bash
# 1. 拉取最新代码
git pull

# 2. 更新依赖
make install

# 3. 启动开发服务器
make serve

# 4. 在另一个终端进行开发...

# 5. 提交前检查
make check
```

### 添加新功能

```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 如果需要新依赖
make add PACKAGE=new-package

# 3. 开发功能...

# 4. 运行测试
make test

# 5. 格式化和检查代码
make check

# 6. 提交代码
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

## 🐛 故障排除

### 常见问题

**问题**: `uv` 命令未找到
```bash
# 解决方案: 重新加载 shell 配置
source ~/.bashrc  # 或 ~/.zshrc
```

**问题**: 虚拟环境激活失败
```bash
# 解决方案: 重新创建虚拟环境
rm -rf .venv
uv venv
```

**问题**: 依赖安装失败
```bash
# 解决方案: 清理缓存并重新安装
uv cache clean
uv sync --all-extras
```

**问题**: 环境变量配置错误
```bash
# 解决方案: 检查 .env 文件
cat .env
# 确保所有必需的变量都已设置
```

### 重置环境

如果遇到无法解决的问题，可以完全重置环境：

```bash
# 清理所有生成的文件
make clean
rm -rf .venv uv.lock

# 重新设置
make setup
```

## 📚 更多资源

- [uv 官方文档](https://docs.astral.sh/uv/)
- [FastAPI 文档](https://fastapi.tiangolo.com/)
- [项目完整文档](README.md)

## 🎉 完成！

现在你已经成功设置了 Torpedo Blog 后端开发环境！

访问 http://localhost:8000/docs 查看 API 文档。 