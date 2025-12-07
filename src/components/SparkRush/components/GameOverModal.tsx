import React from 'react';
import { useSparkRush } from '../SparkRushContext';

export function GameOverModal() {
  const { gameState, resetGame } = useSparkRush();
  const { score } = gameState;

  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-lg w-full border-t-4"
        style={{ borderColor: 'var(--google-blue)' }}
      >
        <h2 className="text-5xl font-bold text-gray-800 mb-3">
          <span style={{ color: 'var(--google-red)' }}>G</span>
          <span style={{ color: 'var(--google-yellow)' }}>a</span>
          <span style={{ color: 'var(--google-green)' }}>m</span>
          <span style={{ color: 'var(--google-blue)' }}>e</span>
          <span className="text-gray-800"> </span>
          <span style={{ color: 'var(--google-red)' }}>O</span>
          <span style={{ color: 'var(--google-yellow)' }}>v</span>
          <span style={{ color: 'var(--google-green)' }}>e</span>
          <span style={{ color: 'var(--google-blue)' }}>r</span>
          <span className="text-gray-800">!</span>
        </h2>
        <p className="text-lg text-gray-600 mb-6">Time's up! Here's how you did:</p>

        <div className="bg-gray-100 rounded-lg p-6 my-8">
          <p className="text-8xl font-bold mb-2" style={{ color: 'var(--google-yellow)' }}>
            {score}
          </p>
          <p className="text-2xl text-gray-700">Challenges Completed</p>
        </div>

        <button
          onClick={resetGame}
          className="w-full px-6 py-4 text-xl text-white font-bold rounded-lg transition-transform transform hover:scale-105"
          style={{ backgroundColor: 'var(--google-blue)' }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}