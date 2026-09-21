"use client";

import React from "react";
import { motion } from "framer-motion";
import { KawaEmblem } from "../Brand/KawaEmblem";

export const Scene01Awakening: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center space-y-8 max-w-xl mx-auto"
      >
        {/* Primary Geometric KAWA Symbol in Pure White */}
        <div className="mb-2">
          <KawaEmblem size={120} variant="white" animate={true} state="dormant" />
        </div>

        {/* Brand Wordmark & Subtitle */}
        <div className="space-y-3">
          <h1 className="text-6xl sm:text-8xl font-light tracking-[0.25em] text-white uppercase font-sans select-none">
            KAWA
          </h1>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-mono tracking-[0.3em] text-[#8e95a2] uppercase">
              A STAKING PROTOCOL
            </p>
            <p className="text-[11px] font-mono tracking-[0.35em] text-[#c8f53c] uppercase font-medium">
              ON ROBINHOOD CHAIN
            </p>
          </div>
        </div>

        {/* Quiet Scroll Indicator */}
        <div className="pt-8 text-[10px] font-mono tracking-[0.35em] text-neutral-500 uppercase flex flex-col items-center gap-2 select-none pointer-events-none">
          <span>SCROLL</span>
          <span className="text-xs text-[#c8f53c] animate-bounce">&darr;</span>
        </div>
      </motion.div>
    </section>
  );
};
