import React from 'react';
// 假设我们之后会使用 react-icons，先导入一些占位图标类型，你可以替换成实际的图标
import { FaGithub, FaLinkedin } from 'react-icons/fa'; 

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const asciiArtLogo = `
████████╗ ██████╗ ██████╗ ██████╗ ███████╗██████╗  ██████╗ 
╚══██╔══╝██╔═══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔═══██╗
   ██║   ██║   ██║██████╔╝██████╔╝█████╗  ██║  ██║██║   ██║
   ██║   ██║   ██║██╔══██╗██╔═══╝ ██╔══╝  ██║  ██║██║   ██║
   ██║   ╚██████╔╝██║  ██║██║     ███████╗██████╔╝╚██████╔╝
   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚══════╝╚═════╝  ╚═════╝ 
`; // 注意：这里的反引号和换行是为了在JS字符串中保留格式，实际渲染靠<pre>

  return (
    <footer className="bg-slate-100 dark:bg-gray-950 border-t border-slate-200 dark:border-slate-800 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-sm">
          {/* 左侧：ASCII Art Logo */}
          <div className="text-center md:text-left mb-6 md:mb-0 md:pr-8">
            <pre
              className="text-xs leading-tight font-mono text-brand-primary dark:text-brand-primary-light select-none"
              aria-label="Torpedo ASCII Art Logo"
            >
              {asciiArtLogo.trim()}
            </pre>
          </div>

          {/* 右侧：社交链接、技术栈和版权信息 */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div className="flex space-x-4 mb-4">
              <a
                href="YOUR_GITHUB_LINK_HERE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-slate-500 hover:text-brand-primary dark:text-slate-400 dark:hover:text-brand-primary-light transition-colors"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="YOUR_LINKEDIN_LINK_HERE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-500 hover:text-brand-primary dark:text-slate-400 dark:hover:text-brand-primary-light transition-colors"
              >
                <FaLinkedin size={22} />
              </a>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">
              Built with React, FastAPI & Tailwind CSS
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              &copy; {currentYear} Torpedo. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;