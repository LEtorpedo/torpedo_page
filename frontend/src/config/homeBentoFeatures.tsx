// import React from 'react'; // React is not explicitly needed for JSX in modern React with Vite
// import type { ReactNode } from 'react'; // ReactNode is not used directly by these components
// Icons and other data/types will be imported from homeBentoFeatures.data.tsx if needed by these components
// For now, these background components seem self-contained or only use basic props.

// --- 示例背景组件 (可以放在 utils 或 components/ui) ---
// 您可以创建更多自定义背景组件或直接在配置中使用 JSX
export const PlaceholderStaticCardBackground = ({ bgColorClass = 'bg-muted/30 dark:bg-muted-dark/30' }: { bgColorClass?: string }) => (
  <div
    className={`pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10 ${bgColorClass}`}
  />
);

export const GradientCardBackground = ({ fromColor = 'from-brand-primary-light/20', toColor = 'to-brand-secondary-light/20' }: { fromColor?: string, toColor?: string }) => (
  <div
    className={`absolute inset-0 bg-gradient-to-br ${fromColor} ${toColor} opacity-50 transition-opacity duration-300 group-hover:opacity-70`}
  />
);
// --- End of示例背景组件 ---