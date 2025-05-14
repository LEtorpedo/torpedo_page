import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // 示例图标

const FAB: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 控制按钮的显示/隐藏
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) { // 滚动超过300px时显示
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 平滑滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-teal-400 text-white rounded-full shadow-lg transition-opacity duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          aria-label="回到顶部"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default FAB; 