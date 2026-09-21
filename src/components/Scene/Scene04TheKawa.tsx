"use client";

import React from "react";
import { motion } from "framer-motion";
import { KawaEmblem } from "../Brand/KawaEmblem";

export const Scene04TheKawa: React.FC = () => {
  const stages = [
    {
      state: "DORMANT",
      meaning: "Liquid capital at rest awaiting deployment.",
      multiplier: "1.00×",
    },
    {
      state: "ACTIVATED",
      meaning: "Assets integrated into Robinhood Chain liquidity streams.",
      multiplier: "1.25×",
    },
    {
      state: "GROWING",
      meaning: "Continuous compound accumulation across blocks.",
      multiplier: "1.75×",
    },
    {
      state: "AWAKENED",
      meaning: "Full protocol equilibrium and maximized yield harvest.",
      multiplier: "2.50×",
    },
  ];

  return (
    <section
      id="your-kawa"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center space-y-12"
      >
        {/* Scene Indicator */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-light tracking-[0.1em] text-white uppercase font-sans">
            THE LIVING <span className="text-[#c8f53c] font-normal">STATE</span>
          </h2>
          <p className="text-xs sm:text-sm font-mono tracking-[0.05em] text-[#8e95a2] max-w-md mx-auto pt-1">
            Every position possesses a state. As commitment deepens, resonance awakens.
          </p>
        </div>

        {/* Visual Central Emblem Symbol */}
        <div className="py-2">
          <div className="inline-block p-4 border border-white/10 rounded-full bg-[#121418] shadow-lg shadow-black/50">
            <KawaEmblem size={64} variant="white" animate={true} state="awakened" />
          </div>
        </div>

        {/* Minimalist Editorial State Breakdown in Dark Theme */}
        <div className="w-full border-t border-white/10 divide-y divide-white/10 text-left">
          {stages.map((stg, idx) => (
            <div
              key={stg.state}
              className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4"
            >
              <div className="flex items-baseline gap-4 sm:w-1/3">
                <span className="text-xs font-mono text-[#c8f53c]">0{idx + 1}</span>
                <span className="text-sm font-mono font-medium tracking-[0.15em] text-white uppercase">
                  {stg.state}
                </span>
              </div>
              <p className="sm:w-1/2 text-xs sm:text-sm text-[#8e95a2] font-sans leading-relaxed">
                {stg.meaning}
              </p>
              <div className="sm:w-1/6 text-right sm:text-right font-mono text-xs text-[#c8f53c] tracking-wider font-semibold">
                {stg.multiplier}
              </div>
            </div>
          ))}
          <div className="border-b border-white/10" />
        </div>

        <div className="text-[10px] font-mono tracking-[0.3em] text-[#8e95a2] uppercase">
          PROTOCOL EQUILIBRIUM ACCRUES CONTINUOUSLY
        </div>
      </motion.div>
    </section>
  );
};
