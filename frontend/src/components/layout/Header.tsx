import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LuLeaf } from 'react-icons/lu'; // 从 react-icons 导入叶子图标

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Get current location
  const isHomePage = location.pathname === '/';

  // Header should appear scrolled (with background) if EITHER the page is scrolled OR it's not the homepage.
  const effectiveIsScrolled = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 
    transition-all duration-300 ease-in-out
    ${
      effectiveIsScrolled // Use effectiveIsScrolled for background
        ? 'bg-white dark:bg-slate-900 shadow-md' 
        : 'bg-transparent' // Transparent only on homepage and not scrolled
    }
  `;

  // 统一管理链接颜色，减少重复
  const linkBaseStyles = 'transition-colors duration-200 py-2 px-3 rounded-md text-sm font-medium';
  
  // Colors for links when header has a background (scrolled or not homepage)
  const solidHeaderLinkColors = 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700';
  // Colors for links when header is transparent (homepage, not scrolled)
  const transparentHeaderLinkColors = 'text-white hover:bg-white/20 dark:hover:bg-white/20'; 

  // Define active link classes using brand-primary and brand-primary-light
  const activeLinkHighlightClasses = 'text-brand-primary dark:text-brand-primary-light font-semibold';

  const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
    let dynamicColors = '';
    if (effectiveIsScrolled) {
      // 当头部有背景时
      if (isActive) {
        dynamicColors = activeLinkHighlightClasses; // 活动链接：只使用高亮样式
      } else {
        dynamicColors = solidHeaderLinkColors;    // 非活动链接：使用常规的深色链接样式
      }
    } else {
      // 当头部透明时
      dynamicColors = transparentHeaderLinkColors; // 活动与非活动链接样式相同
      // 如果希望透明头部下的活动链接也高亮，可以修改这里：
      // if (isActive) {
      //   dynamicColors = `${transparentHeaderLinkColors} ${activeLinkHighlightClasses}`; // 或者只用 activeLinkHighlightClasses 如果背景足够暗
      // } else {
      //   dynamicColors = transparentHeaderLinkColors;
      // }
    }
    return `${linkBaseStyles} ${dynamicColors}`;
  };

  const getIconLinkClassName = ({ isActive }: { isActive: boolean }) => {
    // For the icon, we might not want the font-semibold, so define its active state separately or adjust as needed.
    // Using the same text color for now.
    const activeIconHighlightClasses = 'text-brand-primary dark:text-brand-primary-light';
    return `${linkBaseStyles} ${
      effectiveIsScrolled // Use effectiveIsScrolled for icon styling
        ? `${solidHeaderLinkColors} ${isActive ? activeIconHighlightClasses : ''}`
        : transparentHeaderLinkColors
    } ml-4`;
  };

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink 
              to="/" 
              className={`text-xl font-bold ${
                effectiveIsScrolled // Use effectiveIsScrolled for logo color
                  ? 'text-brand-primary dark:text-brand-primary-light' // Logo uses primary colors when header has bg
                  : 'text-white'
              }`}
            >
              Torpedo
            </NavLink>
          </div>

          <nav className="hidden md:flex space-x-1 items-center">
            <NavLink to="/" end className={getLinkClassName}>
              首页
            </NavLink>
            <NavLink to="/about" className={getLinkClassName}>
              关于我
            </NavLink>
            <NavLink to="/projects" className={getLinkClassName}>
              项目
            </NavLink>
            <NavLink to="/blog" className={getLinkClassName}>
              博客
            </NavLink>
            <NavLink to="/academic" className={getLinkClassName}>
              学术主页
            </NavLink>
            <NavLink to="/contact" className={getLinkClassName}>
              联系我
            </NavLink>
            <NavLink 
              to="/admin-login" 
              title="后台管理" 
              className={getIconLinkClassName} // Icon uses a slightly different active state (no font-semibold by default)
            >
              <LuLeaf size={20} /> {/* 使用图标 */}
            </NavLink>
          </nav>
          
          <div className="md:hidden flex items-center"> {/* 移动端显示后台图标 */}
            <NavLink 
              to="/admin-login" 
              title="后台管理" 
              className={`${linkBaseStyles} ${
                effectiveIsScrolled 
                  ? 'text-slate-700 dark:text-slate-200' 
                  : 'text-white'
              }`}
            >
              <LuLeaf size={24} />
            </NavLink>
            {/* 移动端汉堡菜单按钮后续添加 */}
            {/* <button className="ml-3 ...">Menu</button> */}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header; 