import React, { useReducer } from "react";

import type {
  GameState,
  Action,
  CellData,
  SelectedLetter,
  AvailableLetter,
} from "./types.ts";
import { stageData } from "./assets/stageData.ts";

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
  // initialize selected letters data
  const selectedLettersData = { currentSlotIndex: 0, animateVariant: "" };
  const selectedLetters: GameState["selectedLetters"] = Array.from(
    { length: currentStageData.letters.length },
    () => ({
      id: generateId(),
      status: "hidden",
      letter: "",
      ref: React.createRef<HTMLDivElement>(),
      animateVariant: "", // need to set this initially or onAnimationComplete gets wonky
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
    selectedLettersData,
    selectedLetters,
    availableLetters,
  };
}

function gameStateReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "LOAD_STAGE": {
      const stage = action.payload;
      return gameStateReducerInit(stage);
    }

    case "SELECT_LETTER": {
      const selectedAvailableLetter = action.payload;
      const currentSlotIndex = state.selectedLettersData.currentSlotIndex;
      // disable selected available letter
      const updatedSelectedAvailableLetter: AvailableLetter = {
        ...action.payload,
        disabled: true,
      };
      // create selected letter update object
      const selectedLetterUpdate: Pick<
        SelectedLetter,
        "status" | "letter" | "animateVariant" | "dispatchOnAnimationComplete"
      > = {
        status: "shown",
        letter: updatedSelectedAvailableLetter.letter,
        animateVariant: "hiddenToshown",
        dispatchOnAnimationComplete: undefined,
      };
      // update state
      return {
        ...state,
        selectedLettersData: {
          ...state.selectedLettersData,
          currentSlotIndex: currentSlotIndex + 1,
        },
        selectedLetters: state.selectedLetters.map((selectedLetter, index) =>
          index === currentSlotIndex
            ? { ...selectedLetter, ...selectedLetterUpdate }
            : selectedLetter
        ),
        availableLetters: state.availableLetters.map((availableLetter) =>
          availableLetter.id === selectedAvailableLetter.id
            ? updatedSelectedAvailableLetter
            : availableLetter
        ),
      };
    }

    case "CLEAR_SELECTED_LETTERS": {
      // update state
      return {
        ...state,
        loading: true,
        selectedLettersData: {
          currentSlotIndex: 0,
          animateVariant: "waitForClearSelected",
          dispatchOnAnimationComplete: {
            type: "ENABLE_AVAILABLE_LETTERS",
            payload: null,
          },
        },
        selectedLetters: state.selectedLetters.map((selectedLetter) =>
          selectedLetter.status === "shown"
            ? {
                ...selectedLetter,
                animateVariant: "hideShown",
                dispatchOnAnimationComplete: {
                  type: "SET_SELECTED_LETTER_HIDDEN",
                  payload: selectedLetter.id,
                },
              }
            : selectedLetter
        ),
      };
    }

    case "SET_SELECTED_LETTER_HIDDEN": {
      const selectedLetterId: SelectedLetter["id"] = action.payload;
      return {
        ...state,
        selectedLetters: state.selectedLetters.map((selectedLetter) => {
          return selectedLetter.id === selectedLetterId
            ? {
                ...selectedLetter,
                letter: "",
                status: "hidden",
                animateVariant: "showHidden",
              }
            : selectedLetter;
        }),
      };
    }

    case "ENABLE_AVAILABLE_LETTERS": {
      return {
        ...state,
        loading: false,
        selectedLettersData: {
          ...state.selectedLettersData,
          animateVariant: "",
          dispatchOnAnimationComplete: undefined,
        },
        availableLetters: state.availableLetters.map((availableLetter) => ({
          ...availableLetter,
          disabled: false,
        })),
      };
    }

    default:
      return state;
  }
}
