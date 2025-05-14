import { cva } from "class-variance-authority";

// 修改 dockVariants 以支持垂直布局和固定定位
export const dockVariants = cva(
  "fixed bottom-8 right-8 z-50 flex flex-col w-max max-w-[60px] items-center justify-center gap-3 rounded-2xl border bg-slate-100 p-2 shadow-lg dark:bg-slate-800 supports-backdrop-blur:bg-white/30 supports-backdrop-blur:dark:bg-black/30 backdrop-blur-md",
  // 移除了 h-[58px], mx-auto, mt-8。增加了 fixed, bottom-8, right-8, z-50, flex-col, max-w-[60px]
  // 调整了 gap, bg, dark:bg, backdrop-blur 支持的背景
);

// It might also be beneficial to move DockProps here if it purely depends on dockVariants
// For now, we'll keep DockProps in Dock.tsx and it will import dockVariants from here.
// Alternatively, to make this file self-contained for variants and related types:
/*
export interface DockPropsVariantOnly extends VariantProps<typeof dockVariants> {}
*/ 