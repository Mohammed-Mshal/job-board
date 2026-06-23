"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { slideUp } from "@/animations";
import { cn } from "@/lib/utils";

type RevealProps = Omit<
  HTMLMotionProps<"div">,
  "variants" | "initial" | "whileInView" | "viewport"
> & {
  variants?: Variants;
  delay?: number;
  once?: boolean;
  margin?: string;
};

export function Reveal({
  variants = slideUp,
  delay = 0,
  once = true,
  margin = "-80px",
  className,
  children,
  ...props
}: RevealProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once, margin }}
      transition={delay > 0 ? { delay } : undefined}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
