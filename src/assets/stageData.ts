import type { StageData } from "../types.ts";

export const stageData: StageData[] = [
  {
    rowCount: 7,
    columnCount: 10,
    letters: ["a", "e", "i", "d", "c", "t", "r"],
    words: [
      {
        word: "tried",
        startX: 4,
        startY: 4,
        orientation: "x",
      },
      {
        word: "care",
        startX: 2,
        startY: 2,
        orientation: "x",
      },
      {
        word: "cater",
        startX: 7,
        startY: 1,
        orientation: "y",
      },
      {
        word: "cited",
        startX: 0,
        startY: 6,
        orientation: "x",
      },
      {
        word: "dice",
        startX: 2,
        startY: 0,
        orientation: "y",
      },
      {
        word: "cat",
        startX: 7,
        startY: 1,
        orientation: "x",
      },
      {
        word: "crated",
        startX: 4,
        startY: 1,
        orientation: "y",
      },
    ],
  },
];
