import { useGameStateReducer } from "./useGameStateReducer.ts";
import GameGrid from "./components/GameGrid.tsx";
import SelectedLetters from "./components/SelectedLetters.tsx";
import AvailableLetters from "./components/AvailableLetters.tsx";

function App() {
  const [
    {
      loading,
      currentStage,
      currentStageData,
      gameGrid,
      boardAnimateVariant,
      boardDispatchOnAnimationComplete,
      selectedLettersData,
      selectedLetters,
      availableLetters,
    },
    dispatch,
  ] = useGameStateReducer(0);

  return (
    <main
      key={currentStage}
      className="flex flex-col items-center justify-center gap-5 max-w-5xl m-auto"
    >
      <h1 className="text-5xl text-pretty p-4">Word Game</h1>
      <GameGrid
        gameGrid={gameGrid}
        columnCount={currentStageData.columnCount}
        boardAnimateVariant={boardAnimateVariant}
        boardDispatchOnAnimationComplete={boardDispatchOnAnimationComplete}
        dispatch={dispatch}
      />
      <SelectedLetters
        loading={loading}
        selectedLettersData={selectedLettersData}
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
