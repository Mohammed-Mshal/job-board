import { animationConfig } from "./config";

const transition = {
  duration: animationConfig.duration,
  ease: animationConfig.ease,
};

export const fadeIn = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
    transition,
  },

  exit: {
    opacity: 0,
    transition,
  },
};

export const fadeOut = {
  initial: {
    opacity: 1,
  },

  animate: {
    opacity: 0,
    transition,
  },

  exit: {
    opacity: 0,
    transition,
  },
};
