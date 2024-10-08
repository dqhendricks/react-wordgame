import type { Variants } from "framer-motion";

import type { MoveAnimationVariantData } from "../types.ts";

export const tile: Variants = {
  scaleBounce: {
    scale: [1.2, 0.9, 1.1, 0.95, 1],
    transition: {
      duration: 0.5,
      ease: "easeOut",
      times: [0, 0.2, 0.5, 0.7, 1],
    },
  },

  scaleBounceBig: {
    scale: [1.2, 0.9, 1.1, 0.95, 1],
    transition: {
      duration: 1,
      ease: "easeOut",
      times: [0, 0.2, 0.5, 0.7, 1],
    },
  },

  scaleHide: (index: number) => ({
    scale: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.1,
      ease: "linear",
    },
  }),

  scaleShow: {
    x: [0, 0],
    y: [0, 0],
    scale: [0, 1.2, 0.8, 1],
    transition: {
      duration: 0.25,
      ease: "easeOut",
      times: [0, 0.4, 0.6, 1],
    },
  },

  moveToBoard: ({ index, animationOffset }: MoveAnimationVariantData) => ({
    x: [0, animationOffset.x],
    y: [0, animationOffset.y],
    scale: 1, // without this, framer-animation bug occurs that fires onAnimationComplete before animation completed
    transition: {
      delay: index * 0.05,
      duration: 0.5,
      ease: "easeInOut",
    },
  }),
};

export const letterContainer: Variants = {
  waitForClearSelected: (totalLetters: number) => ({
    scale: [1, 1.0001, 1],
    transition: {
      duration: 0.2 + totalLetters * 0.05,
    },
  }),

  shake: (totalLetters: number = 3) => ({
    x: [0, -20, 20, -10, 10, 0],
    transition: {
      duration: 0.35 + totalLetters * 0.1,
      ease: "easeOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  }),

  waitForMoveToBoard: (totalLetters: number) => ({
    scale: [1, 1.0001, 1],
    transition: {
      duration: 0.7 + totalLetters * 0.05,
    },
  }),
};

export const board: Variants = {
  // must end at normal position to get accurate grid tile positions within grid tile component mounts
  hide: {
    scale: [1, 1.05, 1, 1.05, 1, 1.05, 1, 0.5, 0, 1],
    rotate: [0, 0, 0, 0, 0, 0, 0, 180, 360, 0],
    opacity: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    transition: {
      duration: 2,
      ease: "linear",
      times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 0.999, 1],
    },
  },

  show: {
    scale: [0, 0.5, 1],
    rotate: [360, 180, 0],
    opacity: [0, 1, 1],
    transition: {
      duration: 1,
      ease: "linear",
      times: [0, 0.5, 1],
    },
  },
};

export const victory: Variants = {
  bobAndBounce: {
    rotate: [-12, 10, -12],
    scale: [1, 1.2, 1],
    x: ["-50%", "-50%", "-50%"],
    y: ["-50%", "-50%", "-50%"],
    transition: {
      rotate: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 1,
        ease: "easeInOut",
      },
      scale: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  },
};
