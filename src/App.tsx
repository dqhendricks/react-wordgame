import { useGameStateReducer } from "./useGameStateReducer.ts";
import VictoryMessage from "./components/VictoryMessage.tsx";
import GameGrid from "./components/GameGrid.tsx";
import SelectedLetters from "./components/SelectedLetters.tsx";
import AvailableLetters from "./components/AvailableLetters.tsx";

function App() {
  const [
    {
      loading,
      totalVictory,
      currentStage,
      totalStages,
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
      className="relative flex flex-col items-center justify-center gap-10 max-w-4xl m-auto"
    >
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-5xl text-pretty pt-4">Word Game</h1>
        <div className="text-sm">
          Stage: {`${currentStage + 1}/${totalStages}`}
        </div>
      </div>
      <VictoryMessage totalVictory={totalVictory} />
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
