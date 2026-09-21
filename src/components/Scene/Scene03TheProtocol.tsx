"use client";

import React from "react";
import { motion } from "framer-motion";

export const Scene03TheProtocol: React.FC = () => {
  const points = [
    {
      num: "01",
      title: "STAKE USDG",
      description: "Users deposit USDG directly into the immutable KAWA staking smart contract.",
    },
    {
      num: "02",
      title: "REMAIN IN FLOW",
      description: "The protocol algorithmically calculates KAWA rewards per second using standard Synthetix-grade accounting.",
    },
    {
      num: "03",
      title: "CLAIM KAWA",
      description: "Yield compounds continuously every block. Harvest KAWA rewards or exit USDG whenever you choose.",
    },
  ];

  return (
    <section id="the-protocol" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center space-y-12"
      >
        {/* Title Header */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-light tracking-[0.1em] text-white uppercase font-sans">
            THE KAWA <span className="text-[#c8f53c] font-normal">PROTOCOL</span>
          </h2>
          <p className="text-xs sm:text-sm font-mono tracking-[0.05em] text-[#8e95a2] max-w-md mx-auto pt-1">
            Stake USDG. Remain in the flow. Earn KAWA rewards over time.
          </p>
        </div>

        {/* Editorial Separator Grid in Dark Theme */}
        <div className="w-full border-t border-white/10 divide-y divide-white/10 text-left">
          {points.map((point) => (
            <div
              key={point.num}
              className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4"
            >
              <div className="flex items-baseline gap-4 sm:w-1/3">
                <span className="text-xs font-mono text-[#c8f53c] font-medium">{point.num}</span>
                <span className="text-sm font-mono font-medium tracking-[0.15em] text-white uppercase">
                  {point.title}
                </span>
              </div>
              <p className="sm:w-2/3 text-xs sm:text-sm text-[#8e95a2] font-sans leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
          <div className="border-b border-white/10" />
        </div>
      </motion.div>
    </section>
  );
};
