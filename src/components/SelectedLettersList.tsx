import { motion } from "framer-motion";

import type { GameState, SelectedLetter, Action } from "../types.ts";
import styles from "../game.module.css";
import * as FramerVariants from "../utils/framerVariants.ts";

interface SelectedLettersListProps {
  selectedLetters: GameState["selectedLettersData"]["selectedLetters"];
  dispatch: React.Dispatch<Action>;
}

export default function SelectedLetterList({
  selectedLetters,
  dispatch,
}: SelectedLettersListProps) {
  function letterAnimationCompleteHandler(
    dispatchOnAnimationComplete: SelectedLetter["dispatchOnAnimationComplete"]
  ) {
    if (dispatchOnAnimationComplete) {
      if (Array.isArray(dispatchOnAnimationComplete)) {
        dispatchOnAnimationComplete.forEach(dispatch);
      } else {
        dispatch(dispatchOnAnimationComplete);
      }
    }
  }

  return (
    <div className={`flex ${styles.tileGrid}`}>
      {selectedLetters.map((selectedLetter, index) => (
        <div key={index} className="pb-2 border-b-2 border-b-slate-200">
          <motion.div
            className={`${styles.tile} ${styles[selectedLetter.status]}`}
            ref={selectedLetter.ref}
            animate={selectedLetter.animateVariant}
            variants={FramerVariants.tile}
            custom={selectedLetter.customVariantData}
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
  );
}
