"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layer5Emblem } from "../Brand/Layer5Emblem";

export const Scene04TheLayer5: React.FC = () => {
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
      id="your-layer5"
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
          <div className="inline-block p-5 liquid-glass-pill rounded-full shadow-2xl">
            <Layer5Emblem size={64} variant="white" animate={true} state="awakened" />
          </div>
        </div>

        {/* Liquid Glass State Progression Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {stages.map((stg, idx) => (
            <motion.div
              key={stg.state}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="liquid-glass-card rounded-2xl p-5 sm:p-6 space-y-2 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#c8f53c] font-semibold">0{idx + 1}</span>
                  <span className="text-sm font-mono font-medium tracking-[0.15em] text-white uppercase">
                    {stg.state}
                  </span>
                </div>
                <span className="liquid-glass-pill px-2.5 py-0.5 rounded-full font-mono text-xs text-[#c8f53c] tracking-wider font-semibold">
                  {stg.multiplier}
                </span>
              </div>
              <p className="text-xs text-[#8e95a2] font-sans leading-relaxed">
                {stg.meaning}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-[10px] font-mono tracking-[0.3em] text-[#8e95a2] uppercase">
          PROTOCOL EQUILIBRIUM ACCRUES CONTINUOUSLY
        </div>
      </motion.div>
    </section>
  );
};

export const Scene04TheKawa = Scene04TheLayer5;

