import styles from "./game.module.css";
import { useGameStateReducer } from "./reducers/useGameStateReducer.ts";
import Header from "./components/Header.tsx";
import VictoryMessage from "./components/VictoryMessage.tsx";
import GameGrid from "./components/GameGrid.tsx";
import SelectedLettersContainer from "./components/SelectedLettersContainer.tsx";
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
      className={`relative flex flex-col items-center justify-center m-auto ${styles.elementContainer}`}
    >
      <Header
        status={status}
        stage={stage}
        totalStages={totalStages}
        dispatch={dispatch}
      />
      <VictoryMessage status={status} />
      <GameGrid
        status={status}
        gameGrid={gameGrid}
        columnCount={stageData.columnCount}
        dispatch={dispatch}
      />
      <SelectedLettersContainer
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
