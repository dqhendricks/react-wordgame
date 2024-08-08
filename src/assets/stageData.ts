import type { StageData } from "../types.ts";

export const stageData: StageData[] = [
  {
    rowCount: 7,
    columnCount: 10,
    letters: ["a", "e", "i", "d", "c", "t", "r"],
    words: [
      {
        word: "tried",
        startPos: { x: 4, y: 4 },
        orientation: "x",
      },
      {
        word: "care",
        startPos: { x: 2, y: 2 },
        orientation: "x",
      },
      {
        word: "cater",
        startPos: { x: 7, y: 1 },
        orientation: "y",
      },
      {
        word: "cited",
        startPos: { x: 0, y: 6 },
        orientation: "x",
      },
      {
        word: "dice",
        startPos: { x: 2, y: 0 },
        orientation: "y",
      },
      {
        word: "cat",
        startPos: { x: 7, y: 1 },
        orientation: "x",
      },
      {
        word: "crated",
        startPos: { x: 4, y: 1 },
        orientation: "y",
      },
    ],
  },
  {
    rowCount: 7,
    columnCount: 9,
    letters: ["l", "t", "e", "d", "e", "b", "a"],
    words: [
      {
        word: "bated",
        startPos: { x: 6, y: 0 },
        orientation: "y",
      },
      {
        word: "eat",
        startPos: { x: 6, y: 3 },
        orientation: "x",
      },
      {
        word: "tale",
        startPos: { x: 8, y: 3 },
        orientation: "y",
      },
      {
        word: "dealt",
        startPos: { x: 2, y: 2 },
        orientation: "x",
      },
      {
        word: "debate",
        startPos: { x: 3, y: 1 },
        orientation: "y",
      },
      {
        word: "belated",
        startPos: { x: 0, y: 4 },
        orientation: "x",
      },
      {
        word: "beet",
        startPos: { x: 2, y: 6 },
        orientation: "x",
      },
    ],
  },
];
