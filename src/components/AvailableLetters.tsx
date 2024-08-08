import type { GameState, AvailableLetter, Action } from "../types.ts";
import styles from "../game.module.css";

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
  function handleClick(selectedLetter: AvailableLetter) {
    if (status === "loading" || selectedLetter.disabled) return;
    dispatch({
      type: "SELECT_LETTER",
      payload: selectedLetter,
    });
  }

  return (
    <div className={`flex m-auto ${styles.tileGrid}`}>
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
