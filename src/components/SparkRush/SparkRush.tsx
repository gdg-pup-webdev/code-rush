"use client";

import React, { useEffect, useState } from "react";
import { CodeSpace } from "./components/CodeSpace";
import { formatTime } from "./utils";
import { GameOverModal } from "./components/GameOverModal";
import { PreviewPane } from "./components/PreviewPane";
import { SparkRushProvider, useSparkRush } from "./SparkRushContext";
import Link from "next/link";

const SparkRushGame = ({ reset }: { reset: () => void }) => {
  const { gameState, challenge, showTargetFlash, showSuccessOverlay } =
    useSparkRush();

  return (
    <div
      className={`w-full h-screen   font-sans overflow-hidden flex flex-col transition-all duration-200 ${
        showSuccessOverlay ? "bg-yellow-100" : ""
      }`}
    >
      {/* score overlay */}
      <div
        className={`absolute inset-0  bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500 pointer-events-none  ${
          showSuccessOverlay ? "visible opacity-100" : "invisible opacity-0"
        } flex flex-col gap-8`}
      >
        <div className="text-yellow-300 drop-shadow-sm drop-shadow-black text-9xl font-bold  ">
          {gameState.score}
        </div>
        <div className="text-yellow-300 drop-shadow-sm drop-shadow-black text-3xl font-bold  ">
          {`Time : ${formatTime(gameState.timeRemaining)}`}
        </div>
      </div>

      {/* countdown overlay */}
      <div
        className={`absolute inset-0  bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500 pointer-events-none  ${
          gameState.timeRemaining <= 5 && !showSuccessOverlay
            ? "visible opacity-100"
            : "invisible opacity-0"
        } flex flex-col gap-8`}
      >
        <div className="text-yellow-300 drop-shadow-sm drop-shadow-black text-9xl font-bold  ">
          {gameState.timeRemaining}
        </div>
      </div>

      {gameState.gameOver && <GameOverModal reset={reset} />}

      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link href="/" className="text-2xl font-bold">
          <span style={{ color: "var(--google-blue)" }}>S</span>
          <span style={{ color: "var(--google-red)" }}>p</span>
          <span style={{ color: "var(--google-yellow)" }}>a</span>
          <span style={{ color: "var(--google-green)" }}>r</span>
          <span style={{ color: "var(--google-blue)" }}>k</span>
          <span style={{ color: "var(--foreground)" }}> </span>
          <span style={{ color: "var(--google-red)" }}>R</span>
          <span style={{ color: "var(--google-yellow)" }}>u</span>
          <span style={{ color: "var(--google-green)" }}>s</span>
          <span style={{ color: "var(--google-blue)" }}>h</span>
        </Link>
        <div className="flex items-center gap-6">
          <div
            className={`text-2xl font-semibold transition-colors flex items-center gap-2 ${
              gameState.timeRemaining <= 10
                ? "text-red-500 animate-pulse"
                : "text-gray-600"
            }`}
          >
            <span className="text-2xl">⏱</span>{" "}
            {formatTime(gameState.timeRemaining)}
          </div>
          <div className="text-2xl font-semibold text-green-500 flex items-center gap-2">
            <span className="text-2xl">✓</span> {gameState.score}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-2 gap-8 p-8 overflow-hidden">
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          {/* Challenge Info */}
          <div className="flex-shrink-0 p-6 rounded-xl border-2 border-gray-200 bg-white shadow-sm">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--google-blue)" }}
            >
              {challenge.title}
            </h2>
            <p className="text-gray-600 text-lg">{challenge.description}</p>
          </div>

          {/* Code Space */}
          <div
            className={`flex-1 flex flex-col transition-all duration-300 rounded-xl border-2 ${"bg-gray-50 border-gray-200"}`}
          >
            <CodeSpace />
          </div>
        </div>

        {/* Right Column (Preview) */}
        <div className="flex-1 flex flex-col">
          <PreviewPane showTargetFlash={showTargetFlash} />
        </div>
      </main>
    </div>
  );
};

export const SparkRush = () => {
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleOnReady = async () => {
    console.log("ready");
    setCountdown(3);
    setIsReady(true);

    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
      console.log("countdown", countdown);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      setCountdown(3);
    };
  };

  const handleReset = async () => {
    setIsReady(false);
    setCountdown(3);
  };

  if (!isReady)
    return (
      <div className="flex items-center justify-center h-screen">
        {/* countdown overlay */}
        <div
          className={`absolute inset-0 bg-amber-200  bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500 ${
            true ? "visible opacity-100" : "invisible opacity-0"
          } flex flex-col gap-8`}
          onClick={handleOnReady}
        >
          <div className="text-white hover:scale-110 transition-all duration-150 cursor-pointer drop-shadow-lg  text-3xl font-bold  ">
            Click anywhere to start
          </div>
        </div>
      </div>
    );

  if (countdown >= 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* countdown overlay */}
        <div
          className={`absolute inset-0 ${
            countdown=== 0
              ? "bg-green-400"
              : countdown === 1
              ? "bg-amber-300"
              : countdown === 2
              ? "bg-orange-400"
              : "bg-red-600"
          }  bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500 pointer-events-none  ${
            true ? "visible opacity-100" : "invisible opacity-0"
          } flex flex-col gap-8`}
        >
          <div className="text-white drop-shadow-sm drop-shadow-black text-9xl font-bold  ">
            {countdown === 0 ? "GO" : countdown}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {/* countdown overlay */}
      <div
        className={`absolute z-100 inset-0   bg-opacity-50 flex items-center justify-center  transition-all duration-500 pointer-events-none ${
          true ? "visible opacity-100" : "invisible opacity-0"
        } flex flex-col gap-8`}
      ></div>

      <SparkRushProvider>
        <SparkRushGame reset={handleReset} />
      </SparkRushProvider>
    </div>
  );
};
