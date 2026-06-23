import { animationConfig } from "./config";

const transition = {
  duration: animationConfig.duration,
  ease: animationConfig.ease,
};

export const slideUp = {
  initial: {
    opacity: 0,
    y: 20,
  },

  animate: {
    opacity: 1,
    y: 0,
    transition,
  },

  exit: {
    opacity: 0,
    y: 20,
    transition,
  },
};

export const slideDown = {
  initial: {
    opacity: 0,
    y: -20,
  },

  animate: {
    opacity: 1,
    y: 0,
    transition,
  },

  exit: {
    opacity: 0,
    y: -20,
    transition,
  },
};

export const slideLeft = {
  initial: {
    opacity: 0,
    x: 20,
  },

  animate: {
    opacity: 1,
    x: 0,
    transition,
  },

  exit: {
    opacity: 0,
    x: 20,
    transition,
  },
};

export const slideRight = {
  initial: {
    opacity: 0,
    x: -20,
  },

  animate: {
    opacity: 1,
    x: 0,
    transition,
  },

  exit: {
    opacity: 0,
    x: -20,
    transition,
  },
};
