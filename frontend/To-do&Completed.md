# 项目进度：To-do & Completed

## 阶段一：基础架构与核心样式

-   [x] **项目初始化** (React + Vite + TS)
-   [x] **Tailwind CSS 集成与基本配置**
    -   [x] Tailwind v4 引入 (`@import "tailwindcss";`)
    -   [x] `tailwind.config.js`, `postcss.config.js` 生成
    -   [x] 路径别名配置 (`@/`)
    -   [x] `index.css` 全局样式、字体加载 (Noto Serif, Noto Serif SC)
    -   [x] **颜色系统整合** (确保 `tailwind.config.js` 中 `brand-*` 颜色与 `index.css` 协调，并支持 `dark:` 模式切换) - *完成 (最终采用标准Tailwind颜色类解决自定义名称问题，暗黑模式颜色没弄)*
        -   [x] `tailwind.config.js` 已更新，包含 `brand-*` Hex 颜色及其 `dark` 版本。
        -   [x] 确认 `index.css` 中 `--destructive-foreground` CSS 变量已定义 (或从 tailwind config 中移除引用)。
    -   [x] `darkMode: 'class'` 配置
    -   [x] `tailwindcss-animate` 插件集成
        -   [x] 运行 `npm install tailwindcss-animate`
        -   [x] `tailwind.config.js` 中已添加插件引用。
-   [x] **代码规范与格式化工具配置**
    -   [x] ESLint (检查/完善 `eslint.config.js` 或 `.eslintrc.cjs`)
    -   [x] Prettier (检查/创建 `.prettierrc.js` 并配置)
    -   [x] 在 `package.json` 中添加 lint 和 format 的 npm scripts

## 阶段二：核心布局与通用组件

-   [x] **设计并实现站点整体布局 (Layouts)**
    -   [x] `MainLayout.tsx` (页头 Header, 页脚 Footer, 内容区) 
    -   [ ] (可选) 侧边栏 (Sidebar) 布局
-   [ ] **实现通用 UI 组件**
    -   [ ] 按钮 (Button)
    -   [ ] 输入框 (Input)
    -   [ ] 卡片 (Card) - (Bento Grid 设计中提及)
    -   [ ] 导航栏/菜单 (Navbar/Menu) - (首页设计中提及 `HorizontalNavigation`)这一部分可能不需要？我们可能直接使用网格完成导航功能。
    -   [x] 页头 (Header) 组件
    -   [x] 页脚 (Footer) 组件
    -   [ ] 头像 (Avatar) 组件 - (首页、学术主页设计中提及)
    -   [ ] 徽章 (Badge) 组件 - (博客列表、详情页设计中提及)
    -   [ ] (可选) 模态框 (Modal/Dialog) - (后台管理可能需要)
    -   [ ] (可选) 选择器 (Select/Listbox/Combobox) - (博客列表筛选可能需要)
    -   [ ] (可选) 分页 (Pagination) 组件 - (博客列表页设计中提及)
    -   [ ] 图标系统集成 (React Icons / Heroicons)
-   [x] **路由系统设置 (React Router)**
    -   [x] 安装 `react-router-dom`
    -   [x] 定义基础路由结构 (在 `main.tsx` 中集成 `MainLayout` 和占位页面)

## 阶段三：页面开发 - 核心页面 (根据 `design.md`)

-   [x] **Homepage (`/`)**
    -   [x] Hero Section (座右铭, 粒子背景) - *假设已完成，如未完成请取消勾选*
    -   [x] Bento Grid 布局实现 (集成 `bento-grid.tsx`)
        -   [x] 自我介绍格 (简介, 头像) - *部分内容已配置*
        -   [x] 项目精选格 (卡片效果, 标题, 简述, 链接) - *内容已配置，链接到实际仓库*
        -   [x] 最新文章格 (卡片, 标题列表, 日期) - *占位TODO*
        -   [x] 社交/活动格 (联系我卡片) - *已配置，内容为占位*
        -   [x] 个人状态格 (原此刻卡片，图标可动态切换) - *已配置，模拟动态图标*
        -   [x] 爱听的歌格 (音乐角) - *占位TODO*
    -   [x] 顶部导航栏 (`HorizontalNavigation`)
    -   [x] 右下角 Dock (回到顶部, GitHub链接)
    -   [x] 页脚 (版权)
-   [ ] **Blog 列表页 (`/blog`)**
    -   [ ] 网格布局 (2-3 列)
    -   [ ] 文章预览卡片组件 (特色图片, 标题, 日期, 分类/标签)
    -   [ ] 顶部筛选 (分类) 与排序 (日期)
    -   [ ] 分页功能
-   [ ] **Blog 详情页 (`/blog/:slug`)**
    -   [ ] 双栏布局
    -   [ ] 主栏:
        -   [ ] Markdown 内容渲染 (`react-markdown`, 代码高亮, Tailwind Typography)
        -   [ ] 文章元数据 (作者, 日期, 阅读时间, 分类/标签)
    -   [ ] 侧边栏:
        -   [ ] 作者简介 (头像, 介绍)
        -   [ ] 文章目录 (TOC) - (滚动固定)
        -   [ ] 相关文章推荐
        -   [ ] 标签云
    -   [ ] 增强: 阅读进度指示器, 评论区占位
-   [ ] **学术主页 (`/academic`)**
    -   [ ] 专业、简洁的布局与视觉风格
    -   [ ] 基本信息 (照片, 姓名, 身份, 简介)
    -   [ ] 教育背景
    -   [ ] 研究/学习兴趣
    -   [ ] 项目经历/实践 (卡片展示)
    -   [ ] 发表/成果 (占位)
    -   [ ] 个人简历 (PDF 链接按钮)
    -   [ ] 联系方式 & 链接 (邮箱, 带 Tooltip 的图标链接)

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
        -   [ ] 设计并实现工具图标和名称展示
        -   [ ] 实现导航项的选中与高亮逻辑 (已部分完成，使用 NavLink)
        -   [ ] 实现可收起的侧边栏 (手动触发，展开显示图标+名称，收起仅显示图标)
            -   [ ] 添加侧边栏展开/收起状态管理
            -   [ ] 实现侧边栏宽度和平滑过渡动画
            -   [ ] 实现根据展开状态动态显示/隐藏工具名称及调整布局
            -   [ ] 添加手动触发收起/展开的按钮及图标
        -   [ ] 实现常用工具置顶功能 (UI 与逻辑)
        -   [ ] 实现最近使用工具排序功能 (UI 与逻辑)
        -   [ ] 设计并实现工具"作用域"选择的展开栏/快捷菜单交互 (先实现UI占位)
    -   [ ] **主内容区 (工具 Playground 容器):**
        -   [ ] 设计并实现主内容区框架
        -   [ ] 实现根据左侧导航选择动态加载对应工具 Playground 的逻辑 (已部分完成，通过路由和Outlet)
-   [ ] **内容管理 (CMS) - 工具 Playground 形态**
    -   [ ] 文章管理 Playground (基于Tiptap的富文本编辑器，含实时预览、自定义样式等)
        -   [ ] **Markdown 编辑器选型与调研:** (Tiptap 已初步选定)
        -   [ ] **Markdown 编辑器核心功能集成 (CmsPlaygroundPage):**
            -   [ ] 正式集成 Tiptap 编辑器 (基于 EditorSandboxPage 的经验)
            -   [ ] 实现文章标题等元数据输入表单
            -   [ ] 设计并实现编辑器可视化工具栏 (标准格式化、自定义styleKey应用)
            -   [ ] 研究并集成键盘快捷方式 (Tiptap内置与自定义)
            -   [ ] (可选) 研究并集成"斜杠命令"功能
            -   [ ] 实现通用实时预览区 (基于Tiptap JSON 和 styleKey 渲染)
        -   [ ] (远期) 探索集成更高级的"页面级所见即所得"预览模式
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