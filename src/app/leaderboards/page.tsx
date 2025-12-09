"use client";

import { Leaderboards } from "@/components/Leaderboards";
import { BouncyShape } from "@/components/ui/BouncyShape";
import { Logo } from "@/components/ui/Logo";
import { colors } from "@/constants/colors";
import { motion } from "framer-motion";
import { ChevronRight, Trophy } from "lucide-react";
import Link from "next/link";
 

export const LeaderboardsPage = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden font-sans">
      <div className="gdg-decor-bg" aria-hidden="true">
        <span className="bracket text-gray-900" style={{ marginRight: "2rem" }}>
          &lt;
        </span>
        <span className="bracket text-gray-900">&gt;</span>
      </div>

      {/* HEADER */}
      <header className="w-full px-6 md:px-12 py-6 flex justify-between items-center bg-white/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/">
            <div className="w-full transform hover:scale-105 transition-transform duration-100 cursor-pointer">
              <Logo />
            </div>
          </Link>
        </div>
        <nav>
          <Link href="/spark-rush">
            <button
              className="group px-6 py-2.5 text-white font-medium text-sm rounded-full shadow-md hover:shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              style={{ backgroundColor: colors.blue }}
            >
              Enter Arena
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col">
        <section className="relative w-full pt-20 pb-32 px-4 flex flex-col items-center justify-center min-h-[80vh]">
          {/* === FRAMER MOTION GEOMETRIC SHAPES === */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <BouncyShape
              color={colors.blue}
              className="top-20 left-[10%] w-24 h-24 pointer-events-auto"
              initialRotate={12}
              delay={0}
            />
            <BouncyShape
              type="circle"
              color={colors.red}
              className="bottom-40 right-[10%] w-32 h-32 pointer-events-auto"
              initialRotate={0}
              delay={2}
            />
            <BouncyShape
              color={colors.yellow}
              className="top-32 right-[20%] w-16 h-16 pointer-events-auto"
              initialRotate={45}
              delay={1.5}
            />
            <motion.div
              className="absolute bottom-20 left-[15%] w-40 h-12 pointer-events-auto cursor-pointer"
              initial={{ rotate: -12, scale: 1 }}
              whileHover={{
                scale: 1.1,
                rotate: -5,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
            >
              <motion.div
                className="w-full h-full"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 4, -8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <div
                  className="w-full h-full rounded-full opacity-80 shadow-lg"
                  style={{ backgroundColor: colors.green }}
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-50 text-yellow-700 text-sm font-bold tracking-wide animate-fade-in-up border border-yellow-100">
              <Trophy size={16} fill="currentColor" />
              <span>Leaderboard</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-gray-900">
              HALL OF FAME
            </h1>

            <Leaderboards />
          </div>
        </section>
      </main>

      <footer className="w-full py-8 text-center border-t border-gray-100 bg-white relative z-10">
        <p className="text-gray-500 font-medium">
          Made with <span className="text-red-500">❤</span> by GDG On Campus
        </p>
      </footer>

      <style jsx global>{`
        .gdg-decor-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0.03;
          font-weight: 900;
          font-size: 40vw;
          user-select: none;
        }

        .gdg-decor-bg .bracket {
          transform: scaleY(0.9);
          font-family: sans-serif;
          letter-spacing: -2vw;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LeaderboardsPage;
