import { motion } from "framer-motion";

import type { GameState, Action } from "./types.ts";
import styles from "./game.module.css";

interface SelectedLettersProps {
  loading: GameState["loading"];
  selectedLettersData: GameState["selectedLettersData"];
  selectedLetters: GameState["selectedLetters"];
  dispatch: React.Dispatch<Action>;
}

export default function SelectedLetters({
  loading,
  selectedLettersData,
  selectedLetters,
  dispatch,
}: SelectedLettersProps) {
  const {
    currentSlotIndex,
    animation: containerAnimation = undefined,
    dispatchOnAnimationComplete = undefined,
  } = selectedLettersData;
  const buttonsEnabled = !loading && currentSlotIndex >= 3;

  function letterAnimationCompleteHandler(
    dispatchOnAnimationComplete: Action | undefined
  ) {
    if (dispatchOnAnimationComplete) dispatch(dispatchOnAnimationComplete);
  }

  function containerAnimationCompleteHandler() {
    if (dispatchOnAnimationComplete) dispatch(dispatchOnAnimationComplete);
  }

  return (
    <motion.div
      className="flex gap-7 pb-5 pt-7"
      {...containerAnimation}
      onAnimationComplete={containerAnimationCompleteHandler}
    >
      <div className="flex gap-3">
        {selectedLetters.map((selectedLetter, index) => (
          <div key={index} className="pb-2 border-b-2 border-b-slate-200">
            <motion.div
              className={`${styles.tile} ${styles[selectedLetter.status]}`}
              ref={selectedLetter.ref}
              {...selectedLetter?.animation}
              onAnimationComplete={() =>
                letterAnimationCompleteHandler(
                  selectedLetter?.dispatchOnAnimationComplete
                )
              }
            >
              {selectedLetter.letter}
            </motion.div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button
          className={`${styles.tile} ${
            buttonsEnabled ? styles.accept : styles.disabled
          }`}
        >
          ✓
        </button>
        <button
          className={`${styles.tile} ${
            buttonsEnabled ? styles.reject : styles.disabled
          }`}
        >
          X
        </button>
      </div>
    </motion.div>
  );
}
