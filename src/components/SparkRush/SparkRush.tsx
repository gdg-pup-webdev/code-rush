"use client";

import React, { useEffect, useState } from "react";
import { CodeSpace } from "./components/CodeSpace";
import { formatTime } from "./utils";
import { GameOverModal } from "./components/GameOverModal";
import { PreviewPane } from "./components/PreviewPane";
import { SparkRushProvider, useSparkRush } from "./SparkRushContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { BouncyShape } from "../ui/BouncyShape";
import { Home } from "lucide-react";
import { Logo } from "../ui/Logo";
import { colors } from "@/constants/colors";

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
        <Logo />
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

const SparkRushContainer = () => {
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const colors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC04",
    green: "#34A853",
  };

  const handleOnReady = async () => {
    setCountdown(3);
    setIsReady(true);

    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) {
          clearInterval(intervalId);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  };

  const handleReset = async () => {
    setIsReady(false);
    setCountdown(3);
  };

  if (!isReady) {
    return (
      <div
        className="relative flex flex-col min-h-screen bg-white text-gray-900 overflow-hidden font-sans cursor-pointer"
        onClick={handleOnReady}
      >
        <Link href="/">
          <button className="absolute top-4 right-4 z-50 p-3 rounded-full bg-gray-100/50 backdrop-blur-sm hover:bg-gray-200 transition-colors">
            <Home size={20} className="text-gray-700" />
          </button>
        </Link>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <BouncyShape
            color={colors.blue}
            className="top-20 left-[10%] w-24 h-24"
            initialRotate={12}
            delay={0}
          />
          <BouncyShape
            type="circle"
            color={colors.red}
            className="bottom-40 right-[10%] w-32 h-32"
            initialRotate={0}
            delay={2}
          />
          <BouncyShape
            color={colors.yellow}
            className="top-32 right-[20%] w-16 h-16"
            initialRotate={45}
            delay={1.5}
          />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="hover:scale-105 transition-all duration-300">
            <motion.h1
              className="text-5xl md:text-7xl font-black tracking-tighter text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              Click Anywhere to Start
            </motion.h1>
          </div>
        </div>
      </div>
    );
  }

  if (countdown >= 0) {
    const countdownColors = [
      colors.green,
      colors.yellow,
      colors.red,
      colors.blue,
    ];
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className={`absolute inset-0 pointer-events-none flex flex-col min-h-screen   text-gray-900 bg-white overflow-hidden font-sans`}
        >
          <div className="flex-grow flex items-center justify-center">
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="text-9xl md:text-[200px] font-black tracking-tighter"
              style={{ color: countdownColors[countdown] || colors.blue }}
            >
              {countdown === 0 ? "GO!" : countdown}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="absolute inset-0 z-100 opacity-0 transition-all duration-700 pointer-events-none flex flex-col min-h-screen bg-white  text-gray-900 overflow-hidden font-sans">
        <div className="flex-grow flex items-center justify-center">
          <div
            className="text-9xl md:text-[200px] font-black tracking-tighter"
            style={{ color: colors.green }}
          >
            GO!
          </div>
        </div>
      </div>

      <SparkRushProvider>
        <SparkRushGame reset={handleReset} />
      </SparkRushProvider>
    </div>
  );
};

export const SparkRush = () => {
  return (
    <>
      <div className="relative flex flex-col min-h-screen bg-white text-gray-900 overflow-hidden font-sans cursor-pointer xl:hidden">
        <Link href="/">
          <button className="absolute top-4 right-4 z-50 p-3 rounded-full bg-gray-100/50 backdrop-blur-sm hover:bg-gray-200 transition-colors">
            <Home size={20} className="text-gray-700" />
          </button>
        </Link>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <BouncyShape
            color={colors.blue}
            className="top-20 left-[10%] w-24 h-24"
            initialRotate={12}
            delay={0}
          />
          <BouncyShape
            type="circle"
            color={colors.red}
            className="bottom-40 right-[10%] w-32 h-32"
            initialRotate={0}
            delay={2}
          />
          <BouncyShape
            color={colors.yellow}
            className="top-32 right-[20%] w-16 h-16"
            initialRotate={45}
            delay={1.5}
          />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="hover:scale-105 transition-all duration-300">
            <motion.h1
              className="text-5xl md:text-7xl font-black tracking-tighter text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              Code Rush only works on desktop.
            </motion.h1>
          </div>
        </div>
      </div>
      <div className="w-full h-full hidden xl:block">
        <SparkRushContainer />
      </div>
    </>
  );
};
