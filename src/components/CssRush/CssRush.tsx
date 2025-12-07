"use client";

import React, { useState } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import people from "./people.json";
import { CodeSpace } from "./components/CodeSpace";
import { Challenge, CodeBlock, GameState } from "./types";
import { loadRandomChallenge } from "./challenge";
import { shuffleArray } from "./utils";

const convertPeopleToCodeBlock = () => {
  return people.map((person) => ({
    id: person.name,
    content: person.description,
  }));
};

export const CssRush = () => {
  const [gameState, setGameState] = useState<GameState>({
      timeRemaining: 180,
      score: 0,
      gameActive: true,
      gameOver: false,
    });

    const [challenge, setChallenge] = useState<Challenge>(loadRandomChallenge());


  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>(
    shuffleArray(challenge.codeBlocks)
  );

  return (
    <>
      <CodeSpace codeBlocks={codeBlocks} setCodeBlocks={setCodeBlocks} />
    </>
  );
};
