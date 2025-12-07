"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { targets, getRandomTarget, Target, generateTargetHtml } from "../targets";
import { CodeBlock, GameState, GameConfigProps } from "./types";
import { formatTime, generateBlockId, createCodeBlocks, shuffleArray } from "./utils";
import { useActiveContent } from "./hooks";
import { GameHeader } from "./components/GameHeader";
import { CodeSpace } from "./components/CodeSpace";
import { PreviewPane } from "./components/PreviewPane";
import { GameOverModal } from "./components/GameOverModal";
import { Droppable } from "./components/Droppable";

/**
 * Main CSS Rush game component
 */
export function CssRush({ gameDurationSeconds = 180 }: GameConfigProps) {
  // State
  const [gameState, setGameState] = useState<GameState>({
    timeRemaining: gameDurationSeconds,
    score: 0,
    gameActive: false,
    gameOver: false,
  });

  const [currentTarget, setCurrentTarget] = useState<Target>(getRandomTarget());
  const [code, setCode] = useState<CodeBlock[]>(() => {
    const shuffled = shuffleArray(currentTarget.blocks);
    return createCodeBlocks(shuffled);
  });
  const [isClient, setIsClient] = useState(false);
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);

  // Hooks
  const [holdingBlockId, setHoldingBlockId] = useState<string | null>(null);
  const handleDragStart = (event: any) => {
    setHoldingBlockId(event.active.id);
  };

  const getActiveContent = useActiveContent(
    holdingBlockId,
    code,
    currentTarget.blocks
  );

  // Drag and drop setup
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const { setNodeRef: setDroppableRef } = useDroppable({ id: "code-space" });

  // Initialize
  useEffect(() => {
    setIsClient(true);
    setGameState((prev) => ({ ...prev, gameActive: true }));
  }, []);

  // Timer
  useEffect(() => {
    if (!gameState.gameActive || !isClient) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        const newTime = prev.timeRemaining - 1;
        if (newTime <= 0) {
          return {
            ...prev,
            timeRemaining: 0,
            gameActive: false,
            gameOver: true,
          };
        }
        return { ...prev, timeRemaining: newTime };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.gameActive, isClient]);

  // Check for win condition
  useEffect(() => {
    if (code.length === 0) return;

    const userCode = code.map((c) => c.content).join("");
    const targetCode = currentTarget.blocks.join("");

    if (userCode === targetCode) {
      setGameState((prev) => ({ ...prev, score: prev.score + 1 }));
      setShowSuccessFlash(true);
      
      // Wait 0.5 second before loading next target
      setTimeout(() => {
        const newTarget = getRandomTarget();
        setCurrentTarget(newTarget);
        const shuffled = shuffleArray(newTarget.blocks);
        setCode(createCodeBlocks(shuffled));
        setShowSuccessFlash(false);
      }, 500);
    }
  }, [code, currentTarget]);

  // Handlers
  const handleDragEnd = (event: any) => {
    setHoldingBlockId(null);
    const { active, over } = event;

    if (!over || over.id === active.id) return;

    // Only handle reordering within code space
    if (
      active.id.startsWith("code-") &&
      over.id.startsWith("code-") &&
      over.id !== active.id
    ) {
      const oldIndex = code.findIndex((item) => item.id === active.id);
      const newIndex = code.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setCode(arrayMove(code, oldIndex, newIndex));
      }
    }
  };

  const handleReset = () => {
    const newTarget = getRandomTarget();
    const shuffled = shuffleArray(newTarget.blocks);
    setCurrentTarget(newTarget);
    setCode(createCodeBlocks(shuffled));
    setGameState({
      timeRemaining: gameDurationSeconds,
      score: 0,
      gameActive: true,
      gameOver: false,
    });
  };

  if (!isClient) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="w-full h-screen bg-slate-950 font-sans overflow-hidden">
        {gameState.gameOver && (
          <GameOverModal score={gameState.score} onReset={handleReset} />
        )}

        <div className="grid grid-cols-2 gap-6 h-full p-6">
          {/* Left Column */}
          <div className="flex flex-col bg-slate-900/40 backdrop-blur rounded-lg p-6 border border-slate-800">
            <GameHeader
              timeRemaining={gameState.timeRemaining}
              score={gameState.score}
              formatTime={formatTime}
            />
            <Droppable id="code-space">
              <CodeSpace
                code={code}
                setDroppableRef={setDroppableRef}
                activeId={holdingBlockId}
                showSuccessFlash={showSuccessFlash}
              />
            </Droppable>
          </div>

          {/* Right Column */}
          <PreviewPane code={code} targetHtml={generateTargetHtml(currentTarget.blocks)} />
        </div>
      </div>

      <DragOverlay>
        {holdingBlockId && (
          <div className="px-3 py-2 bg-slate-700 text-slate-100 rounded-lg shadow-2xl font-mono text-sm">
            {getActiveContent()}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
