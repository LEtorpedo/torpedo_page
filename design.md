# 个人博客设计草案

## 1. 核心目标与技术选型

### 1.1. 核心目标

- 使用 React + Vite 构建一个炫酷、美观且现代的个人主页兼博客
- 集成个人常用工具（如 RSS 阅读器、待办事项），使其成为一个多功能平台，部分工具需登录访问。

### 1.2. 技术选型

- **前端框架:** React (使用 Vite 作为构建工具)
- **后端框架:** (Python/FastAPI)
- **主要 UI 构建方式:** Tailwind CSS
- **辅助 UI 组件:** Headless UI / shadcn/ui (提供无样式或轻度样式的功能组件，通过 Tailwind CSS 自定义)
- **补充效果库:** (视情况选择 React 生态中的库或自行实现，目前可以使用Magic UI)
- **CSS 方案:** Tailwind CSS - 作为主要的样式方案。
- **内容格式:** Markdown (内容将通过后端 API 提供，前端负责渲染)。

### 1.3. UI 开发策略

本项目将优先采用以下方式构建用户界面：

1.  **核心框架与构建:** 使用 React (Vite) 和 TypeScript。
2.  **主要样式方案:** Tailwind CSS - 用于实现整体设计和组件的深度定制。我们将充分利用 Tailwind CSS 的原子化特性来构建符合项目设计稿的界面。
3.  **功能性 UI 组件:**
    *   **Headless UI (React):** 提供完全无样式、功能齐全、可访问性良好的 UI 组件作为基础。
    *   **shadcn/ui:** 借鉴或直接使用其基于 Radix UI 和 Tailwind CSS 构建的可复用组件代码。
    *   以上两者结合，允许我们最大限度地控制组件的外观和行为，同时保证可访问性和功能性。
4.  **补充视觉效果:** 对于特定的高级视觉效果（如主页 Hero 区域的粒子背景、交互式悬停按钮，特定卡片效果等），将寻找 React 生态中合适的开源库或考虑基于 CSS/JavaScript 自行实现，同时关注性能影响。目前可以使用magicui。
5.  **自定义组件:** 对于标准库未提供或需要高度定制的复杂组件，将基于 React 和 Tailwind CSS 进行自定义开发。
6.  **动态效果:** 优先使用 CSS 过渡和动画，复杂交互可编写自定义 JavaScript/TypeScript (React Hooks)。

此策略旨在平衡开发效率、设计灵活性和项目个性化需求。在开发过程中，如果遇到现有工具难以满足的需求，团队将共同评估并考虑引入其他合适的库或解决方案。

## 2. 整体设计原则与组件选用

### 2.1. 视觉风格

- 倾向于现代感、科技感，同时注重信息的可读性与页面的简洁性。
- **字体:** 优先选用干净、现代且高可读性的无衬线字体 (如 Inter 或类似风格字体) 作为主要内容和 UI 字体。我们正式选用了noto-serif字体。
- 灵活运用动效，但避免过度堆砌，优先考虑交互触发的动画。
- 关注性能影响，特别是复杂背景和动画效果。

### 2.2. Inspira UI 补充效果组件选用概览 (精简后)

本项目致力于实现现代且具吸引力的视觉效果。对于原设计中提及的特定效果（如粒子背景、特殊卡片、交互式按钮、阅读进度指示等），我们将采取以下策略：

- **寻找 React 生态中的优秀库:** 积极探索和选用 React 生态中成熟的动画与视觉效果库，例如 Framer Motion, React Spring, tsParticles (用于粒子效果) 等，或针对特定需求的专用库。我们找到了Inspira UI的react实现，Magic UI。
- **自定义实现:** 对于某些独特效果，可能会结合使用 Tailwind CSS、原生 CSS 动画/过渡以及 JavaScript (React Hooks) 进行自定义实现。
- **性能优先:** 所有视觉效果的选择和实现都将严格评估其对性能的影响，确保用户体验流畅。

*(原 Inspira UI 组件列表已移除，具体实现将在开发阶段根据 React 技术栈选型确定)*

## 3. 页面详细设计

### 3.1. 首页 (Homepage)

- **布局:** 主要采用 `Bento Grid` 布局概念 (使用 Tailwind CSS Grid/Flexbox 实现)。
- **Hero Section (格子内或跨格):** 
    - **内容:** 座右铭《定风波》。
    - **背景:** 将采用合适的 React 库 (如 tsParticles) 或自定义方案实现粒子背景效果。
- **Bento Grid 内容 (格子建议使用自定义的 `Card` React 组件或 `div` + Tailwind):**
    - **自我介绍格:** 短简介 (`<p>`), 头像 (自定义 `Avatar` React 组件)。
    - **项目精选格:** 使用自定义的 `Card` React 组件，并应用 React 动画库或 CSS 实现类似 3D 或 Glare 的卡片效果，内含标题、简述、链接按钮 (自定义 React 按钮组件)。
    - **最新文章格:** 使用自定义的 `Card` React 组件展示文章标题列表 (链接使用自定义 React 按钮组件或标准 `<a>` 标签) 及日期，信息精简。
    - **社交/活动格:** 使用 React 图标库 (如 React Icons) 或带图标的自定义 React 按钮组件链接，可放置于自定义 `Card` React 组件内。
- **导航栏:** 顶部导航将作为自定义 React 组件实现 (例如 `HorizontalNavigation`)，导航项通过数据配置或直接使用自定义 React 按钮组件。
- **辅助功能:** 右下角 FAB (一个配置为圆形带图标的自定义 React 浮动按钮 + Tailwind 固定定位) 实现暗黑模式切换 (利用 React Context 和 `localStorage` 管理主题状态，并动态应用 Tailwind CSS 的暗黑模式类) 和回到顶部功能。
- **页脚:** 使用自定义 React 组件布局和 Tailwind CSS 实现，包含简洁版权信息 + 独立访客计数器 (需后端 API 支持)。

### 3.2. 文章列表页 (Blog List Page)

- **布局:** 采用网格布局 (2-3 列，使用 Tailwind CSS Grid 实现)。
- **预览卡片:** 
    - **组件:** 使用自定义的 `Card` React 组件作为基础。
    - **交互:** 添加简单的 Tailwind CSS 悬停效果 (如 `hover:shadow-lg`, `hover:scale-[1.02]`, `hover:border-primary-500`)。
    - **内容:** 特色图片 (`<img>`), 标题 (内嵌链接，可使用自定义 React 按钮组件的链接变体), 日期 (`<p>/<span>`), 分类/标签 (使用自定义 `Badge` React 组件)。
- **功能:** 
    - 顶部筛选 (分类) 与排序 (日期): 使用自定义的 React 选择器组件 (如基于 Headless UI `Listbox` 或 `Combobox` 实现) 或按钮组组件。
    - 分页: 使用自定义的 `Pagination` React 组件。

### 3.3. 文章详情页 (Blog Detail Page)

- **布局:** 双栏布局 (使用 Tailwind CSS Grid/Flexbox 实现)。
- **主栏:** 
    - **文章内容:** Markdown 内容从后端 API 获取，使用 React Markdown 渲染库 (如 `react-markdown`) 在前端进行渲染和代码高亮 (例如使用 `rehype-highlight` 或 `remark-prism` 插件)。排版样式可通过 Tailwind CSS (例如 `@tailwindcss/typography` 插件) 自定义。
    - **元数据:** 作者, 日期, 阅读时间 (使用 `<p>/<span>`)，分类/标签 (使用自定义 `Badge` React 组件)。
- **侧边栏:** (考虑使用自定义的 `Card` React 组件作为模块容器)
    - **作者简介:** 包含头像 (自定义 `Avatar` React 组件) 和简短介绍。
    - **文章目录 (TOC):** TOC 数据可由后端 API 提供，或在前端通过 Markdown 内容生成；展示时使用自定义 React 组件，链接可使用自定义 React 按钮组件的链接变体，并实现滚动固定 (CSS `position: sticky` 或 JS)。
    - **相关文章推荐:** 文章标题列表 (链接使用自定义 React 按钮组件的链接变体)。
    - **标签云:** 默认使用自定义 `Badge` React 组件列表展示，也可考虑使用 React 相关的标签云库增加趣味性。
- **增强:** 
    - **阅读进度:** 将采用合适的 React 库或自定义方案 (基于滚动事件监听) 实现类似 `Tracing Beam` 的效果。
    - **评论区:** 预留位置，集成方案待定 (如 Giscus, Disqus)。

### 3.4. 学术主页 (Academic Homepage)

- **页面目标:** 作为个人在线学术名片，展示教育背景、学习兴趣、项目经历，并为未来添加研究成果预留空间。强调专业性、清晰度和可访问性。
- **布局:** 以单（主）栏为主，或采用清晰的区块划分 (使用自定义 React 组件和 Tailwind CSS)，确保信息层级分明，阅读舒适。
- **视觉风格:** 简洁、专业。优先考虑高质量的排版 (Tailwind `prose` 或自定义)、适当的留白。避免使用分散注意力的背景或动画效果。
- **核心内容模块 (使用自定义 React 组件和 Tailwind CSS 构建):**
    - **基本信息 (Header Section):**
        - 照片: 自定义 `Avatar` React 组件。
        - 姓名: `<h1>`。
        - 当前身份: 如"XX大学 计算机科学专业 本科在读 (Sophomore Undergraduate, Computer Science, XX University)"。
        - 简短介绍/目标 (Optional): 一两句概括当前状态或未来方向。
    - **教育背景 (Education):**
        - 当前就读: 学校、专业、预期毕业年份。
        - (可选) 核心课程、当前 GPA (谨慎添加)。
        - 可使用自定义 `Card` React 组件或列表展示。
    - **研究/学习兴趣 (Research/Academic Interests):**
        - 列出当前感兴趣的领域或方向 (即使是初步的)。
        - 使用自定义 `Badge` React 组件或清晰的列表展示关键词。
        - *(占位符，未来可扩展为详细研究方向)*
    - **项目经历/实践 (Projects/Experience):**
        - 列出重要的课程项目、个人项目、实习经历、(若有) 科研助理经历等。
        - 每个项目可用自定义 `Card` React 组件展示，包含标题、简述、所用技术/方法、(若有) 成果链接 (GitHub, 演示)。
        - *(占位符，未来可添加更深入的科研项目)*
    - **发表/成果 (Publications/Outputs):**
        - *(占位符，明确说明此板块用于未来添加)* 可注明"暂无发表，未来将更新期刊论文、会议论文、技术报告或重要开源贡献等"。
    - **个人简历 (CV):**
        - 提供一个自定义 React 按钮组件链接到 PDF 版本的简历 (需要提前准备并托管)。注明更新日期。
    - **联系方式 & 链接 (Contact & Links):**
        - 邮箱地址 (清晰文本或带 `mailto:` 链接的按钮)。
        - 使用带图标的自定义 React 按钮组件，可配合 Headless UI `Tooltip` 显示提示。
- **原则:** 专业清晰，信息准确，结构化展示，易于导航和更新，为未来学术发展奠定基础。

## 4. 个人工作台 & 内容管理后台 (Personal Workbench & CMS)

- **整体定位:** 作为需登录访问的私有区域，集成内容管理 (博客) 与个人常用工具，打造个性化工作台。
- **技术实现:** 
    - **前端:** 使用 React 和 Tailwind CSS 构建界面。具体组件 (如导航、表格、表单、模态框、通知等) 将作为自定义 React 组件开发，优先利用 Headless UI 或 shadcn/ui 提供的功能原语。
    - **后端:** 利用独立的后端服务处理 API 请求 (认证, CRUD, 工具逻辑)。

### 4.1. 核心功能

- **安全访问:** 需登录认证。
- **内容管理 (CMS):**
- 文章管理 (CRUD, 草稿/发布状态)。
- 分类管理 (CRUD)。
- 标签管理 (CRUD)。
    - *(可选)* 媒体管理 (图片等上传、查看、删除)。
- **个人工具 (Workbench - 占位符):**
    - RSS 阅读器 (订阅源管理, 文章列表, 阅读状态标记)。
    - 待办事项列表 (任务添加/编辑/删除, 状态管理, 分类/优先级)。
    - *(未来可扩展其他工具)*

### 4.2. 布局

- **结构:** 典型仪表盘布局: 左侧固定导航 + 主内容区。
- **左侧导航:** 使用自定义的 React 垂直导航组件 (例如 `VerticalNavigation`，可基于 Headless UI Disclosure/Menu 或自行实现)，链接至各模块。
- **主内容区:** 根据导航选择动态加载对应模块界面 (使用 React Router)。

### 4.3. 文章编辑器

- **核心:** 集成强大的 Markdown 编辑器 (React 版本，如 `Milkdown`, `BlockNote`, `TipTap` 或其他支持 Markdown 的富文本编辑器)。
- **元数据管理:** 结合 React 表单库 (如 `React Hook Form`) 和自定义 React 输入组件 (基于 Headless UI 或 shadcn/ui 的 input, select, textarea 等) 管理文章元数据。
- **体验优化:** 宽敞布局 (全屏/收起侧边栏选项), 实时预览, 图片上传集成, 自动保存等。

### 4.4. 列表视图 & 管理界面

- **数据展示:** 使用自定义的 React 表格组件 (例如基于 `TanStack Table` 库封装，或自行实现) 展示文章、分类、标签列表。
- **交互功能:** 利用表格库功能或自定义实现搜索、筛选、排序。
- **CRUD 操作:** 对分类、标签等使用 React 表单库和自定义 React 组件，结合自定义模态框组件 (基于 Headless UI `Dialog` 实现) 或独立页面进行管理。
- **工具界面:** RSS 阅读器、待办事项等工具需设计各自的列表视图和操作界面，充分利用自定义 React 组件。

## 5. Markdown 渲染 (前端)

- **主要策略:** 使用 React 生态中的 Markdown 解析和渲染库。
    - **推荐库:** `react-markdown` 是一个流行的选择，它允许使用 Remark 和 Rehype 插件生态系统。
    - **功能:**
        - **Markdown 解析:** 将 Markdown 文本转换为 AST (Abstract Syntax Tree)。
        - **HTML 渲染:** 将 AST 渲染为 React 组件/HTML 元素。
        - **组件覆盖:** 允许用自定义 React 组件替换标准的 HTML 标签 (e.g., 自定义 `<a>`, `<img>`, `<code>` 等的渲染方式)。
- **样式与排版:**
    - **Tailwind CSS:** 主要通过 Tailwind CSS 직접 스타일링하거나 `@tailwindcss/typography` 插件을 활용하여 Markdown 콘텐츠에 아름답고 일관된 기본 스타일을 제공합니다.
    - **自定义样式:** 结合自定义 Tailwind CSS 规则进一步调整样式细节。
    - **字体:** 确保排版样式使用我们在 2.1 节选定的主字体。
- **代码高亮:**
    - 通过 `react-markdown` 的 Rehype 插件集成代码高亮库，例如:
        - `rehype-highlight` (使用 highlight.js)
        - `remark-prism` (如果 Remark 插件更适用，但通常 Rehype 插件用于最终渲染阶段)
        - 或其他兼容的语法高亮插件。
    - 配置偏好的代码高亮主题，并可通过 CSS 微调样式。
- **目录生成 (TOC):**
    - TOC 数据可以由后端 API 在处理 Markdown 时预先生成并提供。
    - 或者，可以在前端使用 Remark/Rehype 插件 (如 `remark-toc` 或自定义逻辑) 从 Markdown 内容动态生成 TOC 数据。

## 6. 核心数据结构 (示例)

*(注: 以下结构为初步示例，具体字段和实现方式可能根据后端选择和 `@nuxt/content` 配置调整)*

### 6.1. 博客内容结构 (主要基于 `@nuxt/content` front-matter)

```typescript
// 文章 (Post) - 主要由 Markdown 文件的 front-matter 定义
type PostFrontMatter = {
  title: string;
  slug: string; // 通常基于文件名自动生成, 需保证 unique
  publishedAt: Date; // 或者使用 'date' 字段
  status: 'draft' | 'published'; // 控制是否展示
  excerpt?: string; // 文章摘要
  featuredImage?: string; // 特色图片 URL
  authorUsername?: string; // 作者用户名 (关联 User)
  category?: string;       // 单个分类名称/slug
  categories?: string[];   // 多个分类名称/slug
  tags?: string[];         // 标签名称列表
}

// 在使用 @nuxt/content 查询时，通常会得到包含 front-matter 及其他元数据 (如 _path, _id) 的对象
// 分类 (Category) 和 标签 (Tag) 在前端通常作为 Post 的属性 (字符串或数组) 使用，
// 除非后台需要独立的管理功能，否则不一定需要单独的 Category/Tag 数据结构。
```

### 6.2. 个人工具与用户结构 (示例，可能存储于数据库并通过 Server Routes 访问)

```typescript
// 用户 (User)
type User = {
  id: string;       // 数据库 ID
  username: string; // Unique username
  name?: string;    // Display name
  avatarUrl?: string;
  // ...其他个人信息、角色等
}

// RSS 订阅源 (RSSFeed)
type RSSFeed = {
  id: string;       // 数据库 ID
  userId: string;   // 关联用户 ID
  url: string;      // Feed URL
  title?: string;    // Feed 标题 (自动获取或用户自定义)
  lastFetched?: Date; // 最后获取时间
  // ...其他订阅源信息
}

// RSS 文章项 (RSSItem)
type RSSItem = {
  id: string;       // 数据库 ID
  feedId: string;   // 关联订阅源 ID
  userId: string;   // 关联用户 ID (冗余方便查询)
  title: string;
  link: string;     // 文章唯一链接
  publishedDate?: Date;
  isRead: boolean;  // 是否已读
  contentSnippet?: string; // 内容片段
  // ...其他文章项信息
}

// 待办事项 (TodoItem)
type TodoItem = {
  id: string;       // 数据库 ID
  userId: string;   // 关联用户 ID
  text: string;     // 任务内容
  isDone: boolean;  // 是否完成
  createdAt: Date;  // 创建时间
  dueDate?: Date;    // 截止日期
  priority?: 'low' | 'medium' | 'high'; // 优先级
  category?: string; // 任务分类 (简单字符串)
  // ...其他待办事项信息
}
```

## 7. 未来考虑 / 待办

*(记录需进一步设计、决策或实现的事项)*

1.  **私有工具 (RSS, 待办事项) 具体设计:**
    *   RSS 阅读器: 订阅源管理 (CRUD, 分组), 文章列表 (拉取, 展示, 状态标记, 收藏), 阅读界面策略, 后台自动更新任务, UI/UX 设计。
    -   待办事项: 任务管理 (CRUD, 状态), 视图 (筛选, 排序), 提醒功能 (可选), UI/UX 设计。
    *   使用的 UI 库主要为 Nuxt UI，可考虑列表动画等细节。
2.  **评论系统集成方案:**
    *   评估 Giscus, utterances, Disqus 等第三方服务或自建方案。
    *   考虑易用性、隐私性、维护成本、风格契合度。
3.  **搜索功能实现细节:**
    *   确定搜索范围 (博客文章, 学术主页内容等)。
    *   选择实现方式 (客户端 `@nuxt/content` API, 服务器端索引如 Algolia, Meilisearch, Typesense, 或数据库全文搜索)。
    *   设计搜索 UI (输入框, 结果展示)。
4.  **后端与数据库选择:**
    *   为用户数据、RSS/待办等工具选择持久化存储方案。
    *   评估 Supabase, PocketBase, Prisma + DB (PlanetScale, Neon, Turso, SQLite), Firebase 等选项。
5.  **用户认证策略:**
    *   选择具体的认证实现方式。
    *   评估 Nuxt Auth Utils, Supabase Auth, Lucia Auth, Auth.js, 自行实现 JWT 等方案。
    *   考虑安全性与 OAuth 第三方登录。
6.  **部署策略:**
    *   选择部署平台 (Vercel, Netlify, Cloudflare Pages 等)。
    *   确定最终构建模式 (SSG, SSR, Hybrid) 并配置。
7.  **(可选) 媒体管理 (非 Google Drive):**
    *   如需后台上传媒体文件，确定存储方案 (Cloudinary, S3, Vercel Blob 等) 和管理界面。
8.  **(可选) Google Drive 集成:**
    *   探索集成 Google Drive API。
    *   潜在用途: 托管简历 PDF, 存储项目附件, 嵌入 Google Docs/Slides 等。
    *   需处理 OAuth 认证和文件权限。
9.  **性能优化细节:**
    *   具体措施: 图片优化 (`@nuxt/image`), 代码分割, 按需加载, FCP/LCP 优化, Bundle 分析。
10. **SEO 深入优化:**
    *   具体措施: 结构化数据 (Schema.org), Sitemap 生成, Open Graph/Twitter Cards 优化 (`@nuxt/seo` 工具包)。
11. **可访问性 (A11y) 检查与改进:**
    *   持续关注语义化 HTML, ARIA, 键盘导航, 对比度等。

## 技术栈与实现细节

- **RSS 阅读器 (Reader):** 允许用户添加和管理 RSS 源，获取最新文章列表。
- **待办事项 (Todo List):** 简单的任务管理工具。
- **评论系统 (可选):** 未来可能集成轻量级评论系统如 Cusdis 或 Giscus。

## 部署

- 目标平台: Vercel, Netlify 或类似的静态/Jamstack托管服务。
- CI/CD: 利用平台自带的 CI/CD 功能实现自动化构建和部署。

# 安全考虑 (Security Considerations)

为确保个人主页及博客的稳健与安全，本项目将遵循以下安全原则和实践：

## 1. 核心原则
- **纵深防御**: 在不同层面实施安全措施，而不是依赖单一安全点。
- **最小权限**: 组件和模块只应拥有其完成功能所必需的最小权限。
- **数据分离**: 严格区分处理逻辑，敏感操作和数据处理强制在服务器端 (`server/` 目录下) 进行。客户端仅负责展示和用户交互，通过调用后端 API 获取数据或执行操作。

## 2. 数据安全
- **输入验证**:
    - **客户端与服务器端双重验证**: 对所有用户输入（包括表单提交、URL参数等）进行严格验证，防止如 XSS、CSRF 等常见攻击。推荐使用如 Zod 等库进行结构化验证。
    - 涉及 `@nuxt/content` 的 Markdown 内容，需注意其渲染过程的安全性，避免注入恶意脚本。
- **输出编码**:
    - Nuxt/Vue 默认会对模板中的动态数据进行编码。
    - 谨慎使用 `v-html`，确保内容来源可靠或经过适当净化处理。
- **敏感信息处理**:
    - API 密钥、数据库凭证等敏感配置信息必须存储在 `.env` 文件中，并通过 Nuxt 的 `runtimeConfig` 安全地仅供服务器端访问。
    - `.env` 文件必须加入 `.gitignore`，严禁提交到版本库。
- **错误信息处理**:
    - 服务器端 API 在发生错误时，应返回通用的、不暴露系统内部细节的错误提示给客户端。详细错误日志记录在服务器端。

## 3. 通信安全
- **HTTPS (SSL/TLS)**:
    - 项目部署后**必须全程启用 HTTPS**，确保数据在客户端与服务器之间安全传输。部署平台（如 Vercel, Netlify）通常会提供自动 HTTPS 配置。

## 4. 认证与授权 (针对未来可能的用户系统和个人工具)
- **认证机制**: 若引入用户系统，将采用安全的认证方案（如基于 Token 或会话 Cookies）。
    - 密码存储：用户密码必须使用强哈希算法 (如 bcrypt 或 Argon2) 加盐后存储。
    - 会话管理：使用安全的会话机制，如设置 `HttpOnly` 和 `Secure` 属性的 Cookies。
- **授权逻辑**:
    - 对需要特定权限才能访问的 API 接口和页面路由，进行明确的授权检查。
- **CSRF 防护**: 若使用基于 Cookie 的会话管理，需实施有效的 CSRF 防护策略 (如使用 `nuxt-security` 模块提供的功能或同步器模式 Token)。

## 5. 依赖管理与维护
- **定期更新**: 定期审查并更新项目依赖（`package.json`），及时修复已知的安全漏洞。可使用 `npm audit` 或 `yarn audit` 等工具辅助检查。
- **谨慎引入新依赖**: 评估新依赖的安全性、社区活跃度和维护状况。

## 6. HTTP 安全头部
- 考虑配置重要的 HTTP 安全头部，如：
    - `Content-Security-Policy (CSP)`: 限制浏览器加载资源的来源。
    - `X-Content-Type-Options: nosniff`
    - `X-Frame-Options: DENY` 或 `SAMEORIGIN`
    - `Strict-Transport-Security (HSTS)` (在 HTTPS 稳定运行后)
- 可考虑使用 `nuxt-security` 模块简化配置，并致力于配置**严格且具体**的 `Content-Security-Policy` (CSP) 策略。

## 7. 服务器端安全
- 虽然本项目初期可能部署于 Serverless 平台，但仍需注意服务器端代码（`server/api/`, `server/middleware/`）的安全性，防止注入、未授权访问等问题。

这些安全考虑将在项目开发的全生命周期中得到关注和实施。
