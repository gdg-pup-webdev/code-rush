import { colors } from "@/constants/colors";
import { getLeaderboards } from "@/lib/leaderboards";
import { LeaderBoardEntry } from "@/types/leaderboardTypes";
import { Crown, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";

const SkeletonItem = () => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-10 h-8 bg-gray-200 rounded-md"></div>
      <div className="flex flex-col items-start gap-2">
        <div className="w-24 h-5 bg-gray-200 rounded-md"></div>
        <div className="w-16 h-3 bg-gray-200 rounded-md"></div>
      </div>
    </div>
    <div className="w-12 h-8 bg-gray-200 rounded-md"></div>
  </div>
);

export const Leaderboards = () => {
  const pageSize = 45;
  const [leaderboards, setLeaderboards] = useState<LeaderBoardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const handleOnGetLeaderboards = async () => {
    try {
      const leaderboardsPromise = getLeaderboards();
      const timerPromise = new Promise((resolve) => setTimeout(resolve, 10));
      const [res] = await Promise.all([leaderboardsPromise, timerPromise]);
      setLeaderboards(res);
    } catch (error) {
      console.error("Failed to fetch leaderboards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleOnGetLeaderboards();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const crownVariants: Variants = {
    hidden: { scale: 0, rotate: -90 },
    visible: {
      scale: 1,
      rotate: -12,
      transition: { delay: 0.5, type: "spring" },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/50 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Top Players</h2>
        <Sparkles size={24} className="text-yellow-500" />
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <SkeletonItem key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {leaderboards.slice(0, visibleCount).map((entry, index) => {
            const rank = index + 1;
            let rankColor = "text-gray-400";
            if (rank === 1) rankColor = "text-yellow-400";
            if (rank === 2) rankColor = "text-gray-300";
            if (rank === 3) rankColor = "text-yellow-600";

            return (
              <motion.div
                key={entry.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
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
                    <motion.div
                      variants={crownVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Crown
                        size={24}
                        className="text-yellow-400"
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {!loading && leaderboards.length > visibleCount && (
        <div className="text-center mt-8">
          <button
            onClick={() =>
              setVisibleCount((prevCount) => prevCount + pageSize)
            }
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-colors"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};
