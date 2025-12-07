import React from 'react';

interface GameOverModalProps {
  score: number;
  onReset: () => void;
}

/**
 * Game over modal shown when time runs out
 */
export function GameOverModal({ score, onReset }: GameOverModalProps) {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 text-center max-w-md">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Game Over!</h2>
        <p className="text-6xl font-bold text-blue-500 mb-2">{score}</p>
        <p className="text-xl text-gray-600 mb-6">challenges completed</p>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
