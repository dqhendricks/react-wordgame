import { motion } from "framer-motion";

import type { GameState, Action } from "./types.ts";
import styles from "./game.module.css";
import * as Animations from "./utils/framerAnimations.ts";

interface SelectedLettersProps {
  loading: GameState["loading"];
  currentSelectedLetterIndex: GameState["currentSelectedLetterIndex"];
  selectedLetters: GameState["selectedLetters"];
  dispatch: React.Dispatch<Action>;
}

export default function SelectedLetters({
  loading,
  currentSelectedLetterIndex,
  selectedLetters,
  dispatch,
}: SelectedLettersProps) {
  const buttonsEnabled = !loading && currentSelectedLetterIndex >= 3;

  function animationCompleteHandler(
    dispatchOnAnimationComplete: Action | undefined
  ) {
    if (dispatchOnAnimationComplete) dispatch(dispatchOnAnimationComplete);
  }

  return (
    <div className="flex gap-7 pb-5 pt-7">
      <motion.div className="flex gap-3" {...Animations.staggerChildren}>
        {selectedLetters.map((selectedLetterData, index) => (
          <div key={index} className="pb-2 border-b-2 border-b-slate-200">
            <motion.div
              className={`${styles.tile} ${styles[selectedLetterData.status]}`}
              ref={selectedLetterData.ref}
              {...selectedLetterData?.animation}
              onAnimationComplete={() =>
                animationCompleteHandler(
                  selectedLetterData?.dispatchOnAnimationComplete
                )
              }
            >
              {selectedLetterData.letter}
            </motion.div>
          </div>
        ))}
      </motion.div>
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
    </div>
  );
}
