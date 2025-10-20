import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Code,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  Undo,
  Redo,
  FileCode,
  Superscript,
} from 'lucide-react';
import MathDialog from './MathDialog';
import LinkDialog from './LinkDialog';
import ImageDialog from './ImageDialog';

export interface EditorToolbarProps {
  editor: Editor | null;
}

/**
 * 编辑器工具栏组件
 *
 * 提供所有编辑功能的快捷按钮
 */
const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  const [mathDialogOpen, setMathDialogOpen] = useState(false);
  const [mathDialogIsBlock, setMathDialogIsBlock] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  if (!editor) {
    return null;
  }

  const ToolbarButton: React.FC<{
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }> = ({ onClick, active = false, disabled = false, children, title }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded transition-colors
        ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  );

  const Divider = () => <div className="w-px h-8 bg-gray-300 mx-2" />;

  const handleInsertLink = (url: string, text?: string) => {
    if (text) {
      editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleInsertImage = (url: string, alt?: string) => {
    editor.chain().focus().setImage({ src: url, alt }).run();
  };

  const handleInsertMath = (latex: string) => {
    if (mathDialogIsBlock) {
      editor.chain().focus().insertBlockMath({ latex }).run();
    } else {
      editor.chain().focus().insertInlineMath({ latex }).run();
    }
  };

  return (
    <div className="editor-toolbar sticky top-0 z-10 bg-white border-b border-gray-200 p-2 flex flex-wrap gap-2 items-center">
      {/* 撤销/重做 */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="撤销 (Ctrl+Z)"
      >
        <Undo size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="重做 (Ctrl+Shift+Z)"
      >
        <Redo size={18} />
      </ToolbarButton>

      <Divider />

      {/* 标题 */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive('heading', { level: 1 })}
        title="一级标题"
      >
        <Heading1 size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
        title="二级标题"
      >
        <Heading2 size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
        title="三级标题"
      >
        <Heading3 size={18} />
      </ToolbarButton>

      <Divider />

      {/* 文本样式 */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="粗体 (Ctrl+B)"
      >
        <Bold size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="斜体 (Ctrl+I)"
      >
        <Italic size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
        title="下划线 (Ctrl+U)"
      >
        <UnderlineIcon size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
        title="删除线"
      >
        <Strikethrough size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
        title="行内代码"
      >
        <Code size={18} />
      </ToolbarButton>

      <Divider />

      {/* 列表 */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="无序列表"
      >
        <List size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="有序列表"
      >
        <ListOrdered size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        title="引用块"
      >
        <Quote size={18} />
      </ToolbarButton>

      <Divider />

      {/* 代码块 */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive('codeBlock')}
        title="代码块"
      >
        <FileCode size={18} />
      </ToolbarButton>

      {/* 数学公式 */}
      <ToolbarButton
        onClick={() => {
          setMathDialogIsBlock(false);
          setMathDialogOpen(true);
        }}
        title="行内公式 ($...$)"
      >
        <Superscript size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          setMathDialogIsBlock(true);
          setMathDialogOpen(true);
        }}
        title="公式块 ($$...$$)"
      >
        <span className="font-bold text-sm">∑</span>
      </ToolbarButton>

      <Divider />

      {/* 插入元素 */}
      <ToolbarButton
        onClick={() => setLinkDialogOpen(true)}
        active={editor.isActive('link')}
        title="插入链接"
      >
        <LinkIcon size={18} />
      </ToolbarButton>
      <ToolbarButton onClick={() => setImageDialogOpen(true)} title="插入图片">
        <ImageIcon size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        title="插入表格"
      >
        <TableIcon size={18} />
      </ToolbarButton>

      <Divider />

      {/* 分隔线 */}
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="分隔线">
        <Minus size={18} />
      </ToolbarButton>

      {/* 对话框 */}
      <MathDialog
        isOpen={mathDialogOpen}
        onClose={() => setMathDialogOpen(false)}
        onInsert={handleInsertMath}
        isBlock={mathDialogIsBlock}
      />
      <LinkDialog
        isOpen={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        onInsert={handleInsertLink}
      />
      <ImageDialog
        isOpen={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        onInsert={handleInsertImage}
      />
    </div>
  );
};

export default EditorToolbar;
