/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme'); // Import defaultTheme

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 确保覆盖您所有的模板文件
  ],
  theme: {
    extend: {
      fontFamily: { // Add fontFamily configuration
        serif: ['Noto Serif SC', 'Noto Serif', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'brand-primary': { // 主色调 - 青绿色系
          light: '#2DD4BF', // Tailwind teal-400
          DEFAULT: '#14B8A6', // Tailwind teal-500
          dark: '#0D9488',  // Tailwind teal-600
        },
        'brand-secondary': { // 辅助色 - 蓝色系
          light: '#60A5FA', // Tailwind blue-400
          DEFAULT: '#3B82F6', // Tailwind blue-500
          dark: '#2563EB',  // Tailwind blue-600
        },
        'brand-accent': { // 强调色 - 黄色系
          light: '#FACC15', // Tailwind yellow-400
          DEFAULT: '#EAB308', // Tailwind yellow-500
          dark: '#CA8A04',  // Tailwind yellow-600
        },
        'brand-background': '#111827', // 深色模式背景 - Tailwind gray-900
        'brand-surface': '#1F2937',  // 深色模式表面 - Tailwind gray-800
        'brand-text-primary': '#F3F4F6',    // 深色背景主文字 - Tailwind gray-100
        'brand-text-secondary': '#9CA3AF', // 深色背景次要文字 - Tailwind gray-400
        'brand-text-inverted': '#1F2937', // 浅色背景主文字 (用于需要反色显示的场景) - Tailwind gray-800
      },
    },
  },
  plugins: [],
}
