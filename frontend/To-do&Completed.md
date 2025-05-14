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

-   [ ] **Homepage (`/`)**
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
    -   [ ] 分类管理 (CRUD)
    -   [ ] 标签管理 (CRUD)
    -   [ ] (可选) 媒体管理
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

---

**说明:**
-   `[x]` 表示已完成或基本完成。
-   `[ ]` 表示待办。
-   `*进行中*` 表示当前正在处理的任务。
-   此列表主要关注前端，后端相关任务未详细列出。 