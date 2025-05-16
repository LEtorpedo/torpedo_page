import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // 全局样式
// import './App.css'; // 如果 App.css 是特定于 App 组件的，可以在 App.tsx 中导入，或者如果也是全局的，保留也可以

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
