
import challenges from "./challenges.json";
import { Challenge, CodeBlock } from "./types";

export const loadRandomChallenge = (): Challenge => {
  const rawChallenge = challenges[Math.floor(Math.random() * challenges.length)];
  const challenge: Challenge = {
    ...rawChallenge,
    id: crypto.randomUUID(),
    codeBlocks: rawChallenge.codeblocks.map((block) =>
      loadCodeBlock(block)
    ),
  };
  return challenge;
};

export const loadCodeBlock = (content: string): CodeBlock => {
  return {
    id: crypto.randomUUID(),
    content,
  };
};


export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateHtml(blocks: CodeBlock[]): string {
  const code = blocks.map((block) => block.content).join("")
    .replace(/\n/g, "")       // remove newlines
    .replace(/\t/g, "")       // remove tabs
    .replace(/ +/g, "");

  return code;      // remove multiple spaces
}


export  const checkIsWin = (
    userCodeBlocks: CodeBlock[],
    targetCodeBlocks: CodeBlock[]
  ) => {
    const userCode = generateHtml(userCodeBlocks);
    const targetCode = generateHtml(targetCodeBlocks);

    return userCode === targetCode;
  };