import React, { useReducer } from "react";

import type {
  WordData,
  GameState,
  Action,
  CellData,
  SelectedLettersData,
  SelectedLetter,
  AvailableLetter,
} from "./types.ts";
import { stageData } from "./assets/stageData.ts";

function generateId() {
  return Math.random();
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
        id: generateId(),
        status: "empty",
        letter: "",
        animateVariant: "",
      }))
  );
  // populate game grid word data
  currentStageData.words.forEach(({ word, startX, startY, orientation }) => {
    for (let i = 0; i < word.length; i++) {
      const cellDataUpdate: Pick<CellData, "status" | "letter" | "ref"> = {
        status: "hidden",
        letter: word[i],
        ref: React.createRef<HTMLDivElement>(),
      };
      if (orientation === "x") {
        gameGrid[startY][startX + i] = {
          ...gameGrid[startY][startX + i],
          ...cellDataUpdate,
        };
      } else if (orientation === "y") {
        gameGrid[startY + i][startX] = {
          ...gameGrid[startY + i][startX],
          ...cellDataUpdate,
        };
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
      animateVariant: "",
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
    foundWords: [],
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
        animateVariant: "scaleBounce",
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
      return clearSelectedLettersStateUpdate(state, "waitForClearSelected");
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
                animateVariant: "scaleShow",
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

    case "SUBMIT_GUESS": {
      const guessedWord = state.selectedLetters.reduce(
        (acc, selectedLetter) => {
          return selectedLetter.status === "shown"
            ? acc + selectedLetter.letter
            : acc;
        },
        ""
      );
      const wordFoundOnBoard = state.currentStageData.words.find(
        (wordData) => wordData.word === guessedWord
      );
      if (wordFoundOnBoard) {
        const wordPreviouslyGuessed = state.foundWords.some(
          (word) => word === guessedWord
        );
        if (wordPreviouslyGuessed) {
          const updatedState = clearSelectedLettersStateUpdate(
            state,
            "waitForClearSelected"
          );
          return boardWordAnimationStateUpdate(
            updatedState,
            wordFoundOnBoard,
            "scaleBounce"
          );
        } else {
          return {
            ...state,
          };
        }
      } else {
        return clearSelectedLettersStateUpdate(state, "shake");
      }
    }

    default:
      return state;
  }
}

function clearSelectedLettersStateUpdate(
  state: GameState,
  containerAnimateVariant: SelectedLettersData["animateVariant"]
): GameState {
  return {
    ...state,
    loading: true,
    selectedLettersData: {
      currentSlotIndex: 0,
      animateVariant: containerAnimateVariant,
      dispatchOnAnimationComplete: {
        type: "ENABLE_AVAILABLE_LETTERS",
        payload: null,
      },
    },
    selectedLetters: state.selectedLetters.map((selectedLetter) =>
      selectedLetter.status === "shown"
        ? {
            ...selectedLetter,
            animateVariant: "scaleHide",
            dispatchOnAnimationComplete: {
              type: "SET_SELECTED_LETTER_HIDDEN",
              payload: selectedLetter.id,
            },
          }
        : selectedLetter
    ),
  };
}

function boardWordAnimationStateUpdate(
  state: GameState,
  wordData: WordData,
  animateVariant: CellData["animateVariant"]
): GameState {
  // update array references to signal need for rerenders
  const updatedGameGrid = state.gameGrid.map((row) => [...row]);
  for (let i = 0; i < wordData.word.length; i++) {
    if (wordData.orientation === "x") {
      updatedGameGrid[wordData.startY][wordData.startX + i] = {
        ...updatedGameGrid[wordData.startY][wordData.startX + i],
        id: updatedGameGrid[wordData.startY][wordData.startX + i].id + 1,
        animateVariant,
      };
    } else if (wordData.orientation === "y") {
      updatedGameGrid[wordData.startY + i][wordData.startX] = {
        ...updatedGameGrid[wordData.startY + i][wordData.startX],
        id: updatedGameGrid[wordData.startY][wordData.startX + i].id + 1,
        animateVariant,
      };
    }
  }
  return { ...state, gameGrid: updatedGameGrid };
}
