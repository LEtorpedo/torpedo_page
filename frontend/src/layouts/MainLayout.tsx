import React, { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Dock, DockIcon } from '@/components/magicui/Dock';
import { FaArrowUp, FaGithub } from 'react-icons/fa';

interface MainLayoutProps {
  children?: ReactNode;
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      <Dock iconSize={32} iconMagnification={48} iconDistance={100} direction="middle">
        <DockIcon>
          <button onClick={scrollToTop} className="w-full h-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400" aria-label="回到顶部">
            <FaArrowUp size={20} />
          </button>
        </DockIcon>
        <DockIcon>
          <a href="https://github.com/LEtorpedo" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
        </DockIcon>
      </Dock>
    </div>
  );
};

export default MainLayout; 