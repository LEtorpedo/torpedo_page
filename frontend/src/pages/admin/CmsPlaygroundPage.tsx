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
import { CustomOrderedList } from '@/components/tiptap-extensions/CustomOrderedList';
import type { ProseMirrorNode } from '@/components/cms/ContentRenderer';
import {
  BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon,
  ListIcon, ListOrderedIcon, PilcrowIcon, Heading1Icon, Heading2Icon, Heading3Icon,
  QuoteIcon, MinusIcon, CodeIcon as CodeBlockIcon,
  HighlighterIcon, Type, TableIcon, ImageIcon, LinkIcon,
  Undo, Redo, Save, ChevronDown, ChevronUp
} from 'lucide-react';

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

// 工具栏按钮组件
interface ToolbarButtonProps {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(({ 
  onClick, 
  isActive, 
  title, 
  children, 
  disabled 
}, ref) => (
  <button
    ref={ref}
    type="button"
    onClick={(e) => onClick(e)}
    title={title}
    disabled={disabled}
    className={`
      w-8 h-8 rounded-md transition-colors duration-150 flex items-center justify-center
      ${isActive 
        ? 'bg-sky-600 text-white' 
        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800
    `}
  >
    {children}
  </button>
));
ToolbarButton.displayName = 'ToolbarButton';

// 工具栏分组组件（支持折叠）
interface ToolbarGroupProps {
  title?: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

const ToolbarGroup: React.FC<ToolbarGroupProps> = ({ title, children, defaultCollapsed = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  
  return (
    <div className="mb-3 last:mb-0">
      {title && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 py-1 hover:text-slate-300 transition-colors"
        >
          <span>{title}</span>
          {isCollapsed ? (
            <ChevronDown size={14} className="text-slate-500" />
          ) : (
            <ChevronUp size={14} className="text-slate-500" />
          )}
        </button>
      )}
      {!isCollapsed && (
        <div className="space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const CmsPlaygroundPage: React.FC = () => {
  const [title, setTitle] = useState<string>('TipTap v3 增强编辑器');
  const [editorJson, setEditorJson] = useState<ProseMirrorNode | null>(null);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showJsonDebug, setShowJsonDebug] = useState(false);
  const [showOrderedListMenu, setShowOrderedListMenu] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [tableWithHeader, setTableWithHeader] = useState(true);
  
  // 面板位置 refs
  const textColorButtonRef = React.useRef<HTMLButtonElement>(null);
  const highlightButtonRef = React.useRef<HTMLButtonElement>(null);
  const orderedListButtonRef = React.useRef<HTMLButtonElement>(null);
  const tableButtonRef = React.useRef<HTMLButtonElement>(null);
  
  // 面板位置状态
  const [textColorPickerPosition, setTextColorPickerPosition] = React.useState<{ top: number; right: number } | null>(null);
  const [highlightPickerPosition, setHighlightPickerPosition] = React.useState<{ top: number; right: number } | null>(null);
  const [orderedListMenuPosition, setOrderedListMenuPosition] = React.useState<{ top: number; right: number } | null>(null);
  const [tableMenuPosition, setTableMenuPosition] = React.useState<{ top: number; right: number } | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        orderedList: false, // 禁用默认的 orderedList，使用自定义版本
      }),
      TextStyle,
      Underline,
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
      CustomOrderedList.configure({
        HTMLAttributes: {
          class: 'tiptap-ordered-list',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-4xl mx-auto focus:outline-none px-6 py-8 overflow-visible',
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

  // 计算面板位置
  const updatePanelPosition = (buttonRef: React.RefObject<HTMLButtonElement | null>, setPosition: (pos: { top: number; right: number } | null) => void) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  };

  // 当显示面板时更新位置
  useEffect(() => {
    if (showTextColorPicker && textColorButtonRef.current) {
      updatePanelPosition(textColorButtonRef, setTextColorPickerPosition);
    } else {
      setTextColorPickerPosition(null);
    }
  }, [showTextColorPicker]);

  useEffect(() => {
    if (showHighlightPicker && highlightButtonRef.current) {
      updatePanelPosition(highlightButtonRef, setHighlightPickerPosition);
    } else {
      setHighlightPickerPosition(null);
    }
  }, [showHighlightPicker]);

  useEffect(() => {
    if (showOrderedListMenu && orderedListButtonRef.current) {
      updatePanelPosition(orderedListButtonRef, setOrderedListMenuPosition);
    } else {
      setOrderedListMenuPosition(null);
    }
  }, [showOrderedListMenu]);

  useEffect(() => {
    if (showTableMenu && tableButtonRef.current) {
      updatePanelPosition(tableButtonRef, setTableMenuPosition);
    } else {
      setTableMenuPosition(null);
    }
  }, [showTableMenu]);

  // 检查是否在表格中，如果不在表格中则关闭菜单
  useEffect(() => {
    if (!editor || !showTableMenu) return;
    
    const updateTableMenu = () => {
      const isInTable = editor.isActive('table');
      if (!isInTable) {
        // 如果离开表格，自动隐藏菜单
        setShowTableMenu(false);
      }
    };

    // 监听选择变化
    editor.on('selectionUpdate', updateTableMenu);

    return () => {
      editor.off('selectionUpdate', updateTableMenu);
    };
  }, [editor, showTableMenu]);

  // 关闭颜色选择器和菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // 如果点击的是面板内部，不关闭
      if (target.closest('.toolbar-panel')) {
        return;
      }
      // 如果点击的是表格按钮，不关闭表格菜单
      if (target.closest('button') && tableButtonRef.current?.contains(target)) {
        return;
      }
      // 如果点击的是表格内部，不关闭表格菜单（让用户可以在表格中编辑）
      if (target.closest('table') && showTableMenu) {
        return;
      }
      setShowTextColorPicker(false);
      setShowHighlightPicker(false);
      setShowOrderedListMenu(false);
      // 如果不在表格中，关闭表格菜单
      if (showTableMenu && editor && !editor.isActive('table')) {
        setShowTableMenu(false);
      }
    };
    
    if (showTextColorPicker || showHighlightPicker || showOrderedListMenu || showTableMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showTextColorPicker, showHighlightPicker, showOrderedListMenu, showTableMenu, editor]);

  // 颜色和样式函数
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
      editor.chain().focus().setHighlight({ color: bgColor }).run();
    }
    setShowHighlightPicker(false);
  };

  // 插入元素函数
  const insertTable = () => {
    if (!editor) return;
    editor.chain().focus().insertTable({ 
      rows: tableRows, 
      cols: tableCols, 
      withHeaderRow: tableWithHeader 
    }).run();
    setShowTableDialog(false);
  };

  // 表格编辑函数
  const addTableRowBefore = () => {
    if (!editor) return;
    editor.chain().focus().addRowBefore().run();
  };

  const addTableRowAfter = () => {
    if (!editor) return;
    editor.chain().focus().addRowAfter().run();
  };

  const deleteTableRow = () => {
    if (!editor) return;
    editor.chain().focus().deleteRow().run();
  };

  const addTableColumnBefore = () => {
    if (!editor) return;
    editor.chain().focus().addColumnBefore().run();
  };

  const addTableColumnAfter = () => {
    if (!editor) return;
    editor.chain().focus().addColumnAfter().run();
  };

  const deleteTableColumn = () => {
    if (!editor) return;
    editor.chain().focus().deleteColumn().run();
  };

  const deleteTable = () => {
    if (!editor) return;
    editor.chain().focus().deleteTable().run();
    setShowTableMenu(false);
  };

  // 有序列表类型选项
  const orderedListTypes = [
    { type: 'decimal', label: '1, 2, 3...', value: 'decimal' },
    { type: 'lower-alpha', label: 'a, b, c...', value: 'lower-alpha' },
    { type: 'upper-alpha', label: 'A, B, C...', value: 'upper-alpha' },
    { type: 'lower-roman', label: 'i, ii, iii...', value: 'lower-roman' },
    { type: 'upper-roman', label: 'I, II, III...', value: 'upper-roman' },
  ];

  const setOrderedListType = (type: string) => {
    if (!editor) return;
    const isActive = editor.isActive('orderedList');
    
    if (isActive) {
      // 如果已经是有序列表，更新类型
      editor.chain().focus().updateAttributes('orderedList', { 
        listStyleType: type
      }).run();
    } else {
      // 如果不是有序列表，先创建列表，然后设置类型
      editor.chain().focus().toggleOrderedList().run();
      // 使用 setTimeout 确保列表已创建后再设置类型
      setTimeout(() => {
        editor.chain().focus().updateAttributes('orderedList', { 
          listStyleType: type
        }).run();
      }, 10);
    }
    setShowOrderedListMenu(false);
  };

  const handleAddImage = () => {
    if (!imageUrl.trim()) return;
    if (editor) {
      editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
      setImageUrl('');
      setShowImageDialog(false);
    }
  };

  const handleSetLink = () => {
    if (!editor) return;
    
    if (!linkUrl.trim()) {
      // 如果 URL 为空，移除链接
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      setLinkUrl('');
      setLinkText('');
      setShowLinkDialog(false);
      return;
    }

    const url = linkUrl.trim();
    const text = linkText.trim();
    
    // 如果有选中文本，使用选中的文本；否则使用输入的文本
    const { from, to } = editor.state.selection;
    const hasSelection = from !== to;
    
    if (hasSelection) {
      // 有选中文本，直接设置链接
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    } else if (text) {
      // 没有选中文本但有输入文本，插入带链接的文本
      editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run();
    } else {
      // 只有 URL，插入 URL 作为链接文本
      editor.chain().focus().insertContent(`<a href="${url}">${url}</a>`).run();
    }
    
    setLinkUrl('');
    setLinkText('');
    setShowLinkDialog(false);
  };

  const openLinkDialog = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);
    
    setLinkUrl(previousUrl || '');
    setLinkText(selectedText || '');
    setShowLinkDialog(true);
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
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400">加载编辑器中...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100 dark:bg-slate-900">
      {/* 标题输入区 */}
      <div className="flex-shrink-0 p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="输入文章标题..."
          className="w-full px-4 py-3 text-2xl font-semibold bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-0"
        />
      </div>

      {/* 主内容区：两栏布局 */}
      <div className="flex flex-1 min-h-0">
        {/* 左侧：编辑器区域 */}
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-800 overflow-hidden">
          <div className="flex-1 overflow-y-auto shadow-inner min-h-0" style={{ overflowY: 'auto' }}>
            <EditorContent editor={editor} className="h-full" />
          </div>
          
          {/* 底部状态栏 */}
          <div className="flex-shrink-0 px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {editor.storage.characterCount?.characters() || 0} 字符
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowJsonDebug(!showJsonDebug)}
                className="text-xs px-2 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                title="显示/隐藏 JSON 调试视图"
              >
                {showJsonDebug ? '隐藏' : '显示'} JSON
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md text-sm font-medium bg-sky-600 hover:bg-sky-700 text-white transition-colors duration-150 flex items-center gap-2"
              >
                <Save size={16} />
                保存
              </button>
            </div>
          </div>
        </div>

        {/* 右侧：工具栏区域（固定，不滚动） */}
        <div className="w-64 flex-shrink-0 bg-slate-800 dark:bg-slate-900 border-l border-slate-700 dark:border-slate-600 p-3">
          {/* 撤销/重做 */}
          <ToolbarGroup title="编辑">
            <div className="flex flex-wrap gap-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="撤销 (Ctrl+Z)"
              >
                <Undo size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="重做 (Ctrl+Shift+Z)"
              >
                <Redo size={16} />
              </ToolbarButton>
            </div>
          </ToolbarGroup>

          {/* 标题 */}
          <ToolbarGroup title="标题">
            <div className="flex flex-wrap gap-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().setParagraph().run()}
                isActive={editor.isActive('paragraph')}
                title="段落"
              >
                <PilcrowIcon size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                title="一级标题"
              >
                <Heading1Icon size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                title="二级标题"
              >
                <Heading2Icon size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                isActive={editor.isActive('heading', { level: 3 })}
                title="三级标题"
              >
                <Heading3Icon size={16} />
              </ToolbarButton>
            </div>
          </ToolbarGroup>

          {/* 文本样式 */}
          <ToolbarGroup title="文本样式">
            <div className="flex flex-wrap gap-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="粗体 (Ctrl+B)"
              >
                <BoldIcon size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="斜体 (Ctrl+I)"
              >
                <ItalicIcon size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive('underline')}
                title="下划线 (Ctrl+U)"
              >
                <UnderlineIcon size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive('strike')}
                title="删除线"
              >
                <StrikethroughIcon size={16} />
              </ToolbarButton>
            </div>
          </ToolbarGroup>

          {/* 列表和引用 */}
          <ToolbarGroup title="列表">
            <div className="flex flex-wrap gap-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                title="无序列表"
              >
                <ListIcon size={16} />
              </ToolbarButton>
              <ToolbarButton
                ref={orderedListButtonRef}
                onClick={(e) => {
                  e?.stopPropagation();
                  setShowOrderedListMenu(!showOrderedListMenu);
                }}
                isActive={editor.isActive('orderedList') || showOrderedListMenu}
                title="有序列表"
              >
                <ListOrderedIcon size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
                title="引用块"
              >
                <QuoteIcon size={16} />
              </ToolbarButton>
            </div>
          </ToolbarGroup>

          {/* 代码块 */}
          <ToolbarGroup title="代码">
            <div className="flex flex-wrap gap-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                isActive={editor.isActive('codeBlock')}
                title="代码块"
              >
                <CodeBlockIcon size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                title="分隔线"
              >
                <MinusIcon size={16} />
              </ToolbarButton>
            </div>
          </ToolbarGroup>

          {/* 插入元素 */}
          <ToolbarGroup title="插入">
            <div className="flex flex-wrap gap-1">
              <ToolbarButton
                ref={tableButtonRef}
                onClick={(e) => {
                  e?.stopPropagation();
                  const isInTable = editor.isActive('table');
                  if (isInTable) {
                    // 在表格中，显示编辑菜单
                    setShowTableMenu(!showTableMenu);
                  } else {
                    // 不在表格中，显示插入对话框
                    setShowTableDialog(true);
                  }
                }}
                isActive={editor.isActive('table') || showTableMenu}
                title={editor.isActive('table') ? '编辑表格' : '插入表格'}
              >
                <TableIcon size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => setShowImageDialog(true)}
                title="插入图片"
              >
                <ImageIcon size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={openLinkDialog}
                isActive={editor.isActive('link')}
                title="插入/编辑链接"
              >
                <LinkIcon size={16} />
              </ToolbarButton>
            </div>
          </ToolbarGroup>

          {/* 颜色工具 */}
          <ToolbarGroup title="颜色">
            <div className="flex flex-wrap gap-1">
              <ToolbarButton
                ref={textColorButtonRef}
                onClick={(e) => {
                  e?.stopPropagation();
                  setShowTextColorPicker(!showTextColorPicker);
                  setShowHighlightPicker(false);
                }}
                isActive={showTextColorPicker}
                title="文字颜色"
              >
                <Type size={16} />
              </ToolbarButton>
              <ToolbarButton
                ref={highlightButtonRef}
                onClick={(e) => {
                  e?.stopPropagation();
                  setShowHighlightPicker(!showHighlightPicker);
                  setShowTextColorPicker(false);
                }}
                isActive={showHighlightPicker}
                title="背景高亮"
              >
                <HighlighterIcon size={16} />
              </ToolbarButton>
            </div>
          </ToolbarGroup>
        </div>
      </div>

      {/* 图片插入对话框 */}
      {showImageDialog && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setShowImageDialog(false)}
        >
          <div 
            className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">插入图片</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  图片 URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddImage();
                    } else if (e.key === 'Escape') {
                      setShowImageDialog(false);
                    }
                  }}
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowImageDialog(false);
                    setImageUrl('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleAddImage}
                  disabled={!imageUrl.trim()}
                  className="px-4 py-2 text-sm font-medium bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  插入
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 链接插入对话框 */}
      {showLinkDialog && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setShowLinkDialog(false)}
        >
          <div 
            className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">插入/编辑链接</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  链接 URL
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSetLink();
                    } else if (e.key === 'Escape') {
                      setShowLinkDialog(false);
                    }
                  }}
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  链接文本（可选，如果已选中文本则使用选中文本）
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="链接显示文本"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSetLink();
                    } else if (e.key === 'Escape') {
                      setShowLinkDialog(false);
                    }
                  }}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowLinkDialog(false);
                    setLinkUrl('');
                    setLinkText('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSetLink}
                  disabled={!linkUrl.trim()}
                  className="px-4 py-2 text-sm font-medium bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editor.isActive('link') ? '更新' : '插入'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 表格插入对话框 */}
      {showTableDialog && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setShowTableDialog(false)}
        >
          <div 
            className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">插入表格</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  行数
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={tableRows}
                  onChange={(e) => setTableRows(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  列数
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={tableCols}
                  onChange={(e) => setTableCols(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={tableWithHeader}
                    onChange={(e) => setTableWithHeader(e.target.checked)}
                    className="w-4 h-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                  />
                  包含表头行
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowTableDialog(false);
                    setTableRows(3);
                    setTableCols(3);
                    setTableWithHeader(true);
                  }}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={insertTable}
                  className="px-4 py-2 text-sm font-medium bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors"
                >
                  插入
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 固定定位的面板 - 表格编辑菜单 */}
      {showTableMenu && tableMenuPosition && editor.isActive('table') && (
        <div
          className="toolbar-panel fixed p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-xl z-[9999] min-w-[180px]"
          style={{
            top: `${tableMenuPosition.top}px`,
            right: `${tableMenuPosition.right}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-medium">表格操作</div>
          <div className="space-y-1">
            <div className="text-xs text-slate-500 dark:text-slate-400 px-2 py-1 font-medium">行操作</div>
            <button
              onClick={addTableRowBefore}
              className="w-full text-left px-2 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            >
              在上方插入行
            </button>
            <button
              onClick={addTableRowAfter}
              className="w-full text-left px-2 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            >
              在下方插入行
            </button>
            <button
              onClick={deleteTableRow}
              className="w-full text-left px-2 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            >
              删除当前行
            </button>
            <div className="border-t border-slate-200 dark:border-slate-600 my-1"></div>
            <div className="text-xs text-slate-500 dark:text-slate-400 px-2 py-1 font-medium">列操作</div>
            <button
              onClick={addTableColumnBefore}
              className="w-full text-left px-2 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            >
              在左侧插入列
            </button>
            <button
              onClick={addTableColumnAfter}
              className="w-full text-left px-2 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            >
              在右侧插入列
            </button>
            <button
              onClick={deleteTableColumn}
              className="w-full text-left px-2 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            >
              删除当前列
            </button>
            <div className="border-t border-slate-200 dark:border-slate-600 my-1"></div>
            <button
              onClick={deleteTable}
              className="w-full text-left px-2 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors font-medium"
            >
              删除表格
            </button>
          </div>
        </div>
      )}

      {/* 固定定位的面板 - 文字颜色选择器 */}
      {showTextColorPicker && textColorPickerPosition && (
        <div
          className="toolbar-panel fixed p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-xl z-[9999] min-w-[140px]"
          style={{
            top: `${textColorPickerPosition.top}px`,
            right: `${textColorPickerPosition.right}px`,
          }}
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

      {/* 固定定位的面板 - 背景高亮选择器 */}
      {showHighlightPicker && highlightPickerPosition && (
        <div
          className="toolbar-panel fixed p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-xl z-[9999] min-w-[140px]"
          style={{
            top: `${highlightPickerPosition.top}px`,
            right: `${highlightPickerPosition.right}px`,
          }}
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

      {/* 固定定位的面板 - 有序列表菜单 */}
      {showOrderedListMenu && orderedListMenuPosition && (
        <div
          className="toolbar-panel fixed p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-xl z-[9999] min-w-[160px]"
          style={{
            top: `${orderedListMenuPosition.top}px`,
            right: `${orderedListMenuPosition.right}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-medium">序号类型</div>
          <div className="space-y-1">
            {orderedListTypes.map((item) => (
              <button
                key={item.value}
                onClick={() => setOrderedListType(item.value)}
                className="w-full text-left px-2 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* JSON 调试视图（可选，默认隐藏） */}
      {showJsonDebug && (
        <div className="absolute inset-0 bg-slate-900 bg-opacity-90 z-50 p-4 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">JSON 调试视图</h3>
              <button
                onClick={() => setShowJsonDebug(false)}
                className="px-4 py-2 rounded-md text-sm font-medium bg-slate-700 hover:bg-slate-600 text-white transition-colors"
              >
                关闭
              </button>
            </div>
            <pre className="bg-slate-800 p-4 rounded-md text-sm text-slate-300 overflow-auto">
              <code>{editorJson ? JSON.stringify(editorJson, null, 2) : 'Loading JSON...'}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CmsPlaygroundPage;