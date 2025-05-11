import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage'; // 您已经有了这个
// import App from './App'; // App.tsx 的角色被 HomePage 和路由取代
import './index.css';

// 临时的占位符页面组件
// 您可以稍后替换为实际的页面组件
const BlogListPage = () => (
  <div>
    <h2>Blog List Page</h2>
    <p>TODO: Implement blog list</p>
    <p><a href="/">Go to Home</a></p> {/* Added a link for navigation testing */}
  </div>
);

const AcademicPage = () => (
  <div>
    <h2>Academic Page</h2>
    <p>TODO: Implement academic page content</p>
    <p><a href="/">Go to Home</a></p> {/* Added a link for navigation testing */}
  </div>
);

const NotFoundPage = () => (
  <div>
    <h2>404 - Page Not Found</h2>
    <p>Sorry, the page you are looking for does not exist.</p>
    <p><a href="/">Go to Home</a></p> {/* Added a link for navigation testing */}
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/academic" element={<AcademicPage />} />
          {/* 
            您可以添加更多路由，例如博客详情页:
            <Route path="/blog/:slug" element={<BlogDetailPage />} /> 
          */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  </React.StrictMode>,
);
