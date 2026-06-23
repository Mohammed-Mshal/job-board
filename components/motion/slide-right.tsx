"use client";

import { slideRight } from "@/animations";
import { MotionDiv, type MotionDivProps } from "./motion-div";

type SlideRightProps = Omit<MotionDivProps, "variants">;

export function SlideRight({ children, ...props }: SlideRightProps) {
  return (
    <MotionDiv variants={slideRight} {...props}>
      {children}
    </MotionDiv>
  );
}
