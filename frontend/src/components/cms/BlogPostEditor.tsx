import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Underline } from '@tiptap/extension-underline';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { Typography } from '@tiptap/extension-typography';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Mathematics } from '@tiptap/extension-mathematics';
import { CharacterCount } from '@tiptap/extension-character-count';
import { common, createLowlight } from 'lowlight';
import 'katex/dist/katex.min.css';

import { StyledTextMark } from '@/components/tiptap-extensions/StyledTextMark';
import EditorToolbar from './EditorToolbar';

const lowlight = createLowlight(common);

export interface BlogPostEditorProps {
  initialContent?: string;
  onSave?: (json: object, html: string) => void;
  placeholder?: string;
}

/**
 * 完整的博客文章编辑器
 *
 * 包含：
 * - 编辑器工具栏
 * - 富文本编辑区域
 * - 实时预览（可选）
 * - 保存功能
 */
const BlogPostEditor: React.FC<BlogPostEditorProps> = ({
  initialContent = '',
  onSave,
  placeholder = '开始写作你的文章...',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // 使用 CodeBlockLowlight 代替
        link: {
          // StarterKit 自带 Link，在这里配置
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-blue-600 underline hover:text-blue-800',
          },
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Underline, // StarterKit 不包含 Underline，所以这个是需要的
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      Table.configure({
        resizable: false, // 禁用 resize 功能避免 mouseX prop 警告
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full my-4',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border-b border-gray-300',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 px-4 py-2',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 px-4 py-2 bg-gray-100 font-bold',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'plaintext',
      }),
      Typography, // 提供 Markdown 快捷键支持（如 # 转标题）
      Placeholder.configure({
        placeholder,
      }),
      Mathematics.configure({
        katexOptions: {
          throwOnError: false,
          displayMode: false,
        },
      }),
      StyledTextMark,
      CharacterCount,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none focus:outline-none min-h-[500px] p-6 bg-white rounded-lg',
      },
    },
  });

  const handleSave = () => {
    if (editor && onSave) {
      const json = editor.getJSON();
      const html = editor.getHTML();
      onSave(json, html);
    }
  };

  if (!editor) {
    return <div className="p-8 text-center text-gray-500">编辑器加载中...</div>;
  }

  return (
    <div className="blog-post-editor h-full flex flex-col bg-gray-50">
      {/* 顶部操作栏 */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">文章编辑器</h2>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            保存文章
          </button>
        </div>
      </div>

      {/* 工具栏 */}
      <EditorToolbar editor={editor} />

      {/* 编辑器主体 */}
      <div className="flex-1 overflow-auto p-4">
        <EditorContent editor={editor} className="h-full" />
      </div>

      {/* 底部状态栏 */}
      <div className="bg-white border-t border-gray-200 p-2 text-sm text-gray-600 flex justify-between">
        <div>
          字符数: {editor.storage.characterCount?.characters() || 0} | 单词数:{' '}
          {editor.storage.characterCount?.words() || 0}
        </div>
        <div className="text-xs text-gray-500">
          提示：使用快捷键 Ctrl+B (粗体), Ctrl+I (斜体), Ctrl+U (下划线)
        </div>
      </div>
    </div>
  );
};

export default BlogPostEditor;
