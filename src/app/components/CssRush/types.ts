export interface CodeBlock {
  id: string;
  content: string;
}

export interface GameState {
  timeRemaining: number;
  score: number;
  gameActive: boolean;
  gameOver: boolean;
}

export interface GameConfigProps {
  gameDurationSeconds?: number;
}
