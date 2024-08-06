import type { Animation } from "../types.ts";

export const staggerChildren: Animation = {
  variants: {
    hidden: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
};

export const hiddenToShown: Animation = {
  initial: "hidden",
  animate: "shown",
  variants: {
    hidden: {},
    shown: {
      scale: [1.2, 0.9, 1.1, 0.95, 1],
      transition: {
        duration: 0.5,
        ease: "easeOut",
        times: [0, 0.2, 0.5, 0.7, 1],
      },
    },
  },
};
