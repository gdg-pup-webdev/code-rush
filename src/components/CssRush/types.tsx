/**
 * defining types for the state of the current game instance
 */

export type GameState = {
  timeRemaining: number;
  score: number;
  gameStarted: boolean;
  gameOver: boolean;
};

export type GameStateKey = keyof GameState;

/**
 * defining major types used in the game
 */
export type CodeBlock = {
  id: string;
  content: string;
};

export type Challenge = {
  id: string;
  codeBlocks: CodeBlock[];
  title: string;
  description: string;
};

/**
 * defining the round state type of each round within a game
 */
export type RoundState = {
  challenge: Challenge;
  codeBlocks: CodeBlock[];
  roundWon: boolean;
};

export type RoundStateKey = keyof RoundState;





export interface GameConfigProps {
  gameDurationSeconds?: number;
}
