import type { TargetAndTransition, Target, Variants } from "framer-motion";

export interface WordData {
  word: string;
  startX: number;
  startY: number;
  orientation: "x" | "y";
}

export interface StageData {
  rowCount: number;
  columnCount: number;
  letters: string[];
  words: WordData[];
}

type TileStatus = "shown" | "hidden" | "empty";

export interface CellData {
  status: TileStatus;
  letter: string;
  ref?: React.RefObject<HTMLDivElement>; // to get position data for animation
}

export interface Animation {
  initial?: Target | string;
  animate?: TargetAndTransition | string;
  variants?: Variants;
}

export interface SelectedLetterData {
  id: string;
  availableLetterId: string | null;
  status: TileStatus;
  letter: string;
  ref: React.RefObject<HTMLDivElement>; // to get position data for animation
  animation?: Animation;
  dispatchOnAnimationComplete?: Action;
}

export interface AvailableLetterData {
  id: string;
  letter: string;
  disabled: boolean;
}

export interface GameState {
  loading: boolean;
  currentStage: number;
  currentStageData: StageData;
  gameGrid: CellData[][];
  currentSelectedLetterIndex: number; // used to determining next selected letter slot to populate
  selectedLetters: SelectedLetterData[];
  availableLetters: AvailableLetterData[];
}

export interface Position {
  x: number;
  y: number;
}

export interface LoadStageAction {
  type: "LOAD_STAGE";
  payload: number;
}

export interface SelectLetterAction {
  type: "SELECT_LETTER";
  payload: AvailableLetterData;
}

export interface ClearSelectedLettersAction {
  type: "CLEAR_SELECTED_LETTERS";
  payload: null;
}

export type Action =
  | LoadStageAction
  | SelectLetterAction
  | ClearSelectedLettersAction;
