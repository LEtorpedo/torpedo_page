import React, { useState } from 'react';
import { X } from 'lucide-react';

export interface LinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, text?: string) => void;
  initialText?: string;
}

/**
 * 链接插入对话框
 */
const LinkDialog: React.FC<LinkDialogProps> = ({ isOpen, onClose, onInsert, initialText = '' }) => {
  const [url, setUrl] = useState('');
  const [text, setText] = useState(initialText);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  /**
   * 验证 URL 是否有效且安全
   * 只允许 http, https, mailto 协议
   */
  const validateUrl = (urlString: string): boolean => {
    try {
      const parsed = new URL(urlString);
      return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  const handleInsert = () => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError('请输入 URL');
      return;
    }

    if (!validateUrl(trimmedUrl)) {
      setError('无效的 URL（仅支持 HTTP/HTTPS/mailto 协议）');
      return;
    }

    onInsert(trimmedUrl, text.trim() || undefined);
    setUrl('');
    setText('');
    setError('');
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInsert();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">插入链接</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="关闭"
          >
            <X size={20} />
          </button>
        </div>

        {/* 内容区 */}
        <div className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">链接 URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError(''); // 清除错误提示
              }}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <p className="mt-1 text-xs text-gray-500">
              支持 HTTP、HTTPS 和 mailto 协议
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              链接文本（可选）
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="留空则使用选中的文本"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 按钮栏 */}
        <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition"
          >
            取消
          </button>
          <button
            onClick={handleInsert}
            disabled={!url.trim()}
            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded transition"
          >
            插入链接
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkDialog;
