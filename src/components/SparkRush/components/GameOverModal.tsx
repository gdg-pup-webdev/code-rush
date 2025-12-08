import React, { useState } from "react";
import { useSparkRush } from "../SparkRushContext";
import { postLeaderBoardEntry } from "@/lib/leaderboards";
import Link from "next/link";
import { Send } from "lucide-react";

export function GameOverModal({ reset }: { reset: () => void }) {
  const { gameState, resetGame } = useSparkRush();
  const { score } = gameState;
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleOnCreateEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && score > 0) {
      await postLeaderBoardEntry(username, score);
      setSubmitted(true);
    }
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

        {!submitted ? (
          <form onSubmit={handleOnCreateEntry} className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Add Your Score to the Leaderboard!
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="px-6 py-2 text-white font-semibold rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
                style={{ backgroundColor: "var(--google-green)" }}
                disabled={!username}
              >
                <Send size={16} />
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-lg text-green-600 font-semibold">
              Your score has been submitted!
            </p>
            <Link href="/leaderboards">
              <span className="text-blue-500 hover:underline cursor-pointer">
                View Leaderboards
              </span>
            </Link>
          </div>
        )}

        <button
          onClick={() => {
            // resetGame();
            reset();
          }}
          className="w-full mt-4 px-6 py-4 text-xl text-white font-bold rounded-lg transition-transform transform hover:scale-105"
          style={{ backgroundColor: "var(--google-blue)" }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}