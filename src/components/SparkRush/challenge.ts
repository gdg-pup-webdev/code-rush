import challenges from "./challenges.json";
import { Challenge, CodeBlock } from "./types";

export const loadRandomChallenge = (): Challenge => {
  const rawChallenge =
    challenges[Math.floor(Math.random() * challenges.length)];
  const challenge: Challenge = {
    ...rawChallenge,
    id: crypto.randomUUID(),
    codeBlocks: rawChallenge.codeblocks.map((block) => loadCodeBlock(block)),
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
  const code = blocks.map((block) => block.content).join("");
  const styleRegex = /style={([^}]+)}/g;

  return code.replace(styleRegex, (match, styleContent) => {
    const styles = styleContent
      .trim()
      .split(";")
      .filter((line: string) => line.trim())
      .map((line: string) => {
        const [key, value] = line.split(":").map((part) => part.trim());
        if (key && value) {
          const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
          return `${cssKey}: ${value}`;
        }
        return null;
      })
      .filter((item : string) => item)
      .join("; ");
    return `style="${styles}"`;
  });
}

export const checkIsWin = (
  userCodeBlocks: CodeBlock[],
  targetCodeBlocks: CodeBlock[]
) => {
  const userCode = generateHtml(userCodeBlocks);
  const targetCode = generateHtml(targetCodeBlocks);

  return userCode === targetCode;
};
