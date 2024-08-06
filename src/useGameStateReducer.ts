import React, { useReducer } from "react";

import type {
  GameState,
  Action,
  CellData,
  SelectedLetterData,
  AvailableLetterData,
} from "./types.ts";
import { stageData } from "./assets/stageData.ts";
import * as Animations from "./utils/framerAnimations.ts";

function generateId() {
  return Math.random().toString();
}

export function useGameStateReducer(initialStage: number) {
  return useReducer(gameStateReducer, initialStage, gameStateReducerInit);
}

function gameStateReducerInit(currentStage: number): GameState {
  const loading = false;
  const currentStageData = stageData[currentStage];
  // initialize game grid
  const gameGrid: GameState["gameGrid"] = Array.from(
    { length: currentStageData.rowCount },
    () =>
      Array.from({ length: currentStageData.columnCount }, () => ({
        status: "empty",
        letter: "",
      }))
  );
  // populate game grid word data
  currentStageData.words.forEach(({ word, startX, startY, orientation }) => {
    for (let i = 0; i < word.length; i++) {
      const cellData: CellData = {
        status: "hidden",
        letter: word[i],
        ref: React.createRef<HTMLDivElement>(),
      };
      if (orientation === "x") {
        gameGrid[startY][startX + i] = cellData;
      } else if (orientation === "y") {
        gameGrid[startY + i][startX] = cellData;
      }
    }
  });
  // initialize selected letter data
  const currentSelectedLetterIndex = 0;
  const selectedLetters: GameState["selectedLetters"] = Array.from(
    { length: currentStageData.letters.length },
    () => ({
      id: generateId(),
      availableLetterId: null,
      status: "hidden",
      letter: "",
      ref: React.createRef<HTMLDivElement>(),
    })
  );
  // initialize available letter data
  const availableLetters: GameState["availableLetters"] =
    currentStageData.letters.map((letter) => ({
      id: generateId(),
      letter,
      disabled: false,
    }));
  // return state
  return {
    loading,
    currentStage,
    currentStageData,
    gameGrid,
    currentSelectedLetterIndex,
    selectedLetters,
    availableLetters,
  };
}

function gameStateReducer(state: GameState, action: Action) {
  switch (action.type) {
    case "LOAD_STAGE": {
      const stage = action.payload;
      return gameStateReducerInit(stage);
    }

    case "SELECT_LETTER": {
      const selectedAvailableLetter = action.payload;
      // disable selected available letter
      const updatedSelectedAvailableLetter: AvailableLetterData = {
        ...action.payload,
        disabled: true,
      };
      // create selected letter update object
      const selectedLetterUpdate: Pick<
        SelectedLetterData,
        "availableLetterId" | "status" | "letter" | "animation"
      > = {
        availableLetterId: updatedSelectedAvailableLetter.id,
        status: "shown",
        letter: updatedSelectedAvailableLetter.letter,
        animation: Animations.hiddenToShown,
      };
      // update state
      return {
        ...state,
        availableLetters: state.availableLetters.map((availableLetter) =>
          availableLetter.id === selectedAvailableLetter.id
            ? updatedSelectedAvailableLetter
            : availableLetter
        ),
        currentSelectedLetterIndex: state.currentSelectedLetterIndex + 1,
        selectedLetters: state.selectedLetters.map((selectedLetter, index) =>
          index === state.currentSelectedLetterIndex
            ? { ...selectedLetter, ...selectedLetterUpdate }
            : selectedLetter
        ),
      };
    }

    default:
      return state;
  }
}
