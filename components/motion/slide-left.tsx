"use client";

import { slideLeft } from "@/animations";
import { MotionDiv, type MotionDivProps } from "./motion-div";

type SlideLeftProps = Omit<MotionDivProps, "variants">;

export function SlideLeft({ children, ...props }: SlideLeftProps) {
  return (
    <MotionDiv variants={slideLeft} {...props}>
      {children}
    </MotionDiv>
  );
}
