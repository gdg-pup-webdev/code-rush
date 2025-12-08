"use client";

import { SparkRush } from "@/components/SparkRush";
import { BouncyShape } from "@/components/ui/BouncyShape";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"; 

export default function SparkRushPage() {
  const [isClient, setIsClient] = useState(false);

  // Initialize
  useEffect(() => {
    const interval = setInterval(() => {
      setIsClient(true);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const colors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC04",
    green: "#34A853",
  };

  if (!isClient) {
    return (
      <div
        className="relative flex flex-col min-h-screen bg-white text-gray-900 overflow-hidden font-sans cursor-pointer" 
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
          <motion.h1
              className="text-2xl md:text-4xl font-black tracking-tighter text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }} 
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              Loading...
            </motion.h1>
        </div>
      </div>
    );
  }
  return (
    <main>
      <SparkRush />
    </main>
  );
}
