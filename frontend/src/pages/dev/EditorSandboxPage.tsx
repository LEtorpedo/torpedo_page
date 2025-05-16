import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style'; // TextStyle is often a prerequisite or useful with custom style marks
import { StyledTextMark } from '@/components/tiptap-extensions/StyledTextMark';
import type { AllowedStyleKeys } from '@/components/tiptap-extensions/StyledTextMark'; // 修正类型导入

// 基本样式，确保编辑器可见且有一点边距
const editorContainerStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: '10px',
  minHeight: '200px',
  marginTop: '20px',
};

const buttonStyle: React.CSSProperties = {
  marginRight: '10px',
  marginBottom: '10px',
  padding: '8px 12px',
  cursor: 'pointer',
};

const outputStyle: React.CSSProperties = {
  marginTop: '20px',
  padding: '10px',
  border: '1px dashed #eee',
  whiteSpace: 'pre-wrap', // 保持 JSON 格式
  wordBreak: 'break-all',
  maxHeight: '300px',
  overflowY: 'auto',
  backgroundColor: '#f9f9f9',
};

const EditorSandboxPage: React.FC = () => {
  const [editorJsonOutput, setEditorJsonOutput] = useState<string>('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // 如果只想测试 Mark，可以禁用 StarterKit 的一些默认 marks 避免冲突或混淆
        // bold: false,
        // italic: false,
      }),
      TextStyle, // TextStyle is important for custom marks that might interact with inline styles
      StyledTextMark.configure({
        // 我们可以在这里为 StyledTextMark 传递选项，例如默认的 HTMLAttributes
        // HTMLAttributes: { class: 'custom-styled-text' },
      }),
    ],
    content: `
      <p>Hello World! This is a test.</p>
      <p>Select some text and apply a style.</p>
      <p>This text has a <span data-style-key="cursive_main">predefined cursive style</span> from HTML.</p>
    `,
    onUpdate: ({ editor }) => {
      // 当编辑器内容更新时，实时更新页面上显示的 JSON
      setEditorJsonOutput(JSON.stringify(editor.getJSON(), null, 2));
    },
  });

  if (!editor) {
    return null; // 或者一个加载指示器
  }

  const applyStyle = (styleKey: AllowedStyleKeys) => {
    editor.chain().focus().setStyleKey(styleKey).run();
  };

  const removeStyle = () => {
    editor.chain().focus().unsetStyleKey().run();
  };

  const logJson = () => {
    const json = editor.getJSON();
    console.log(json);
    setEditorJsonOutput(JSON.stringify(json, null, 2)); // 美化 JSON 输出
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tiptap Editor Sandbox</h1>
      <p>Test custom styled text mark.</p>

      <div>
        <button
          onClick={() => applyStyle('cursive_main')}
          disabled={!editor.can().setStyleKey('cursive_main')}
          style={{
            ...buttonStyle,
            fontFamily: editor.isActive('styledText', { styleKey: 'cursive_main' }) ? '"Dancing Script Custom", cursive' : 'inherit',
            fontWeight: editor.isActive('styledText', { styleKey: 'cursive_main' }) ? 'bold' : 'normal',
          }}
        >
          Apply Cursive Style
        </button>
        <button
          onClick={() => applyStyle('highlight_important')}
          disabled={!editor.can().setStyleKey('highlight_important')}
          style={{
            ...buttonStyle,
            backgroundColor: editor.isActive('styledText', { styleKey: 'highlight_important' }) ? 'yellow' : 'inherit',
            color: editor.isActive('styledText', { styleKey: 'highlight_important' }) ? 'red' : 'inherit',
          }}
        >
          Apply Highlight Important
        </button>
        <button
          onClick={removeStyle}
          style={buttonStyle}
        >
          Remove Custom Style (Set to Normal)
        </button>
      </div>

      <div style={editorContainerStyle}>
        <EditorContent editor={editor} />
      </div>

      <div>
        <button onClick={logJson} style={{ ...buttonStyle, marginTop: '20px' }}>
          Log Editor JSON to Console & Page
        </button>
      </div>

      {editorJsonOutput && (
        <div>
          <h3>Editor JSON Output:</h3>
          <pre style={outputStyle}><code>{editorJsonOutput}</code></pre>
        </div>
      )}
    </div>
  );
};

export default EditorSandboxPage;
