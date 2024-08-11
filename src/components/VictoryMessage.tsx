import { motion } from "framer-motion";

import type { GameState } from "../types.ts";
import styles from "../game.module.css";
import * as FramerVariants from "../utils/framerVariants.ts";

interface VictoryMessageProps {
  status: GameState["status"];
}

export default function VictoryMessage({ status }: VictoryMessageProps) {
  return (
    <>
      {status === "wonTheGame" && (
        <motion.h2
          className={`text-pretty text-center p-1 tracking-wider absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 bg-clip-text text-transparent bg-gradient-to-br from-orange-500 from-10% via-green-500 via-50% to-purple-500 to-90% ${styles.subTitle}`}
          animate={"bobAndBounce"}
          variants={FramerVariants.victory}
        >
          Congratulations!
          <br />
          All stages complete!
        </motion.h2>
      )}
    </>
  );
}
