"use client";

import { staggerContainer } from "@/animations";
import { MotionDiv, type MotionDivProps } from "./motion-div";

type StaggerContainerProps = Omit<MotionDivProps, "variants">;

export function StaggerContainer({ children, ...props }: StaggerContainerProps) {
  return (
    <MotionDiv variants={staggerContainer} {...props}>
      {children}
    </MotionDiv>
  );
}
