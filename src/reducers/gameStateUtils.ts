import type {
  WordData,
  GameState,
  CellData,
  SelectedLettersData,
  SelectedLetter,
  AvailableLetter,
  Vector2D,
} from "../types.ts";
import {
  enableAvailableLettersAction,
  setSelectedLetterHiddenAction,
  setBoardLetterShownAction,
  setGameStatusAction,
  victoryCheckAction,
} from "./gameStateActions.ts";

export function getLetterGridPosition(
  { orientation, startPos }: WordData,
  letterIndex: number
): Vector2D {
  return orientation === "x"
    ? { x: startPos.x + letterIndex, y: startPos.y }
    : { x: startPos.x, y: startPos.y + letterIndex };
}

export function handleSelectLetter(
  state: GameState,
  selectedAvailableLetter: AvailableLetter
): GameState {
  const currentSlotIndex = state.selectedLettersData.currentSlotIndex;
  // update selected letter and available letter states
  return {
    ...state,
    selectedLettersData: {
      ...state.selectedLettersData,
      currentSlotIndex: currentSlotIndex + 1,
      selectedLetters: state.selectedLettersData.selectedLetters.map(
        (selectedLetter, index) =>
          index === currentSlotIndex
            ? {
                ...selectedLetter,
                status: "shown",
                letter: selectedAvailableLetter.letter,
                animateVariant: "scaleBounce",
                dispatchOnAnimationComplete: undefined,
              }
            : selectedLetter
      ),
    },
    availableLetters: state.availableLetters.map((availableLetter) =>
      availableLetter.id === selectedAvailableLetter.id
        ? {
            ...selectedAvailableLetter,
            disabled: true,
          }
        : availableLetter
    ),
  };
}

export function handleClearSelectedLetters(
  state: GameState,
  containerAnimateVariant: SelectedLettersData["animateVariant"]
): GameState {
  return {
    ...state,
    status: "loading",
    selectedLettersData: {
      ...state.selectedLettersData,
      animateVariant: containerAnimateVariant,
      dispatchOnAnimationComplete: [
        enableAvailableLettersAction(),
        setGameStatusAction("active"),
      ],
      selectedLetters: state.selectedLettersData.selectedLetters.map(
        (selectedLetter, index) =>
          selectedLetter.status === "shown"
            ? {
                ...selectedLetter,
                animateVariant: "scaleHide",
                customVariantData: index,
                dispatchOnAnimationComplete: setSelectedLetterHiddenAction(
                  selectedLetter.id
                ),
              }
            : selectedLetter
      ),
    },
  };
}

export function handleEnableAvailableLetters(state: GameState): GameState {
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

export function handleSetSelectedLetterHidden(
  state: GameState,
  selectedLetterId: SelectedLetter["id"]
): GameState {
  return {
    ...state,
    selectedLettersData: {
      ...state.selectedLettersData,
      selectedLetters: state.selectedLettersData.selectedLetters.map(
        (selectedLetter) => {
          return selectedLetter.id === selectedLetterId
            ? {
                ...selectedLetter,
                letter: "",
                status: "hidden",
                animateVariant: "scaleShow",
              }
            : selectedLetter;
        }
      ),
    },
  };
}

export function handleBoardWordAnimationUpdate(
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

export function handleNewWordFound(
  state: GameState,
  wordDataFoundOnBoard: WordData
): GameState {
  return {
    ...state,
    status: "loading",
    selectedLettersData: {
      ...state.selectedLettersData,
      animateVariant: "waitForMoveToBoard",
      dispatchOnAnimationComplete: [
        enableAvailableLettersAction(),
        victoryCheckAction(),
      ],
      selectedLetters: state.selectedLettersData.selectedLetters.map(
        (selectedLetter, index) => {
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
          // return updated selected letters state
          return {
            ...selectedLetter,
            animateVariant: "moveToBoard",
            customVariantData: { index, animationOffset },
            dispatchOnAnimationComplete: [
              setSelectedLetterHiddenAction(selectedLetter.id),
              setBoardLetterShownAction(
                targetCellData.id,
                selectedLetter.letter
              ),
            ],
          };
        }
      ),
    },
    foundWords: [...state.foundWords, wordDataFoundOnBoard.word],
  };
}

export function handleSetBoardLetterShown(
  state: GameState,
  cellDataId: CellData["id"],
  letter: CellData["letter"]
): GameState {
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

export function handleSetGameStatus(
  state: GameState,
  newStatus: GameState["status"]
): GameState {
  return {
    ...state,
    status: newStatus,
  };
}
