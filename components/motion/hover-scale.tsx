"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type HoverScaleProps = HTMLMotionProps<"div"> & {
  scale?: number;
  tapScale?: number;
};

export function HoverScale({
  scale = 1.03,
  tapScale = 0.97,
  className,
  children,
  ...props
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: tapScale }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
