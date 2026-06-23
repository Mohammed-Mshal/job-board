"use client";

import { slideDown } from "@/animations";
import { MotionDiv, type MotionDivProps } from "./motion-div";

type SlideDownProps = Omit<MotionDivProps, "variants">;

export function SlideDown({ children, ...props }: SlideDownProps) {
  return (
    <MotionDiv variants={slideDown} {...props}>
      {children}
    </MotionDiv>
  );
}
