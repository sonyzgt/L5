"use client";

import React from "react";
import Link from "next/link";
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
      {/* Ambient Warm Paper Lighting Fields */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[520px] bg-gradient-to-b from-[#EAE4D6]/70 via-[#E2DDD0]/40 to-transparent blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Main Hero Content */}
      <div className="max-w-5xl mx-auto w-full text-center space-y-8 sm:space-y-10 my-auto py-6 sm:py-12">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8.25rem] leading-[0.95] tracking-tight uppercase text-[#1C1B18]">
            FLOW CAPITAL.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C1B18] via-[#283615] to-[#1C1B18]">
              STREAM YIELD.
            </span>
          </h1>
        </motion.div>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base sm:text-lg md:text-xl text-[#6B665E] leading-relaxed max-w-2xl mx-auto font-normal"
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
            className="w-full sm:w-auto px-9 py-4.5 rounded-full bg-[#1C1B18] hover:bg-[#2d2b27] text-[#F6F3EC] font-display text-xs sm:text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.14)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>START STAKING NOW</span>
            <ArrowUpRight className="w-4 h-4 text-[#F6F3EC]" />
          </Link>

          <Link
            href="/position"
            className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#1C1B18] font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.1em] border border-black/[0.12] hover:border-black/30 transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-3xl bg-white/80 border border-black/[0.08] backdrop-blur-md max-w-4xl mx-auto font-mono text-left shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
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
        </motion.div>
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
