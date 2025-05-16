import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 布局组件导入
import MainLayout from './layouts/MainLayout';

// 页面组件导入
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicPage from './pages/AcademicPage';
import AdminDashboardPage from './pages/AdminDashboardPage'; // 假设这个页面存在，如果不存在后续需要创建或移除
import AdminLoginPage from './pages/AdminLoginPage';
import BlogDetailPage from './pages/BlogDetailPage'; // 假设这个页面存在
import BlogListPage from './pages/BlogListPage';
import ContactPage from './pages/ContactPage';
import EditorSandboxPage from './pages/dev/EditorSandboxPage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <Routes>
      {/* 主应用布局，包含导航栏和页脚等 */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="academic" element={<AcademicPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="blog" element={<BlogListPage />} />
        <Route path="blog/:postId" element={<BlogDetailPage />} /> {/* 假设 BlogDetailPage 存在 */}
        <Route path="contact" element={<ContactPage />} />
        
        {/* 后台管理相关路由 - 也暂时放在 MainLayout 下，未来可以有专门的 AdminLayout */}
        {/* 注意：main.tsx 中没有 AdminDashboardPage 的路由，这里我先加上，如果不需要可以移除 */}
        <Route path="admin/dashboard" element={<AdminDashboardPage />} /> 
        <Route path="admin/login" element={<AdminLoginPage />} /> {/* main.tsx 中是 admin-login, 这里统一为 admin/login */}

        {/* 开发测试页面 */}
        <Route path="dev/editor-sandbox" element={<EditorSandboxPage />} />
        
        {/* 404 页面 - 这个应该放在 MainLayout 内部的最后，以捕获 MainLayout 下未匹配的路径 */}
        {/* 或者，如果希望 404 页面不带 MainLayout，则将其移到 MainLayout 的 Route 之外 */} 
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* 如果有完全不使用 MainLayout 的顶层页面，可以放在这里 */}
      {/* 例如，一个独立的登录页，如果 AdminLoginPage 不需要 MainLayout 的话 */}
      {/* <Route path="/admin/login" element={<AdminLoginPage />} /> */}
      
      {/* 全局 404，如果上面的 NotFoundPage 是针对 MainLayout 内部的 */}
      {/* 通常一个顶层的 path="*" 就够了，但要考虑它与布局的关系 */}
      {/* 为了保持和 main.tsx 的行为一致 (NotFoundPage 在 MainLayout 内)，上面的已足够 */}
    </Routes>
  );
}

export default App;
