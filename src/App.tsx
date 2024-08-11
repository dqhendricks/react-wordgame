import styles from "./game.module.css";
import { useGameStateReducer } from "./reducers/useGameStateReducer.ts";
import VictoryMessage from "./components/VictoryMessage.tsx";
import GameGrid from "./components/GameGrid.tsx";
import SelectedLetters from "./components/SelectedLetters.tsx";
import AvailableLetters from "./components/AvailableLetters.tsx";

function App() {
  const [
    {
      status,
      stage,
      totalStages,
      stageData,
      gameGrid,
      selectedLettersData,
      availableLetters,
    },
    dispatch,
  ] = useGameStateReducer(0);

  return (
    <main
      key={stage}
      className={`relative flex flex-col items-center justify-center max-w-4xl m-auto ${styles.elementContainer}`}
    >
      <div className="text-center flex flex-col">
        <h1 className={`text-pretty ${styles.title}`}>Word Game</h1>
        <div className={styles.indicatorText}>
          Stage: {`${stage + 1}/${totalStages}`}
        </div>
      </div>
      <VictoryMessage status={status} />
      <GameGrid
        status={status}
        gameGrid={gameGrid}
        columnCount={stageData.columnCount}
        dispatch={dispatch}
      />
      <SelectedLetters
        status={status}
        selectedLettersData={selectedLettersData}
        dispatch={dispatch}
      />
      <AvailableLetters
        status={status}
        availableLetters={availableLetters}
        dispatch={dispatch}
      />
    </main>
  );
}

export default App;
