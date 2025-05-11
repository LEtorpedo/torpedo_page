# 开发设置与规范

本文档包含项目的开发设置、规范和约定，旨在保持代码库的一致性和可维护性。

**协作流程说明:** 为了确保命令在正确的环境中执行并避免潜在错误，本项目的命令行操作将遵循以下流程：AI 助手会提供建议的命令及其说明，但**最终由开发者（用户）在自己的终端中执行这些命令**。请积极和用户交流技术问题，用户非常乐意从中学习更加专业的开发知识。

## 1. 项目结构 (前后端分离)

**注意:** 本项目的根目录位于工作区下的 `torpedo-blog/` 文件夹内。该目录将包含独立的前端和后端项目。

```
 torpedo-blog/
 ├── frontend/                   # React 前端项目 (Vite 构建)
 │   ├── public/                 # 静态资源 (favicon.ico, robots.txt)
 │   ├── src/
 │   │   ├── assets/             # 需要构建处理的资源 (图片, 字体等)
 │   │   ├── components/         # React 组件 (按需自动导入或手动导入)
 │   │   │   ├── ui/             # 通用 UI 组件 (基于 Headless UI/shadcn/ui + Tailwind)
 │   │   │   └── features/       # 特定功能的组件 (e.g., blog/, admin/)
 │   │   ├── hooks/              # 自定义 React Hooks
 │   │   ├── layouts/            # 页面布局组件
 │   │   ├── pages/              # 页面级组件 (React Router 渲染)
 │   │   ├── services/           # API 请求服务 (e.g., 使用 TanStack Query)
 │   │   ├── store/              # 状态管理 (e.g., Zustand stores)
 │   │   ├── styles/             # 全局样式, Tailwind 配置入口
 │   │   ├── utils/              # 通用工具函数
 │   │   ├── App.tsx             # 应用根组件
 │   │   └── main.tsx            # 应用入口
 │   ├── index.html              # Vite 入口 HTML
 │   ├── vite.config.ts        # Vite 配置
 │   ├── tsconfig.json         # TypeScript 配置
 │   ├── tailwind.config.js    # Tailwind CSS 配置
 │   ├── postcss.config.js     # PostCSS 配置 (Tailwind 需要)
 │   └── package.json            # 前端依赖与脚本
 │
 ├── backend/                    # 后端 API 项目 (Python + FastAPI)
 │   ├── app/                    # 应用核心代码目录
 │   │   ├── __init__.py
 │   │   ├── main.py             # FastAPI 应用实例和全局配置
 │   │   ├── core/               # 核心配置, 工具函数等
 │   │   │   ├── __init__.py
 │   │   │   └── config.py       # 应用配置 (环境变量读取)
 │   │   ├── db/                 # 数据库相关 (连接, session, 初始数据)
 │   │   │   ├── __init__.py
 │   │   │   └── session.py      # 数据库会话管理 (如果使用 SQLAlchemy)
 │   │   ├── models/             # 数据模型 (Pydantic 模型用于请求/响应, 可选的 SQLAlchemy 模型)
 │   │   │   └── __init__.py
 │   │   ├── schemas/            # Pydantic schemas (API 数据校验和序列化)
 │   │   │   └── __init__.py
 │   │   ├── crud/               # CRUD 操作函数 (数据库交互逻辑)
 │   │   │   └── __init__.py
 │   │   ├── améli/              # API 路由 (endpoints)
 │   │   │   ├── __init__.py
 │   │   │   └── deps.py         # API 依赖项 (e.g., 获取当前用户)
 │   │   └── services/           # 业务逻辑服务 (e.g., RSS 拉取服务)
 │   │       └── __init__.py
 │   ├── tests/                  # 后端测试
 │   ├── .env                    # 后端环境变量 (!!! 不提交到 Git !!!)
 │   ├── .flake8                 # Flake8 配置 (Python linter)
 │   ├── pyproject.toml          # 项目元数据和依赖 (Poetry 或 PDM 管理)
 │   ├── requirements.txt        # (备选，如果不用 Poetry/PDM)
 │   └── README.md               # 后端项目说明
 │
 ├── .gitignore                  # Git 忽略配置 (包含前后端 node_modules, __pycache__ 等)
 ├── design.md                   # 设计文档
 └── CONTRIBUTING.md             # 开发规范 (本文档)
```

## 2. 命名规范

### 2.1. 前端 (React)

- **组件 (`components/`, `pages/`, `layouts/`):** 帕斯卡命名法 (PascalCase), e.g., `UserProfileCard.tsx`, `HomePage.tsx`.
- **Hooks (`hooks/`):** 驼峰命名法 (camelCase), 必须以 `use` 开头, e.g., `useAuth.ts`, `useFormInput.ts`.
- **工具函数 (`utils/`):** 驼峰命名法 (camelCase).
- **类型/接口:** 帕斯卡命名法 (PascalCase), e.g., `type UserProfile = { ... }`, `interface PostData { ... }`.
- **常量:** 大写蛇形命名法 (UPPER_SNAKE_CASE), e.g., `const API_BASE_URL = '...'`.
- **文件与目录:** 通常使用 kebab-case (e.g., `user-profile/`) 或 PascalCase (e.g., `UserProfile/`) 视团队约定，推荐在 `components` 和 `pages` 内部使用 PascalCase 目录对应组件名。

### 2.2. 后端 (Python + FastAPI)

- **文件名与模块名:** 小写蛇形命名法 (lower_snake_case), e.g., `user_router.py`, `database_utils.py`.
- **类名:** 帕斯卡命名法 (PascalCase), e.g., `class UserAuthService:`, `class PostSchema(BaseModel):`.
- **函数与变量名:** 小写蛇形命名法 (lower_snake_case), e.g., `def get_current_user():`, `db_session = ...`.
- **常量:** 大写蛇形命名法 (UPPER_SNAKE_CASE), e.g., `API_PREFIX = "/api/v1"`, `DATABASE_URL = "sqlite:///./test.db"`.
- **Pydantic 模型字段:** 通常使用驼峰命名法 (camelCase) 以便与 JSON API 约定一致，或在模型配置中启用 `alias_generator` 来自动转换。

## 3. 样式 (Styling) - 前端

- **主要方案:** **Tailwind CSS**，通过 `tailwind.config.js` 和 `postcss.config.js` 配置。
- **组件库辅助:** 利用 **Headless UI** 或 **shadcn/ui** 的无样式/轻样式组件作为基础，通过 Tailwind CSS 进行完全的样式定制。
- **全局样式:** 少量必要的全局样式或基础 HTML 元素样式可放在 `src/styles/globals.css` (或类似文件) 中。
- **避免使用 CSS-in-JS 库** (如 Styled Components, Emotion) 以保持与 Tailwind CSS 的一致性，除非有非常特殊的需求且团队达成一致。

## 4. 代码风格与质量 - 前端

- **工具:** 配置 **ESLint** (配合适用于 React 和 TypeScript 的插件，如 `eslint-plugin-react`, `eslint-plugin-react-hooks`, `@typescript-eslint/eslint-plugin`) 和 **Prettier**。
- **目标:** 保证代码风格统一，遵循 React 和 TypeScript 的最佳实践，减少低级错误。

## 4.bis. 代码风格与质量 - 后端 (Python)

- **Linter:** 使用 **Flake8** (结合 `flake8-black`, `flake8-isort`, `flake8-pyproject` 等插件) 进行代码规范检查。
- **Formatter:** 使用 **Black** 进行代码格式化，确保风格统一。
- **Import Sorting:** 使用 **isort** 对导入进行排序。
- **Type Checking:** 使用 **Mypy** 进行静态类型检查，充分利用 Python 类型提示。
- **目标:** 保证代码风格统一，遵循 Python (PEP 8) 和 FastAPI 的最佳实践，提高代码可读性和健壮性。

## 5. 版本控制 (Git)

本项目采用规范化的 Git 工作流和提交信息，以提高可维护性和可追溯性。

### 5.1. 分支策略 (Branching Strategy - GitHub Flow)

- **`main` 分支:** 
    - 始终保持可部署状态。
    - 只接受来自功能分支的合并 (通过 Pull Request/Merge Request)。
    - **禁止**直接在此分支提交。
- **功能分支 (Feature Branches):**
    - 所有新功能、修复、重构都在功能分支上进行。
    - 从 `main` 分支创建，命名需清晰描述性 (e.g., `feature/login-page`, `fix/header-style`)。
    - 完成后合并回 `main`，然后可删除。

### 5.2. 提交粒度 (Commit Granularity)

- **原子提交:** 每个提交应包含一个逻辑上独立的、完整的改动单元。
- **专注单一:** 避免将不相关的改动混合在同一提交中。
- **频繁提交:** 在开发过程中进行小而频繁的提交。

### 5.3. 提交信息规范 (Conventional Commits)

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

**格式:**
```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

- **`<type>` (必填):** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
- **`[optional scope]`:** 影响范围。
    - **前端 scope 示例:** `feat(ui): add new Button component`, `fix(blog-page): resolve image loading issue`, `refactor(auth-hook): simplify logic`.
    - **后端 scope 示例:** `feat(api-posts): add endpoint for creating posts`, `fix(db-users): correct user query logic`, `refactor(rss-service): improve feed parsing`.
- **`<description>` (必填):** 简洁描述，祈使句，现在时，小写开头，无句号。
- **`[optional body]`:** 详细说明。
- **`[optional footer]`:** 引用 Issue, 标记 Breaking Change.

**示例（最好使用中文说明）:**
```
feat(ui): 新增用户头像组件 UserAvatar

该组件支持多种尺寸和形状，并能处理图片加载失败的情况。
```
```
fix(api-user): 修复登录接口在特定条件下返回错误状态码的问题
```

## 6. 环境变量

### 6.1. 前端 (Vite)

- **存储:** 在 `frontend/.env` 文件中定义以 `VITE_` 开头的环境变量 (e.g., `VITE_API_BASE_URL=http://localhost:3001/api`)。
- **访问:** 在前端代码中通过 `import.meta.env.VITE_YOUR_VAR_NAME` 访问。
- **安全:** `.env` 文件必须加入项目根目录的 `.gitignore`。**不要在前端存放任何敏感密钥**；前端环境变量通常用于指向后端 API 地址或配置公开的第三方服务密钥 (如统计分析)。

### 6.2. 后端 (Python + FastAPI)

- **存储:** 在 `backend/.env` 文件中定义环境变量 (e.g., `DATABASE_URL="sqlite:///./blog.db"`, `SECRET_KEY="your_secret_key"`, `API_V1_STR="/api/v1"`)。
- **访问:** 在 Python 代码中 (通常在 `app/core/config.py` 中) 使用如 `python-dotenv` 和 Pydantic 的 `BaseSettings` 来加载和验证环境变量。
- **安全:** `.env` 文件必须加入项目根目录的 `.gitignore`。敏感信息如 `SECRET_KEY` 绝不能硬编码。

## 7. 编码实践 (Coding Practices) - 前端 (React)

为了提高代码的可维护性、可读性和灵活性，请遵循以下实践：

- **遵循 React Hooks 规则:** 
    - 只在顶层调用 Hooks。
    -只在 React 函数组件或自定义 Hooks 中调用 Hooks。
    - 使用 ESLint 插件 (`eslint-plugin-react-hooks`) 强制执行这些规则。
- **组件设计:**
    - **单一职责原则:** 每个组件应该只做一件事，并把它做好。
    - **Props 设计:** 保持 Props 接口清晰、简洁。对于复杂数据结构，使用明确的类型或接口定义。
    - **组合优于继承:** 优先通过组合组件来构建复杂 UI。
    - **合理划分展示组件 (Presentational Components) 和容器组件 (Container Components):** 虽然 Hooks 使得这种划分界限模糊，但其核心思想（分离视图逻辑和业务/状态逻辑）仍然有价值。可以考虑将复杂的状态逻辑、数据获取逻辑封装在自定义 Hooks 或上层组件中。
- **避免魔法值 (Magic Values):** 
    - 将常量组织在 `src/utils/constants.ts` 或相关模块中。
- **配置驱动:** 
    - UI 相关的可配置参数（如分页大小）可以作为组件 Props 或通过 Context 传递。API Endpoints 等通过环境变量管理。
- **代码复用:**
    - **自定义 Hooks (`hooks/`):** 封装可复用的有状态逻辑 (如表单处理、数据获取、事件监听等)。
    - **工具函数 (`utils/`):** 封装纯函数工具。
    - **通用 UI 组件 (`components/ui/`):** 构建可复用的基础 UI 元素。
- **TypeScript 使用:**
    - 为组件 Props, Hooks 参数和返回值, 事件处理函数, 状态等添加明确的类型。
    - 避免使用 `any` 类型，优先使用更具体的类型或 `unknown`。
    - 利用接口 (Interface) 或类型别名 (Type Alias) 定义复杂数据结构。
- **错误处理 (Error Handling):**
    - **API 请求:** 使用 `TanStack Query` 等库处理 API 请求的加载、成功、错误状态。在 UI 中向用户提供清晰的反馈 (e.g., 使用自定义的 Toast/Notification 组件)。
    - **组件内部错误:** 使用 React 错误边界 (Error Boundaries) 来捕获和处理组件渲染期间的错误，防止整个应用崩溃。
- **文档与注释 (Documentation & Comments):**
    - 为自定义 Hooks, 复杂组件的 Props, 重要工具函数添加 JSDoc/TSDoc 注释。
    - 对于非显而易见的逻辑或"为什么"这样做，添加简洁的行内注释。

## 7.bis. 编码实践 (Coding Practices) - 后端 (Python + FastAPI)

- **FastAPI 特性利用:**
    - **依赖注入 (Depends):** 充分利用 FastAPI 的依赖注入系统来管理依赖关系 (如数据库会话、获取当前用户等)，使代码更模块化、可测试。
    - **路径操作函数参数类型提示:** 为路径操作函数的参数 (路径参数、查询参数、请求体) 添加明确的 Python 类型提示，FastAPI 会自动进行数据转换和验证。
    - **Pydantic 模型:** 使用 Pydantic 模型定义请求体和响应体的数据结构，实现自动数据校验、序列化和文档生成。
    - **后台任务 (Background Tasks):** 对于耗时操作且不需要立即返回结果给用户的任务 (如发送邮件、某些 RSS 拉取后的处理)，使用 FastAPI 的后台任务。
    - **异步优先:** 尽可能使用 `async def` 定义路径操作函数和依赖项，以发挥 FastAPI 的异步性能优势，特别是在进行 I/O 操作 (数据库查询、外部 API 调用) 时。
- **项目结构:** 遵循模块化的项目结构 (如 `backend/app/` 下的 `api`, `crud`, `models`, `schemas`, `services` 等子目录)，便于维护和扩展。
- **数据库交互:**
    - **CRUD 分离:** 将数据库的 CRUD (创建、读取、更新、删除) 操作封装在专门的模块/函数中 (e.g., `app/crud/`)，保持 API 路由处理函数的简洁。
    - **会话管理:** 如果使用 SQLAlchemy，确保正确管理数据库会话的生命周期 (通常通过依赖注入实现)。
    - **避免在循环中执行过多数据库查询 (N+1 问题):** 注意优化数据获取逻辑。
- **错误处理:**
    - 使用 FastAPI 的 `HTTPException` 来返回标准的 HTTP 错误响应。
    - 可以定义自定义异常处理器来统一处理特定类型的应用异常。
- **配置管理:** 将应用配置 (如数据库 URL, JWT 密钥等) 集中管理 (e.g., `app/core/config.py`)，通过环境变量加载。
- **日志:** 配置结构化的日志记录，方便调试和问题追踪。
- **Pythonic 代码:** 编写清晰、可读、符合 Python 风格指南 (PEP 8) 的代码。

## 8. 状态管理 (State Management) - 前端

- **主要方案:** 优先考虑使用 **Zustand** 进行全局或跨组件特性状态管理。其简单、灵活、对 TypeScript 友好。
- **局部状态:** 组件内部状态优先使用 React 内置的 `useState` 和 `useReducer`。
- **服务端缓存与同步:** 使用 **TanStack Query** 管理服务器状态，包括数据获取、缓存、乐观更新等。
- **Context API:** 对于一些简单的、作用域较小的全局数据（如主题切换、用户认证状态），可以谨慎使用 React Context API，避免过度封装或性能问题。

## 9. 测试策略 (Testing Strategy) - 前端

- **目标:** 保证代码质量和功能稳定性。
- **工具:** 
    - **Vitest:** Vite 原生的测试框架，与 Vite 项目集成良好，支持 TypeScript, JSX。
    - **React Testing Library:** 鼓励编写关注用户行为和组件功能的测试，而不是内部实现细节。
- **测试类型:**
    - **单元测试 (Unit Testing):** 使用 Vitest 测试自定义 Hooks 和工具函数。
    - **组件测试 (Component Testing):** 使用 Vitest 和 React Testing Library 测试独立 React 组件的渲染、交互和行为。
    - **集成测试 (Integration Testing):** 测试多个组件协同工作的场景。
    - **端到端测试 (E2E Testing - 可选):** 未来可考虑使用 Playwright 或 Cypress 测试关键用户流程。

## 9.bis. 测试策略 (Testing Strategy) - 后端 (Python + FastAPI)

- **目标:** 保证 API 功能正确性、业务逻辑健壮性和数据处理的准确性。
- **工具:**
    - **Pytest:** Python 生态中最流行和强大的测试框架，支持丰富的插件和 fixtures。
    - **HTTPX:** 现代化的异步 HTTP 客户端，非常适合测试 FastAPI 应用 (FastAPI 文档推荐)。FastAPI 提供了 `TestClient` (基于 HTTPX) 更方便测试。
    - **factory_boy (可选):** 用于生成测试数据 fixture。
    - **Coverage.py:** 用于衡量测试覆盖率。
- **测试类型:**
    - **单元测试 (Unit Testing):** 测试独立的工具函数、CRUD 操作、服务逻辑、Pydantic 模型验证等。
    - **集成测试 (Integration Testing):** 测试 API 端点，覆盖从接收请求、依赖注入、业务逻辑处理到返回响应的完整流程。模拟数据库交互 (可以使用内存 SQLite 或测试数据库)。
    - **数据库测试 (可选):** 针对复杂的数据库查询或迁移脚本进行测试。

## 10. 依赖管理 (Dependency Management) - 前端

- 添加新依赖前，请评估其必要性、社区活跃度、维护状况和 Bundle 大小影响。
- 定期（例如，通过 Dependabot 或手动）更新依赖，以获取安全修复和新特性，注意检查 Breaking Changes。使用 `npm audit` 或 `yarn audit` 检查已知漏洞。

## 10.bis. 依赖管理 (Dependency Management) - 后端 (Python)

- **工具:** 推荐使用现代化的 Python 包管理工具，如 **Poetry** 或 **PDM**。
    - **优点:** 提供了依赖锁定 (`poetry.lock` / `pdm.lock`)，虚拟环境管理，以及更友好的 `pyproject.toml` 配置方式。
- **备选:** 使用传统的 `pip` + `requirements.txt` (可以通过 `pip freeze > requirements.txt` 生成)。
- **定期审计和更新:** 定期审查依赖，使用工具 (如 `pip-audit` 或 GitHub Dependabot) 检查已知漏洞，并及时更新。

## 11. 可访问性 (Accessibility - A11y) - 前端

- 开发组件和页面时，需关注可访问性最佳实践：
    - 使用语义化 HTML 标签。
    - 确保良好的键盘导航支持。
    - 为非文本内容提供替代文本 (e.g., `img` 的 `alt` 属性)。
    - 在适当情况下使用 ARIA 属性增强语义。
    - 保证足够的色彩对比度。

## 12. 代码审查 (Code Review)

- *(占位符)* 如果未来有其他协作者加入：
    - 所有对 `main` 分支的合并都应通过 Pull Request (PR)。
    - PR 需要清晰描述改动内容和原因。
    - 至少需要一名（或自我）审查通过后方可合并。

## 13. 安全编码指南 (Secure Coding Guidelines)

为确保应用安全，请在开发过程中遵循以下指南：

### 13.1. 输入验证 (Input Validation)
- **严格验证所有外部输入**: 
    - **后端 (主要责任方):** 对所有来自客户端的输入在 FastAPI 中通过 Pydantic 模型进行严格验证。FastAPI 会自动处理校验失败并返回 422 错误。
    - **前端 (辅助):** 可以在前端使用如 `React Hook Form` 结合 `Zod` (或 Yup) 等库进行客户端校验，以提升用户体验，但**不能替代服务器端验证**。
- **示例 (前端 React Hook Form + Zod):**
  ```typescript
  // components/MyForm.tsx
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { z } from 'zod';

  const schema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
  });

  type FormData = z.infer<typeof schema>;

  function MyForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(schema),
    });
    const onSubmit = (data: FormData) => console.log(data);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ... input fields and error messages ... */}
      </form>
    );
  }
  ```

### 13.2. 输出编码与XSS防护 - 前端
- **React 默认行为:** React 默认会对 JSX 中的动态绑定内容进行HTML编码，有助于防止XSS。
- **谨慎使用 `dangerouslySetInnerHTML`**: 仅在绝对必要且内容来源可信或经过严格净化处理 (例如使用 `DOMPurify`) 时使用。
- **Markdown 内容渲染**: 若前端渲染从后端获取的 Markdown 内容 (e.g., 使用 `react-markdown`)，需确保渲染库配置安全，不允许注入不安全的 HTML 标签或 JavaScript。配置 `react-markdown` 的 `rehypePlugins` 或 `remarkPlugins` 时要谨慎选择和配置插件。

### 13.3. 业务逻辑分离与API安全
- **客户端/服务器职责分离**: 
    - **前端 (`frontend/src`)**: 只负责UI展示和用户交互。
    - **后端 (`backend/app`)**: 所有敏感操作、数据处理、权限校验、与数据库或第三方私有服务交互的逻辑，**必须**在后端 API 实现。
- **API 端点安全 (由后端负责):**
    - FastAPI 通过 Pydantic 自动处理请求体验证，避免注入不符合预期结构的数据。
    - 避免在API响应中泄露不必要的敏感信息。自定义 Pydantic 模型的 `response_model` 来控制输出字段。

### 13.4. 敏感配置管理
- **前端:** 如 6.1 节所述，前端 `.env` 文件不应包含任何私有密钥。
- **后端:** 如 6.2 节所述，使用 `.env` 文件和 `app/core/config.py` (结合 Pydantic `BaseSettings`) 管理敏感配置。确保 `.env` 文件在 `.gitignore` 中。

### 13.5. 认证与授权 (若适用)
- **前端职责:**
    - 安全地存储认证凭证 (如 JWT Token)。
    - 在调用受保护的 API 时，在请求头中附带认证凭证。
    - 根据用户认证状态和角色控制 UI 和路由。
- **后端职责 (主要责任方):**
    - **FastAPI Security Utilities:** 利用 FastAPI 提供的安全工具 (如 `fastapi.security.OAuth2PasswordBearer`) 实现 OAuth2 密码流等认证方案。
    - **JWT Token:** 生成和验证 JWT Token (使用如 `python-jose` 库)。
    - **密码哈希:** 使用安全的哈希算法 (如 `passlib` 库，支持 bcrypt, Argon2) 存储用户密码。
    - **依赖注入实现权限校验:** 通过 FastAPI 的依赖注入系统，创建依赖项来校验用户是否有权访问特定接口。

### 13.6. 依赖安全 - 前端

- **定期审计**: 定期运行 `npm audit` 或 `yarn audit` 来检查项目依赖中已知的安全漏洞。
- **及时更新**: 尽快更新存在安全漏洞的依赖包至安全版本，注意测试兼容性。

### 13.6.bis. 依赖安全 - 后端 (Python)

- **定期审计**: 使用 `pip-audit` 或其他工具检查 `requirements.txt` / `pyproject.toml` / `poetry.lock` / `pdm.lock` 中的依赖是否存在已知安全漏洞。
- **及时更新**: 尽快更新存在安全漏洞的依赖包至安全版本，注意测试兼容性。

### 13.7. HTTP 安全头部
- **由后端 API 设置:** 大部分关键的 HTTP 安全头部应由后端 API 服务器 (例如通过 FastAPI 中间件) 在响应中设置。
- **前端可考虑 (通过 meta 标签或构建时插件):** 一些简单的头部如 `Referrer-Policy`。

### 13.8. 服务器端日志 (Server-side Logging)
- **结构化日志**: 采用结构化日志记录方式，包含时间戳、级别、请求ID (若有)、上下文等关键信息。
- **避免敏感信息**: 严禁在日志中记录密码、API 密钥、会话令牌等敏感数据。
- **日志级别**: 合理使用日志级别 (INFO, WARN, ERROR, DEBUG) 以便筛选和分析。

遵循这些指南有助于构建一个更安全的应用。