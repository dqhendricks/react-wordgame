import type { GameState, AvailableLetter, Action } from "../types.ts";
import styles from "../game.module.css";
import { selectLetterAction } from "../reducers/gameStateActions.ts";

interface AvailableLettersProps {
  status: GameState["status"];
  availableLetters: GameState["availableLetters"];
  dispatch: React.Dispatch<Action>;
}

export default function AvailableLetters({
  status,
  availableLetters,
  dispatch,
}: AvailableLettersProps) {
  function handleClick(selectedAvailableLetter: AvailableLetter) {
    if (status === "loading" || selectedAvailableLetter.disabled) return;
    dispatch(selectLetterAction(selectedAvailableLetter));
  }

  return (
    <div className={`flex m-auto pb-4 ${styles.tileGrid}`}>
      {availableLetters.map((availableLetter) => (
        <button
          key={availableLetter.id}
          className={`${styles.tile} ${
            availableLetter.disabled
              ? styles.disabled
              : `${styles.shown} ${styles.available}`
          }`}
          onClick={() => handleClick(availableLetter)}
        >
          {availableLetter.letter}
        </button>
      ))}
    </div>
  );
}
