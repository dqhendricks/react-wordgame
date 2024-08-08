import React from "react";
import { motion } from "framer-motion";

import type { GameState, StageData, Action } from "../types.ts";
import styles from "../game.module.css";
import * as FramerVariants from "../utils/framerVariants.ts";

interface GameGridProps {
  gameGrid: GameState["gameGrid"];
  columnCount: StageData["columnCount"];
  boardAnimateVariant: GameState["boardAnimateVariant"];
  boardDispatchOnAnimationComplete: GameState["boardDispatchOnAnimationComplete"];
  dispatch: React.Dispatch<Action>;
}

const GameGrid = React.memo(function ({
  gameGrid,
  columnCount,
  boardAnimateVariant,
  boardDispatchOnAnimationComplete,
  dispatch,
}: GameGridProps) {
  function animationCompleteHandler(
    dispatchOnAnimationComplete: GameState["boardDispatchOnAnimationComplete"]
  ) {
    if (dispatchOnAnimationComplete) dispatch(dispatchOnAnimationComplete);
  }

  return (
    <motion.div
      className={`inline-grid opacity-0 ${styles.tileGrid}`}
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
      animate={boardAnimateVariant}
      variants={FramerVariants.board}
      onAnimationComplete={() =>
        animationCompleteHandler(boardDispatchOnAnimationComplete)
      }
    >
      {gameGrid.map((row) =>
        row.map((cellData) => (
          <motion.div
            key={cellData.id}
            className={`${styles.tile} ${styles[cellData.status]}`}
            ref={cellData?.ref}
            animate={cellData.animateVariant}
            variants={FramerVariants.tile}
          >
            {cellData.status === "shown" ? cellData.letter : ""}
          </motion.div>
        ))
      )}
    </motion.div>
  );
});

GameGrid.displayName = "GameGrid";

export default GameGrid;
