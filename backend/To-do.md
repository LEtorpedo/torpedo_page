# 后端开发任务 (To-do)

## 阶段一：基础设置与核心 API

-   [ ] **项目初始化与依赖管理**
    -   [ ] 初始化 FastAPI 项目 (`app/main.py`)
    -   [ ] 配置依赖管理 (Poetry 或 PDM，生成 `pyproject.toml`，或使用 `requirements.txt`)
    -   [ ] 设置 `.env` 及通过 Pydantic `BaseSettings` 加载配置 (`app/core/config.py`)
    -   [ ] 配置数据库连接 (SQLite 初始化， `app/db/session.py`)
    -   [ ] 实现基础的数据模型 (例如文章、分类、标签等)，推荐使用 ORM (如 SQLAlchemy) 定义模型 (`app/models/`)，并配置数据库迁移工具 (如 Alembic)。
-   [ ] **网站状态/心情 API**
    -   [ ] 设计数据库模型/存储方式来保存网站心情状态。
    -   [ ] 创建 Pydantic Schema (`app/schemas/`) 用于心情 API 的请求和响应。
    -   [ ] 实现 CRUD 操作 (`app/crud/`) 用于读写心情状态。
    -   [ ] 创建 API 端点 (`app/apis/endpoints/site_status.py` 或类似名称):
        -   [ ] `GET /api/site-status`：获取当前网站心情。
        -   [ ] `PUT /api/site-status`：(管理员权限) 更新网站心情。
    -   [ ] 实现管理员认证与授权逻辑 (初步，可后续完善)。
-   [ ] **CORS 配置**
    -   [ ] 在 FastAPI 应用中配置 CORS，允许前端访问。

## 阶段二：博客文章相关 API (对接 `@nuxt/content` 或 Markdown 文件)

-   [ ] **读取 Markdown 文件/目录结构**
    -   [ ] 设计逻辑扫描存放 Markdown 博文的目录。
    -   [ ] 解析 Markdown 文件元数据 (frontmatter)。
-   [ ] **博文列表 API**
    -   [ ] `GET /api/posts`：返回博文列表 (标题, 摘要, 日期, 标签, slug 等)。
    -   [ ] 实现分页、筛选 (按标签/分类)、排序功能。
-   [ ] **博文详情 API**
    -   [ ] `GET /api/posts/{slug}`：根据 slug 返回单篇博文的完整内容 (Markdown 或预处理的 HTML) 和元数据。
-   [ ] **(可选) 标签/分类 API**
    -   [ ] `GET /api/tags`：返回所有标签列表。
    -   [ ] `GET /api/categories`：返回所有分类列表。

## 阶段三：个人工具与其他动态内容 API (根据前端需求)

-   [ ] **项目精选 API (对接 GitHub API)**
    -   [ ] 后端定期或按需从 GitHub API 获取指定仓库的信息 (描述, 星标数, 更新时间等)。
    -   [ ] `GET /api/featured-projects`：返回处理后的项目精选列表。
-   [ ] **音乐播放状态 API (对接 Spotify/Last.fm API)**
    -   [ ] 实现 OAuth 或 API Key 认证与外部音乐服务。
    -   [ ] `GET /api/now-playing`：返回当前正在播放的歌曲信息。
-   [ ] **(未来) CMS 功能相关 API**
    -   [ ] 用户认证 API (`/login`, `/register`, `/me`)
    -   [ ] 博文 CRUD API (创建、更新、删除博文)
    -   [ ] 分类/标签管理 API
    -   [ ] **(新增) 动态可样式化文本 API:**
        -   [ ] 设计并实现数据结构（如JSON字段，包含文本片段和样式键）用于存储可自定义样式的文本内容（例如，首页"当前状态"卡片的描述）。
        -   [ ] 提供 API 端点以供前端获取这些结构化文本数据。
        -   [ ] 在管理后台的保存逻辑中，处理从富文本编辑器（如TipTap）生成的结构化数据并持久化。

## 其他

-   [ ] **测试覆盖** (单元测试, 集成测试)
-   [ ] **日志系统配置**
-   [ ] **错误处理与统一响应格式**
-   [ ] **文档** (API 文档自动生成 - Swagger/ReDoc)

---
**说明:**
-   `[ ]` 表示待办。
-   `[x]` 表示已完成。 