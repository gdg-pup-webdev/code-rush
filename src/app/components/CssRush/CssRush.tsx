"use client";

import React, { useState, useEffect } from "react"; 
import {
  targets,
  getRandomTarget,
  Target,
  generateTargetHtml,
} from "./targets";
import { CodeBlock, GameState, GameConfigProps } from "./types";
import {
  formatTime,
  generateBlockId,
  createCodeBlocks,
  shuffleArray,
} from "./utils";
import { useActiveContent } from "./hooks";
import { CodeSpace } from "./components/CodeSpace";
import { PreviewPane } from "./components/PreviewPane";
import { GameOverModal } from "./components/GameOverModal";

/**
 * Main CSS Rush game component
 */
export function CssRush({ gameDurationSeconds = 180 }: GameConfigProps) {
  // State
  const [gameState, setGameState] = useState<GameState>({
    timeRemaining: gameDurationSeconds,
    score: 0,
    gameActive: true,
    gameOver: false,
  });

  const [target, setTarget] = useState<Target>(getRandomTarget());
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);

  const [showSuccessFlash, setShowSuccessFlash] = useState(false);
  const [showTargetFlash, setShowTargetFlash] = useState(true);

  // initiate code blocks based on target
  useEffect(() => { 
    const blocks = createCodeBlocks(shuffleArray(target.blocks)); 
    setCodeBlocks(blocks);
  }, [target]);

  // Timer
  useEffect(() => {
    if (!gameState.gameActive) return;

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
  }, [gameState.gameActive]);

  // Check for win condition
  useEffect(() => {
    if (codeBlocks.length === 0) return;

    const userCode = codeBlocks.map((c) => c.content).join("");
    const targetCode = target.blocks.join("");

    if (userCode === targetCode) {
      setGameState((prev) => ({ ...prev, score: prev.score + 1 }));
      setShowSuccessFlash(true);

      // Wait 0.5 second before loading next target
      setTimeout(() => { 
        const newTarget = getRandomTarget();
        setTarget(newTarget);
 
        
        setShowSuccessFlash(false);
        setShowTargetFlash(true);
      }, 500);
    }
  }, [codeBlocks, target]);

  // Flash target at start of each round
  useEffect(() => {
    if (showTargetFlash) {
      const timer = setTimeout(() => {
        setShowTargetFlash(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showTargetFlash]);

  const handleReset = () => {
    const newTarget = getRandomTarget();
    setTarget(newTarget);
    setGameState({
      timeRemaining: gameDurationSeconds,
      score: 0,
      gameActive: true,
      gameOver: false,
    });
  };

  return (
    <div className="w-full h-screen bg-slate-950 font-sans overflow-hidden">
      {gameState.gameOver && (
        <GameOverModal score={gameState.score} onReset={handleReset} />
      )}

      <div className="grid grid-cols-2 gap-6 h-full p-6">
        {/* Left Column */}
        <div className={`flex flex-col ${showSuccessFlash ? "bg-green-400/20": "bg-slate-900/40"} backdrop-blur rounded-lg p-6 border border-slate-800`}>
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-slate-200 mb-2">CSS Rush</h1>
            <div className="flex gap-8 items-center">
              <div
                className={`text-xl font-semibold ${
                  gameState.timeRemaining <= 10
                    ? "text-orange-400 animate-pulse"
                    : "text-slate-300"
                }`}
              >
                ⏱ {formatTime(gameState.timeRemaining)}
              </div>
              <div className="text-xl font-semibold text-slate-300">
                ✓ {gameState.score}
              </div>
            </div>
          </div>

          <CodeSpace 
            codeBlocks={codeBlocks}
            setCodeBlocks={setCodeBlocks} 
          />
        </div>

        {/* Right Column */}
        <PreviewPane
          code={target.blocks.map((block, index) => ({
            id: generateBlockId(),
            content: block,
          }))}
          targetHtml={generateTargetHtml(target.blocks)}
          showTargetFlash={showTargetFlash}
        />
      </div>
    </div>
  );
}
