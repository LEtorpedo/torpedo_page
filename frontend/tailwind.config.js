/** @type {import('tailwindcss').Config} */
// const defaultTheme = require('tailwindcss/defaultTheme'); // defaultTheme 仍然可以按需使用，但字体我们直接定义

export default {
  darkMode: "class", // 启用基于 class 的暗黑模式
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // 如果您将来使用 shadcn/ui 或其他组件库，可能需要添加它们的路径
    // './src/components/**/*.{ts,tsx}',
    // './app/**/*.{ts,tsx}', // 示例
  ],
  theme: {
    container: { // shadcn/ui 推荐的 container 配置
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // 直接使用您在 index.css 中定义的字体族名
        serif: ['Noto Serif SC', 'Noto Serif', 'serif'],
        // sans: ['Inter var', ...defaultTheme.fontFamily.sans], // 如果需要 sans-serif
      },
      colors: {
        // --- 基础语义颜色，从 CSS 变量读取 (来自 index.css) ---
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },

        // --- 更新 Brand 颜色，使其通过 CSS 变量读取 ---
        // 'brand-primary': {
        //   DEFAULT: 'oklch(var(--brand-primary) / <alpha-value>)',
        //   foreground: 'oklch(var(--brand-primary-foreground) / <alpha-value>)',
        //   dark: 'oklch(var(--brand-primary-dark) / <alpha-value>)',
        //   light: 'oklch(var(--brand-primary-light) / <alpha-value>)',
        // },
        
        // 保留其他的 brand-* Hex 定义，如果它们在其他地方仍被直接使用
        // 或者也可以逐步将它们都迁移到 CSS 变量模式
        // 'brand-primary-light': '#2DD4BF',  // 暂时保留，以防万一，但理想情况下应移除或重命名
        // 'brand-primary-dark': '#0D9488',   // 暂时保留

        'brand-secondary': '#3B82F6',
        'brand-secondary-light': '#60A5FA',// light: '#60A5FA' (Tailwind blue-400)
        'brand-secondary-dark': '#2563EB', // dark: '#2563EB' (Tailwind blue-600)

        'brand-accent': '#EAB308',          // DEFAULT: '#EAB308' (Tailwind yellow-500)
        'brand-accent-light': '#FACC15',   // light: '#FACC15' (Tailwind yellow-400)
        'brand-accent-dark': '#CA8A04',    // dark: '#CA8A04' (Tailwind yellow-600)
        
        // Brand 背景和文字颜色 - 您可以根据需要调整这些值
        // 这些名称是独立的，以避免与从CSS变量读取的 background/foreground 混淆
        'brand-bg': '#FFFFFF', // 示例浅色背景，您可以替换为您品牌定义的浅色背景
        'brand-bg-dark': '#111827', // 示例深色背景 (您之前的 brand-background)

        'brand-surface': '#F9FAFB', // 示例浅色表面，您可以替换为您品牌定义的浅色表面
        'brand-surface-dark': '#1F2937', // 示例深色表面 (您之前的 brand-surface)

        'brand-text': '#1F2937', // 示例浅色文字 (您之前的 brand-text-inverted)
        'brand-text-dark': '#F3F4F6', // 示例深色文字 (您之前的 brand-text-primary)
        
        'brand-text-muted': '#6B7280', // 示例浅色次要文字
        'brand-text-muted-dark': '#9CA3AF', // 示例深色次要文字 (您之前的 brand-text-secondary)
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: { // shadcn/ui 动画预设
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: { // shadcn/ui 动画预设
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // 添加动画插件
    require('@tailwindcss/typography'), // 添加 typography 插件
  ],
}
