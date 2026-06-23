"use client";

import { fadeIn } from "@/animations";
import { MotionDiv, type MotionDivProps } from "./motion-div";

type FadeInProps = Omit<MotionDivProps, "variants">;

export function FadeIn({ children, ...props }: FadeInProps) {
  return (
    <MotionDiv variants={fadeIn} {...props}>
      {children}
    </MotionDiv>
  );
}
