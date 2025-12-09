"use client";

import { BouncyShape } from "@/components/ui/BouncyShape";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { motion } from "framer-motion"; // Import Framer Motion
import {
  Code2,
  MonitorPlay,
  Trophy,
  Timer,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  const colors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC04",
    green: "#34A853",
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden font-sans">
      {/* === BACKGROUND DECORATION === */}
      <div className="gdg-decor-bg" aria-hidden="true">
        <span className="bracket text-gray-900" style={{ marginRight: "2rem" }}>
          &lt;
        </span>
        <span className="bracket text-gray-900">&gt;</span>
      </div>

      {/* HEADER */}
      <header className="w-full px-6 md:px-12 py-6 flex justify-between items-center bg-white/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-full transform hover:scale-105 transition-transform duration-100 cursor-pointer">
            <Logo />
          </Link>
        </div>
        <nav>
          <Link href="/spark-rush">
            <button
              className="group px-6 py-2.5 text-white font-medium text-sm rounded-full shadow-md hover:shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
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
        {/* HERO SECTION */}
        <section className="relative w-full pt-20 pb-32 px-4 flex flex-col items-center justify-center min-h-[80vh]">
          
          {/* === FRAMER MOTION GEOMETRIC SHAPES === */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Blue Square - Top Left */}
            <BouncyShape
              color={colors.blue}
              className="top-20 left-[10%] w-24 h-24 pointer-events-auto"
              initialRotate={12}
              delay={0}
            />

            {/* Red Circle - Bottom Right */}
            <BouncyShape
              type="circle"
              color={colors.red}
              className="bottom-40 right-[10%] w-32 h-32 pointer-events-auto"
              initialRotate={0}
              delay={2}
            />

            {/* Yellow Square - Top Right */}
            <BouncyShape
              color={colors.yellow}
              className="top-32 right-[20%] w-16 h-16 pointer-events-auto"
              initialRotate={45}
              delay={1.5}
            />

            {/* Green Pill - Bottom Left */}
            {/* Custom logic for Pill shape since it's not a square/circle */}
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
                  rotate: [0, 4, -8, 0], // Relative wobble
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

          {/* Hero Content */}
          <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold tracking-wide animate-fade-in-up border border-blue-100">
              <Sparkles size={16} fill="currentColor" />
              <span>GDG PUP</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-gray-900">
              CODE.
              <br />
              <span className="relative inline-block">
                CREATE.
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-red-500"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
              <br />
              <span style={{ color: colors.blue }}>CONQUER.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              The ultimate campus CSS showdown. Arrange the blocks, match the
              design, and race against the clock.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
              <Link href="/spark-rush">
                <button
                  className="w-full sm:w-auto px-10 py-4 text-xl font-bold rounded-xl shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 transform hover:scale-105 transition-all text-white cursor-pointer"
                  style={{ backgroundColor: colors.blue }}
                >
                  Start Challenge
                </button>
              </Link>
              <Link href="/leaderboards">
              <button className="group w-full sm:w-auto px-10 py-4 text-xl font-bold rounded-xl bg-white border-2 border-gray-100 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <Trophy
                  size={20}
                  className="text-yellow-500 group-hover:scale-110 transition-transform"
                />
                Leaderboards
              </button>
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="w-full max-w-7xl mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md"
                style={{ backgroundColor: colors.blue }}
              >
                <Code2 size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Write Logic
              </h3>
              <p className="text-gray-500">
                Drag code blocks and arrange CSS properties to build the layout.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md"
                style={{ backgroundColor: colors.red }}
              >
                <MonitorPlay size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                See Results
              </h3>
              <p className="text-gray-500">
                Instant preview pane updates in real-time as you code.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md"
                style={{ backgroundColor: colors.yellow }}
              >
                <Timer size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Speed Run
              </h3>
              <p className="text-gray-500">
                Submit fast. Points are awarded for both accuracy and speed.
              </p>
            </div>
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
}