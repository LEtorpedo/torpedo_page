import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 主站点布局组件导入
import MainLayout from './layouts/MainLayout';

// 后台布局组件导入
import DashboardLayout from './layouts/DashboardLayout';

// 公开页面组件导入
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicPage from './pages/AcademicPage';
// import AdminDashboardPage from './pages/AdminDashboardPage'; // 这个不再直接使用，被 DashboardOverviewPage 替代
import AdminLoginPage from './pages/AdminLoginPage';
import BlogDetailPage from './pages/BlogDetailPage';
import BlogListPage from './pages/BlogListPage';
import ContactPage from './pages/ContactPage';
import EditorSandboxPage from './pages/dev/EditorSandboxPage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectsPage from './pages/ProjectsPage';

// 后台页面组件导入
import DashboardOverviewPage from './pages/dashboard/OverviewPage';
// 新的 Playground 页面导入
import CmsPlaygroundPage from './pages/admin/CmsPlaygroundPage';
import RssPlaygroundPage from './pages/admin/RssPlaygroundPage';
import TodoPlaygroundPage from './pages/admin/TodoPlaygroundPage';
import SettingsPlaygroundPage from './pages/admin/SettingsPlaygroundPage';

function App() {
  return (
    <Routes>
      {/* 主站点布局与路由 */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="academic" element={<AcademicPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="blog" element={<BlogListPage />} />
        <Route path="blog/:postId" element={<BlogDetailPage />} />
        <Route path="contact" element={<ContactPage />} />
        {/* 编辑器沙盒页面，暂时保留在 MainLayout 下，方便直接访问和测试 
            未来可以考虑也移到 /dashboard/dev/editor-sandbox 并使用 DashboardLayout 
            或者使其成为一个无布局的纯工具页面 */}
        <Route path="dev/editor-sandbox" element={<EditorSandboxPage />} /> 
        {/* MainLayout 内部的 404 */} 
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* 后台管理布局与路由 */}
      {/* 登录页面，不使用 DashboardLayout */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      
      {/* 
        DashboardLayout 将包裹所有 /admin/* 下的路径 (除了 /admin/login)
        注意: DashboardLayout.tsx 中 Logo 的链接是 /admin, 
        而 OverviewPage 的路由是 /admin/overview (为了与导航栏中的 "Torpedo Backend" 区分)。
        我们可以将 DashboardLayout 的根路径也设为 /admin/overview 或者添加一个 /admin 的重定向或 index 路由。
        这里我将为 /admin 添加一个 index 路由指向 DashboardOverviewPage。
      */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<DashboardOverviewPage />} /> {/* /admin 路径将显示概览页 */}
        <Route path="overview" element={<DashboardOverviewPage />} /> {/* /admin/overview 明确指向概览页 */}
        <Route path="cms" element={<CmsPlaygroundPage />} />
        <Route path="rss" element={<RssPlaygroundPage />} />
        <Route path="todo" element={<TodoPlaygroundPage />} />
        <Route path="settings" element={<SettingsPlaygroundPage />} />
        <Route path="*" element={<NotFoundPage />} /> 
      </Route>

      {/* 确保有一个最外层的全局 404 捕获所有未匹配的路径 */}
      {/* 如果上面的路由都没有匹配到，这个会生效 */}
      {/* 但由于上面两个主要布局都有自己的 path="*", 这个可能只有在非常规路径下才会触发 */}
      {/* 实际上，React Router会优先匹配更具体的路径，所以布局内部的 '*' 会先生效。*/}
      {/* 为了确保总有一个最终的接盘侠，保留一个最外层的也可以，或者就依赖布局内的。*/}
      {/* 考虑到我们之前App.tsx的结构，目前这样应该可以，最外层404可以后续根据需要添加。*/}
      {/* 更新：根据最佳实践，一个最外层的*路由不应依赖任何特定布局的上下文，所以如果需要，它应该独立。*/}
      {/* 但在此次修改中，我们暂时依赖布局内的NotFoundPage。*/}

    </Routes>
  );
}

export default App;
