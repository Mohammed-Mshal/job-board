"use client";

import { fadeOut } from "@/animations";
import { MotionDiv, type MotionDivProps } from "./motion-div";

type FadeOutProps = Omit<MotionDivProps, "variants">;

export function FadeOut({ children, ...props }: FadeOutProps) {
  return (
    <MotionDiv variants={fadeOut} {...props}>
      {children}
    </MotionDiv>
  );
}
