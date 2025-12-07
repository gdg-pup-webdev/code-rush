"use client";

import React, { useEffect, useState } from "react";
import { CodeSpace } from "./components/CodeSpace";
import { Challenge, CodeBlock, GameState } from "./types";
import { checkIsWin, generateHtml, loadRandomChallenge } from "./challenge";
import { formatTime, shuffleArray } from "./utils";
import { GameOverModal } from "./components/GameOverModal";
import { PreviewPane } from "./components/PreviewPane";

export const CssRush = () => {
  const [gameState, setGameState] = useState<GameState>({
    timeRemaining: 180,
    score: 0,
    gameActive: true,
    gameOver: false,
  });

  const [challenge, setChallenge] = useState<Challenge>(loadRandomChallenge());
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);

  const [showSuccessFlash, setShowSuccessFlash] = useState(false);
  const [showTargetFlash, setShowTargetFlash] = useState(true);

  // initiate code blocks based on target
  useEffect(() => {
    // shuffle challenge code blocks and make sure that it is not in win condition
    let blocks = shuffleArray(challenge.codeBlocks);
    while (checkIsWin(blocks, challenge.codeBlocks)) {
      blocks = shuffleArray(challenge.codeBlocks);
    }
    setCodeBlocks(blocks);
  }, [challenge]);

  // Flash ONLY the target when a new challenge loads
  useEffect(() => {
    setShowTargetFlash(true);
    setTimeout(() => {
      setShowTargetFlash(false);
    }, 1000);
  }, [challenge]);

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

    if (checkIsWin(codeBlocks, challenge.codeBlocks)) {
      setGameState((prev) => ({ ...prev, score: prev.score + 1 }));
      setShowSuccessFlash(true); // turn green

      setTimeout(() => {
        const newChallenge = loadRandomChallenge();
        while (newChallenge.id === challenge.id) {
          newChallenge.id = loadRandomChallenge().id;
        }

        setChallenge(newChallenge);
        setShowSuccessFlash(false);
      }, 1000);
    }
  }, [codeBlocks]);

  const handleReset = () => {
    const newChallenge = loadRandomChallenge();
    setChallenge(newChallenge);
    setGameState({
      timeRemaining: 180,
      score: 0,
      gameActive: true,
      gameOver: false,
    });
  };

  return (
    <>
      <div className="w-full h-screen bg-slate-950 font-sans overflow-hidden">
        {gameState.gameOver && (
          <GameOverModal score={gameState.score} onReset={handleReset} />
        )}

        <div className="grid grid-cols-2 h-full p-6 gap-6">
          <div
            className={`flex flex-col ${
              showSuccessFlash ? "bg-green-400/20" : "bg-slate-900/40"
            } w-full p-6  rounded-lg border-slate-800 border `}
          >
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-slate-200 mb-2">
                CSS Rush
              </h1>
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

            <CodeSpace codeBlocks={codeBlocks} setCodeBlocks={setCodeBlocks} />
          </div>

          <PreviewPane
            codeBlocks={codeBlocks}
            targetHtml={generateHtml(challenge.codeBlocks)}
            showTargetFlash={showTargetFlash}
          />
        </div>
      </div>
    </>
  );
};
