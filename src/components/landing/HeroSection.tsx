"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, MotionValue } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ShieldCheck, TrendingUp } from "lucide-react";
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
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-32 sm:pt-36 lg:pt-40 pb-10 sm:pb-12 px-4 sm:px-8 lg:px-12 select-none overflow-hidden bg-[#F6F3EC]">
      {/* Background Heroic Artwork - Clearly Visible Greek Warrior & Acropolis */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden -z-10" aria-hidden="true">
        <Image
          src="/aegis-hero-bg.jpg"
          alt="Aegis Ancient Greek Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] opacity-80 sm:opacity-85 filter contrast-[1.05]"
        />
        {/* Soft radial clearing behind center headline so text is 100% black and ultra-readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(246,243,236,0.85)_15%,rgba(246,243,236,0.5)_50%,rgba(246,243,236,0.15)_100%)]" />
        {/* Top & bottom fade to seamlessly blend with header and page flow */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#F6F3EC] via-[#F6F3EC]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#F6F3EC] via-[#F6F3EC]/80 to-transparent" />
      </div>

      {/* Main Hero Content - ELEVATED WITH relative z-10 SO IT IS 100% SOLID AND NEVER OBSCURED */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center space-y-8 sm:space-y-10 my-auto py-6 sm:py-12">
        {/* Main Headline */}
        <div className="space-y-3">
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8.25rem] leading-[0.95] tracking-tight uppercase text-[#1C1B18] drop-shadow-[0_2px_10px_rgba(246,243,236,0.9)]">
            FLOW CAPITAL.
            <br />
            <span className="text-[#283615] drop-shadow-[0_2px_10px_rgba(246,243,236,0.9)]">
              STREAM YIELD.
            </span>
          </h1>
        </div>

        {/* Narrative Description */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-[#1C1B18] leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-[0_1px_8px_rgba(246,243,236,0.9)]">
          Autonomous non-custodial staking infrastructure on Robinhood Chain. Deposit USDG and continuously stream cryptographic Aegis rewards every single block with zero lockup friction.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 pt-2">
          <Link
            href="/stake"
            className="w-full sm:w-auto px-9 py-4.5 rounded-full bg-[#1C1B18] hover:bg-[#283615] text-[#F6F3EC] font-display text-xs sm:text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 shadow-[0_6px_24px_rgba(28,27,24,0.3)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>START STAKING NOW</span>
            <ArrowUpRight className="w-4 h-4 text-[#F6F3EC]" />
          </Link>

          <Link
            href="/position"
            className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#1C1B18] font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.1em] border border-[#1C1B18]/30 hover:border-[#1C1B18] transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>VIEW PORTFOLIO</span>
          </Link>
        </div>

        {/* Live Telemetry Bar */}
        <div className="pt-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E5E0D5] backdrop-blur-md max-w-4xl mx-auto font-mono text-left shadow-[0_12px_36px_rgba(28,27,24,0.08)]">
            <div className="space-y-1 p-2">
              <span className="text-[10px] text-[#6B665E] uppercase tracking-wider block">
                STREAMING APY
              </span>
              <div className="text-base sm:text-lg font-bold text-[#283615] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 shrink-0 text-[#283615]" />
                <span>
                  {calculatedApy !== undefined && calculatedApy > 0
                    ? formatApy(calculatedApy)
                    : "DYNAMIC"}
                </span>
              </div>
            </div>

            <div className="space-y-1 p-2">
              <span className="text-[10px] text-[#6B665E] uppercase tracking-wider block">
                LOCKUP EPOCHS
              </span>
              <div className="text-base sm:text-lg font-bold text-[#1C1B18] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>0 (INSTANT)</span>
              </div>
            </div>

            <div className="space-y-1 p-2">
              <span className="text-[10px] text-[#6B665E] uppercase tracking-wider block">
                STAKE ASSET
              </span>
              <div className="text-base sm:text-lg font-bold text-[#1C1B18]">
                USDG (6 DEC)
              </div>
            </div>

            <div className="space-y-1 p-2">
              <span className="text-[10px] text-[#6B665E] uppercase tracking-wider block">
                SECURITY
              </span>
              <div className="text-base sm:text-lg font-bold text-[#1C1B18] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AUDITED L2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Hairline & Coordinate Markers */}
      <div className="max-w-7xl mx-auto w-full pt-8 sm:pt-10 border-t border-black/[0.08] flex items-center justify-between text-[11px] font-mono text-[#6B665E] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[#283615] font-bold">01 // TELEMETRY</span>
          <span className="hidden sm:inline text-black/20">|</span>
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
