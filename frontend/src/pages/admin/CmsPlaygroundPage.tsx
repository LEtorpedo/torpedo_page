import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Typography } from '@tiptap/extension-typography';
import type { ProseMirrorNode } from '@/components/cms/ContentRenderer';
import {
  BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon,
  ListIcon, ListOrderedIcon, PilcrowIcon, Heading1Icon, Heading2Icon, Heading3Icon,
  QuoteIcon, MinusIcon, CodeIcon as CodeBlockIcon,
  FileTextIcon, TerminalIcon, EyeIcon,
  HighlighterIcon, Type, TableIcon, ImageIcon, LinkIcon, Columns3Icon
} from 'lucide-react';

// --- 样式定义 (可以考虑提取到单独的 CSS 文件或使用 Tailwind JIT/variants) ---
const editorAndSourceViewContainerStyle: React.CSSProperties = {
  border: '1px solid #e5e7eb', // slate-200
  borderRadius: '0.375rem', 
  backgroundColor: 'white', // Base background
  overflowY: 'auto', // This container will handle the scrolling
};

const toolbarButtonStyleClasses = "p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-slate-200 dark:focus:bg-slate-700 text-slate-700 dark:text-slate-300";
const toolbarActiveButtonStyleClasses = "bg-sky-100 dark:bg-sky-700 text-sky-600 dark:text-sky-300";

// Prose classes are now applied directly to editorProps.attributes

const jsonDebugStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  padding: '1rem',
  border: 'none', // Border is on the container
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  backgroundColor: '#f3f4f6', // Different background for JSON view for clarity
  borderRadius: '0',
  fontSize: '0.875rem',
  fontFamily: 'monospace',
  color: '#1f2937',
};

const titleInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  marginBottom: '1rem', // Reduced margin as toolbar is above
  fontSize: '1.5rem', 
  fontWeight: '600',
};

// --- End 样式定义 ---

// --- Toolbar Button Component (Optional, for reusability) ---
interface ToolbarButtonProps {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}
const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, isActive, title, children, disabled }) => (
  <button
    type="button"
    onClick={(e) => onClick(e)}
    title={title}
    disabled={disabled}
    className={`${toolbarButtonStyleClasses} ${isActive ? toolbarActiveButtonStyleClasses : ''}`}
  >
    {children}
  </button>
);

// --- End 样式定义 & Toolbar Button ---

// 预设颜色配置
const TEXT_COLORS = [
  { name: '默认', value: '#000000' },
  { name: '深蓝', value: '#1e40af' },
  { name: '绿色', value: '#059669' },
  { name: '紫色', value: '#7c3aed' },
  { name: '红色', value: '#dc2626' },
  { name: '橙色', value: '#ea580c' },
];

const HIGHLIGHT_COLORS = [
  { name: '无背景', value: 'transparent', border: 'transparent' },
  { name: '黄色', value: '#fef3c7', border: '#f59e0b' },
  { name: '蓝色', value: '#dbeafe', border: '#3b82f6' },
  { name: '绿色', value: '#d1fae5', border: '#10b981' },
  { name: '紫色', value: '#e9d5ff', border: '#8b5cf6' },
  { name: '粉色', value: '#fce7f3', border: '#ec4899' },
];

const CmsPlaygroundPage: React.FC = () => {
  const [title, setTitle] = useState<string>('TipTap v3 增强编辑器');
  const [viewMode, setViewMode] = useState<'wysiwyg' | 'json'>('wysiwyg');
  const [editorJson, setEditorJson] = useState<ProseMirrorNode | null>(null);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      TextStyle, // Required for Color extension
      Underline, // 下划线扩展
      Color.configure({
        types: ['textStyle'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'tiptap-table',
        },
      }),
      TableRow,
      TableCell,
      TableHeader,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'tiptap-image',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'tiptap-link',
        },
      }),
      Placeholder.configure({
        placeholder: '开始书写你的文章...',
      }),
      Typography,
    ],
    editorProps: {
      attributes: {
        // Apply prose classes to make headers and typography visible in WYSIWYG mode
        class: 'prose dark:prose-invert max-w-none focus:outline-none p-4',
      },
    },
    content: `<h1>🎨 TipTap v3 增强编辑器</h1><h2>📝 新功能展示</h2><p>这是一个包含 <strong>粗体</strong>、<em>斜体</em>、<u>下划线</u> 和 <s>删除线</s> 的段落。</p><h3>✨ 全新功能</h3><p><strong>基础样式工具</strong>：</p><ul><li><strong>粗体</strong> (Bold)</li><li><em>斜体</em> (Italic)</li><li><u>下划线</u> (Underline)</li><li><s>删除线</s> (Strike)</li></ul><p><strong>高级功能</strong>：</p><ul><li>📊 <strong>表格支持</strong> - 插入和编辑表格</li><li>🖼️ <strong>图片上传</strong> - 拖拽或粘贴图片</li><li>🔗 <strong>链接管理</strong> - 添加和编辑超链接</li><li>🎨 <strong>颜色工具</strong> - 文字颜色和背景高亮</li></ul><blockquote><p>💡 <strong>提示</strong>：尝试插入表格、上传图片，体验全新的编辑功能！</p></blockquote><pre><code class="language-javascript">// TipTap v3 示例代码
console.log("欢迎使用增强编辑器！");
function demo() {
  return "所见即所得";
}</code></pre><hr><p><strong>开始创作吧！</strong> 🚀</p>`,
    onUpdate: ({ editor: currentEditor }) => {
      setEditorJson(currentEditor.getJSON() as ProseMirrorNode);
    },
  });

  useEffect(() => {
    if (editor?.isEditable) {
      setEditorJson(editor.getJSON() as ProseMirrorNode);
    }
  }, [editor]);

  // Close color pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowTextColorPicker(false);
      setShowHighlightPicker(false);
    };
    
    if (showTextColorPicker || showHighlightPicker) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showTextColorPicker, showHighlightPicker]);

  const handleViewChange = (newMode: 'wysiwyg' | 'json') => {
    if (!editor || editor.isDestroyed) return;
    setViewMode(newMode);
  };

  // Color and style functions
  const setTextColor = (color: string) => {
    if (!editor) return;
    if (color === '#000000') {
      editor.chain().focus().unsetColor().run();
    } else {
      editor.chain().focus().setColor(color).run();
    }
    setShowTextColorPicker(false);
  };

  const setHighlightColor = (bgColor: string) => {
    if (!editor) return;
    if (bgColor === 'transparent') {
      editor.chain().focus().unsetHighlight().run();
    } else {
      // 使用更柔和的高亮颜色
      editor.chain().focus().setHighlight({ color: bgColor }).run();
    }
    setShowHighlightPicker(false);
  };

  // Table functions
  const insertTable = () => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  // Image functions
  const addImage = () => {
    const url = window.prompt('输入图片 URL:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Link functions
  const setLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('输入链接 URL:', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleSave = () => {
    // TODO: 实现实际的保存功能，调用后端 API
    // const payload = {
    //   title,
    //   content_json: editorJson,
    //   content_html: editor?.getHTML(),
    // };
    // await savePost(payload);
    alert('内容已保存（模拟）！');
  };

  if (!editor) {
    return <p className="p-8 text-center">Loading editor...</p>; 
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-850 rounded-lg shadow-sm">
      <div className="flex-shrink-0">
        <input 
          type="text" 
          id="articleTitleInput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your article title here..."
          style={titleInputStyle}
          className="dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-1 border-b border-t border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 rounded-t-md mb-0 flex-shrink-0">
        <ToolbarButton title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} disabled={!editor.can().toggleBold() || viewMode !== 'wysiwyg'}>
          <BoldIcon size={18} />
        </ToolbarButton>
        <ToolbarButton title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} disabled={!editor.can().toggleItalic() || viewMode !== 'wysiwyg'}>
          <ItalicIcon size={18} />
        </ToolbarButton>
        <ToolbarButton title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} disabled={!editor.can().toggleUnderline() || viewMode !== 'wysiwyg'}>
          <UnderlineIcon size={18} />
        </ToolbarButton>
        <ToolbarButton title="Strike Through" onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} disabled={!editor.can().toggleStrike() || viewMode !== 'wysiwyg'}>
          <StrikethroughIcon size={18} />
        </ToolbarButton>
        
        <div className="h-5 w-px bg-slate-300 dark:bg-slate-600 mx-1"></div> {/* Separator */}

        <ToolbarButton title="Paragraph" onClick={() => editor.chain().focus().setParagraph().run()} isActive={editor.isActive('paragraph')} disabled={!editor.can().setParagraph() || viewMode !== 'wysiwyg'}>
          <PilcrowIcon size={18}/>
        </ToolbarButton>
        <ToolbarButton title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} disabled={!editor.can().toggleHeading({level: 1}) || viewMode !== 'wysiwyg'}>
          <Heading1Icon size={18} />
        </ToolbarButton>
        <ToolbarButton title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} disabled={!editor.can().toggleHeading({level: 2}) || viewMode !== 'wysiwyg'}>
          <Heading2Icon size={18} />
        </ToolbarButton>
        <ToolbarButton title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} disabled={!editor.can().toggleHeading({level: 3}) || viewMode !== 'wysiwyg'}>
          <Heading3Icon size={18} />
        </ToolbarButton>

        <div className="h-5 w-px bg-slate-300 dark:bg-slate-600 mx-1"></div> {/* Separator */}

        <ToolbarButton title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} disabled={!editor.can().toggleBulletList() || viewMode !== 'wysiwyg'}>
          <ListIcon size={18} />
        </ToolbarButton>
        <ToolbarButton title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} disabled={!editor.can().toggleOrderedList() || viewMode !== 'wysiwyg'}>
          <ListOrderedIcon size={18} />
        </ToolbarButton>
        <ToolbarButton title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} disabled={!editor.can().toggleBlockquote() || viewMode !== 'wysiwyg'}>
          <QuoteIcon size={18} />
        </ToolbarButton>
        <ToolbarButton title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()} disabled={!editor.can().setHorizontalRule() || viewMode !== 'wysiwyg'}>
          <MinusIcon size={18} />
        </ToolbarButton>
        
        <div className="h-5 w-px bg-slate-300 dark:bg-slate-600 mx-1"></div> {/* Separator */}

        <ToolbarButton title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} disabled={!editor.can().toggleCodeBlock() || viewMode !== 'wysiwyg'}>
          <CodeBlockIcon size={18} />
        </ToolbarButton>

        <div className="h-5 w-px bg-slate-300 dark:bg-slate-600 mx-1"></div> {/* Separator */}

        {/* Table, Image, Link tools */}
        <ToolbarButton title="Insert Table" onClick={insertTable} disabled={viewMode !== 'wysiwyg'}>
          <TableIcon size={18} />
        </ToolbarButton>
        <ToolbarButton title="Insert Image" onClick={addImage} disabled={viewMode !== 'wysiwyg'}>
          <ImageIcon size={18} />
        </ToolbarButton>
        <ToolbarButton title="Insert/Edit Link" onClick={setLink} isActive={editor.isActive('link')} disabled={viewMode !== 'wysiwyg'}>
          <LinkIcon size={18} />
        </ToolbarButton>

        <div className="h-5 w-px bg-slate-300 dark:bg-slate-600 mx-1"></div> {/* Separator */}
        
        {/* Color Tools */}
        <div className="relative">
          <ToolbarButton 
            title="Text Color" 
            onClick={(e) => {
              e?.stopPropagation();
              setShowTextColorPicker(!showTextColorPicker);
              setShowHighlightPicker(false); // 关闭另一个调色板
            }} 
            isActive={showTextColorPicker}
            disabled={viewMode !== 'wysiwyg'}
          >
            <Type size={18} />
          </ToolbarButton>
          {showTextColorPicker && (
            <div 
              className="absolute top-full left-0 mt-1 p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-xl z-50 min-w-[120px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-medium">文字颜色</div>
              <div className="grid grid-cols-3 gap-1">
                {TEXT_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setTextColor(color.value)}
                    className="w-8 h-8 rounded border-2 border-slate-300 hover:border-slate-500 dark:border-slate-600 dark:hover:border-slate-400 flex items-center justify-center text-xs transition-all duration-150"
                    style={{ 
                      backgroundColor: color.value === '#000000' ? 'transparent' : color.value, 
                      color: color.value === '#000000' ? '#374151' : color.value 
                    }}
                    title={color.name}
                  >
                    {color.name === '默认' ? 'A' : ''}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <ToolbarButton 
            title="Highlight Color" 
            onClick={(e) => {
              e?.stopPropagation();
              setShowHighlightPicker(!showHighlightPicker);
              setShowTextColorPicker(false); // 关闭另一个调色板
            }} 
            isActive={showHighlightPicker}
            disabled={viewMode !== 'wysiwyg'}
          >
            <HighlighterIcon size={18} />
          </ToolbarButton>
          {showHighlightPicker && (
            <div 
              className="absolute top-full left-0 mt-1 p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-xl z-50 min-w-[120px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-medium">背景高亮</div>
              <div className="grid grid-cols-3 gap-1">
                {HIGHLIGHT_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setHighlightColor(color.value)}
                    className="w-8 h-8 rounded border-2 border-slate-300 hover:border-slate-500 dark:border-slate-600 dark:hover:border-slate-400 flex items-center justify-center text-xs transition-all duration-150"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {color.name === '无背景' ? '×' : ''}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-grow"></div> {/* Spacer */}

        <div className="flex gap-1 p-0.5 bg-slate-200 dark:bg-slate-700 rounded-md">
          <ToolbarButton title="WYSIWYG Editor" onClick={() => handleViewChange('wysiwyg')} isActive={viewMode === 'wysiwyg'}>
            <FileTextIcon size={18}/>
          </ToolbarButton>
          <ToolbarButton title="View JSON (Dev)" onClick={() => handleViewChange('json')} isActive={viewMode === 'json'}>
            <EyeIcon size={18}/>
          </ToolbarButton>
        </div>
      </div>

      <div
        style={editorAndSourceViewContainerStyle}
        className="flex-grow dark:bg-slate-700/30 dark:border-slate-700 rounded-b-md shadow-inner"
      >
        {viewMode === 'wysiwyg' && <EditorContent editor={editor} className="h-full" />}
        {viewMode === 'json' && (
          <pre style={jsonDebugStyle} className="dark:bg-slate-900 dark:text-slate-300 h-full overflow-auto"><code>{editorJson ? JSON.stringify(editorJson, null, 2) : 'Loading JSON...'}</code></pre>
        )}
      </div>

      <div className="mt-4 text-right flex-shrink-0">
        <button 
          onClick={handleSave}
          className="px-4 py-2 rounded-md text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors duration-150"
        >
          Save Article
        </button>
      </div>
    </div>
  );
};

export default CmsPlaygroundPage; 