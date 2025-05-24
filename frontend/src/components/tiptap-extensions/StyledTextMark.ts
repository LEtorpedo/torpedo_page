import { Mark, mergeAttributes } from '@tiptap/core';

// 1. 定义我们自定义 Mark 允许的 styleKey 类型
//    未来可以从一个共享的配置文件或类型定义中导入
export type AllowedStyleKeys = 'normal' | 'cursive_main' | 'highlight_important'; // 示例

// 2. 定义 Mark 的选项接口 (如果你的 Mark 需要配置的话)
export interface StyledTextMarkOptions {
  HTMLAttributes: Record<string, string | number | boolean | undefined>;
  defaultStyleKey: AllowedStyleKeys;
}

// 3. 定义 Mark 的属性接口，确保 styleKey 是我们允许的类型
//    Tiptap 在 addAttributes 中会用到这个
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    styledText: {
      /**
       * Set a style key on the selected text
       */
      setStyleKey: (styleKey: AllowedStyleKeys) => ReturnType;
      /**
       * Remove the style key from the selected text
       */
      unsetStyleKey: () => ReturnType;
    };
  }
}

// 4. 创建 StyledTextMark
export const StyledTextMark = Mark.create<StyledTextMarkOptions>({
  name: 'styledText', // Mark 的唯一名称

  // 添加选项，这是核心！
  addOptions() {
    return {
      HTMLAttributes: {},
      defaultStyleKey: 'normal' as AllowedStyleKeys, // Ensure type correctness
    };
  },

  // 添加属性，这是核心！
  addAttributes() {
    return {
      styleKey: {
        default: this.options.defaultStyleKey, // 从选项获取默认值
        // parseHTML 和 renderHTML 用于当 Tiptap 直接处理 HTML 输入/输出时
        // 如果我们主要依赖 JSON，这里的配置可能更多是为了编辑器内部或特定场景
        parseHTML: (element) => element.getAttribute('data-style-key') || this.options.defaultStyleKey,
        renderHTML: (attributes) => {
          if (!attributes.styleKey || attributes.styleKey === this.options.defaultStyleKey) {
            return {}; // 如果是默认样式，不添加特殊属性
          }
          // 存储 data-style-key 以便渲染时能够获取到 styleKey
          return { 'data-style-key': attributes.styleKey };
        },
      },
    };
  },

  // Tiptap 如何从 HTML 解析这个 Mark
  // 如果 HTML 中有 <span data-style-key="cursive_main">...</span> 这样的标签，
  // Tiptap 就能识别它是一个 styledText mark，并提取 styleKey 属性。
  parseHTML() {
    return [
      {
        tag: 'span[data-style-key]', // 匹配所有带 data-style-key 属性的 span
        getAttrs: (element) => {
          if (typeof element === 'string') return false; // Should not happen with tag selector
          const styleKey = element.getAttribute('data-style-key') as AllowedStyleKeys | null;
          return styleKey ? { styleKey } : false; // 只有当 data-style-key 存在时才应用此 mark
        },
      },
    ];
  },

  // Tiptap 如何将这个 Mark 渲染成 HTML
  // HTMLAttributes 会包含上面 addAttributes() 中定义的属性 (如 styleKey)
  renderHTML({ HTMLAttributes, mark }) {
    // 从 mark.attrs 中获取 styleKey，这是正确的方式
    const styleKey = mark.attrs.styleKey as AllowedStyleKeys;
    let styleClasses = '';
    
    if (styleKey === 'cursive_main') {
      styleClasses = 'font-serif italic text-purple-600 dark:text-purple-400';
    } else if (styleKey === 'highlight_important') {
      styleClasses = 'bg-yellow-200 dark:bg-yellow-800 px-1 py-0.5 rounded font-semibold text-red-600 dark:text-red-400';
    }

    // 合并默认属性、HTML属性和我们的样式类
    const finalAttributes = mergeAttributes(
      this.options.HTMLAttributes, 
      HTMLAttributes,
      styleClasses ? { class: styleClasses } : {}
    );

    return ['span', finalAttributes, 0];
    // '0' 代表内容应该被渲染在这个标签内部 (content hole)
  },

  // 添加命令，让我们可以通过 editor.commands.styledText.setStyleKey(...) 来操作
  addCommands() {
    return {
      setStyleKey: (styleKey: AllowedStyleKeys) => ({ commands }) => {
        if (!styleKey) {
          return commands.unsetMark(this.name); // 如果传入空的 styleKey，就移除 mark
        }
        return commands.setMark(this.name, { styleKey });
      },
      unsetStyleKey: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
    };
  },
});

export default StyledTextMark;
