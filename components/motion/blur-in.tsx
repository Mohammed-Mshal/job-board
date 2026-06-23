"use client";

import { blurIn } from "@/animations";
import { MotionDiv, type MotionDivProps } from "./motion-div";

type BlurInProps = Omit<MotionDivProps, "variants">;

export function BlurIn({ children, ...props }: BlurInProps) {
  return (
    <MotionDiv variants={blurIn} {...props}>
      {children}
    </MotionDiv>
  );
}
