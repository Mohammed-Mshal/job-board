"use client";

import { popIn } from "@/animations";
import { MotionDiv, type MotionDivProps } from "./motion-div";

type PopInProps = Omit<MotionDivProps, "variants">;

export function PopIn({ children, ...props }: PopInProps) {
  return (
    <MotionDiv variants={popIn} {...props}>
      {children}
    </MotionDiv>
  );
}
