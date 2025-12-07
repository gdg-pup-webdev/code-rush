import React from 'react';

interface GameHeaderProps {
  timeRemaining: number;
  score: number;
  formatTime: (s: number) => string;
}

/**
 * Header with timer and score
 */
export function GameHeader({ timeRemaining, score, formatTime }: GameHeaderProps) {
  const isLowTime = timeRemaining <= 10;

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-slate-200 mb-2">
        CSS Rush
      </h1>
      <div className="flex gap-8 items-center">
        <div className={`text-xl font-semibold ${isLowTime ? 'text-orange-400 animate-pulse' : 'text-slate-300'}`}>
          ⏱ {formatTime(timeRemaining)}
        </div>
        <div className="text-xl font-semibold text-slate-300">
          ✓ {score}
        </div>
      </div>
    </div>
  );
}
