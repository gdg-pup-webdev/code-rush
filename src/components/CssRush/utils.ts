import { CodeBlock } from "./types";

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function generateBlockId(): string {
  return `code-${Date.now()}-${Math.random()}`;
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Create code blocks from target blocks
 */
export function createCodeBlocks(blocks: string[]): CodeBlock[] {
  return blocks.map((content) => ({
    id: generateBlockId(),
    content,
  }));
}

