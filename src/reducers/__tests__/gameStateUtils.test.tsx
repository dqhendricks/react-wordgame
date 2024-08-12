import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";

import { createMockGameState } from "./testUtils.ts";
import * as gameStateUtils from "../gameStateUtils.ts";

describe("getLetterGridPosition", {}, () => {
  test("With x orientation", {}, () => {
    const gameState = createMockGameState();
    expect(
      gameStateUtils.getLetterGridPosition(gameState.stageData.words[1], 2)
    ).toStrictEqual({
      x: 4,
      y: 2,
    });
  });

  test("With y orientation", {}, () => {
    const gameState = createMockGameState();
    expect(
      gameStateUtils.getLetterGridPosition(gameState.stageData.words[2], 2)
    ).toStrictEqual({
      x: 7,
      y: 3,
    });
  });
});

describe("handleSelectLetter", {}, () => {
  const gameState = createMockGameState();
  const updatedGameState = gameStateUtils.handleSelectLetter(
    gameState,
    gameState.availableLetters[2]
  );

  test("Available letter disabled", {}, () => {
    expect(updatedGameState.availableLetters[2].disabled).toBe(true);
  });

  test("Available letter added to selected letters", {}, () => {
    expect(updatedGameState.selectedLettersData.currentSlotIndex).toBe(1);
    expect(updatedGameState.selectedLettersData.selectedLetters[0].letter).toBe(
      gameState.availableLetters[2].letter
    );
    expect(updatedGameState.selectedLettersData.selectedLetters[0].status).toBe(
      "shown"
    );
  });
});

describe("handleClearSelectedLetters", {}, () => {
  const gameState = createMockGameState();
  gameState.selectedLettersData.selectedLetters[0] = {
    ...gameState.selectedLettersData.selectedLetters[0],
    letter: "i",
    status: "shown",
  };
  const updatedGameState = gameStateUtils.handleClearSelectedLetters(
    gameState,
    "shake"
  );

  test("Container animation updated", {}, () => {
    expect(updatedGameState.selectedLettersData.animateVariant).not.toBe(
      gameState.selectedLettersData.animateVariant
    );
  });

  test("Container post animation dispatch updated", {}, () => {
    expect(
      updatedGameState.selectedLettersData.dispatchOnAnimationComplete
    ).not.toBe(gameState.selectedLettersData.dispatchOnAnimationComplete);
  });

  test("Selected letter animation updated", {}, () => {
    expect(
      updatedGameState.selectedLettersData.selectedLetters[0].animateVariant
    ).not.toBe(gameState.selectedLettersData.selectedLetters[0].animateVariant);
  });

  test("Selected letter post animation dispatch updated", {}, () => {
    expect(
      updatedGameState.selectedLettersData.selectedLetters[0]
        .dispatchOnAnimationComplete
    ).not.toBe(
      gameState.selectedLettersData.selectedLetters[0]
        .dispatchOnAnimationComplete
    );
  });
});

describe("handleEnableAvailableLetters", {}, () => {
  const gameState = createMockGameState();
  gameState.selectedLettersData.currentSlotIndex = 1;
  gameState.availableLetters[2].disabled = true;
  const updatedGameState =
    gameStateUtils.handleEnableAvailableLetters(gameState);

  test("Selected letters slot index reset", {}, () => {
    expect(updatedGameState.selectedLettersData.currentSlotIndex).toBe(0);
  });

  test("Available letters enabled", {}, () => {
    expect(updatedGameState.availableLetters[0].disabled).toBe(false);
  });
});

describe("handleSetSelectedLetterHidden", {}, () => {
  const gameState = createMockGameState();
  gameState.selectedLettersData.selectedLetters[0] = {
    ...gameState.selectedLettersData.selectedLetters[0],
    letter: "i",
    status: "shown",
  };
  const updatedGameState = gameStateUtils.handleSetSelectedLetterHidden(
    gameState,
    gameState.selectedLettersData.selectedLetters[0].id
  );

  test("Selected letter's letter reset", {}, () => {
    expect(updatedGameState.selectedLettersData.selectedLetters[0].letter).toBe(
      ""
    );
  });

  test("Selected letter's status set to hidden", {}, () => {
    expect(updatedGameState.selectedLettersData.selectedLetters[0].status).toBe(
      "hidden"
    );
  });
});

describe("handleBoardWordAnimationUpdate", {}, () => {
  const gameState = createMockGameState();
  const updatedGameState = gameStateUtils.handleBoardWordAnimationUpdate(
    gameState,
    gameState.stageData.words[1],
    "scaleBounce"
  );

  test("Board word letter has animation set", {}, () => {
    expect(updatedGameState.gameGrid[2][4].animateVariant).toBe("scaleBounce");
  });
});

describe("handleNewWordFound", {}, () => {
  const gameState = createMockGameState();
  gameState.selectedLettersData.selectedLetters[0] = {
    ...gameState.selectedLettersData.selectedLetters[0],
    letter: "c",
    status: "shown",
  };
  render(<div ref={gameState.selectedLettersData.selectedLetters[0].ref} />);
  gameState.selectedLettersData.selectedLetters[1] = {
    ...gameState.selectedLettersData.selectedLetters[1],
    letter: "a",
    status: "shown",
  };
  render(<div ref={gameState.selectedLettersData.selectedLetters[1].ref} />);
  gameState.selectedLettersData.selectedLetters[2] = {
    ...gameState.selectedLettersData.selectedLetters[2],
    letter: "t",
    status: "shown",
  };
  render(<div ref={gameState.selectedLettersData.selectedLetters[2].ref} />);
  render(<div ref={gameState.gameGrid[1][7].ref} />);
  render(<div ref={gameState.gameGrid[1][8].ref} />);
  render(<div ref={gameState.gameGrid[1][9].ref} />);
  const updatedGameState = gameStateUtils.handleNewWordFound(
    gameState,
    gameState.stageData.words[5]
  );

  test("Container animation updated", {}, () => {
    expect(updatedGameState.selectedLettersData.animateVariant).not.toBe(
      gameState.selectedLettersData.animateVariant
    );
  });

  test("Container post animation dispatch updated", {}, () => {
    expect(
      updatedGameState.selectedLettersData.dispatchOnAnimationComplete
    ).not.toBe(gameState.selectedLettersData.dispatchOnAnimationComplete);
  });

  test("Selected letter animation updated", {}, () => {
    expect(
      updatedGameState.selectedLettersData.selectedLetters[0].animateVariant
    ).not.toBe(gameState.selectedLettersData.selectedLetters[0].animateVariant);
  });

  test("Selected letter post animation dispatch updated", {}, () => {
    expect(
      updatedGameState.selectedLettersData.selectedLetters[0]
        .dispatchOnAnimationComplete
    ).not.toBe(
      gameState.selectedLettersData.selectedLetters[0]
        .dispatchOnAnimationComplete
    );
  });

  test("Found word added to foundWords list", {}, () => {
    expect(
      updatedGameState.foundWords.some(
        (word) => word === gameState.stageData.words[5].word
      )
    ).toBe(true);
  });
});

describe("handleSetBoardLetterShown", {}, () => {
  const gameState = createMockGameState();
  const updatedGameState = gameStateUtils.handleSetBoardLetterShown(
    gameState,
    gameState.gameGrid[1][7].id,
    "c"
  );

  test("Board letter status set to shown", {}, () => {
    expect(updatedGameState.gameGrid[1][7].status).toBe("shown");
  });

  test("Board letter's letter set", {}, () => {
    expect(updatedGameState.gameGrid[1][7].letter).toBe("c");
  });
});

describe("handleSetGameStatus", {}, () => {
  const gameState = createMockGameState();
  const updatedGameState = gameStateUtils.handleSetGameStatus(
    gameState,
    "wonTheGame"
  );

  test("Game status updated", {}, () => {
    expect(updatedGameState.status).toBe("wonTheGame");
  });
});
