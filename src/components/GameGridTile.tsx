import { useRef, useEffect, useCallback } from "react";
import { m } from "framer-motion";

import type { GridTile, Action } from "../types.ts";
import styles from "../game.module.css";
import * as FramerVariants from "../utils/framerVariants.ts";
import { setGridTileViewportPositionAction } from "../reducers/gameStateActions.ts";

interface GameGridTileProps {
  gridTile: GridTile;
  dispatch: React.Dispatch<Action>;
}

export default function GameGridTile({
  gridTile,
  dispatch,
}: GameGridTileProps) {
  const tileRef = useRef<HTMLDivElement>(null);

  // report tile's screen position for use with animations
  const updatePosition = useCallback(() => {
    if (tileRef.current) {
      const domRect = tileRef.current.getBoundingClientRect();
      dispatch(
        setGridTileViewportPositionAction(gridTile.id, {
          x: domRect.left,
          y: domRect.top,
        })
      );
    }
  }, [gridTile.id, dispatch]);

  // update tile's screen position on mount and viewport resize
  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [updatePosition]);

  return (
    <m.div
      className={`${styles.tile} ${styles[gridTile.status]}`}
      ref={tileRef}
      animate={gridTile.animateVariant}
      variants={FramerVariants.tile}
    >
      {gridTile.status === "shown" ? gridTile.letter : ""}
    </m.div>
  );
}
