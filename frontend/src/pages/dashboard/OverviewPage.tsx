import React from 'react';
import { Link } from 'react-router-dom';

// 临时的卡片样式，后续用 shadcn/ui 或自定义组件替换
const cardStyle = "bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 hover:shadow-xl dark:hover:shadow-sky-700/50 transition-shadow duration-300";
const cardTitleStyle = "text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2";
const cardTextStyle = "text-slate-600 dark:text-slate-400";

const DashboardOverviewPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-8">
        后台管理总览
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 文章管理卡片 */}
        <Link to="/dashboard/posts" className={cardStyle}> {/* 假设未来有 /dashboard/posts 路由 */}
          <h2 className={cardTitleStyle}>文章管理</h2>
          <p className={cardTextStyle}>创建、编辑、删除和发布您的博客文章。</p>
        </Link>

        {/* 分类管理卡片 - 占位 */}
        <div className={cardStyle}>
          <h2 className={cardTitleStyle}>分类管理</h2>
          <p className={cardTextStyle}>管理文章的分类信息。</p>
        </div>

        {/* 标签管理卡片 - 占位 */}
        <div className={cardStyle}>
          <h2 className={cardTitleStyle}>标签管理</h2>
          <p className={cardTextStyle}>管理文章的标签。</p>
        </div>
        
        {/* 编辑器沙盒卡片 - 方便我们快速访问 */}
        <Link to="/dev/editor-sandbox" className={cardStyle}>
          <h2 className={cardTitleStyle}>编辑器沙盒</h2>
          <p className={cardTextStyle}>测试 Tiptap 编辑器和自定义样式功能。</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardOverviewPage; 