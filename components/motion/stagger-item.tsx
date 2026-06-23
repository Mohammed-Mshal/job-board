"use client";

import { staggerItem } from "@/animations";
import { MotionDiv, type MotionDivProps } from "./motion-div";

type StaggerItemProps = Omit<MotionDivProps, "variants">;

export function StaggerItem({ children, ...props }: StaggerItemProps) {
  return (
    <MotionDiv variants={staggerItem} {...props}>
      {children}
    </MotionDiv>
  );
}
