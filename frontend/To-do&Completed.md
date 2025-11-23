# 项目进度：To-do & Completed

## 🎯 当前实施阶段与优先级 (2024-12-19)

### Phase 1 - TipTap 编辑器系统完善 (当前焦点)
-   [x] **TipTap 基础集成与自定义 Mark 验证**
    -   [x] 安装 TipTap 相关依赖包 (@tiptap/core, @tiptap/react, @tiptap/starter-kit, @tiptap/extension-text-style)
    -   [x] 实现 `StyledTextMark.ts` 自定义扩展，支持 styleKey 属性
    -   [x] 创建 `EditorSandboxPage.tsx` 进行技术验证
    -   [x] 验证 JSON 输出格式，确认可以正确存储和提取 styleKey 信息
-   [x] **编辑器迁移到 CMS Playground (已完成)**
    -   [x] 将 EditorSandboxPage 中的核心逻辑迁移到 CmsPlaygroundPage
    -   [x] 重新集成 StyledTextMark 自定义扩展
    -   [x] 添加样式应用按钮到工具栏 (紫色斜体、重要高亮、清除样式)
    -   [x] 集成文章元数据表单 (标题输入，摘要、分类、标签待补充)
    -   [x] 实现保存功能 (控制台输出，后期对接 API)
-   [x] **ContentRenderer 渲染管道完善 (已完成)**
    -   [x] 基础节点支持 (段落、标题、列表、加粗、斜体、删除线、链接)
    -   [x] 引用块和水平分割线支持
    -   [x] **StyledTextMark 渲染**：实现 styleKey 到 CSS 样式的映射渲染
    -   [x] **编辑器样式修复**：通过 index.css 强制应用标题大小和自定义样式
    -   [*] 代码块渲染优化 (当前基础实现，需要语法高亮)
    -   [ ] 图片渲染支持
-   [x] **编辑器 UI 与交互优化 (已完成)**
    -   [x] 基础工具栏 (Bold, Italic, Headings, Lists, Blockquote, etc.)
    -   [x] 三视图切换 (WYSIWYG / Markdown 源码 / JSON)
    -   [x] 样式应用按钮 (紫色斜体、重要高亮、清除样式)
    -   [x] **WYSIWYG 样式显示修复**：标题大小区分、自定义样式可见
    -   [ ] 键盘快捷键配置 (可选后期优化)
    -   [ ] (可选) 斜杠命令集成

### Phase 2 - 后端 API 开发 (并行启动)
-   [ ] **FastAPI 项目初始化**
    -   [ ] 项目结构搭建 (`app/main.py`, `app/core/`, `app/models/`, `app/apis/`)
    -   [ ] 依赖管理配置 (Poetry 或 `requirements.txt`)
    -   [ ] 环境配置 (.env + Pydantic BaseSettings)
    -   [ ] CORS 配置
-   [ ] **数据库设计与 ORM 配置**
    -   [ ] SQLAlchemy 模型定义 (Post, Category, Tag, User)
    -   [ ] Post 模型设计：基于 TipTap JSON 输出的 content 字段结构
    -   [ ] Alembic 迁移配置
    -   [ ] 数据库初始化脚本
-   [ ] **核心 API 端点实现**
    -   [ ] 博客文章 CRUD (`/api/posts`)
    -   [ ] 分类标签管理 (`/api/categories`, `/api/tags`)
    -   [ ] 网站状态 API (`/api/site-status`) - 支持首页心情状态
    -   [ ] **结构化文本 API**：支持 styleKey 的动态文本内容

### Phase 3 - 博客功能完整实现
-   [ ] **Blog 列表页 (`/blog`)**
    -   [ ] 网格布局设计 (2-3 列响应式)
    -   [ ] 文章预览卡片组件
    -   [ ] 筛选和排序功能
    -   [ ] 分页组件
-   [ ] **Blog 详情页 (`/blog/:slug`)**
    -   [ ] 基于 ContentRenderer 的 Markdown 渲染
    -   [ ] 侧边栏：目录、作者信息、相关文章
    -   [ ] 阅读进度指示器
    -   [ ] SEO 优化 (meta tags, structured data)

## ✅ 已完成的基础架构

### 阶段一：基础架构与核心样式
-   [x] **项目初始化** (React + Vite + TS)
-   [x] **Tailwind CSS 集成与基本配置**
    -   [x] Tailwind v4 引入、路径别名配置 (`@/`)
    -   [x] 全局样式、字体加载 (Noto Serif, Noto Serif SC)
    -   [x] 颜色系统整合，`darkMode: 'class'` 配置
    -   [x] `tailwindcss-animate` 插件集成
-   [x] **代码规范与格式化工具配置**
    -   [x] ESLint (`eslint.config.js`)
    -   [x] Prettier (`.prettierrc.js`)
    -   [x] lint 和 format 的 npm scripts

### 阶段二：核心布局与通用组件
-   [x] **站点整体布局**
    -   [x] `MainLayout.tsx` (页头 Header, 页脚 Footer, 内容区)
    -   [x] 页头 (Header) 组件
    -   [x] 页脚 (Footer) 组件
-   [x] **路由系统设置** (React Router)
    -   [x] 安装 `react-router-dom`
    -   [x] 基础路由结构定义

### 阶段三：核心页面实现
-   [x] **Homepage (`/`) 完整实现**
    -   [x] Hero Section (座右铭, 粒子背景)
    -   [x] Bento Grid 布局 (自我介绍、项目精选、最新文章、社交链接、个人状态、音乐角)
    -   [x] 顶部导航栏、右下角 Dock、页脚
-   [x] **Admin Panel 基础布局**
    -   [x] 类 Discord 设计：左侧工具导航栏 + 主内容区
    -   [x] 可收起侧边栏，工具作用域选择交互
    -   [x] Dashboard 路由和 Outlet 集成

## 📋 通用组件待实现
-   [ ] **基础 UI 组件**
    -   [ ] 按钮 (Button) 组件标准化
    -   [ ] 输入框 (Input) 组件
    -   [ ] 卡片 (Card) 组件重构
    -   [ ] 头像 (Avatar) 组件
    -   [ ] 徽章 (Badge) 组件
    -   [ ] 模态框 (Modal/Dialog)
    -   [ ] 选择器 (Select/Listbox/Combobox)
    -   [ ] 分页 (Pagination) 组件

## 🔮 未来规划
-   [ ] **学术主页** (`/academic`) 实现
-   [ ] **个人工具 Playground** (RSS 阅读器、待办事项)
-   [ ] **响应式设计适配**
-   [ ] **可访问性 (A11y) 优化**
-   [ ] **性能优化** (代码分割, 懒加载, 图片优化)
-   [ ] **测试覆盖** (单元, 集成测试)

---

**实施原则:**
-   ✅ 已完成或基本完成
-   [*] 正在进行中  
-   [ ] 待办任务
-   优先完成当前 Phase，确保功能完整性后再推进下一阶段

## 阶段四：功能开发与状态管理

-   [x] **状态管理方案选型与集成 (Zustand 或其他)** - *部分通过自定义Hook (useDynamicBentoFeatures) 实现特定状态管理*
    -   [ ] 全局状态 (用户认证, 主题切换)
    -   [x] 特定组件状态 (首页Bento Grid心情图标动态切换 - 前端模拟)
-   [ ] **数据请求方案 (TanStack Query + Axios/Fetch)**
    -   [ ] 封装 API 请求
    -   [ ] 集成 TanStack Query
-   [ ] **用户认证流程 (若个人工具需要)**
    -   [ ] 登录/注册页面 (前端)
    -   [ ] 对接后端认证

## 阶段五：个人工作台 & 内容管理后台 (Personal Workbench & CMS - 根据 `design.md`)

-   [ ] **安全访问** (登录认证)
-   [ ] **Admin Panel 布局** (左侧固定导航 + 主内容区)
-   [ ] **内容管理 (CMS)**
    -   [ ] 文章管理 (CRUD, 表格展示, 表单 - Markdown 编辑器集成)
        -   [ ] **Markdown 编辑器选型与调研:** 详细调研 Milkdown, BlockNote, Tiptap 等主流 Markdown 编辑器，评估其功能、定制性、React集成度、社区支持等，选择最符合项目"完美"与"惊艳"需求的编辑器。
        -   [ ] **Markdown 编辑器核心功能集成:** 集成选定的编辑器，实现基础的 Markdown 格式化、实时预览、工具栏等。
        -   [ ] **(高级功能) 编辑器字体选择支持:** 研究并实现在编辑器中选择不同字体应用到文本片段的功能，需配合后端 API 存储样式信息。
        -   [ ] **(高级功能) 编辑器 Emoji 表情包集成:** 为编辑器添加 Emoji 选择和输入功能，提升个性化表达。
        -   [ ] (可选) 编辑器图片拖拽上传/粘贴上传功能。
    -   [ ] 分类管理 (CRUD)
    -   [ ] 标签管理 (CRUD)
    -   [ ] (可选) 媒体管理
    -   [ ] **(新增) 动态文本样式支持:** 
        -   [ ] 前端实现对从后端获取的结构化文本（含样式键）的解析和渲染逻辑（例如，用于首页"当前状态"卡片描述）。
        -   [ ] 在管理后台的编辑器中（如TipTap）支持用户选择文本并应用预定义的样式（如正常、斜体、自定义字体）。
-   [ ] **个人工具 (Workbench - 占位符，根据 `design.md` 未来考虑)**
    -   [ ] RSS 阅读器 (订阅源管理, 文章列表, 阅读状态)
    -   [ ] 待办事项列表 (任务管理, 状态, 分类/优先级)

## 阶段六：打磨与部署准备

-   [ ] **响应式设计适配**(可选)
-   [ ] **可访问性 (A11y) 检查与优化**
-   [ ] **性能优化** (代码分割, 懒加载, 图片优化)
-   [ ] **测试** (单元, 集成)
-   [ ] **构建与部署流程**

## 未来考虑 / `design.md` 中提及的待办

-   [ ] 私有工具 (RSS, 待办事项) 具体设计与实现
-   [ ] 评论系统集成方案评估与实现
-   [ ] 搜索功能实现细节
-   [ ] 后端与数据库选型 (Python/FastAPI 方向已定，具体 DB 待定)
-   [ ] 用户认证策略具体实现
-   [ ] (可选) Google Drive 集成
-   [ ] SEO 深入优化
-   [ ] 安全考虑的持续实施与检查

## 新增任务

-   [ ] **Admin Panel 布局 (采用类 Discord 设计)**
    -   [ ] **左侧导航栏 (工具选择区):**
        -   [x] 设计并实现工具图标和名称展示
        -   [x] 实现导航项的选中与高亮逻辑 (使用 NavLink)
        -   [x] 实现可收起的侧边栏 (手动触发，展开显示图标+名称，收起仅显示图标)
            -   [x] 添加侧边栏展开/收起状态管理
            -   [x] 实现侧边栏宽度和平滑过渡动画 (已使用 Headless UI Transition 优化 ScopeSubMenu)
            -   [x] 实现根据展开状态动态显示/隐藏工具名称及调整布局
            -   [x] 添加手动触发收起/展开的按钮及图标
        -   [ ] 设计并实现工具"作用域"选择的内联展开交互 (已实现初步UI与动画，功能待连接)
        -   [ ] (后续优化) 实现常用工具置顶功能 (UI 与逻辑)
        -   [ ] (后续优化) 实现最近使用工具排序功能 (UI 与逻辑)
    -   [ ] **主内容区 (工具 Playground 容器):**
        -   [x] 设计并实现主内容区框架 (通过 DashboardLayout 和 Outlet)
        -   [x] 实现根据左侧导航选择动态加载对应工具 Playground 的逻辑 (通过路由和Outlet)

-   [ ] **内容管理 (CMS) - 工具 Playground 形态**
    -   [*] **文章管理 Playground (CmsPlaygroundPage.tsx) - 当前焦点**
        -   [ ] **Markdown 编辑器核心功能集成:**
            -   [x] 将 EditorSandboxPage 中的 Tiptap 编辑器逻辑 (useEditor, extensions) 正式迁移并集成到 CmsPlaygroundPage。
            -   [x] 在 CmsPlaygroundPage 中渲染 EditorContent。
            -   [x] 实现简单的文章元数据输入表单 (标题输入框)。
            -   [x] 实现"保存"按钮（初期仅在控制台打印标题和编辑器JSON）。
            -   [ ] (已移除 StyledTextMark) 验证 StyledTextMark 自定义样式能在 CmsPlaygroundPage 的编辑器中正确应用和输出JSON。
            -   [x] 实现编辑器 WYSIWYG / Markdown 源码 / JSON 视图切换功能。
            -   [x] 工具栏添加常用 Markdown 格式化按钮 (Bold, Italic, Headings, Lists, Blockquote, Horizontal Rule, CodeBlock)。
        -   [ ] **ContentRenderer.tsx (实时预览渲染逻辑) 完善:**
            -   [x] 支持段落、标题、列表、加粗、斜体、删除线、行内代码、链接。
            -   [x] 支持块级引用 (Blockquote)。
            -   [x] 支持水平分割线 (HorizontalRule)。
            -   [*] 支持代码块 (CodeBlock) - 基础渲染 (当前测试)。
            -   [*] 支持硬换行 (HardBreak) - (当前测试)。
            -   [ ] (后续) 代码块语法高亮。
            -   [ ] (后续) 图片渲染。
        -   [ ] (下一步) 设计并实现更完善的编辑器可视化工具栏 (例如，下拉菜单组织复杂选项)。
        -   [ ] (后续) 研究并集成键盘快捷方式 (Tiptap内置与自定义)。
        -   [ ] (后续可选) 研究并集成"斜杠命令"功能。
        -   [ ] (远期) 探索集成更高级的"页面级所见即所得"预览模式。
    -   [ ] 分类管理 Playground (占位)
    -   [ ] 标签管理 Playground (占位)

-   [ ] **个人工具 (Workbench - Playground 形态，根据 `design.md` 未来考虑)**
    -   [ ] RSS 阅读器 Playground (占位)
    -   [ ] 待办事项列表 Playground (占位)

---

**说明:**
-   `[x]` 表示已完成或基本完成。
-   `[ ]` 表示待办。
-   `*进行中*` 表示当前正在处理的任务。
-   此列表主要关注前端，后端相关任务未详细列出。 