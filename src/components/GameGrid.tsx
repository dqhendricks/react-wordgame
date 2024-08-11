import React from "react";
import { m } from "framer-motion";

import type { GameState, StageData, Action } from "../types.ts";
import styles from "../game.module.css";
import * as FramerVariants from "../utils/framerVariants.ts";
import { loadNextStageAction } from "../reducers/gameStateActions.ts";

interface GameGridProps {
  status: GameState["status"];
  gameGrid: GameState["gameGrid"];
  columnCount: StageData["columnCount"];
  dispatch: React.Dispatch<Action>;
}

const GameGrid = React.memo(function ({
  status,
  gameGrid,
  columnCount,
  dispatch,
}: GameGridProps) {
  const gridAnimateVariant =
    status === "closingStage" || status === "wonTheGame" ? "hide" : "show";

  function animationCompleteHandler() {
    if (status === "closingStage") dispatch(loadNextStageAction());
  }

  return (
    <m.div
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
          <m.div
            key={cellData.id}
            className={`${styles.tile} ${styles[cellData.status]}`}
            ref={cellData?.ref}
            animate={cellData.animateVariant}
            variants={FramerVariants.tile}
          >
            {cellData.status === "shown" ? cellData.letter : ""}
          </m.div>
        ))
      )}
    </m.div>
  );
});

GameGrid.displayName = "GameGrid";

export default GameGrid;
