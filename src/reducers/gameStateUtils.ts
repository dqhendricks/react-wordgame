import type {
  WordData,
  GameState,
  GridTile,
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

function getLetterGridTile(
  state: GameState,
  wordData: WordData,
  letterIndex: number
): GridTile {
  const gridPosition = getLetterGridPosition(wordData, letterIndex);
  return state.gameGrid[gridPosition.y][gridPosition.x];
}

export function handleSetGridTileViewportPosition(
  state: GameState,
  id: GridTile["id"],
  position: GridTile["viewportPosition"]
): GameState {
  return {
    ...state,
    gameGrid: state.gameGrid.map((row) =>
      row.map((gridTile) =>
        gridTile.id === id
          ? { ...gridTile, viewportPosition: position }
          : gridTile
      )
    ),
  };
}

export function handleSetSelectedLetterViewportPosition(
  state: GameState,
  id: SelectedLetter["id"],
  position: SelectedLetter["viewportPosition"]
): GameState {
  return {
    ...state,
    selectedLettersData: {
      ...state.selectedLettersData,
      selectedLetters: state.selectedLettersData.selectedLetters.map(
        (selectedLetter) =>
          selectedLetter.id === id
            ? { ...selectedLetter, viewportPosition: position }
            : selectedLetter
      ),
    },
  };
}

export function handleSelectLetter(
  state: GameState,
  selectedAvailableLetter: AvailableLetter
): GameState {
  const currentSlotIndex = state.selectedLettersData.currentSlotIndex;
  return {
    ...state,
    // show selected letter with animation
    selectedLettersData: {
      ...state.selectedLettersData,
      currentSlotIndex: currentSlotIndex + 1,
      selectedLetters: state.selectedLettersData.selectedLetters.map(
        (selectedLetter, index) =>
          index === currentSlotIndex
            ? {
                ...selectedLetter,
                key: selectedLetter.key,
                status: "shown",
                letter: selectedAvailableLetter.letter,
                animateVariant: "scaleBounce",
                dispatchOnAnimationComplete: undefined,
              }
            : selectedLetter
      ),
    },
    // disable available letter
    availableLettersData: {
      ...state.availableLettersData,
      availableLetters: state.availableLettersData.availableLetters.map(
        (availableLetter) =>
          availableLetter.id === selectedAvailableLetter.id
            ? {
                ...selectedAvailableLetter,
                disabled: true,
              }
            : availableLetter
      ),
    },
  };
}

export function handleClearSelectedLetters(
  state: GameState,
  containerAnimateVariant: SelectedLettersData["animateVariant"]
): GameState {
  // begins animations and sets up dispatches for after animations complete
  return {
    ...state,
    status: "loading",
    selectedLettersData: {
      ...state.selectedLettersData,
      // set container to animate and dispatch post animation logic
      animateVariant: containerAnimateVariant,
      dispatchOnAnimationComplete: [
        enableAvailableLettersAction(),
        setGameStatusAction("active"),
      ],
      // animate hiding selected letters
      selectedLetters: state.selectedLettersData.selectedLetters.map(
        (selectedLetter, index) =>
          selectedLetter.status === "shown"
            ? {
                ...selectedLetter,
                key: selectedLetter.key,
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
    // reset selected letters data
    selectedLettersData: {
      ...state.selectedLettersData,
      currentSlotIndex: 0,
      animateVariant: "",
      dispatchOnAnimationComplete: undefined,
    },
    // enable all available letters
    availableLettersData: {
      ...state.availableLettersData,
      availableLetters: state.availableLettersData.availableLetters.map(
        (availableLetter) => ({
          ...availableLetter,
          disabled: false,
        })
      ),
    },
  };
}

export function handleSetSelectedLetterHidden(
  state: GameState,
  selectedLetterId: SelectedLetter["id"]
): GameState {
  return {
    ...state,
    // set selected letter to show with animation
    selectedLettersData: {
      ...state.selectedLettersData,
      selectedLetters: state.selectedLettersData.selectedLetters.map(
        (selectedLetter) => {
          return selectedLetter.id === selectedLetterId
            ? {
                ...selectedLetter,
                key: selectedLetter.key,
                letter: "",
                status: "hidden",
                animateVariant: "scaleShow",
                dispatchOnAnimationComplete: undefined,
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
  animateVariant: GridTile["animateVariant"]
): GameState {
  // update array references to signal need for rerenders
  const updatedGameGrid = state.gameGrid.map((row) => [...row]);
  // set all letters in word to animate
  for (let i = 0; i < wordData.word.length; i++) {
    const gridPosition = getLetterGridPosition(wordData, i);
    updatedGameGrid[gridPosition.y][gridPosition.x] = {
      ...updatedGameGrid[gridPosition.y][gridPosition.x],
      key: updatedGameGrid[gridPosition.y][gridPosition.x].key + 1,
      animateVariant,
    };
  }
  return { ...state, gameGrid: updatedGameGrid };
}

export function handleNewWordFound(
  state: GameState,
  wordDataFoundOnBoard: WordData
): GameState {
  // begins animations and sets up dispatches for after animations complete
  return {
    ...state,
    status: "loading",
    selectedLettersData: {
      ...state.selectedLettersData,
      // set container to animate and dispatch post animation logic
      animateVariant: "waitForMoveToBoard",
      dispatchOnAnimationComplete: [
        enableAvailableLettersAction(),
        victoryCheckAction(),
      ],
      // set selected letters to animate
      selectedLetters: state.selectedLettersData.selectedLetters.map(
        (selectedLetter, index) => {
          if (selectedLetter.status !== "shown") return selectedLetter;
          const targetGridTile = getLetterGridTile(
            state,
            wordDataFoundOnBoard,
            index
          );
          // calc needed animation offset
          if (
            !selectedLetter.viewportPosition ||
            !targetGridTile.viewportPosition
          )
            throw Error(
              `Success animation start or target position has not been set.`
            );
          const animationOffset = getVectorOffset(
            selectedLetter.viewportPosition,
            targetGridTile.viewportPosition
          );
          // return updated selected letters state
          return {
            ...selectedLetter,
            key: selectedLetter.key,
            animateVariant: "moveToBoard",
            customVariantData: { index, animationOffset },
            dispatchOnAnimationComplete: [
              setSelectedLetterHiddenAction(selectedLetter.id),
              setBoardLetterShownAction(
                targetGridTile.id,
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

function getVectorOffset(
  startVector: Vector2D,
  targetVector: Vector2D
): Vector2D {
  return {
    x: targetVector.x - startVector.x,
    y: targetVector.y - startVector.y,
  };
}

export function handleSetBoardLetterStatus(
  state: GameState,
  gridTileId: GridTile["id"],
  letter: GridTile["letter"],
  status: GridTile["status"]
): GameState {
  return {
    ...state,
    // change board letter to status "shown" and animate
    gameGrid: state.gameGrid.map((row) =>
      row.map((gridTile) =>
        gridTile.id === gridTileId
          ? {
              ...gridTile,
              key: gridTile.key + 1,
              status: status,
              letter,
              animateVariant: "scaleBounce",
            }
          : gridTile
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

export function shuffleAvailableLetters(state: GameState): GameState {
  return {
    ...state,
    availableLettersData: {
      key: state.availableLettersData.key + 1,
      animateVariant: "shake",
      availableLetters: shuffleArray([
        ...state.availableLettersData.availableLetters,
      ]),
    },
  };
}

function shuffleArray<T>(input: T[]): T[] {
  for (let i = input.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [input[i], input[j]] = [input[j], input[i]];
  }
  return input;
}

export function revealHint(state: GameState): GameState {
  const gridTile = findRandomHintTile(state);
  const updatedState = handleSetBoardLetterStatus(
    state,
    gridTile.id,
    gridTile.letter,
    "disabled"
  );
  return {
    ...updatedState,
    hints: state.hints - 1,
  };
}

export function findRandomHintTile(state: GameState): GridTile {
  const availableWords: WordData[] = state.stageData.words.filter(
    (wordData) => !state.foundWords.includes(wordData.word)
  );
  const randomWord: WordData =
    availableWords[Math.floor(Math.random() * availableWords.length)];
  const unguessedGridTiles: GridTile[] = randomWord.word
    .split("")
    .map((_, index) => getLetterGridTile(state, randomWord, index))
    .filter((gridTile) => gridTile.status === "hidden");
  if (unguessedGridTiles.length === 0) return findRandomHintTile(state);
  return unguessedGridTiles[
    Math.floor(Math.random() * unguessedGridTiles.length)
  ];
}
