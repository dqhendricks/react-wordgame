import { useGameStateReducer } from "./useGameStateReducer.ts";
import GameGrid from "./GameGrid.tsx";
import SelectedLetters from "./SelectedLetters.tsx";
import AvailableLetters from "./AvailableLetters.tsx";

function App() {
  const [
    {
      loading,
      currentStage,
      currentStageData,
      gameGrid,
      currentSelectedLetterIndex,
      selectedLetters,
      availableLetters,
    },
    dispatch,
  ] = useGameStateReducer(0);

  return (
    <main className="flex flex-col items-center justify-center gap-5 max-w-5xl m-auto">
      <h1 className="text-5xl text-pretty p-4">Word Game</h1>
      <GameGrid
        gameGrid={gameGrid}
        columnCount={currentStageData.columnCount}
      />
      <SelectedLetters
        loading={loading}
        currentSelectedLetterIndex={currentSelectedLetterIndex}
        selectedLetters={selectedLetters}
        dispatch={dispatch}
      />
      <AvailableLetters
        loading={loading}
        availableLetters={availableLetters}
        dispatch={dispatch}
      />
    </main>
  );
}

export default App;
