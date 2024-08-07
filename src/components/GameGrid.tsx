import { motion } from "framer-motion";

import type { GameState, StageData } from "../types.ts";
import styles from "../game.module.css";
import * as FramerVariants from "../utils/framerVariants.ts";

interface GameGridProps {
  gameGrid: GameState["gameGrid"];
  columnCount: StageData["columnCount"];
}

export default function GameGrid({ gameGrid, columnCount }: GameGridProps) {
  return (
    <div
      className={`inline-grid gap-3`}
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {gameGrid.map((row) =>
        row.map((cellData) => (
          <motion.div
            key={cellData.id}
            className={`${styles.tile} ${styles[cellData.status]}`}
            ref={cellData?.ref}
            animate={cellData.animateVariant}
            variants={FramerVariants.selectedLetter}
          >
            <strong>
              {cellData.status === "shown" ? cellData.letter : ""}
            </strong>
          </motion.div>
        ))
      )}
    </div>
  );
}
