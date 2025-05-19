import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import ScopeSubMenu from '@/components/admin/ScopeSubMenu';

// 示例工具数据
const tools = [
  { id: 'overview', name: 'Overview', path: '/admin/overview', icon: '📊' },
  { id: 'cms', name: 'Content Manager', path: '/admin/cms', icon: '📝', scopes: ['Blog Posts', 'Projects', 'Pages'] },
  { id: 'rss', name: 'RSS Reader', path: '/admin/rss', icon: '📰' },
  { id: 'todo', name: 'To-Do List', path: '/admin/todo', icon: '✅' },
  { id: 'settings', name: 'Settings', path: '/admin/settings', icon: '⚙️' },
];

const baseLinkClasses = "px-3 py-2.5 rounded-md text-sm font-medium hover:bg-slate-700 hover:text-white transition-colors duration-150 flex items-center";
const activeLinkClasses = "bg-sky-600 text-white";
const inactiveLinkClasses = "text-slate-300 hover:text-slate-100";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedToolIdForScopes, setExpandedToolIdForScopes] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      setExpandedToolIdForScopes(null);
    }
  };

  const handleToolClick = (toolId: string, hasScopes?: boolean) => {
    if (isSidebarOpen && hasScopes) {
      setExpandedToolIdForScopes(prevId => (prevId === toolId ? null : toolId));
    } else if (!isSidebarOpen && hasScopes) {
      setIsSidebarOpen(true);
      setExpandedToolIdForScopes(toolId);
    } else {
      setExpandedToolIdForScopes(null);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      {/* 左侧导航栏 */}
      <aside 
        className={`flex-shrink-0 bg-slate-800 text-slate-100 shadow-lg flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Logo/项目名称 和 收起按钮 */}
        <div className={`flex items-center h-16 flex-shrink-0 px-4 ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {isSidebarOpen && (
            <Link to="/admin/overview" className="text-2xl font-semibold text-slate-100 hover:text-sky-400 transition-colors truncate">
              Torpedo
            </Link>
          )}
          <button 
            onClick={toggleSidebar} 
            className="p-1 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? <ChevronLeftIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
          </button>
        </div>

        {/* 工具导航链接 (可滚动) */}
        <nav className="flex-1 overflow-y-auto space-y-1 px-2 py-4">
          {tools.map((tool) => (
            <div key={tool.id}>
              <NavLink
                to={tool.path} 
                end 
                onClick={() => handleToolClick(tool.id, !!tool.scopes)}
                className={({ isActive }) => 
                  `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses} ${isSidebarOpen ? 'justify-start' : 'justify-center'}`
                }
                title={!isSidebarOpen ? tool.name : undefined}
              >
                <span className={`text-xl ${isSidebarOpen ? 'mr-3' : 'mr-0'}`}>{tool.icon}</span>
                {isSidebarOpen && <span className="truncate">{tool.name}</span>}
                {isSidebarOpen && tool.scopes && (
                    <ChevronRightIcon 
                        className={`w-4 h-4 ml-auto text-slate-400 transition-transform duration-200 ${expandedToolIdForScopes === tool.id ? 'rotate-90' : ''}`} 
                    />
                )}
              </NavLink>
              {isSidebarOpen && tool.scopes && (
                <ScopeSubMenu 
                  scopes={tool.scopes}
                  basePath={tool.path}
                  parentToolId={tool.id} 
                  isOpen={expandedToolIdForScopes === tool.id}
                />
              )}
            </div>
          ))}
        </nav>
        
        {/* 用户信息/登出 */}
        <div className="px-2 py-4 border-t border-slate-700 flex-shrink-0">
            <div className={`flex items-center p-2 rounded-md hover:bg-slate-700 cursor-pointer ${isSidebarOpen ? '' : 'justify-center'}`}>
                <UserCircleIcon className={`h-8 w-8 text-slate-400 ${isSidebarOpen ? 'mr-2' : ''}`} />
                {isSidebarOpen && (
                  <div className="truncate">
                    <span className="block text-sm font-medium text-slate-200">User Name</span>
                    <span className="block text-xs text-slate-400">user@example.com</span>
                  </div>
                )}
            </div>
            <button className={`mt-2 w-full px-3 py-2.5 rounded-md text-sm font-medium bg-slate-700/50 hover:bg-red-600 text-red-400 hover:text-white transition-colors duration-150 flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
              <ArrowRightOnRectangleIcon className={`h-5 w-5 ${isSidebarOpen ? 'mr-2' : ''}`} /> 
              {isSidebarOpen && <span>Logout</span>}
            </button>
        </div>
      </aside>

      {/* 主内容区 + 可选页脚 */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="flex-grow p-6">
          <Outlet />
        </main>
        <footer className="bg-white dark:bg-slate-800 p-4 text-center text-slate-600 dark:text-slate-400 text-sm shadow-inner flex-shrink-0">
          © {new Date().getFullYear()} Torpedo Blog - Admin Panel.
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout; 