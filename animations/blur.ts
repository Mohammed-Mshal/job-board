import { animationConfig } from "./config";

export const blurIn = {
  initial: {
    opacity: 0,
    filter: "blur(8px)",
  },

  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: animationConfig.duration,
      ease: animationConfig.ease,
    },
  },

  exit: {
    opacity: 0,
    filter: "blur(8px)",
    transition: {
      duration: animationConfig.duration,
      ease: animationConfig.ease,
    },
  },
};
