import React, { createContext, useEffect } from "react";
import { GameState, RoundState } from "./types"; 
import { loadRandomChallenge } from "./challenge";

// --- Constants ---
const GAME_DURATION_SECONDS = 3 * 60; // 3 minutes
const ROUND_TRANSITION_DELAY_MS = 1000; // 1 second

// --- Type Definitions ---
// Note: Assuming GameStateKey and RoundStateKey are not strictly needed in the context file itself
// and are defined in a separate 'types' file as per your original code.
// The types for GameState, RoundState, etc. are implicitly available from the 'types' file.

type GameContextType = {
  // defining the game state
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;

  // defining the current round state
  roundState: RoundState | undefined;
  setRoundState: React.Dispatch<React.SetStateAction<RoundState | undefined>>;

  // Game/Round management functions
  startGame: () => void;
  // Function to be called by an editor component when a block is updated
  updateCodeBlock: (id: string, newContent: string) => void;
  // Function to explicitly check if the current round is won (useful on code change)
  checkForRoundWin: () => void;
};

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// --- Context Hook ---
export const useGameContext = () => {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

// --- Game Provider Component ---
type GameProviderProps = {
  children: React.ReactNode;
};

export const GameProvider = (props: GameProviderProps) => {
  const [gameState, setGameState] = React.useState<GameState>({
    timeRemaining: 0,
    score: 0,
    gameStarted: false,
    gameOver: false,
  });

  const [roundState, setRoundState] = React.useState<RoundState | undefined>(
    undefined
  );

  /**
   * Helper function to start a new round
   */
  const startNewRound = React.useCallback(() => {
    const newChallenge = loadRandomChallenge();
    setRoundState({
      challenge: newChallenge,
      // Initially, the editable code blocks are a copy of the challenge blocks
      codeBlocks: newChallenge.codeBlocks.map((block) => ({
        ...block,
        content: "", // Start with empty content for the player to fill
      })),
      roundWon: false,
    });
  }, []);

  /**
   * Checks if the player's current code blocks match the challenge's required blocks.
   * If matched, sets roundWon to true, updates the score, and initiates the next round.
   */
  const checkForRoundWin = React.useCallback(() => {
    if (!roundState || roundState.roundWon) return;

    const isWon = roundState.challenge.codeBlocks.every((challengeBlock) => {
      const playerBlock = roundState.codeBlocks.find(
        (b) => b.id === challengeBlock.id
      );
      // Trim whitespace and compare content
      return (
        playerBlock &&
        playerBlock.content.trim() === challengeBlock.content.trim()
      );
    });

    if (isWon) {
      setRoundState((prev) => (prev ? { ...prev, roundWon: true } : undefined));
    }
  }, [roundState]);

  /**
   * Updates a specific code block content in the current round state.
   * This function should be passed to the code editor component.
   */
  const updateCodeBlock = React.useCallback(
    (id: string, newContent: string) => {
      setRoundState((prev) => {
        if (!prev) return undefined;

        const updatedCodeBlocks = prev.codeBlocks.map((block) =>
          block.id === id ? { ...block, content: newContent } : block
        );

        // Check for win immediately after updating the block
        // Note: The actual state change happens after this function returns,
        // so we call checkForRoundWin() outside of setRoundState
        return { ...prev, codeBlocks: updatedCodeBlocks };
      });
    },
    []
  );

  /**
   * Function to start the game
   * - Sets gameStarted to true
   * - Initiates the first round
   * - Sets up the initial timer (handled by useEffect below)
   */
  const startGame = React.useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      gameStarted: true,
      timeRemaining: GAME_DURATION_SECONDS,
      gameOver: false,
      score: 0,
    }));
    startNewRound();
  }, [startNewRound]);

  // --- useEffects for Game Logic ---

  // 1. Effect to manage the game timer
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameState.gameStarted && !gameState.gameOver && gameState.timeRemaining > 0) {
      timer = setInterval(() => {
        setGameState((prev) => {
          if (prev.timeRemaining <= 1) {
            clearInterval(timer);
            return { ...prev, timeRemaining: 0, gameOver: true, gameStarted: false };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    } else if (gameState.timeRemaining === 0 && gameState.gameStarted) {
      // Game over condition met by timer
      setGameState((prev) => ({ ...prev, gameOver: true, gameStarted: false }));
    }

    return () => clearInterval(timer);
  }, [gameState.gameStarted, gameState.gameOver, gameState.timeRemaining]);

  // 2. Effect to detect round win and initiate the next round progression
  useEffect(() => {
    if (roundState?.roundWon) {
      // 1. Update Score
      setGameState((prev) => ({ ...prev, score: prev.score + 1 }));

      // 2. Set up a timeout to load the next round
      const nextRoundTimeout = setTimeout(() => {
        startNewRound();
      }, ROUND_TRANSITION_DELAY_MS);

      // Cleanup the timeout if the component unmounts or roundState changes unexpectedly
      return () => clearTimeout(nextRoundTimeout);
    }
  }, [roundState?.roundWon, startNewRound]);
  
  // 3. Effect to check for round win immediately after a block update
  useEffect(() => {
    // This is run after `setRoundState` completes in `updateCodeBlock`
    // We call it here to ensure we use the most recent state.
    if (!roundState?.roundWon && gameState.gameStarted) {
      checkForRoundWin();
    }
  }, [roundState?.codeBlocks, gameState.gameStarted]);


  // Assemble the context value
  const contextValue = React.useMemo(
    () => ({
      gameState,
      setGameState,
      roundState,
      setRoundState,
      startGame,
      updateCodeBlock,
      checkForRoundWin,
    }),
    [gameState, roundState, startGame, updateCodeBlock, checkForRoundWin]
  );

  return (
    <GameContext.Provider value={contextValue}>
      {props.children}
    </GameContext.Provider>
  );
};