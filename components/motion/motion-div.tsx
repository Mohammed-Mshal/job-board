"use client";

import { useMemo } from "react";
import {
  motion,
  type HTMLMotionProps,
  type TargetAndTransition,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

export type MotionDivProps = Omit<
  HTMLMotionProps<"div">,
  "variants" | "initial" | "animate" | "exit"
> & {
  variants: Variants;
  delay?: number;
  initial?: false | "initial";
};

function withDelay(variants: Variants, delay: number): Variants {
  if (delay <= 0) return variants;

  const animate = variants.animate;
  if (!animate || typeof animate !== "object") return variants;

  const animateTarget = animate as TargetAndTransition;

  return {
    ...variants,
    animate: {
      ...animateTarget,
      transition: {
        ...animateTarget.transition,
        delay,
      },
    },
  };
}

export function MotionDiv({
  variants,
  delay = 0,
  className,
  children,
  initial = "initial",
  whileInView = "animate",
  viewport = { amount: 0.5 },
  ...props
}: MotionDivProps) {
  const resolvedVariants = useMemo(
    () => withDelay(variants, delay),
    [variants, delay],
  );

  return (
    <motion.div
      variants={resolvedVariants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      exit="exit"
      className={cn(className,'')}
      {...props}
    >
      {children}
    </motion.div>
  );
}
