import styles from "./game.module.css";
import { useGameStateReducer } from "./reducers/useGameStateReducer.ts";
import Header from "./components/Header.tsx";
import VictoryMessage from "./components/VictoryMessage.tsx";
import GameGrid from "./components/GameGrid.tsx";
import SelectedLettersContainer from "./components/SelectedLettersContainer.tsx";
import AvailableLettersContainer from "./components/AvailableLettersContainer.tsx";

function App() {
  const [
    {
      status,
      stage,
      totalStages,
      stageData,
      gameGrid,
      selectedLettersData,
      availableLettersData,
      hints,
    },
    dispatch,
  ] = useGameStateReducer(0);

  return (
    <main
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
      <AvailableLettersContainer
        status={status}
        availableLettersData={availableLettersData}
        hints={hints}
        dispatch={dispatch}
      />
    </main>
  );
}

export default App;
