import React from "react";

import type { GameState, CellData } from "../types.ts";
import { getLetterGridPosition } from "./gameStateUtils.ts";

interface gameStateInitArgs {
  stage: GameState["stage"];
  stagesData: GameState["stageData"][];
}

export function gameStateInit({
  stage,
  stagesData,
}: gameStateInitArgs): GameState {
  const stageData = stagesData[stage];
  // return initial state
  return {
    status: "active",
    stage,
    totalStages: stagesData.length,
    stageData,
    gameGrid: createGameGrid(stageData),
    selectedLettersData: createSelectedLettersData(stageData),
    availableLetters: creatAvailableLetters(stageData),
    foundWords: [],
  };
}

function generateId() {
  return Math.random();
}

function createGameGrid(
  stageData: GameState["stageData"]
): GameState["gameGrid"] {
  const gameGrid: GameState["gameGrid"] = Array.from(
    { length: stageData.rowCount },
    () =>
      Array.from({ length: stageData.columnCount }, () => ({
        id: generateId(),
        status: "empty",
        letter: "",
        animateVariant: "",
      }))
  );
  stageData.words.forEach((wordData) => {
    for (let i = 0; i < wordData.word.length; i++) {
      const cellDataUpdate: Pick<CellData, "status" | "letter" | "ref"> = {
        status: "hidden",
        letter: wordData.word[i],
        ref: React.createRef<HTMLDivElement>(),
      };
      const gridPosition = getLetterGridPosition(wordData, i);
      gameGrid[gridPosition.y][gridPosition.x] = {
        ...gameGrid[gridPosition.y][gridPosition.x],
        ...cellDataUpdate,
      };
    }
  });
  return gameGrid;
}

function createSelectedLettersData(
  stageData: GameState["stageData"]
): GameState["selectedLettersData"] {
  return {
    currentSlotIndex: 0,
    animateVariant: "",
    selectedLetters: Array.from({ length: stageData.letters.length }, () => ({
      id: generateId(),
      status: "hidden",
      letter: "",
      ref: React.createRef<HTMLDivElement>(),
      animateVariant: "",
    })),
  };
}

function creatAvailableLetters(
  stageData: GameState["stageData"]
): GameState["availableLetters"] {
  return stageData.letters.map((letter) => ({
    id: generateId(),
    letter,
    disabled: false,
  }));
}
