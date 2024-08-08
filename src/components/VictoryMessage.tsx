import { motion } from "framer-motion";

import type { GameState } from "../types.ts";
import * as FramerVariants from "../utils/framerVariants.ts";

interface VictoryMessageProps {
  totalVictory: GameState["totalVictory"];
}

export default function VictoryMessage({ totalVictory }: VictoryMessageProps) {
  return (
    <>
      {totalVictory && (
        <motion.h2
          className="text-4xl text-pretty text-center tracking-wider p-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 bg-clip-text text-transparent bg-gradient-to-br from-orange-500 from-10% via-green-500 via-50% to-purple-500 to-90%"
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
