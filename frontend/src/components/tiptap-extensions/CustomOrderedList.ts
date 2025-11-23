import { Node, mergeAttributes, wrappingInputRule } from '@tiptap/core';

export interface CustomOrderedListOptions {
  HTMLAttributes: Record<string, unknown>;
}

/**
 * Custom OrderedList extension that supports different list style types
 * (decimal, lower-alpha, upper-alpha, lower-roman, upper-roman)
 */
export const CustomOrderedList = Node.create<CustomOrderedListOptions>({
  name: 'orderedList',

  priority: 1000,

  group: 'block list',

  content: 'listItem+',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      listStyleType: {
        default: 'decimal',
        parseHTML: (element) => {
          const style = element.getAttribute('style');
          if (style) {
            const match = style.match(/list-style-type:\s*([^;]+)/);
            if (match) {
              return match[1].trim();
            }
          }
          // 检查 type 属性（旧式 HTML）
          const type = element.getAttribute('type');
          if (type) {
            const typeMap: Record<string, string> = {
              '1': 'decimal',
              'a': 'lower-alpha',
              'A': 'upper-alpha',
              'i': 'lower-roman',
              'I': 'upper-roman',
            };
            return typeMap[type] || 'decimal';
          }
          return 'decimal';
        },
        renderHTML: (attributes) => {
          if (!attributes.listStyleType || attributes.listStyleType === 'decimal') {
            return {};
          }
          return {
            style: `list-style-type: ${attributes.listStyleType};`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'ol',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['ol', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleOrderedList:
        (attributes?: { listStyleType?: string }) =>
        ({ chain, commands }) => {
          const { listStyleType = 'decimal' } = attributes || {};
          const attrs = { listStyleType };
          
          // 检查是否已经在有序列表中
          const isActive = this.editor.isActive(this.name);
          
          if (isActive) {
            // 如果已经在列表中，更新属性
            return commands.updateAttributes(this.name, attrs);
          } else {
            // 如果不在列表中，创建列表
            return chain()
              .focus()
              .wrapInList(this.name, attrs)
              .run();
          }
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-7': () => this.editor.commands.toggleOrderedList(),
    };
  },

  addInputRules() {
    return [
      // 数字列表：1. 或 1)
      wrappingInputRule({
        find: /^(\d+)\.\s$/,
        type: this.type,
        getAttributes: () => ({ listStyleType: 'decimal' }),
      }),
      wrappingInputRule({
        find: /^(\d+)\)\s$/,
        type: this.type,
        getAttributes: () => ({ listStyleType: 'decimal' }),
      }),
      // 小写字母列表：a. 或 a)
      wrappingInputRule({
        find: /^([a-z])\.\s$/,
        type: this.type,
        getAttributes: () => ({ listStyleType: 'lower-alpha' }),
      }),
      wrappingInputRule({
        find: /^([a-z])\)\s$/,
        type: this.type,
        getAttributes: () => ({ listStyleType: 'lower-alpha' }),
      }),
      // 大写字母列表：A. 或 A)
      wrappingInputRule({
        find: /^([A-Z])\.\s$/,
        type: this.type,
        getAttributes: () => ({ listStyleType: 'upper-alpha' }),
      }),
      wrappingInputRule({
        find: /^([A-Z])\)\s$/,
        type: this.type,
        getAttributes: () => ({ listStyleType: 'upper-alpha' }),
      }),
      // 小写罗马数字列表：i. 或 i) (只匹配单个 i)
      wrappingInputRule({
        find: /^i\.\s$/,
        type: this.type,
        getAttributes: () => ({ listStyleType: 'lower-roman' }),
      }),
      wrappingInputRule({
        find: /^i\)\s$/,
        type: this.type,
        getAttributes: () => ({ listStyleType: 'lower-roman' }),
      }),
      // 大写罗马数字列表：I. 或 I)
      wrappingInputRule({
        find: /^I\.\s$/,
        type: this.type,
        getAttributes: () => ({ listStyleType: 'upper-roman' }),
      }),
      wrappingInputRule({
        find: /^I\)\s$/,
        type: this.type,
        getAttributes: () => ({ listStyleType: 'upper-roman' }),
      }),
    ];
  },
});

export default CustomOrderedList;

