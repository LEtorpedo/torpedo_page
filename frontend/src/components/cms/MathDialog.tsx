import React, { useState } from 'react';
import { X } from 'lucide-react';

export interface MathDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (latex: string) => void;
  isBlock?: boolean;
}

/**
 * 数学公式插入对话框
 */
const MathDialog: React.FC<MathDialogProps> = ({ isOpen, onClose, onInsert, isBlock = false }) => {
  const [latex, setLatex] = useState('');

  if (!isOpen) return null;

  const handleInsert = () => {
    if (latex.trim()) {
      onInsert(latex.trim());
      setLatex('');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInsert();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const examples = isBlock
    ? [
        { label: '积分', latex: '\\int_{a}^{b} f(x) dx = F(b) - F(a)' },
        { label: '求和', latex: '\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n' },
        { label: '矩阵', latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
      ]
    : [
        { label: '平方', latex: 'x^2' },
        { label: '分数', latex: '\\frac{a}{b}' },
        { label: '根号', latex: '\\sqrt{x}' },
        { label: '爱因斯坦公式', latex: 'E = mc^2' },
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            插入{isBlock ? '公式块' : '行内公式'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="关闭"
          >
            <X size={20} />
          </button>
        </div>

        {/* 内容区 */}
        <div className="p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">LaTeX 公式</label>
          <textarea
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入 LaTeX 公式，例如: E = mc^2"
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            autoFocus
          />

          {/* 示例 */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">常用示例：</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setLatex(example.latex)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>

          {/* 帮助信息 */}
          <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-gray-700">
            <p className="font-medium mb-1">提示：</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>使用标准 LaTeX 语法</li>
              <li>希腊字母: \alpha, \beta, \gamma</li>
              <li>分数: \frac{'{a}'}{'{b}'}</li>
              <li>上下标: x^2, x_i</li>
              <li>按 Enter 插入，Escape 取消</li>
            </ul>
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
            disabled={!latex.trim()}
            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded transition"
          >
            插入公式
          </button>
        </div>
      </div>
    </div>
  );
};

export default MathDialog;
