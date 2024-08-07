import type { GameState, StageData } from "../types.ts";
import styles from "../game.module.css";

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
      {gameGrid.map((row, rowIndex) =>
        row.map((cellData, columnIndex) => (
          <div
            key={`${rowIndex}-${columnIndex}`}
            className={`${styles.tile} ${styles[cellData.status]}`}
          >
            <strong>
              {cellData.status === "shown" ? cellData.letter : ""}
            </strong>
          </div>
        ))
      )}
    </div>
  );
}
