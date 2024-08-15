import React from "react";
import { m } from "framer-motion";

import type { GameState, AvailableLetter, Action } from "../types.ts";
import styles from "../game.module.css";
import * as FramerVariants from "../utils/framerVariants.ts";
import { LightbulbIcon, ShuffleIcon } from "../assets/icons.tsx";
import {
  selectLetterAction,
  shuffleAvailableLettersAction,
  revealHintAction,
} from "../reducers/gameStateActions.ts";

interface AvailableLettersContainerProps {
  status: GameState["status"];
  availableLettersData: GameState["availableLettersData"];
  hints: GameState["hints"];
  dispatch: React.Dispatch<Action>;
}

const AvailableLettersContainer = React.memo(function ({
  status,
  availableLettersData,
  hints,
  dispatch,
}: AvailableLettersContainerProps) {
  const hintsEnabled = hints > 0;

  function handleTileClick(selectedAvailableLetter: AvailableLetter) {
    if (status !== "active" || selectedAvailableLetter.disabled) return;
    dispatch(selectLetterAction(selectedAvailableLetter));
  }

  function handleShuffleClick() {
    if (status !== "active") return;
    dispatch(shuffleAvailableLettersAction());
  }

  function handleHintClick() {
    if (!hintsEnabled || status !== "active") return;
    dispatch(revealHintAction());
  }

  return (
    <m.div
      key={availableLettersData.key}
      animate={availableLettersData.animateVariant}
      variants={FramerVariants.letterContainer}
      className={`flex m-auto ${styles.tileGrid}`}
    >
      <button
        className={`text-slate-600 ${styles.tile} ${styles.available}`}
        onClick={handleShuffleClick}
      >
        <ShuffleIcon />
      </button>
      {availableLettersData.availableLetters.map((availableLetter) => (
        <button
          key={availableLetter.id}
          className={`${styles.tile} ${
            availableLetter.disabled
              ? styles.disabled
              : `${styles.shown} ${styles.available}`
          }`}
          onClick={() => handleTileClick(availableLetter)}
        >
          {availableLetter.letter}
        </button>
      ))}

      <button
        className={`text-slate-600 relative ${styles.tile} ${
          hintsEnabled ? styles.available : "cursor-default"
        }`}
        onClick={handleHintClick}
      >
        <LightbulbIcon />
        <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 sm:translate-x-0 sm:-translate-y-0 text-xs sm:text-sm">
          {hints}
        </span>
      </button>
    </m.div>
  );
});

AvailableLettersContainer.displayName = "AvailableLettersContainer";

export default AvailableLettersContainer;
