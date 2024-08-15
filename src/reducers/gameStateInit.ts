import type { GameState, GridTile } from "../types.ts";
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
    availableLettersData: creatAvailableLettersData(stageData),
    foundWords: [],
    hints: 3,
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
        key: generateId(),
        status: "empty",
        letter: "",
        animateVariant: "",
      }))
  );
  stageData.words.forEach((wordData) => {
    for (let i = 0; i < wordData.word.length; i++) {
      const gridTileUpdate: Pick<GridTile, "status" | "letter"> = {
        status: "hidden",
        letter: wordData.word[i],
      };
      const gridPosition = getLetterGridPosition(wordData, i);
      gameGrid[gridPosition.y][gridPosition.x] = {
        ...gameGrid[gridPosition.y][gridPosition.x],
        ...gridTileUpdate,
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
      key: generateId(),
      status: "hidden",
      letter: "",
      animateVariant: "",
    })),
  };
}

function creatAvailableLettersData(
  stageData: GameState["stageData"]
): GameState["availableLettersData"] {
  return {
    key: 0,
    animateVariant: "",
    availableLetters: stageData.letters.map((letter) => ({
      id: generateId(),
      letter,
      disabled: false,
    })),
  };
}
