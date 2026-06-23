"use client";

import { AnimatePresence, type AnimatePresenceProps } from "motion/react";

type PresenceProps = AnimatePresenceProps;

export function Presence({ mode = "wait", ...props }: PresenceProps) {
  return <AnimatePresence mode={mode} {...props} />;
}

export { AnimatePresence };
