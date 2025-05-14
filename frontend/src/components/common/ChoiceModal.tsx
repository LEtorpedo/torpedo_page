"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  // DialogFooter, // Temporarily removed as it's not used
} from "@/components/ui/dialog"; // 确保shadcn/ui Dialog路径正确
// import { Button } from "@/components/ui/button"; // Temporarily removed as it's not used
import { Link } from 'react-router-dom';
import { Pointer, type PointerProps } from "@/components/magicui/pointer"; // 确保Magic UI Pointer路径和Props类型正确
import type { LucideIcon } from 'lucide-react'; // 或 React.ElementType

export interface ModalChoice {
  id: string;
  text: string;
  description?: string;
  href: string;
  Icon: LucideIcon | React.ElementType;
  iconSize?: number | string; // 例如 48 或 "3rem"
  pointerConfig?: Partial<PointerProps> & { 
    customPointerVisual?: React.ReactNode; // 用于自定义指针的JSX (例如 SVG 或 Emoji div)
    mouseX?: never; // Explicitly disallow mouseX here to catch if it's passed
  };
  target?: string;
  rel?: string;
}

export interface ChoiceModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  modalTitle: string;
  modalDescription?: string;
  choices: ModalChoice[];
  // onChoiceClick?: (choiceId: string) => void; // 点击选项后可以执行的回调
}

export const ChoiceModal: React.FC<ChoiceModalProps> = ({
  isOpen,
  onOpenChange,
  modalTitle,
  modalDescription,
  choices,
  // onChoiceClick,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl"> {/* 调整宽度 */}
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-2">{modalTitle}</DialogTitle>
          {modalDescription && (
            <DialogDescription className="text-center text-muted-foreground">
              {modalDescription}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="grid gap-6 py-6 sm:grid-cols-1 md:grid-cols-2">
          {choices.map((choice) => {
            const ChoiceIcon = choice.Icon;
            const iconSize = choice.iconSize || 48;

            const linkContent = (
              <div className="flex flex-col items-center text-center">
                <ChoiceIcon size={iconSize} className="mb-4 text-brand-primary dark:text-brand-primary-light" />
                <h3 className="text-lg font-semibold mb-1">{choice.text}</h3>
                {choice.description && (
                  <p className="text-sm text-muted-foreground">{choice.description}</p>
                )}
              </div>
            );

            // Add cursor: 'none' to the Link's style if pointerConfig exists for this choice
            const linkStyle: React.CSSProperties = choice.pointerConfig ? { cursor: 'none' } : {};

            const interactiveElement = (
              <Link
                to={choice.href}
                target={choice.target}
                rel={choice.rel}
                onClick={() => {
                  onOpenChange(false); 
                }}
                className="block p-6 border rounded-lg hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:border-slate-700 dark:hover:border-slate-500 relative z-10"
                style={linkStyle} // Apply the conditional cursor style
              >
                {linkContent}
              </Link>
            );

            if (choice.pointerConfig) {
              // Separate customPointerVisual from other PointerProps
              const { customPointerVisual: initialCustomPointerVisual, ...restPointerProps } = choice.pointerConfig;

              let finalCustomPointerVisual = initialCustomPointerVisual;
              if (typeof initialCustomPointerVisual === 'string') {
                // If it's a string (likely an emoji), wrap it in a div with a text size class
                // Adjust text-2xl as needed for your specific emoji and desired size
                finalCustomPointerVisual = <div className="text-2xl">{initialCustomPointerVisual}</div>;
              }

              return (
                // This div is the parent that Pointer component will affect (setting cursor: none)
                <div key={choice.id} className="relative choice-item-wrapper">
                  {interactiveElement}
                  {/* Pointer component is a sibling, its children define the cursor's appearance */}
                  <Pointer {...restPointerProps}>
                    {finalCustomPointerVisual || null}
                  </Pointer>
                </div>
              );
            }
            
            return (
              <div key={choice.id} className="choice-item-wrapper">
                {interactiveElement}
              </div>
            );
          })}
        </div>
        
        {/* 可选的页脚关闭按钮 */}
        {/* <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}; 