import { useReducer } from "react";

import type { WordData, GameState, Action, SelectedLetter } from "../types.ts";
import { gameStateInit } from "./gameStateInit.ts";
import * as gameStateUtils from "./gameStateUtils.ts";

export function useGameStateReducer(initialStage: number) {
  return useReducer(gameStateReducer, initialStage, gameStateInit);
}

function gameStateReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "LOAD_NEXT_STAGE": {
      const nextStage = state.stage + 1;
      const wonTheGame = nextStage === state.totalStages;
      if (wonTheGame)
        return gameStateUtils.handleSetGameStatus(state, "wonTheGame");
      return gameStateInit(nextStage);
    }

    case "SELECT_LETTER": {
      const selectedAvailableLetter = action.payload;
      return gameStateUtils.handleSelectLetter(state, selectedAvailableLetter);
    }

    case "CLEAR_SELECTED_LETTERS": {
      return gameStateUtils.handleClearSelectedLetters(
        state,
        "waitForClearSelected"
      );
    }

    case "ENABLE_AVAILABLE_LETTERS": {
      return gameStateUtils.handleEnableAvailableLetters(state);
    }

    case "SET_SELECTED_LETTER_HIDDEN": {
      const selectedLetterId: SelectedLetter["id"] = action.payload;
      return gameStateUtils.handleSetSelectedLetterHidden(
        state,
        selectedLetterId
      );
    }

    case "SUBMIT_GUESS": {
      const guessedWord = state.selectedLettersData.selectedLetters.reduce(
        (acc, selectedLetter) => {
          return selectedLetter.status === "shown"
            ? acc + selectedLetter.letter
            : acc;
        },
        ""
      );
      // check if word exists on board
      const wordDataFoundOnBoard: WordData | undefined =
        state.stageData.words.find((wordData) => wordData.word === guessedWord);
      if (!wordDataFoundOnBoard) {
        return gameStateUtils.handleClearSelectedLetters(state, "shake");
      }
      // check if word already previously found
      const wordPreviouslyGuessed = state.foundWords.some(
        (word) => word === guessedWord
      );
      if (wordPreviouslyGuessed) {
        const updatedState = gameStateUtils.handleClearSelectedLetters(
          state,
          "waitForClearSelected"
        );
        return gameStateUtils.handleBoardWordAnimationUpdate(
          updatedState,
          wordDataFoundOnBoard,
          "scaleBounce"
        );
      }
      // new word found
      return gameStateUtils.handleNewWordFound(state, wordDataFoundOnBoard);
    }

    case "SET_BOARD_LETTER_SHOWN": {
      const { cellDataId, letter } = action.payload;
      return gameStateUtils.handleSetBoardLetterShown(
        state,
        cellDataId,
        letter
      );
    }

    case "SET_GAME_STATUS": {
      const newStatus = action.payload;
      return gameStateUtils.handleSetGameStatus(state, newStatus);
    }

    case "VICTORY_CHECK": {
      const isVictory =
        state.foundWords.length === state.stageData.words.length;
      if (!isVictory) {
        return gameStateUtils.handleSetGameStatus(state, "active");
      } else {
        // stage victory achieved!
        return gameStateUtils.handleSetGameStatus(state, "closingStage");
      }
    }

    default:
      return state;
  }
}
