import { animationConfig } from "./config";

export const popIn = {
  initial: {
    opacity: 0,
    scale: 0.85,
  },

  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },

  exit: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: animationConfig.duration,
      ease: animationConfig.ease,
    },
  },
};
