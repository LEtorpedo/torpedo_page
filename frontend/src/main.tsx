import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage'; // 您已经有了这个
// import App from './App'; // App.tsx 的角色被 HomePage 和路由取代
import './index.css';

// Placeholder page components
const BlogListPage = () => (
  <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Blog List Page</h2>
    <p>TODO: Implement blog list</p>
    <Link to="/" className="text-blue-500 hover:underline">Go to Home</Link>
  </div>
);

const AboutPage = () => (
  <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">About Me</h2>
    <p>TODO: Implement about me page content. This page will describe you.</p>
    <Link to="/" className="text-blue-500 hover:underline">Go to Home</Link>
  </div>
);

const ProjectsPage = () => (
  <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">My Projects</h2>
    <p>TODO: Implement projects page content. This page will showcase your projects.</p>
    <Link to="/" className="text-blue-500 hover:underline">Go to Home</Link>
  </div>
);

const AcademicPage = () => (
  <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Academic Page</h2>
    <p>TODO: Implement academic page content</p>
    <Link to="/" className="text-blue-500 hover:underline">Go to Home</Link>
  </div>
);

const ContactPage = () => (
  <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Contact Page</h2>
    <p>TODO: Implement contact page content</p>
    <Link to="/" className="text-blue-500 hover:underline">Go to Home</Link>
  </div>
);

const AdminLoginPage = () => (
  <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Admin Login Page</h2>
    <p>TODO: Implement admin login page content</p>
    <Link to="/" className="text-blue-500 hover:underline">Go to Home</Link>
  </div>
);

const NotFoundPage = () => (
  <div className="container mx-auto p-4 text-center">
    <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
    <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="text-blue-600 hover:underline font-semibold">Go back to Home</Link>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="blog" element={<BlogListPage />} />
          <Route path="academic" element={<AcademicPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="admin-login" element={<AdminLoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
