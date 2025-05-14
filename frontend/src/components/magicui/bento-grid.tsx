import { ArrowRightIcon } from "@radix-ui/react-icons";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

// ButtonVariant 类型定义已移除，因为它在此文件中未被直接使用
// 如果需要，可以在 config 文件中保留一个简化的 string 类型，或者从 Button 组件 props 推断

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string; // Crucial for spanning rows/columns
  background: ReactNode;
  Icon: React.ElementType;
  description: ReactNode;
  href?: string; // 用于直接链接
  cta?: string;  // 按钮文字
  onCtaClick?: () => void; // 新增：当CTA是触发器（例如模态框）时调用的回调
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  onCtaClick,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className, // User-provided classes for spanning etc.
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        // 如果将来需要根据按钮数量调整样式，这里的逻辑可以恢复或修改
        // (actions && actions.length > 1) ? "gap-2 flex-wrap" : ""
      )}
    >
      {href && cta ? (
        // 情况1：如果提供了 href，则渲染链接按钮
        <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      ) : cta && onCtaClick ? (
        // 情况2：如果没提供 href，但提供了 cta 和 onCtaClick，则渲染普通按钮
        <Button 
          variant="ghost" 
          size="sm" 
          className="pointer-events-auto" 
          onClick={onCtaClick} // 调用传递的回调
        >
          {cta}
          {/* 对于模态框触发器，通常不需要默认的向右箭头，除非特别设计 */}
          {/* <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" /> */}
        </Button>
      ) : null} 
      {/* 如果既没有href也没有onCtaClick的cta，则不渲染任何按钮 */}
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid }; 