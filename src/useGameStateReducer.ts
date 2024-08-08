import React, { useReducer } from "react";

import type {
  WordData,
  GameState,
  Action,
  CellData,
  SelectedLettersData,
  SelectedLetter,
  AvailableLetter,
  Vector2D,
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
  currentStageData.words.forEach((wordData) => {
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
  // initialize selected letters data
  const selectedLettersData: GameState["selectedLettersData"] = {
    currentSlotIndex: 0,
    animateVariant: "",
  };
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
    boardAnimateVariant: "show",
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
        selectedLettersData: {
          ...state.selectedLettersData,
          currentSlotIndex: 0,
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
      // check if word exists on board
      const wordDataFoundOnBoard: WordData | undefined =
        state.currentStageData.words.find(
          (wordData) => wordData.word === guessedWord
        );
      if (!wordDataFoundOnBoard) {
        return clearSelectedLettersStateUpdate(state, "shake");
      }
      // check if word already previously found
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
          wordDataFoundOnBoard,
          "scaleBounce"
        );
      }
      // new word found
      return {
        ...state,
        loading: true,
        selectedLettersData: {
          ...state.selectedLettersData,
          animateVariant: "waitForMoveToBoard",
          dispatchOnAnimationComplete: [
            {
              type: "ENABLE_AVAILABLE_LETTERS",
              payload: null,
            },
            {
              type: "VICTORY_CHECK",
              payload: null,
            },
          ],
        },
        selectedLetters: state.selectedLetters.map((selectedLetter, index) => {
          if (selectedLetter.status !== "shown") return selectedLetter;
          // get target cell on gameGrid for this letter
          const letterGridPosition = getLetterGridPosition(
            wordDataFoundOnBoard,
            index
          );
          const targetCellData =
            state.gameGrid[letterGridPosition.y][letterGridPosition.x];
          // calc needed animation coordinates
          if (!selectedLetter.ref.current || !targetCellData?.ref?.current)
            throw Error(
              "Success animation start or target ref has not been set."
            );
          const startRect = selectedLetter.ref.current.getBoundingClientRect();
          const targetRect = targetCellData.ref.current.getBoundingClientRect();
          const animationOffset: Vector2D = {
            x: targetRect.left - startRect.left,
            y: targetRect.top - startRect.top,
          };
          // update state
          return {
            ...selectedLetter,
            animateVariant: "moveToBoard",
            customVariantData: { index, animationOffset },
            dispatchOnAnimationComplete: [
              {
                type: "SET_SELECTED_LETTER_HIDDEN",
                payload: selectedLetter.id,
              },
              {
                type: "SET_BOARD_LETTER_SHOWN",
                payload: {
                  cellDataId: targetCellData.id,
                  letter: selectedLetter.letter,
                },
              },
            ],
          };
        }),
        foundWords: [...state.foundWords, wordDataFoundOnBoard.word],
      };
    }

    case "SET_BOARD_LETTER_SHOWN": {
      const { cellDataId, letter } = action.payload;
      return {
        ...state,
        gameGrid: state.gameGrid.map((row) =>
          row.map((cellData) =>
            cellData.id === cellDataId
              ? {
                  ...cellData,
                  id: cellData.id + 1,
                  status: "shown",
                  letter,
                  animateVariant: "scaleBounce",
                }
              : cellData
          )
        ),
      };
    }

    case "SET_LOADING_STATE": {
      const newLoadingState = action.payload;
      return {
        ...state,
        loading: newLoadingState,
      };
    }

    case "VICTORY_CHECK": {
      const isVictory =
        state.foundWords.length === state.currentStageData.words.length;
      if (!isVictory) {
        return {
          ...state,
          loading: false,
        };
      } else {
        // victory achieved!
        return {
          ...state,
          boardAnimateVariant: "hide",
          boardDispatchOnAnimationComplete: {
            type: "LOAD_STAGE",
            payload: state.currentStage + 1,
          },
        };
      }
    }

    default:
      return state;
  }
}

function getLetterGridPosition(
  { orientation, startPos }: WordData,
  letterIndex: number
): Vector2D {
  return orientation === "x"
    ? { x: startPos.x + letterIndex, y: startPos.y }
    : { x: startPos.x, y: startPos.y + letterIndex };
}

function clearSelectedLettersStateUpdate(
  state: GameState,
  containerAnimateVariant: SelectedLettersData["animateVariant"]
): GameState {
  return {
    ...state,
    loading: true,
    selectedLettersData: {
      ...state.selectedLettersData,
      animateVariant: containerAnimateVariant,
      dispatchOnAnimationComplete: [
        {
          type: "ENABLE_AVAILABLE_LETTERS",
          payload: null,
        },
        {
          type: "SET_LOADING_STATE",
          payload: false,
        },
      ],
    },
    selectedLetters: state.selectedLetters.map((selectedLetter, index) =>
      selectedLetter.status === "shown"
        ? {
            ...selectedLetter,
            animateVariant: "scaleHide",
            customVariantData: index,
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
    const gridPosition = getLetterGridPosition(wordData, i);
    updatedGameGrid[gridPosition.y][gridPosition.x] = {
      ...updatedGameGrid[gridPosition.y][gridPosition.x],
      id: updatedGameGrid[gridPosition.y][gridPosition.x].id + 1,
      animateVariant,
    };
  }
  return { ...state, gameGrid: updatedGameGrid };
}
