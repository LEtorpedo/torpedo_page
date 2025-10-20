import { Node, mergeAttributes } from '@tiptap/core';

export interface SidenoteOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    sidenote: {
      /**
       * Toggle a sidenote
       */
      setSidenote: () => ReturnType;
      /**
       * Unset a sidenote
       */
      unsetSidenote: () => ReturnType;
    };
  }
}

/**
 * Sidenote extension for TipTap
 *
 * This creates margin notes/sidenotes similar to academic papers.
 * The note appears in the margin next to the main text.
 *
 * Usage:
 * - In the editor, select text and apply sidenote
 * - The content will be rendered in the margin when viewing
 *
 * Rendering:
 * - In edit mode: shows as inline content with special styling
 * - In view mode: renders in the margin using CSS positioning
 */
export const Sidenote = Node.create<SidenoteOptions>({
  name: 'sidenote',

  group: 'block',

  content: 'inline*',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-sidenote-id'),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }
          return {
            'data-sidenote-id': attributes.id,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'aside[data-sidenote-id]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'aside',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: 'sidenote',
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setSidenote:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name, {
            id: `sidenote-${Date.now()}`,
          });
        },
      unsetSidenote:
        () =>
        ({ commands }) => {
          return commands.lift(this.name);
        },
    };
  },
});

export default Sidenote;
