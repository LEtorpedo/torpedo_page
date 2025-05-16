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

  // 默认选项
  defaultOptions: {
    HTMLAttributes: {},
    defaultStyleKey: 'normal',
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
          // 我们在 HTML 中用 data-style-key 来存储，而不是直接应用 style
          // 这样最终的渲染可以由 React 组件根据 styleKey 决定
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
          const styleKey = element.getAttribute('data-style-key');
          return styleKey ? { styleKey } : false; // 只有当 data-style-key 存在时才应用此 mark
        },
      },
    ];
  },

  // Tiptap 如何将这个 Mark 渲染成 HTML
  // HTMLAttributes 会包含上面 addAttributes() 中定义的属性 (如 styleKey)
  renderHTML({ HTMLAttributes }) {
    // mergeAttributes 用于合并默认的 HTMLAttributes 和我们想添加的
    // 例如，如果 this.options.HTMLAttributes 包含 { class: 'my-custom-span' }
    // 而 HTMLAttributes (来自 addAttributes) 包含 { 'data-style-key': 'cursive_main' }
    // 最终会渲染出 <span class="my-custom-span" data-style-key="cursive_main"></span>
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
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
