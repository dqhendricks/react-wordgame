type TileStatus = "shown" | "hidden" | "empty";

type TileAnimateVariants =
  | ""
  | "scaleBounce"
  | "scaleHide"
  | "scaleShow"
  | "moveToBoard";

export interface Vector2D {
  x: number;
  y: number;
}

export interface WordData {
  word: string;
  startPos: Vector2D;
  orientation: "x" | "y"; // left-right/up-down
}

export interface StageData {
  rowCount: number;
  columnCount: number;
  letters: string[];
  words: WordData[];
}

export interface CellData {
  id: number;
  status: TileStatus;
  letter: string;
  ref?: React.RefObject<HTMLDivElement>; // to get position data for animations
  animateVariant: TileAnimateVariants;
}

export interface SelectedLettersData {
  currentSlotIndex: number; // used to determine next selected letter slot to populate
  animateVariant: "" | "waitForClearSelected" | "shake" | "waitForMoveToBoard";
  dispatchOnAnimationComplete?: Action | Action[];
}

export interface SelectedLetter {
  id: number;
  status: TileStatus;
  letter: string;
  ref: React.RefObject<HTMLDivElement>; // to get position data for animation
  animateVariant: TileAnimateVariants;
  customVariantData?: number | MoveAnimationVariantData;
  dispatchOnAnimationComplete?: Action | Action[];
}

export interface MoveAnimationVariantData {
  index: number;
  animationOffset: Vector2D;
}

export interface AvailableLetter {
  id: number;
  letter: string;
  disabled: boolean;
}

export interface GameState {
  loading: boolean;
  totalVictory: boolean;
  currentStage: number;
  totalStages: number;
  currentStageData: StageData;
  gameGrid: CellData[][];
  boardAnimateVariant: "" | "hide" | "show";
  boardDispatchOnAnimationComplete?: Action;
  selectedLettersData: SelectedLettersData;
  selectedLetters: SelectedLetter[];
  availableLetters: AvailableLetter[];
  foundWords: string[];
}

export interface LoadStageAction {
  type: "LOAD_STAGE";
  payload: number;
}

export interface SelectLetterAction {
  type: "SELECT_LETTER";
  payload: AvailableLetter;
}

export interface ClearSelectedLettersAction {
  type: "CLEAR_SELECTED_LETTERS";
  payload: null;
}

export interface SetSelectedLetterHiddenAction {
  type: "SET_SELECTED_LETTER_HIDDEN";
  payload: SelectedLetter["id"];
}

export interface EnableAvailableLettersAction {
  type: "ENABLE_AVAILABLE_LETTERS";
  payload: null;
}

export interface SubmitGuessAction {
  type: "SUBMIT_GUESS";
  payload: null;
}

export interface SetBoardLetterShownAction {
  type: "SET_BOARD_LETTER_SHOWN";
  payload: { cellDataId: CellData["id"]; letter: CellData["letter"] };
}

export interface SetLoadingStateAction {
  type: "SET_LOADING_STATE";
  payload: GameState["loading"];
}

export interface VictoryCheckAction {
  type: "VICTORY_CHECK";
  payload: null;
}

export type Action =
  | LoadStageAction
  | SelectLetterAction
  | ClearSelectedLettersAction
  | SetSelectedLetterHiddenAction
  | EnableAvailableLettersAction
  | SubmitGuessAction
  | SetBoardLetterShownAction
  | SetLoadingStateAction
  | VictoryCheckAction;
