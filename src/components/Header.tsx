import type { GameState, Action } from "../types.ts";
import styles from "../game.module.css";
import Modal from "./Modal.tsx";
import { setGameStatusAction } from "../reducers/gameStateActions.ts";

interface HeaderProps {
  status: GameState["status"];
  stage: GameState["stage"];
  totalStages: GameState["totalStages"];
  dispatch: React.Dispatch<Action>;
}

export default function Header({
  status,
  stage,
  totalStages,
  dispatch,
}: HeaderProps) {
  function handleShowHelp() {
    if (status === "active") dispatch(setGameStatusAction("help"));
  }

  function handleCloseHelp() {
    if (status === "help") dispatch(setGameStatusAction("active"));
  }

  return (
    <div className="text-center flex flex-col">
      <h1 className={`text-pretty ${styles.title}`}>Word Game</h1>
      <div className={styles.indicatorText}>
        Stage: {`${stage + 1}/${totalStages}`}
      </div>
      <button
        className={`absolute top-2 right-2 text-slate-600 ${styles.tile} ${styles.available}`}
        onClick={handleShowHelp}
      >
        ?
      </button>
      <Modal
        title="How to play"
        show={status === "help"}
        handleClose={handleCloseHelp}
      >
        <ul className="flex flex-col gap-2">
          <li>Create a word using the letters below.</li>
          <li>
            Press <span className="text-green-500">✓</span> to see if your guess
            is on the crossword.
          </li>
          <li>
            Press <span className="text-red-500">✗</span> to clear your guess
            and try again.
          </li>
        </ul>
      </Modal>
    </div>
  );
}
