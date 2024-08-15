import { describe, test, expect } from "vitest";

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
    gameState.availableLettersData.availableLetters[2]
  );

  test("Available letter disabled", {}, () => {
    expect(
      updatedGameState.availableLettersData.availableLetters[2].disabled
    ).toBe(true);
  });

  test("Available letter added to selected letters", {}, () => {
    expect(updatedGameState.selectedLettersData.currentSlotIndex).toBe(1);
    expect(updatedGameState.selectedLettersData.selectedLetters[0].letter).toBe(
      gameState.availableLettersData.availableLetters[2].letter
    );
    expect(updatedGameState.selectedLettersData.selectedLetters[0].status).toBe(
      "shown"
    );
  });
});

describe("handleClearSelectedLetters", {}, () => {
  const gameState = createMockGameState();
  gameState.selectedLettersData.selectedLetters[0].letter = "i";
  gameState.selectedLettersData.selectedLetters[0].status = "shown";
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
  gameState.availableLettersData.availableLetters[2].disabled = true;
  const updatedGameState =
    gameStateUtils.handleEnableAvailableLetters(gameState);

  test("Selected letters slot index reset", {}, () => {
    expect(updatedGameState.selectedLettersData.currentSlotIndex).toBe(0);
  });

  test("Available letters enabled", {}, () => {
    expect(
      updatedGameState.availableLettersData.availableLetters[0].disabled
    ).toBe(false);
  });
});

describe("handleSetSelectedLetterHidden", {}, () => {
  const gameState = createMockGameState();
  gameState.selectedLettersData.selectedLetters[0].letter = "i";
  gameState.selectedLettersData.selectedLetters[0].status = "shown";
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

  test("Board word letter animation updated", {}, () => {
    expect(updatedGameState.gameGrid[2][4].animateVariant).toBe("scaleBounce");
  });
});

describe("handleNewWordFound", {}, () => {
  const gameState = createMockGameState();
  const mockPosition = { x: 0, y: 0 };
  gameState.selectedLettersData.selectedLetters[0].letter = "c";
  gameState.selectedLettersData.selectedLetters[0].status = "shown";
  gameState.selectedLettersData.selectedLetters[0].viewportPosition =
    mockPosition;
  gameState.selectedLettersData.selectedLetters[1].letter = "a";
  gameState.selectedLettersData.selectedLetters[1].status = "shown";
  gameState.selectedLettersData.selectedLetters[1].viewportPosition =
    mockPosition;
  gameState.selectedLettersData.selectedLetters[2].letter = "t";
  gameState.selectedLettersData.selectedLetters[2].status = "shown";
  gameState.selectedLettersData.selectedLetters[2].viewportPosition =
    mockPosition;
  gameState.gameGrid[1][7].viewportPosition = mockPosition;
  gameState.gameGrid[1][8].viewportPosition = mockPosition;
  gameState.gameGrid[1][9].viewportPosition = mockPosition;
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
  const updatedGameState = gameStateUtils.handleSetBoardLetterStatus(
    gameState,
    gameState.gameGrid[1][7].id,
    "c",
    "shown"
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

describe("findRandomHintTile", {}, () => {
  const gameState = createMockGameState();
  function areRandomHintTilesStatusHidden() {
    for (let i = 0; i < 20; i++) {
      if (gameStateUtils.findRandomHintTile(gameState).status !== "hidden")
        return false;
    }
    return true;
  }

  test("Random hint tiles have status of hidden", {}, () => {
    expect(areRandomHintTilesStatusHidden()).toBe(true);
  });
});
