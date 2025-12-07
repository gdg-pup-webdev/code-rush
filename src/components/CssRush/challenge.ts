import { randomUUID } from "crypto";
import challenges from "./challenges.json";
import { Challenge, CodeBlock } from "./types";

export const loadRandomChallenge = (): Challenge => {
  const rawChallenge = challenges[Math.floor(Math.random() * challenges.length)];
  const challenge: Challenge = {
    ...rawChallenge,
    id: randomUUID(),
    codeBlocks: rawChallenge.codeblocks.map((block) =>
      loadCodeBlock(block)
    ),
  };
  return challenge;
};

export const loadCodeBlock = (content: string): CodeBlock => {
  return {
    id: randomUUID(),
    content,
  };
};
