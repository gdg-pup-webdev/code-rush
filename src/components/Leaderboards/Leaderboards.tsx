import { colors } from "@/constants/colors";
import { getLeaderboards } from "@/lib/leaderboards";
import { LeaderBoardEntry } from "@/types/leaderboardTypes";
import { Crown, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";

export const Leaderboards = () => {


    
      const [leaderboards, setLeaderboards] = useState<LeaderBoardEntry[]>([]);
    
      const handleOnGetLeaderboards = async () => {
        const res = await getLeaderboards();
        setLeaderboards(res);
      };
    
      useEffect(() => {
        handleOnGetLeaderboards();
      }, []);
      
  return (
    <div className="w-full max-w-2xl mx-auto bg-white/50 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Top Players</h2>
        <Sparkles size={24} className="text-yellow-500" />
      </div>

      <div className="space-y-4">
        {leaderboards.map((entry, index) => {
          const rank = index + 1;
          let rankColor = "text-gray-400";
          if (rank === 1) rankColor = "text-yellow-400";
          if (rank === 2) rankColor = "text-gray-300";
          if (rank === 3) rankColor = "text-yellow-600";

          return (
            <div
              key={entry.id}
              className="flex items-center justify-between p-4 rounded-xl bg-white shadow-md transition-transform hover:scale-105 border-l-8"
              style={{
                borderColor:
                  rank === 1
                    ? colors.yellow
                    : rank === 2
                    ? colors.red
                    : rank === 3
                    ? colors.blue
                    : "transparent",
              }}
            >
              <div className="flex items-center gap-4">
                <span className={`text-3xl font-bold w-10 ${rankColor}`}>
                  {rank}
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-xl font-semibold text-gray-800">
                    {entry.username?.trim()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className="text-2xl font-bold"
                  style={{ color: colors.blue }}
                >
                  {entry.score}
                </span>
                {rank === 1 && (
                  <Crown size={24} className="text-yellow-400 -rotate-12" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
