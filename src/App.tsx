import styles from "./game.module.css";
import { useGameStateReducer } from "./useGameStateReducer.ts";
import VictoryMessage from "./components/VictoryMessage.tsx";
import GameGrid from "./components/GameGrid.tsx";
import SelectedLetters from "./components/SelectedLetters.tsx";
import AvailableLetters from "./components/AvailableLetters.tsx";

function App() {
  const [
    {
      status,
      currentStage,
      totalStages,
      currentStageData,
      gameGrid,
      selectedLettersData,
      selectedLetters,
      availableLetters,
    },
    dispatch,
  ] = useGameStateReducer(0);

  return (
    <main
      key={currentStage}
      className={`relative flex flex-col items-center justify-center max-w-4xl m-auto ${styles.elementContainer}`}
    >
      <div className="text-center flex flex-col">
        <h1 className={`text-pretty ${styles.title}`}>Word Game</h1>
        <div className={styles.indicatorText}>
          Stage: {`${currentStage + 1}/${totalStages}`}
        </div>
      </div>
      <VictoryMessage status={status} />
      <GameGrid
        status={status}
        currentStage={currentStage}
        gameGrid={gameGrid}
        columnCount={currentStageData.columnCount}
        dispatch={dispatch}
      />
      <SelectedLetters
        status={status}
        selectedLettersData={selectedLettersData}
        selectedLetters={selectedLetters}
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
