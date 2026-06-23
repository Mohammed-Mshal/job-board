"use client";

import { scaleIn } from "@/animations";
import { MotionDiv, type MotionDivProps } from "./motion-div";

type ScaleInProps = Omit<MotionDivProps, "variants">;

export function ScaleIn({ children, ...props }: ScaleInProps) {
  return (
    <MotionDiv variants={scaleIn} {...props}>
      {children}
    </MotionDiv>
  );
}
