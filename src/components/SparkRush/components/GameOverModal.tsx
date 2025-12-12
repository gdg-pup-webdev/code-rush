import React, { useState } from "react";
import { useSparkRush } from "../SparkRushContext";
import { postLeaderBoardEntry } from "@/lib/leaderboards";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function GameOverModal({ reset }: { reset: () => void }) {
  const { gameState } = useSparkRush();
  const { score } = gameState;
  const [username, setUsername] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSaveScore = async () => {
    if (username && score > 0) {
      setIsSaving(true);
      try {
        const savePromise = postLeaderBoardEntry(username, score);
        const timerPromise = new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );
        await Promise.all([savePromise, timerPromise]);
      } catch (error) {
        console.error("Failed to save score:", error);
        // Optionally, show an error message to the user
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handlePlayAgain = async () => {
    if (isSaving) return;
    await handleSaveScore();
    reset();
  };

  const handleViewLeaderboards = async (e: React.MouseEvent) => {
    if (isSaving) return;
    e.preventDefault();
    await handleSaveScore();
    router.push("/leaderboards");
  };

  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-lg w-full border-t-4"
        style={{ borderColor: "var(--google-blue)" }}
      >
        <h2 className="text-5xl font-bold text-gray-800 mb-3">
          <span style={{ color: "var(--google-red)" }}>G</span>
          <span style={{ color: "var(--google-yellow)" }}>a</span>
          <span style={{ color: "var(--google-green)" }}>m</span>
          <span style={{ color: "var(--google-blue)" }}>e</span>
          <span className="text-gray-800"> </span>
          <span style={{ color: "var(--google-red)" }}>O</span>
          <span style={{ color: "var(--google-yellow)" }}>v</span>
          <span style={{ color: "var(--google-green)" }}>e</span>
          <span style={{ color: "var(--google-blue)" }}>r</span>
          <span className="text-gray-800">!</span>
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Time's up! Here's how you did:
        </p>

        <div className="bg-gray-100 rounded-lg p-6 my-8">
          <p
            className="text-8xl font-bold mb-2"
            style={{ color: "var(--google-yellow)" }}
          >
            {score}
          </p>
          <p className="text-2xl text-gray-700">Challenges Completed</p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Enter your email to save your score!
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isSaving}
            />
          </div>
        </div>

        <button
          onClick={handlePlayAgain}
          className="w-full mt-4 px-6 py-4 text-xl text-white font-bold rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer "
          style={{ backgroundColor: "var(--google-blue)" }}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Play Again"}
        </button>
        <Link href="/leaderboards" onClick={handleViewLeaderboards}>
          <div
            className={`mt-4 text-blue-500 hover:underline ${
              isSaving ? "pointer-events-none opacity-50" : ""
            }`}
          >
            View Leaderboards
          </div>
        </Link>
      </div>
    </div>
  );
}
