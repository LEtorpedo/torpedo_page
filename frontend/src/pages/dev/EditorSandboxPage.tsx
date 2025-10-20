import React, { useState } from 'react';
import BlogPostEditor from '@/components/cms/BlogPostEditor';

const EditorSandboxPage: React.FC = () => {
  const [savedContent, setSavedContent] = useState<{
    json: object;
    html: string;
  } | null>(null);

  const handleSave = (json: object, html: string) => {
    setSavedContent({ json, html });
    console.log('保存的内容:', { json, html });
    alert('内容已保存！查看控制台获取详细信息。');
  };

  const initialContent = `
    <h1>欢迎使用博客编辑器</h1>
    <p>这是一个功能完整的<strong>所见即所得</strong>富文本编辑器。</p>

    <h2>快捷键支持</h2>
    <p>支持 Markdown 快捷键：</p>
    <ul>
      <li>输入 <code>#</code> 然后空格创建标题（# 到 ###### 对应 H1-H6）</li>
      <li>输入 <code>-</code> 或 <code>*</code> 然后空格创建列表</li>
      <li>输入 <code>1.</code> 然后空格创建有序列表</li>
      <li><strong>Ctrl+B</strong> 加粗，<strong>Ctrl+I</strong> 斜体，<strong>Ctrl+U</strong> 下划线</li>
    </ul>

    <h2>功能展示</h2>
    <h3>数学公式</h3>
    <p>点击工具栏的公式按钮插入数学公式。编辑器支持：</p>
    <ul>
      <li>行内公式</li>
      <li>块级公式</li>
    </ul>

    <h3>代码高亮</h3>
    <p>点击代码块按钮插入代码：</p>
    <pre><code>function hello() {
  console.log("Hello World!");
}</code></pre>

    <h3>表格</h3>
    <p>点击表格按钮插入表格。</p>

    <h3>图片和链接</h3>
    <p>使用工具栏按钮插入<a href="https://example.com">链接</a>和图片。</p>

    <p><em>开始你的创作吧！</em></p>
  `;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-semibold text-gray-900">编辑器沙盒</h1>
        <p className="text-sm text-gray-600 mt-1">测试与开发环境</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <BlogPostEditor initialContent={initialContent} onSave={handleSave} />
      </div>

      {savedContent && (
        <div className="border-t border-gray-300 p-4 bg-gray-50 max-h-64 overflow-auto">
          <h3 className="font-bold text-lg mb-2">最近保存的内容：</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-1">JSON 格式：</h4>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                {JSON.stringify(savedContent.json, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-1">HTML 格式：</h4>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                {savedContent.html}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorSandboxPage;
