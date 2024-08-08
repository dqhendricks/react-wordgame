import React from "react";
import { motion } from "framer-motion";

import type { GameState, StageData, Action } from "../types.ts";
import styles from "../game.module.css";
import * as FramerVariants from "../utils/framerVariants.ts";

interface GameGridProps {
  status: GameState["status"];
  currentStage: GameState["currentStage"];
  gameGrid: GameState["gameGrid"];
  columnCount: StageData["columnCount"];
  dispatch: React.Dispatch<Action>;
}

const GameGrid = React.memo(function ({
  status,
  currentStage,
  gameGrid,
  columnCount,
  dispatch,
}: GameGridProps) {
  const gridAnimateVariant =
    status === "closingStage" || status === "totalVictory" ? "hide" : "show";

  function animationCompleteHandler() {
    if (status === "closingStage")
      dispatch({
        type: "LOAD_STAGE",
        payload: currentStage + 1,
      });
  }

  return (
    <motion.div
      className={`inline-grid opacity-0 ${styles.tileGrid}`}
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
      animate={gridAnimateVariant}
      variants={FramerVariants.board}
      onAnimationComplete={animationCompleteHandler}
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
