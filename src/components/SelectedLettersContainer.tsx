import { m } from "framer-motion";

import type { GameState, Action } from "../types.ts";
import styles from "../game.module.css";
import * as FramerVariants from "../utils/framerVariants.ts";
import SelectedLetterTile from "./SelectedLetterTile.tsx";
import SelectedLettersButtons from "./SelectedLettersButtons.tsx";

interface SelectedLettersContainerProps {
  status: GameState["status"];
  selectedLettersData: GameState["selectedLettersData"];
  dispatch: React.Dispatch<Action>;
}

export default function SelectedLettersContainer({
  status,
  selectedLettersData,
  dispatch,
}: SelectedLettersContainerProps) {
  const {
    currentSlotIndex,
    animateVariant = undefined,
    dispatchOnAnimationComplete = undefined,
    selectedLetters,
  } = selectedLettersData;

  function containerAnimationCompleteHandler() {
    if (dispatchOnAnimationComplete) {
      if (Array.isArray(dispatchOnAnimationComplete)) {
        dispatchOnAnimationComplete.forEach(dispatch);
      } else {
        dispatch(dispatchOnAnimationComplete);
      }
    }
  }

  return (
    <m.div
      className={`flex pt-3 ${styles.elementContainer}`}
      animate={animateVariant}
      variants={FramerVariants.selectedLettersContainer}
      custom={selectedLettersData.currentSlotIndex + 1}
      onAnimationComplete={containerAnimationCompleteHandler}
    >
      <div className={`flex ${styles.tileGrid}`}>
        {selectedLetters.map((selectedLetter) => (
          <SelectedLetterTile
            key={selectedLetter.key}
            selectedLetter={selectedLetter}
            dispatch={dispatch}
          />
        ))}
      </div>
      <SelectedLettersButtons
        status={status}
        currentSlotIndex={currentSlotIndex}
        dispatch={dispatch}
      />
    </m.div>
  );
}
