"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GameState, Challenge, CodeBlock } from './types';
import { checkIsWin, loadRandomChallenge, shuffleArray } from './challenge';

interface SparkRushContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  challenge: Challenge;
  setChallenge: React.Dispatch<React.SetStateAction<Challenge>>;
  codeBlocks: CodeBlock[];
  setCodeBlocks: React.Dispatch<React.SetStateAction<CodeBlock[]>>;
  resetGame: () => void;
  showTargetFlash: boolean;
  showSuccessOverlay: boolean;
}

const SparkRushContext = createContext<SparkRushContextType | undefined>(undefined);

export const useSparkRush = () => {
  const context = useContext(SparkRushContext);
  if (!context) {
    throw new Error('useSparkRush must be used within a SparkRushProvider');
  }
  return context;
};

interface SparkRushProviderProps {
  children: ReactNode;
}

export const SparkRushProvider: React.FC<SparkRushProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    timeRemaining: 180,
    score: 0,
    gameActive: true,
    gameOver: false,
  });
  const [challenge, setChallenge] = useState<Challenge>(loadRandomChallenge());
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);

  const resetGame = () => {
    setChallenge(loadRandomChallenge());
    setGameState({
      timeRemaining: 180,
      score: 0,
      gameActive: true,
      gameOver: false,
    });
  };

  
  const [showTargetFlash, setShowTargetFlash] = useState(true);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  // initiate code blocks based on target
  useEffect(() => {
    // shuffle challenge code blocks and make sure that it is not in win condition
    let blocks = shuffleArray(challenge.codeBlocks);
    while (checkIsWin(blocks, challenge.codeBlocks)) {
      blocks = shuffleArray(challenge.codeBlocks);
    }
    setCodeBlocks(blocks);
  }, [challenge, setCodeBlocks]);

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
  }, [gameState.gameActive, setGameState]);

  // Check for win condition
  useEffect(() => {
    if (codeBlocks.length === 0) return;

    if (checkIsWin(codeBlocks, challenge.codeBlocks)) {
      setGameState((prev) => ({ ...prev, score: prev.score + 1 }));
      setShowSuccessOverlay(true);

      setTimeout(() => {
        const newChallenge = loadRandomChallenge();
        while (newChallenge.id === challenge.id) {
          newChallenge.id = loadRandomChallenge().id;
        }

        setChallenge(newChallenge);
        setShowSuccessOverlay(false);
      }, 1000);
    }
  }, [codeBlocks, challenge.id, challenge.codeBlocks, setChallenge, setGameState]);

  const value = {
    gameState,
    setGameState,
    challenge,
    setChallenge,
    codeBlocks,
    setCodeBlocks,
    resetGame,
    showTargetFlash,
    showSuccessOverlay
  };

  return (
    <SparkRushContext.Provider value={value}>
      {children}
    </SparkRushContext.Provider>
  );
};
