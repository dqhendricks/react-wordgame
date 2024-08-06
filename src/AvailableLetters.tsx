import type { GameState, AvailableLetterData, Action } from "./types.ts";
import styles from "./game.module.css";

interface AvailableLettersProps {
  loading: GameState["loading"];
  availableLetters: GameState["availableLetters"];
  dispatch: React.Dispatch<Action>;
}

export default function AvailableLetters({
  loading,
  availableLetters,
  dispatch,
}: AvailableLettersProps) {
  function handleClick(selectedLetter: AvailableLetterData) {
    if (loading || selectedLetter.disabled) return;
    dispatch({
      type: "SELECT_LETTER",
      payload: selectedLetter,
    });
  }

  return (
    <div className="flex gap-3 m-auto">
      {availableLetters.map((availableLetterData) => (
        <button
          key={availableLetterData.id}
          className={`${styles.tile} ${
            availableLetterData.disabled
              ? styles.disabled
              : `${styles.shown} ${styles.available}`
          }`}
          onClick={() => handleClick(availableLetterData)}
        >
          {availableLetterData.letter}
        </button>
      ))}
    </div>
  );
}
