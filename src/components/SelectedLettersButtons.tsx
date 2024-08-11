import type { GameState, Action } from "../types.ts";
import styles from "../game.module.css";
import {
  clearSelectedLettersAction,
  submitGuessAction,
} from "../reducers/gameStateActions.ts";

interface SelectedLettersButtonsProps {
  status: GameState["status"];
  currentSlotIndex: GameState["selectedLettersData"]["currentSlotIndex"];
  dispatch: React.Dispatch<Action>;
}

export default function SelectedLettersButtons({
  status,
  currentSlotIndex,
  dispatch,
}: SelectedLettersButtonsProps) {
  const clearButtonEnabled = status === "active" && currentSlotIndex > 0;
  const submitButtonEnabled = status === "active" && currentSlotIndex >= 3;

  function clearSelectedLettersHandler() {
    if (!clearButtonEnabled) return;
    dispatch(clearSelectedLettersAction());
  }

  function submitGuessHandler() {
    if (!submitButtonEnabled) return;
    dispatch(submitGuessAction());
  }

  return (
    <div className={`flex ${styles.tileGrid}`}>
      <button
        className={`${styles.tile} ${
          submitButtonEnabled ? styles.accept : styles.disabled
        }`}
        onClick={submitGuessHandler}
      >
        ✓
      </button>
      <button
        className={`${styles.tile} ${
          clearButtonEnabled ? styles.reject : styles.disabled
        }`}
        onClick={clearSelectedLettersHandler}
      >
        ✗
      </button>
    </div>
  );
}
