export interface GameState {
  status: "active" | "loading" | "closingStage" | "wonTheGame";
  stage: number;
  totalStages: number;
  stageData: StageData;
  gameGrid: CellData[][];
  selectedLettersData: SelectedLettersData;
  availableLetters: AvailableLetter[];
  foundWords: string[];
}

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
  dispatchOnAnimationComplete?: Action | Action[] | undefined;
  selectedLetters: SelectedLetter[];
}

export interface SelectedLetter {
  id: number;
  status: TileStatus;
  letter: string;
  ref: React.RefObject<HTMLDivElement>; // to get position data for animation
  animateVariant: TileAnimateVariants;
  customVariantData?: number | MoveAnimationVariantData;
  dispatchOnAnimationComplete?: Action | Action[] | undefined;
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

export interface LoadStageAction {
  type: "LOAD_NEXT_STAGE";
  payload: null;
}

export interface SelectLetterAction {
  type: "SELECT_LETTER";
  payload: AvailableLetter;
}

export interface ClearSelectedLettersAction {
  type: "CLEAR_SELECTED_LETTERS";
  payload: null;
}

export interface EnableAvailableLettersAction {
  type: "ENABLE_AVAILABLE_LETTERS";
  payload: null;
}

export interface SetSelectedLetterHiddenAction {
  type: "SET_SELECTED_LETTER_HIDDEN";
  payload: SelectedLetter["id"];
}

export interface SubmitGuessAction {
  type: "SUBMIT_GUESS";
  payload: null;
}

export interface SetBoardLetterShownAction {
  type: "SET_BOARD_LETTER_SHOWN";
  payload: { cellDataId: CellData["id"]; letter: CellData["letter"] };
}

export interface SetGameStatusAction {
  type: "SET_GAME_STATUS";
  payload: GameState["status"];
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
  | SetGameStatusAction
  | VictoryCheckAction;
