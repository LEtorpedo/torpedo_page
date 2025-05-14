"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  // useTransform, // Removed as it's not used for now
} from "framer-motion";
import React, { useRef } from "react";

import { cn } from "@/lib/utils"; // 注意: 这个路径需要根据项目结构调整

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom"; // 这个可能指内部图标对齐，而非Dock本身方向
  children: React.ReactNode;
}

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

// 修改 dockVariants 以支持垂直布局和固定定位
const dockVariants = cva(
  "fixed bottom-8 right-8 z-50 flex flex-col w-max max-w-[60px] items-center justify-center gap-3 rounded-2xl border bg-slate-100 p-2 shadow-lg dark:bg-slate-800 supports-backdrop-blur:bg-white/30 supports-backdrop-blur:dark:bg-black/30 backdrop-blur-md",
  // 移除了 h-[58px], mx-auto, mt-8。增加了 fixed, bottom-8, right-8, z-50, flex-col, max-w-[60px]
  // 调整了 gap, bg, dark:bg, backdrop-blur 支持的背景
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle", 
      ...props
    },
    ref,
  ) => {
    // 对于垂直Dock，理论上应该使用mouseY，但为了简化，暂时保持mouseX或禁用效果
    const mouseY = useMotionValue(Infinity); // 或者 mouseX，取决于我们想保留哪个轴的交互

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child as React.ReactElement<DockIconProps>, {
            mouseX: mouseY, // 传递mouseY或一个固定的值以暂时禁用放大
            size: iconSize,
            magnification: iconMagnification, // 可以暂时设置为iconSize来禁用放大
            distance: iconDistance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseY.set(e.pageY)} // 改为pageY，并传递给mouseX prop of DockIcon
        onMouseLeave={() => mouseY.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          // 对于flex-col, items-start/center/end 控制水平对齐
          "items-start": direction === "top",    // 水平居左
          "items-center": direction === "middle", // 水平居中 (默认)
          "items-end": direction === "bottom",   // 水平居右
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps { 
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>; // 将保持mouseX命名，但它现在可能接收Y轴的值
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  // magnification = DEFAULT_MAGNIFICATION, // Temporarily removed
  // distance = DEFAULT_DISTANCE, // Temporarily removed
  // mouseX, // Temporarily removed as it's not used in the simplified version
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const currentSize = typeof size === 'number' ? size : DEFAULT_SIZE;
  const padding = Math.max(6, currentSize * 0.2);

  // const defaultInternalMouseCoord = useMotionValue(Infinity); // Temporarily commented out
  // const internalMouseCoord = mouseX || defaultInternalMouseCoord; // Temporarily commented out

  // 为了简化垂直布局的初次显示，暂时让放大效果不那么明显或固定
  // const distanceCalc = useTransform(internalMouseCoord, (val: number) => {

  // 暂时使用固定尺寸，禁用基于鼠标位置的放大，直到我们调整好垂直逻辑
  const scaleDimension = useSpring(currentSize, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleDimension, height: scaleDimension, padding }} // 应用缩放尺寸
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className,
      )}
      {...props} // 将剩余的props传递给motion.div
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants }; 