import { motion } from "framer-motion";

import type { GameState, Action } from "../types.ts";
import styles from "../game.module.css";
import * as FramerVariants from "../utils/framerVariants.ts";
import SelectedLettersList from "./SelectedLettersList.tsx";
import SelectedLettersButtons from "./SelectedLettersButtons.tsx";

interface SelectedLettersProps {
  status: GameState["status"];
  selectedLettersData: GameState["selectedLettersData"];
  dispatch: React.Dispatch<Action>;
}

export default function SelectedLetters({
  status,
  selectedLettersData,
  dispatch,
}: SelectedLettersProps) {
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
    <motion.div
      className={`flex pt-3 ${styles.elementContainer}`}
      animate={animateVariant}
      variants={FramerVariants.selectedLettersContainer}
      custom={selectedLettersData.currentSlotIndex + 1}
      onAnimationComplete={containerAnimationCompleteHandler}
    >
      <SelectedLettersList
        selectedLetters={selectedLetters}
        dispatch={dispatch}
      />
      <SelectedLettersButtons
        status={status}
        currentSlotIndex={currentSlotIndex}
        dispatch={dispatch}
      />
    </motion.div>
  );
}
