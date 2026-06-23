import { animationConfig } from "./config";

const transition = {
  duration: animationConfig.duration,
  ease: animationConfig.ease,
};

export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },

  animate: {
    opacity: 1,
    scale: 1,
    transition,
  },

  exit: {
    opacity: 0,
    scale: 0.9,
    transition,
  },
};

export const scaleOut = {
  initial: {
    opacity: 1,
    scale: 1,
  },

  animate: {
    opacity: 0,
    scale: 0.9,
    transition,
  },

  exit: {
    opacity: 0,
    scale: 0.9,
    transition,
  },
};
