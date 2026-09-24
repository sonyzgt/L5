"use client";

import React from "react";
import Link from "next/link";
import { motion, MotionValue } from "framer-motion";
import { HeroVisual3D } from "./HeroVisual3D";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { formatApy } from "@/lib/utils/formatters";

interface HeroSectionProps {
  scrollProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
  calculatedApy?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollProgress,
  smoothProgress,
  calculatedApy,
}) => {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 select-none overflow-hidden">
      {/* 3D Liquid Flowing Entity in Asymmetrical Background/Right Space */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-end lg:pr-10">
        <div className="w-full sm:w-[85%] lg:w-[62%] h-[60vh] sm:h-[80vh] lg:h-[90vh] opacity-90 transition-opacity">
          <HeroVisual3D />
        </div>
      </div>

      {/* Atmospheric Ambient Light Fields */}
      <div className="absolute top-1/4 left-1/10 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-[#C7FF28]/[0.035] blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#15803d]/[0.025] blur-[170px] rounded-full pointer-events-none -z-10" />

      {/* Top Protocol Status Eyebrow */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#9AA09A] pb-6 sm:pb-8"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C7FF28] animate-pulse" />
            <span className="text-[#F5F7F2] font-semibold">ROBINHOOD CHAIN L2</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="hidden sm:inline text-[#9AA09A]">
            SYNTHETIX O(1) ENGINE
          </span>
          {calculatedApy !== undefined && calculatedApy > 0 && (
            <>
              <span className="hidden md:inline text-white/20">•</span>
              <span className="hidden md:inline-flex items-center gap-1.5 text-[#C7FF28] font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                {formatApy(calculatedApy)}
              </span>
            </>
          )}
        </motion.div>
      </div>

      {/* Main Massive Editorial Headline */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 sm:space-y-4 text-left"
        >
          <h1 className="font-display font-black text-[3.25rem] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[8rem] xl:text-[9.5rem] leading-[0.88] tracking-[-0.04em] uppercase text-[#F5F7F2]">
            FLOW CAPITAL.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F7F2] via-[#C7FF28] to-[#F5F7F2]">
              STREAM YIELD.
            </span>
          </h1>
        </motion.div>

        {/* Narrative & Action Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 sm:pt-12 items-end"
        >
          {/* Supporting Copy */}
          <div className="lg:col-span-6 space-y-4">
            <p className="text-base sm:text-lg md:text-xl text-[#F5F7F2]/90 font-sans leading-relaxed font-normal max-w-xl">
              Deposit USDG to continuously stream cryptographic Layer5 (L5) yield per block.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-mono text-[#9AA09A] uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF28]" />
                Zero lockup epochs
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF28]" />
                Sub-second Robinhood Chain finality
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-end gap-3 sm:gap-4">
            <Link
              href="/stake"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C7FF28] hover:bg-[#d6ff47] text-[#050706] font-display text-xs sm:text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 shadow-[0_0_30px_rgba(199,255,40,0.3)] hover:shadow-[0_0_45px_rgba(199,255,40,0.55)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>START STAKING</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <Link
              href="/position"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-[#F5F7F2] font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.1em] border border-white/[0.12] hover:border-[#C7FF28]/60 transition-all duration-300"
            >
              <span>VIEW POSITION</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Hairline & Coordinate Markers */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-10 sm:pt-14 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#9AA09A] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[#C7FF28] font-bold">01 // DISCOVERY</span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline">AUTONOMOUS NON-CUSTODIAL LIQUIDITY</span>
        </div>
        <div className="flex items-center gap-2">
          <span>SCROLL TO EXPLORE</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
};
