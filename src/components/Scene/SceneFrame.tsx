"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SceneFrameProps {
  id?: string;
  frameNumber: string;
  frameTitle: string;
  children: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
}

export const SceneFrame: React.FC<SceneFrameProps> = ({
  id,
  frameNumber,
  frameTitle,
  children,
  isFirst = false,
  isLast = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll progress through this specific frame viewport slot
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Ultra-smooth spring physics for organic agency kinetic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  // Frame formation transforms:
  // 1. Scale: grows from 0.90 to 1.0 as it enters, then parks/scales slightly down to 0.94 as next frame rises
  const scale = useTransform(
    smoothProgress,
    [0, 0.42, 0.58, 1],
    isFirst ? [1, 1, 1, 0.94] : isLast ? [0.90, 1, 1, 1] : [0.90, 1, 1, 0.94]
  );

  // 2. Opacity: smoothly fades in as it takes shape
  const opacity = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    isFirst ? [1, 1, 1, 0.45] : isLast ? [0.25, 1, 1, 1] : [0.25, 1, 1, 0.45]
  );

  // 3. Vertical Y lift: rises smoothly into position
  const y = useTransform(
    smoothProgress,
    [0, 0.42, 0.58, 1],
    isFirst ? [0, 0, 0, -45] : isLast ? [80, 0, 0, 0] : [80, 0, 0, -45]
  );

  // 4. Border Radius morphing: expands from rounded capsule into sharp luxury agency frame
  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.42, 1],
    ["3.5rem", "2rem", "2rem"]
  );

  // 5. Border glow intensification as it reaches active center view
  const borderColor = useTransform(
    smoothProgress,
    [0, 0.45, 0.55, 1],
    [
      "rgba(255, 255, 255, 0.06)",
      "rgba(200, 245, 60, 0.35)",
      "rgba(200, 245, 60, 0.35)",
      "rgba(255, 255, 255, 0.06)",
    ]
  );

  const shadow = useTransform(
    smoothProgress,
    [0, 0.45, 0.55, 1],
    [
      "0 15px 40px rgba(0, 0, 0, 0.4)",
      "0 35px 90px rgba(0, 0, 0, 0.9), 0 0 50px rgba(200, 245, 60, 0.08)",
      "0 35px 90px rgba(0, 0, 0, 0.9), 0 0 50px rgba(200, 245, 60, 0.08)",
      "0 15px 40px rgba(0, 0, 0, 0.4)",
    ]
  );

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative w-full min-h-screen py-10 sm:py-16 px-3 sm:px-6 lg:px-10 flex items-center justify-center select-none"
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
          borderRadius,
          borderColor,
          boxShadow: shadow,
        }}
        className="relative w-full max-w-[1360px] mx-auto bg-[#0c0e15] border border-white/10 overflow-hidden transition-colors duration-300"
      >
        {/* Subtle Ambient Frame Gradient Underlays */}
        <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-[#c8f53c]/[0.03] blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[350px] bg-indigo-500/[0.025] blur-[150px] pointer-events-none rounded-full" />

        {/* Agency Frame Header Tag */}
        <div className="absolute top-5 left-7 right-7 z-20 flex items-center justify-between pointer-events-none text-[10px] font-mono tracking-widest text-[#8e95a2] uppercase">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f53c] shadow-[0_0_6px_#c8f53c]" />
            <span className="text-white font-bold">{frameNumber}</span>
            <span className="text-white/20">•</span>
            <span className="text-neutral-400">{frameTitle}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[9px] text-neutral-600 tracking-[0.25em]">
            <span>ROBINHOOD CHAIN</span>
            <span>•</span>
            <span className="text-[#c8f53c]/60">LAYER5</span>
          </div>
        </div>

        {/* Main Frame Content */}
        <div className="relative z-10 w-full pt-8 pb-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
export default SceneFrame;
