import type { Variants } from "framer-motion";

export const selectedLetter: Variants = {
  hiddenToshown: {
    scale: [1.2, 0.9, 1.1, 0.95, 1],
    transition: {
      duration: 0.5,
      ease: "easeOut",
      times: [0, 0.2, 0.5, 0.7, 1],
    },
  },
  hideShown: (index: number) => ({
    scale: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.1,
      ease: "linear",
    },
  }),
  showHidden: {
    scale: [0, 1.2, 0.8, 1],
    transition: {
      duration: 0.2,
      ease: "easeOut",
      times: [0, 0.4, 0.6, 1],
    },
  },
};

export const selectedLettersContainer: Variants = {
  waitForClearSelected: (totalLetters: number) => ({
    scale: [1, 1.0001, 1],
    transition: {
      duration: 0.35 + totalLetters * 0.05,
    },
  }),
  shake: {
    x: [0, -20, 20, -10, 10, 0],
    transition: {
      duration: 0.6,
      ease: "easeOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};
