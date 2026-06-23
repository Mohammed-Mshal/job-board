"use client";

import { slideUp } from "@/animations";
import { MotionDiv, type MotionDivProps } from "./motion-div";

type SlideUpProps = Omit<MotionDivProps, "variants"> & {
  whileInView?: string;
  initial?: string;
  viewport?: {
    amount: number;
  };
};

export function SlideUp({ children, whileInView, initial, viewport, ...props }: SlideUpProps) {
  return (
    <MotionDiv variants={slideUp} whileInView={whileInView} initial={initial} viewport={{ ...viewport, once: true }} {...props}>
      {children}
    </MotionDiv>
  );
}
