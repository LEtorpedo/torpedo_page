"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
} from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from 'react-dom';

export type PointerProps = Omit<HTMLMotionProps<"div">, "ref"> & {
  children?: React.ReactNode;
  // 可以根据需要添加额外的 props，例如 pointerColor, pointerShape 等如果想通过 props 控制
};

export function Pointer({
  className,
  style,
  children,
  ...props
}: PointerProps): React.JSX.Element {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);

    // console.log("Pointer useEffect: Attaching listeners");
    if (typeof window !== "undefined" && containerRef.current) {
      const parentElement = containerRef.current.parentElement;
      if (parentElement) {
        // console.log("Pointer: Parent element found", parentElement);
        parentElement.style.cursor = "none";

        const handleMouseMove = (e: MouseEvent) => {
          x.set(e.clientX);
          y.set(e.clientY);
        };

        const handleMouseEnter = (e: MouseEvent) => {
          // console.log(`Pointer MouseEnter: clientX=${e.clientX}, clientY=${e.clientY}`);
          x.set(e.clientX);
          y.set(e.clientY);
          setIsActive(true);
          // console.log("Pointer: isActive set to true");
        };

        const handleMouseLeave = () => {
          setIsActive(false);
          // console.log("Pointer: isActive set to false");
        };

        parentElement.addEventListener("mousemove", handleMouseMove);
        parentElement.addEventListener("mouseenter", handleMouseEnter);
        parentElement.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          // console.log("Pointer: Cleaning up listeners");
          if (parentElement) { 
            parentElement.style.cursor = "";
            parentElement.removeEventListener("mousemove", handleMouseMove);
            parentElement.removeEventListener("mouseenter", handleMouseEnter);
            parentElement.removeEventListener("mouseleave", handleMouseLeave);
          }
        };
      }
    }
  }, [x, y]); 

  // For debugging, log the values of x and y being used by motion.div
  // Note: Motion values are objects, use .get() to read their current value if needed for logging outside motion components.
  // However, passing them directly to motion component's style prop is the correct usage.
  // console.log(`Pointer render: x=${x.get()}, y=${y.get()}, isActive=${isActive}`);

  const pointerVisual = isActive && portalRoot ? (
    createPortal(
      <AnimatePresence>
        {isActive && (
          <motion.div
            className={cn(
              "pointer-events-none fixed z-50",
              "flex items-center justify-center",
              className
            )}
            style={{
              top: y,
              left: x,
              transform: 'translate(-50%, -50%)',
              width: '24px',
              height: '24px',
              textAlign: 'center',
              lineHeight: '24px',
              fontSize: '20px',
              ...style,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            {...props}
          >
            {/* Wrap children in a span for fine-grained positioning adjustment */}
            <span style={{ position: 'relative', display: 'inline-block', left: '-10px', top: '-5px' }}>
              {children}
            </span>
          </motion.div>
        )}
      </AnimatePresence>,
      portalRoot
    )
  ) : null;

  return (
    <>
      {/* This div is used as a ref to get the parent element for event listeners */}
      <div ref={containerRef} style={{ display: "none" }} />
      {pointerVisual}
    </>
  );
} 