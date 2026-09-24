"use client";

import React from "react";
import Link from "next/link";
import { motion, MotionValue } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";
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
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-32 sm:pt-36 lg:pt-40 pb-10 sm:pb-12 px-4 sm:px-8 lg:px-12 select-none overflow-hidden">
      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-b from-[#283615]/[0.45] via-[#B8F34A]/[0.06] to-transparent blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Main Hero Content */}
      <div className="max-w-5xl mx-auto w-full text-center space-y-8 sm:space-y-10 my-auto py-6 sm:py-12">
        {/* Top Protocol Status Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#A0AA98]"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151e12]/90 border border-white/[0.08] backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#B8F34A] animate-pulse" />
            <span className="text-[#F4F1E8] font-bold">ROBINHOOD CHAIN L2</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5 text-[#B8F34A]" />
            <span className="text-[#F4F1E8] font-semibold text-[11px]">
              SYNTHETIX O(1) STREAMING
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8.25rem] leading-[0.9] tracking-[-0.04em] uppercase text-[#F4F1E8]">
            FLOW CAPITAL.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4F1E8] via-[#B8F34A] to-[#F4F1E8]">
              STREAM YIELD.
            </span>
          </h1>
        </motion.div>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base sm:text-lg md:text-xl text-[#A0AA98] leading-relaxed max-w-2xl mx-auto font-normal"
        >
          Autonomous non-custodial staking infrastructure on Robinhood Chain. Deposit USDG and continuously stream cryptographic Aegis rewards every single block with zero lockup friction.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 pt-2"
        >
          <Link
            href="/stake"
            className="w-full sm:w-auto px-9 py-4.5 rounded-full bg-[#B8F34A] hover:bg-[#cbfb65] text-[#10170e] font-display text-xs sm:text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 shadow-[0_0_35px_rgba(184,243,74,0.35)] hover:shadow-[0_0_55px_rgba(184,243,74,0.6)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>START STAKING NOW</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="/position"
            className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-[#151e12]/80 hover:bg-[#1a2517] text-[#F4F1E8] font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.1em] border border-white/[0.12] hover:border-[#B8F34A]/60 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>VIEW PORTFOLIO</span>
          </Link>
        </motion.div>

        {/* Live Telemetry Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-3xl bg-[#151e12]/70 border border-white/[0.08] backdrop-blur-md max-w-4xl mx-auto font-mono text-left">
            <div className="space-y-1 p-2">
              <span className="text-[10px] text-[#A0AA98] uppercase tracking-wider block">
                STREAMING APY
              </span>
              <div className="text-base sm:text-lg font-bold text-[#B8F34A] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 shrink-0" />
                <span>
                  {calculatedApy !== undefined && calculatedApy > 0
                    ? formatApy(calculatedApy)
                    : "DYNAMIC"}
                </span>
              </div>
            </div>

            <div className="space-y-1 p-2">
              <span className="text-[10px] text-[#A0AA98] uppercase tracking-wider block">
                LOCKUP EPOCHS
              </span>
              <div className="text-base sm:text-lg font-bold text-[#F4F1E8] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#B8F34A] shrink-0" />
                <span>0 (INSTANT)</span>
              </div>
            </div>

            <div className="space-y-1 p-2">
              <span className="text-[10px] text-[#A0AA98] uppercase tracking-wider block">
                STAKE ASSET
              </span>
              <div className="text-base sm:text-lg font-bold text-[#F4F1E8]">
                USDG (6 DEC)
              </div>
            </div>

            <div className="space-y-1 p-2">
              <span className="text-[10px] text-[#A0AA98] uppercase tracking-wider block">
                SECURITY
              </span>
              <div className="text-base sm:text-lg font-bold text-[#F4F1E8] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B8F34A] shrink-0" />
                <span>AUDITED L2</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Hairline & Coordinate Markers */}
      <div className="max-w-7xl mx-auto w-full pt-8 sm:pt-10 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#A0AA98] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[#B8F34A] font-bold">01 // TELEMETRY</span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline">AUTONOMOUS PROTOCOL LIQUIDITY</span>
        </div>
        <div className="flex items-center gap-2">
          <span>SCROLL TO EXPLORE</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
};
