# 🚀 后端开发任务清单 (To-do) - 深化版 2024

## 📊 进度概览
- ✅ **已完成**: 核心数据模型架构设计、uv 包管理器迁移
- 🔄 **进行中**: API路由设计与实现
- ⏳ **待开始**: 认证系统与数据库迁移

## 🚀 最新更新：uv 包管理器迁移 (已完成)
- ✅ **pyproject.toml 重构**: 从 Poetry 格式迁移到标准 PEP 621 格式
- ✅ **开发工具脚本**: 创建 `scripts/dev.py` 提供 uv 命令封装
- ✅ **Makefile 支持**: 提供简洁的 `make` 命令接口
- ✅ **文档更新**: README.md 更新为 uv 使用说明
- ✅ **忽略文件**: 创建 `.uvignore` 排除不必要文件

### uv 优势
- ⚡ **极速安装**: 比 pip 快 10-100 倍
- 🔒 **锁定文件**: 自动生成 `uv.lock` 确保依赖一致性
- 🛠️ **统一工具**: 替代 pip、pip-tools、virtualenv 等多个工具
- 🐍 **Python 版本管理**: 内置 Python 版本安装和管理

---

## 🏗️ 阶段一：基础架构与数据层 

### ✅ 数据模型设计 (已完成)
-   [x] **基础模型架构** (`app/models/base.py`)
    -   [x] 自动表名生成 (CamelCase → snake_case)
    -   [x] 统一时间戳字段 (created_at, updated_at)
    -   [x] 主键和索引优化
-   [x] **博客文章模型** (`app/models/post.py`)
    -   [x] 双格式内容存储 (TipTap JSON + Markdown)
    -   [x] SEO优化字段 (slug, meta_description)
    -   [x] 发布状态管理 (draft/published)
    -   [x] 智能功能 (阅读时间计算、摘要生成)
    -   [x] 多对多标签关联、一对多分类关联

### 🔄 数据模型完善 (进行中)
-   [ ] **分类模型** (`app/models/category.py`)
    -   [ ] 层级分类支持 (父子关系)
    -   [ ] 分类描述和图标字段
    -   [ ] 分类文章统计功能
-   [ ] **标签模型** (`app/models/tag.py`) 
    -   [ ] 标签颜色主题支持
    -   [ ] 标签使用频率统计
    -   [ ] 标签云数据生成
-   [ ] **管理员用户模型** (`app/models/user.py`)
    -   [ ] 简化认证 (个人博客，单用户)
    -   [ ] JWT Token 支持
    -   [ ] 权限控制基础

### ⏳ 数据库配置 (待开始)
-   [ ] **项目初始化**
    -   [ ] FastAPI 应用初始化 (`app/main.py`)
    -   [ ] 依赖管理配置 (`pyproject.toml` 或 `requirements.txt`)
    -   [ ] 环境配置 (`app/core/config.py`)
-   [ ] **数据库设置**
    -   [ ] SQLite 连接配置 (`app/db/session.py`)
    -   [ ] Alembic 迁移工具配置
    -   [ ] 初始数据种子 (示例文章、分类)

---

## 🔌 阶段二：API 路由与服务层

### 📝 博客内容 API
-   [ ] **文章管理 API** (`app/api/endpoints/posts.py`)
    -   [ ] `GET /api/posts` - 文章列表 (分页、筛选、搜索)
    -   [ ] `GET /api/posts/{slug}` - 文章详情
    -   [ ] `POST /api/posts` - 创建文章 (管理员)
    -   [ ] `PUT /api/posts/{id}` - 更新文章 (管理员)
    -   [ ] `DELETE /api/posts/{id}` - 删除文章 (管理员)
    -   [ ] `PATCH /api/posts/{id}/publish` - 发布/撤回文章
-   [ ] **TipTap 内容处理** 
    -   [ ] JSON → Markdown 转换服务
    -   [ ] Markdown → HTML 渲染服务
    -   [ ] 内容搜索索引 (全文搜索)
-   [ ] **分类标签 API** (`app/api/endpoints/taxonomy.py`)
    -   [ ] `GET /api/categories` - 分类列表 (树形结构)
    -   [ ] `GET /api/tags` - 标签云数据
    -   [ ] 分类标签的 CRUD 操作

### 🔐 认证与权限 API
-   [ ] **用户认证** (`app/api/endpoints/auth.py`)
    -   [ ] `POST /api/auth/login` - 管理员登录
    -   [ ] `POST /api/auth/refresh` - Token 刷新
    -   [ ] `GET /api/auth/me` - 当前用户信息
-   [ ] **权限中间件**
    -   [ ] JWT Token 验证
    -   [ ] 管理员权限检查装饰器

---

## 🎨 阶段三：高级功能与集成

### 💫 动态内容 API
-   [ ] **网站状态 API** (`app/api/endpoints/site_status.py`)
    -   [ ] `GET /api/site-status` - 获取当前网站心情
    -   [ ] `PUT /api/site-status` - 更新网站状态 (支持样式化文本)
    -   [ ] **重点**: 支持 TipTap 结构化样式数据存储
-   [ ] **动态内容支持**
    -   [ ] 可样式化文本的数据结构设计
    -   [ ] 从 TipTap JSON 到 `DescriptionSegment[]` 的转换逻辑
    -   [ ] 样式键到 CSS 类的映射系统

### 🌐 外部集成 API  
-   [ ] **项目展示 API** (`app/api/endpoints/projects.py`)
    -   [ ] GitHub API 集成 (仓库信息获取)
    -   [ ] `GET /api/featured-projects` - 精选项目列表
    -   [ ] 项目数据缓存策略
-   [ ] **音乐状态 API** (`app/api/endpoints/music.py`) [可选]
    -   [ ] Spotify/Last.fm API 集成
    -   [ ] `GET /api/now-playing` - 当前播放状态

---

## 🛠️ 阶段四：开发工具与优化

### 📋 Pydantic Schemas 
-   [ ] **请求/响应模型** (`app/schemas/`)
    -   [ ] `PostSchema`, `PostCreateSchema`, `PostUpdateSchema`
    -   [ ] `CategorySchema`, `TagSchema`  
    -   [ ] `UserSchema`, `TokenSchema`
    -   [ ] `SiteStatusSchema` (支持样式化文本)

### 🔧 服务层设计
-   [ ] **CRUD 操作** (`app/crud/`)
    -   [ ] 通用 CRUD 基类
    -   [ ] 文章专用 CRUD (包含搜索、筛选)
    -   [ ] 用户认证 CRUD
-   [ ] **业务逻辑服务** (`app/services/`)
    -   [ ] 内容转换服务 (JSON ↔ Markdown)
    -   [ ] 搜索引擎服务
    -   [ ] 缓存管理服务

### 🧪 测试与质量保证
-   [ ] **测试覆盖**
    -   [ ] 单元测试 (models, services)
    -   [ ] API 集成测试 (FastAPI TestClient)
    -   [ ] 数据库迁移测试
-   [ ] **代码质量**
    -   [ ] 类型检查 (MyPy)
    -   [ ] 代码格式化 (Black, isort)
    -   [ ] 静态分析 (Flake8)

---

## 🔧 技术债务与优化

### 🚀 性能优化
-   [ ] **数据库优化**
    -   [ ] 查询性能分析
    -   [ ] 索引策略优化  
    -   [ ] 数据库连接池配置
-   [ ] **缓存策略**
    -   [ ] Redis 集成 (可选)
    -   [ ] API 响应缓存
    -   [ ] 静态内容 CDN

### 📚 文档与监控
-   [ ] **API 文档**
    -   [ ] Swagger/ReDoc 自动生成
    -   [ ] API 使用示例
    -   [ ] 错误代码文档
-   [ ] **日志与监控**
    -   [ ] 结构化日志配置
    -   [ ] 错误跟踪
    -   [ ] 性能监控

---

## 🎯 优先级排序

### 🔥 高优先级 (本周)
1. 完成 Category 和 Tag 模型
2. 配置数据库连接和迁移
3. 实现基础的文章 CRUD API

### ⚡ 中优先级 (下周)  
1. 认证系统实现
2. TipTap 内容处理逻辑
3. 网站状态 API (对接前端样式化文本)

### 📅 低优先级 (后续迭代)
1. 外部 API 集成
2. 搜索功能优化  
3. 性能监控系统

---

**💡 技术亮点与学习目标:**
- 🏗️ **现代Python架构**: FastAPI + SQLAlchemy + Pydantic
- 🎨 **富文本处理**: TipTap JSON 与 Markdown 双格式存储  
- 🔄 **API设计模式**: RESTful 设计 + 现代认证
- 🧪 **测试驱动开发**: 完整的测试覆盖策略
- 📊 **数据建模**: 关系型数据库设计最佳实践 