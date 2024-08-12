import { useRef, useEffect, useCallback } from "react";
import { m } from "framer-motion";

import type { SelectedLetter, Action } from "../types.ts";
import styles from "../game.module.css";
import * as FramerVariants from "../utils/framerVariants.ts";
import { setSelectedLetterViewportPositionAction } from "../reducers/gameStateActions.ts";

function letterAnimationCompleteHandler(
  dispatch: React.Dispatch<Action>,
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

interface SelectedLetterTileProps {
  selectedLetter: SelectedLetter;
  dispatch: React.Dispatch<Action>;
}

export default function SelectedLetterTile({
  selectedLetter,
  dispatch,
}: SelectedLetterTileProps) {
  const tileRef = useRef<HTMLDivElement>(null);

  // report tile's screen position for use with animations
  const updatePosition = useCallback(() => {
    if (tileRef.current) {
      const domRect = tileRef.current.getBoundingClientRect();
      dispatch(
        setSelectedLetterViewportPositionAction(selectedLetter.id, {
          x: domRect.left,
          y: domRect.top,
        })
      );
    }
  }, [selectedLetter.id, dispatch]);

  // update tile's screen position on mount and viewport resize
  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [updatePosition]);

  return (
    <div className="pb-2 border-b-2 border-b-slate-200">
      <m.div
        className={`${styles.tile} ${styles[selectedLetter.status]}`}
        ref={tileRef}
        animate={selectedLetter.animateVariant}
        variants={FramerVariants.tile}
        custom={selectedLetter.customVariantData}
        onAnimationComplete={() =>
          letterAnimationCompleteHandler(
            dispatch,
            selectedLetter?.dispatchOnAnimationComplete
          )
        }
      >
        {selectedLetter.letter}
      </m.div>
    </div>
  );
}
