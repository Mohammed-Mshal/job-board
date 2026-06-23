"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { animationConfig } from "@/animations/config";
import { cn } from "@/lib/utils";

type CollapseProps = Omit<HTMLMotionProps<"div">, "animate" | "initial"> & {
  open: boolean;
};

export function Collapse({ open, className, children, ...props }: CollapseProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        height: open ? "auto" : 0,
        opacity: open ? 1 : 0,
      }}
      transition={{
        duration: animationConfig.duration,
        ease: animationConfig.ease,
      }}
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
