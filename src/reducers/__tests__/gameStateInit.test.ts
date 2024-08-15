import { describe, test, expect } from "vitest";

import type { GameState } from "../../types.ts";
import { gameStateInit } from "../gameStateInit.ts";

const mockStagesData: GameState["stageData"][] = [
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
        word: "cater",
        startPos: { x: 7, y: 1 },
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
    ],
  },
];

describe("gameStateInit", {}, () => {
  test("basic state", {}, () => {
    const gameState = gameStateInit({ stage: 1, stagesData: mockStagesData });
    expect(gameState.totalStages).toBe(2);
    expect(gameState.stageData.columnCount).toBe(9);
    expect(gameState.selectedLettersData.currentSlotIndex).toBe(0);
    expect(gameState.availableLettersData.availableLetters[2].letter).toBe("e");
  });

  test("gameGrid state", {}, () => {
    const gameState = gameStateInit({ stage: 1, stagesData: mockStagesData });
    expect(gameState.gameGrid[0].length).toBe(gameState.stageData.columnCount);
    expect(gameState.gameGrid[6][8].status).toBe("empty");
    expect(gameState.gameGrid[3][6].status).toBe("hidden");
    expect(gameState.gameGrid[3][6].letter).toBe("e");
    expect(gameState.gameGrid[3][7].letter).toBe("a");
  });
});
