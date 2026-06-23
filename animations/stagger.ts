import { animationConfig } from "./config";

const transition = {
  duration: animationConfig.duration,
  ease: animationConfig.ease,
};

export const staggerContainer = {
  initial: {},

  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },

  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const staggerItem = {
  initial: {
    opacity: 0,
    y: 16,
  },

  animate: {
    opacity: 1,
    y: 0,
    transition,
  },

  exit: {
    opacity: 0,
    y: 16,
    transition,
  },
};
