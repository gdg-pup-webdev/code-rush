"use client";

import { motion } from "framer-motion";

// Reusable Component for the Shapes
export const BouncyShape = ({
  color,
  className,
  delay = 0,
  initialRotate = 0,
  type = "square", // 'square' | 'circle'
}: {
  color: string;
  className: string;
  delay?: number;
  initialRotate?: number;
  type?: "square" | "circle";
}) => {
  return (
    <motion.div
      className={`absolute ${className} cursor-pointer`}
      // 1. Initial State (Positioning & Base Rotation)
      initial={{
        rotate: initialRotate,
        scale: 1,
      }}
      // 2. Interaction State (Hover/Tap) - Managed independently via Spring
      whileHover={{
        scale: 1.2,
        rotate: initialRotate + 15,
      }}
      whileTap={{
        scale: 0.9,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
    >
      {/* 3. The "Idle" Animation (Floating/Breathing) - Nested to avoid conflict */}
      <motion.div
        className="w-full h-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0], // Relative rotation wobble
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: delay,
        }}
      >
        {/* Inner Shape to handle Borders vs Backgrounds cleanly */}
        <div
          className={`w-full h-full opacity-80 shadow-lg ${
            type === "circle" ? "rounded-full" : "rounded-2xl"
          }`}
          style={
            type === "circle"
              ? { border: `12px solid ${color}`, backgroundColor: "transparent" }
              : { backgroundColor: color }
          }
        />
      </motion.div>
    </motion.div>
  );
};
