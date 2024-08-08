import type { GameState, Action } from "../types.ts";
import styles from "../game.module.css";

interface SelectedLettersButtonsProps {
  loading: GameState["loading"];
  currentSlotIndex: GameState["selectedLettersData"]["currentSlotIndex"];
  dispatch: React.Dispatch<Action>;
}

export default function SelectedLettersButtons({
  loading,
  currentSlotIndex,
  dispatch,
}: SelectedLettersButtonsProps) {
  const clearButtonEnabled = !loading && currentSlotIndex > 0;
  const submitButtonEnabled = !loading && currentSlotIndex >= 3;

  function clearSelectedLettersHandler() {
    if (!clearButtonEnabled) return;
    dispatch({ type: "CLEAR_SELECTED_LETTERS", payload: null });
  }

  function submitGuessHandler() {
    if (!submitButtonEnabled) return;
    dispatch({ type: "SUBMIT_GUESS", payload: null });
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
        X
      </button>
    </div>
  );
}
