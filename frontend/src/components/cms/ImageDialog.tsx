import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

export interface ImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, alt?: string) => void;
}

/**
 * 图片插入对话框
 */
const ImageDialog: React.FC<ImageDialogProps> = ({ isOpen, onClose, onInsert }) => {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [tab, setTab] = useState<'url' | 'upload'>('url');

  if (!isOpen) return null;

  const handleInsert = () => {
    if (url.trim()) {
      onInsert(url.trim(), alt.trim() || undefined);
      setUrl('');
      setAlt('');
      onClose();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 这里应该上传到服务器，暂时使用 Data URL 作为演示
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setUrl(dataUrl);
        setTab('url'); // 切换到 URL 标签页显示预览
      };
      reader.readAsDataURL(file);
    }
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
          <h3 className="text-lg font-semibold text-gray-900">插入图片</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="关闭"
          >
            <X size={20} />
          </button>
        </div>

        {/* 标签页 */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setTab('url')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              tab === 'url'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            图片 URL
          </button>
          <button
            onClick={() => setTab('upload')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              tab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            上传图片
          </button>
        </div>

        {/* 内容区 */}
        <div className="p-4">
          {tab === 'url' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">图片 URL</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  替代文本（可选）
                </label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="图片描述"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 预览 */}
              {url && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">预览：</p>
                  <div className="border border-gray-300 rounded-md p-2 bg-gray-50">
                    <img
                      src={url}
                      alt={alt || '图片预览'}
                      className="max-w-full max-h-48 mx-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-sm text-gray-600 mb-2">点击或拖拽图片到这里上传</p>
                <p className="text-xs text-gray-500 mb-4">支持 JPG, PNG, GIF, WebP (最大 5MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded cursor-pointer transition"
                >
                  选择文件
                </label>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                <p className="font-medium mb-1">注意：</p>
                <p className="text-xs">
                  当前图片会转换为 Data URL 嵌入文档中。对于生产环境，建议配置图片上传服务（如
                  Cloudinary、S3 等）。
                </p>
              </div>
            </div>
          )}
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
            插入图片
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageDialog;
