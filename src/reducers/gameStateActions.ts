import type {
  Action,
  AvailableLetter,
  SelectedLetter,
  GridTile,
  GameState,
  Vector2D,
} from "../types.ts";

export function loadNextStageAction(): Action {
  return {
    type: "LOAD_NEXT_STAGE",
    payload: null,
  };
}

export function setGridTileViewportPositionAction(
  id: GridTile["id"],
  position: Vector2D
): Action {
  return {
    type: "SET_GRID_TILE_VIEWPORT_POSITION",
    payload: { id, position },
  };
}

export function setSelectedLetterViewportPositionAction(
  id: SelectedLetter["id"],
  position: Vector2D
): Action {
  return {
    type: "SET_SELECTED_LETTER_VIEWPORT_POSITION",
    payload: { id, position },
  };
}

export function selectLetterAction(availableLetter: AvailableLetter): Action {
  return {
    type: "SELECT_LETTER",
    payload: availableLetter,
  };
}

export function clearSelectedLettersAction(): Action {
  return { type: "CLEAR_SELECTED_LETTERS", payload: null };
}

export function enableAvailableLettersAction(): Action {
  return {
    type: "ENABLE_AVAILABLE_LETTERS",
    payload: null,
  };
}

export function setSelectedLetterHiddenAction(
  selectedLetterId: SelectedLetter["id"]
): Action {
  return {
    type: "SET_SELECTED_LETTER_HIDDEN",
    payload: selectedLetterId,
  };
}

export function submitGuessAction(): Action {
  return { type: "SUBMIT_GUESS", payload: null };
}

export function setBoardLetterShownAction(
  gridTileId: GridTile["id"],
  letter: GridTile["letter"]
): Action {
  return {
    type: "SET_BOARD_LETTER_SHOWN",
    payload: {
      gridTileId,
      letter,
    },
  };
}

export function setGameStatusAction(newStatus: GameState["status"]): Action {
  return {
    type: "SET_GAME_STATUS",
    payload: newStatus,
  };
}

export function victoryCheckAction(): Action {
  return {
    type: "VICTORY_CHECK",
    payload: null,
  };
}
