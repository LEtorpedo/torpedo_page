import React from 'react';
import type { ReactNode } from 'react';

// --- 类型定义 ---
interface ProseMirrorMark {
  type: string;
  attrs?: {
    href?: string;
    target?: string;
    rel?: string;
    [key: string]: unknown; 
  };
}

export interface ProseMirrorNode { 
  type: string;
  content?: ProseMirrorNode[];
  text?: string;
  marks?: ProseMirrorMark[];
  attrs?: {
    level?: 1 | 2 | 3 | 4 | 5 | 6; 
    src?: string; 
    alt?: string; 
    language?: string;
    [key: string]: unknown; 
  };
}

interface ContentRendererProps {
  documentNode: ProseMirrorNode | null | undefined;
}

// --- 递归渲染函数 ---
const renderNode = (node: ProseMirrorNode, key: string | number, isInListContext: boolean = false): ReactNode => {
  if (!node) return null;

  let children: ReactNode[] | null = null; 
  if (node.content && node.content.length > 0) {
    const passListContext = node.type === 'listItem' || isInListContext;
    if (node.type !== 'codeBlock') {
      children = node.content.map((childNode, index) => renderNode(childNode, `${key}-${index}`, passListContext));
    }
  }

  switch (node.type) {
    case 'doc': {
      return <>{children}</>;
    }
    case 'paragraph': {
      const paragraphClasses = isInListContext ? "mb-1" : "mb-4";
      return <p key={key} className={paragraphClasses}>{children}</p>;
    }
    case 'heading': {
      const level = node.attrs?.level || 1;
      const commonHeadingClasses = "font-bold dark:text-slate-100";
      if (level === 1) return <h1 key={key} className={`text-3xl mt-6 mb-4 ${commonHeadingClasses}`}>{children}</h1>;
      if (level === 2) return <h2 key={key} className={`text-2xl mt-5 mb-3 ${commonHeadingClasses}`}>{children}</h2>;
      if (level === 3) return <h3 key={key} className={`text-xl mt-4 mb-2 ${commonHeadingClasses}`}>{children}</h3>;
      if (level === 4) return <h4 key={key} className={`text-lg mt-3 mb-2 ${commonHeadingClasses}`}>{children}</h4>;
      if (level === 5) return <h5 key={key} className={`text-base mt-2 mb-1 ${commonHeadingClasses}`}>{children}</h5>;
      if (level === 6) return <h6 key={key} className={`text-sm mt-1 mb-1 ${commonHeadingClasses}`}>{children}</h6>;
      return <p key={key} className={commonHeadingClasses}>{children}</p>; 
    }
    case 'text': {
      if (node.text) {
        let currentTextElement: ReactNode = node.text; 
        if (node.marks && node.marks.length > 0) {
          for (const mark of [...node.marks].reverse()) { 
            if (mark.type === 'bold') {
              currentTextElement = <strong>{currentTextElement}</strong>;
            } else if (mark.type === 'italic') {
              currentTextElement = <em>{currentTextElement}</em>;
            } else if (mark.type === 'strike') {
              currentTextElement = <s>{currentTextElement}</s>;
            } else if (mark.type === 'code') { 
              currentTextElement = <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-sm font-mono text-emerald-600 dark:text-emerald-400">{currentTextElement}</code>;
            } else if (mark.type === 'link' && mark.attrs?.href) {
              currentTextElement = (
                <a 
                  href={mark.attrs.href} 
                  target={mark.attrs.target || '_blank'} 
                  rel={mark.attrs.rel || 'noopener noreferrer'}
                  className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 underline"
                >
                  {currentTextElement}
                </a>
              );
            } else if (mark.type === 'textStyle' && mark.attrs?.color) {
              // Handle text color
              currentTextElement = <span style={{ color: mark.attrs.color as string }}>{currentTextElement}</span>;
            } else if (mark.type === 'highlight' && mark.attrs?.color) {
              // Handle highlight background color
              currentTextElement = <span style={{ backgroundColor: mark.attrs.color as string }}>{currentTextElement}</span>;
            }
          }
        }
        return <React.Fragment key={key}>{currentTextElement}</React.Fragment>;
      }
      return null;
    }
    case 'bulletList': {
      return <ul key={key} className="list-disc pl-5 mb-4 space-y-1">{children}</ul>;
    }
    case 'orderedList': {
      return <ol key={key} className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>;
    }
    case 'listItem': {
      return <li key={key}>{children}</li>;
    }
    case 'blockquote': {
      return <blockquote key={key} className="mb-4 py-1">{children}</blockquote>;
    }
    case 'horizontalRule': {
      return <hr key={key} className="my-8 border-slate-300 dark:border-slate-700" />;
    }
    case 'codeBlock': {
      const language = node.attrs?.language || 'plaintext';
      const codeContent = node.content?.map(n => n.text || '').join('\n') || '';
      return (
        <pre key={key} className={`language-${language} bg-slate-100 dark:bg-slate-800 rounded-md p-4 text-sm overflow-x-auto mb-4`}>
          <code className={`language-${language}`}>{codeContent}</code>
        </pre>
      );
    }
    case 'hardBreak': {
      return <br key={key} />;
    }
    default: {
      console.warn(`ContentRenderer: Unsupported node type "${node.type}"`);
      if (node.text) return <span key={key}>{node.text}</span>; 
      if (children) return <div key={key} data-unknown-type={node.type}>{children}</div>;
      return null;
    }
  }
};

const ContentRenderer: React.FC<ContentRendererProps> = ({ documentNode }) => {
  if (!documentNode || !documentNode.content || documentNode.content.length === 0) {
    return (
      <div className="p-4 text-slate-500 dark:text-slate-400 min-h-[400px]">
        <p>The rendered preview of your content will appear here. Start typing in the editor or apply styles!</p>
      </div>
    );
  }
  return (
    <div className="prose dark:prose-invert max-w-none p-1 min-h-[400px]">
      {documentNode.content.map((node, index) => renderNode(node, index, false))}
    </div>
  );
};

export default ContentRenderer; 