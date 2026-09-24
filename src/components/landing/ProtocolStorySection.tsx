"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Zap, LockOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

interface WordProps {
  children: string;
  range: [number, number];
  progress: any;
}

const Word: React.FC<WordProps> = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(
    progress,
    range,
    ["rgba(245, 247, 242, 0.22)", "rgba(245, 247, 242, 1)"]
  );
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.3em] transition-colors">
      {children}
    </motion.span>
  );
};

export const ProtocolStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const narrativeText =
    "Traditional staking locks liquidity behind artificial epochs and withdrawal queues. Aegis breaks the paradigm on Robinhood Chain — continuous Synthetix O(1) reward calculation allows instant deposits, real-time per-second yield accretion, and immediate principal exits with zero penalization.";

  const words = narrativeText.split(" ");

  const pillars = [
    {
      num: "01",
      icon: LockOpen,
      tag: "LIQUIDITY FREEDOM",
      title: "No Artificial Epochs",
      desc: "Deposit USDG and withdraw your principal whenever market conditions dictate. No 7-day cooldowns, no unbonding penalties.",
    },
    {
      num: "02",
      icon: Cpu,
      tag: "MATHEMATICAL PRECISION",
      title: "Synthetix O(1) Algorithmic Engine",
      desc: "Rewards compute in constant execution time via accumulators. Gas usage remains ultra-minimal whether there are 10 or 10,000,000 stakers.",
    },
    {
      num: "03",
      icon: Zap,
      tag: "HIGH FREQUENCY L2",
      title: "Robinhood Chain Native",
      desc: "Sub-second block confirmation times combined with microscopic gas fees guarantee frictionless yield harvesting and position rebalancing.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 lg:py-48 px-4 sm:px-8 lg:px-12 bg-[#050706] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#C7FF28]/[0.02] blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C7FF28] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF28]" />
              <span>02 // ARCHITECTURAL PARADIGM</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-[-0.03em] uppercase text-[#F5F7F2]">
              CAPITAL THAT NEVER
              <br />
              <span className="text-[#C7FF28]">STOPS MOVING.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-[#9AA09A] uppercase tracking-widest max-w-xs text-left sm:text-right">
            CONTINUOUS EMISSION PROTOCOL // NON-CUSTODIAL VAULT
          </div>
        </div>

        {/* Scroll-driven illuminating narrative block */}
        <div className="py-6 sm:py-10 max-w-5xl">
          <p className="font-display font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.25] tracking-[-0.02em]">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} range={[start, end]} progress={scrollYProgress}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative p-8 rounded-2xl bg-[#080B09] border border-white/[0.08] hover:border-[#C7FF28]/40 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-8"
              >
                {/* Top Corner Identity */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#9AA09A] tracking-widest">
                    [{pillar.num}]
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-[#C7FF28]/50 group-hover:bg-[#C7FF28]/[0.08] transition-all duration-300">
                    <Icon className="w-4 h-4 text-[#F5F7F2] group-hover:text-[#C7FF28] transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#C7FF28] uppercase block font-semibold">
                    {pillar.tag}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F5F7F2] tracking-tight group-hover:text-[#F5F7F2]">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm text-[#9AA09A] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Bottom line hint */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#9AA09A]">
                  <span>VERIFIED ON-CHAIN</span>
                  <span className="text-[#C7FF28] opacity-0 group-hover:opacity-100 transition-opacity">
                    READY
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal inline link to Position/Stake */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 text-xs font-mono text-[#9AA09A]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C7FF28]" />
            <span>CONTRACT: ROBINHOOD MAINNET VERIFIED</span>
          </div>
          <Link
            href="/stake"
            className="group inline-flex items-center gap-2 text-[#F5F7F2] hover:text-[#C7FF28] transition-colors uppercase tracking-widest font-semibold"
          >
            <span>DEPOSIT USDG NOW</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
