"use client";

import React from "react";
import Link from "next/link";
import { motion, MotionValue } from "framer-motion";
import { HeroVisual3D } from "./HeroVisual3D";
import { ArrowUpRight, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";
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
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-12 px-4 sm:px-8 lg:px-12 select-none overflow-hidden">
      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/12 w-[500px] h-[500px] bg-[#283615]/[0.4] blur-[170px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/12 w-[550px] h-[550px] bg-[#B8F34A]/[0.05] blur-[180px] rounded-full pointer-events-none -z-10" />

      {/* Main Hero Container Grid */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography & Action Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-left"
          >
            {/* Top Protocol Status Eyebrow */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#A0AA98]">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151e12]/90 border border-white/[0.08] backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#B8F34A] animate-pulse" />
                <span className="text-[#F4F1E8] font-bold">ROBINHOOD CHAIN L2</span>
              </div>
              <span className="hidden sm:inline text-white/20">•</span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05]">
                <Zap className="w-3 h-3 text-[#B8F34A]" />
                <span className="text-[#A0AA98] font-semibold text-[11px]">
                  SYNTHETIX O(1) CORE
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.5rem] leading-[0.92] tracking-[-0.035em] uppercase text-[#F4F1E8]">
                FLOW CAPITAL.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4F1E8] via-[#B8F34A] to-[#F4F1E8]">
                  STREAM YIELD.
                </span>
              </h1>
            </div>

            {/* Narrative Description */}
            <p className="font-sans text-base sm:text-lg text-[#A0AA98] leading-relaxed max-w-xl font-normal">
              Autonomous non-custodial staking infrastructure on Robinhood Chain. Deposit USDG and stream cryptographic Aegis rewards every single block with constant-time precision and zero lockup friction.
            </p>

            {/* Live Telemetry Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#151e12]/60 border border-white/[0.08] backdrop-blur-sm max-w-xl font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-[#A0AA98] uppercase tracking-wider">
                  STREAMING APY
                </span>
                <div className="text-sm font-bold text-[#B8F34A] flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>
                    {calculatedApy !== undefined && calculatedApy > 0
                      ? formatApy(calculatedApy)
                      : "DYNAMIC"}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-[#A0AA98] uppercase tracking-wider">
                  LOCKUP EPOCHS
                </span>
                <div className="text-sm font-bold text-[#F4F1E8]">
                  0 (INSTANT)
                </div>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#A0AA98] uppercase tracking-wider">
                  EXECUTION
                </span>
                <div className="text-sm font-bold text-[#F4F1E8] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B8F34A]" />
                  <span>AUDITED L2</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/stake"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#B8F34A] hover:bg-[#cbfb65] text-[#10170e] font-display text-xs sm:text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 shadow-[0_0_30px_rgba(184,243,74,0.35)] hover:shadow-[0_0_48px_rgba(184,243,74,0.6)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>START STAKING NOW</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="/position"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-[#F4F1E8] font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.1em] border border-white/[0.12] hover:border-[#B8F34A]/60 transition-all duration-300"
              >
                <span>VIEW PORTFOLIO</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Dedicated 3D Aegis Shield Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Ambient Shield Radial Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#283615]/[0.55] via-[#B8F34A]/[0.1] to-transparent blur-[65px] rounded-full pointer-events-none -z-10" />

            {/* Holographic Pedestal Glass Frame */}
            <div className="relative w-full max-w-[440px] aspect-square rounded-3xl bg-[#151e12]/40 border border-white/[0.08] backdrop-blur-md overflow-hidden p-3 flex flex-col justify-between shadow-[0_24px_70px_-15px_rgba(0,0,0,0.85)]">
              {/* Frame Top Header HUD */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A0AA98] px-3 pt-2 tracking-widest uppercase">
                <span className="flex items-center gap-1.5 text-[#F4F1E8] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8F34A] animate-ping" />
                  AEGIS // TALISMAN CORE
                </span>
                <span className="text-[#B8F34A]">FINALITY &lt; 1.0S</span>
              </div>

              {/* 3D Visual Canvas */}
              <div className="relative w-full h-full flex items-center justify-center my-auto">
                <HeroVisual3D className="w-full h-full" />
              </div>

              {/* Frame Bottom Telemetry HUD */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A0AA98] px-3 pb-2 tracking-widest uppercase border-t border-white/[0.06] pt-2">
                <span>EVM NON-CUSTODIAL</span>
                <span className="text-[#F4F1E8]">STATUS: ONLINE</span>
              </div>
            </div>
          </motion.div>
        </div>
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
