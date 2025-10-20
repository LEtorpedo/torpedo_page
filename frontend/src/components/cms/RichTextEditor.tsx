import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { Typography } from '@tiptap/extension-typography';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Mathematics } from '@tiptap/extension-mathematics';
import { common, createLowlight } from 'lowlight';
import 'katex/dist/katex.min.css';

import { Sidenote } from '@/components/tiptap-extensions/Sidenote';
import { StyledTextMark } from '@/components/tiptap-extensions/StyledTextMark';

// 初始化 lowlight（代码高亮）
const lowlight = createLowlight(common);

export interface RichTextEditorProps {
  content?: string;
  onChange?: (json: object, html: string) => void;
  placeholder?: string;
  editable?: boolean;
}

/**
 * 富文本编辑器组件
 *
 * 功能特性：
 * - 数学公式（行内和块级，使用 KaTeX）
 * - 代码块（语法高亮）
 * - 侧边注释（sidenotes）
 * - 表格、图片、链接
 * - 文本样式（粗体、斜体、下划线、颜色、高亮）
 * - 列表（有序、无序）
 * - 标题（H1-H6）
 */
const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content = '',
  onChange,
  placeholder = '开始写作...',
  editable = true,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // 使用 CodeBlockLowlight 代替
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full',
        },
      }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto',
        },
      }),
      Typography,
      Placeholder.configure({
        placeholder,
      }),
      Mathematics.configure({
        HTMLAttributes: {
          class: 'math-inline',
        },
        katexOptions: {
          throwOnError: false,
        },
      }),
      Sidenote,
      StyledTextMark,
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      if (onChange) {
        const json = editor.getJSON();
        const html = editor.getHTML();
        onChange(json, html);
      }
    },
  });

  // 当外部 content 改变时更新编辑器
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rich-text-editor">
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  );
};

export default RichTextEditor;
