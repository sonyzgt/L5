"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Shield, Sparkles, Layers } from "lucide-react";

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      action: "DEPOSIT",
      title: "Deposit USDG Liquidity",
      summary:
        "Supply USDG stablecoin to the Aegis non-custodial smart contract on Robinhood Chain. No lockup periods or lock-in tiers.",
      details: [
        "1:1 USDG asset backing",
        "Self-custodial vault verification",
        "Instant transaction execution",
      ],
      tag: "STEP ONE",
    },
    {
      number: "02",
      action: "STREAM",
      title: "Stream Aegis Yield Every Block",
      summary:
        "As soon as your deposit confirms, the Synthetix O(1) mathematical engine calculates and streams Aegis reward tokens continuously.",
      details: [
        "Real-time per-second accrual",
        "Deterministic constant-time logic",
        "Transparent on-chain rate tracking",
      ],
      tag: "STEP TWO",
    },
    {
      number: "03",
      action: "HARVEST",
      title: "Claim or Exit Anytime",
      summary:
        "Harvest your accumulated Aegis rewards to your wallet, or unstake your USDG principal at will. You retain 100% control of your assets.",
      details: [
        "Zero unbonding delays",
        "No penalty withdrawal fees",
        "Sub-second Robinhood Chain finality",
      ],
      tag: "STEP THREE",
    },
  ];

  return (
    <section className="relative w-full py-28 sm:py-36 lg:py-48 px-4 sm:px-8 lg:px-12 bg-[#080B09] border-t border-white/[0.06] overflow-hidden">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#C7FF28]/[0.025] blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-28 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/[0.08] pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C7FF28] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF28]" />
              <span>03 // EXECUTION ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl tracking-[-0.04em] uppercase text-[#F5F7F2]">
              HOW CAPITAL
              <br />
              <span className="text-[#C7FF28]">STREAMS.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-3">
            <p className="font-sans text-sm sm:text-base text-[#9AA09A] leading-relaxed">
              Three streamlined steps engineered for maximum capital efficiency and security on Robinhood Chain L2.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-[#F5F7F2]">
              <span className="flex items-center gap-1.5 text-[#C7FF28]">
                <Shield className="w-3.5 h-3.5" /> NON-CUSTODIAL
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#9AA09A]" /> ROBINHOOD CHAIN
              </span>
            </div>
          </div>
        </div>

        {/* 3 Step Editorial Timeline Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-[#050706] border border-white/[0.08] hover:border-[#C7FF28]/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* Step Counter Top Row */}
              <div className="flex items-center justify-between pb-8 border-b border-white/[0.06]">
                <span className="font-display font-black text-4xl sm:text-5xl text-white/20 group-hover:text-[#C7FF28] transition-colors">
                  {step.number}
                </span>
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#9AA09A] uppercase px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                  {step.tag}
                </span>
              </div>

              {/* Main Content */}
              <div className="py-8 space-y-4">
                <div className="font-mono text-xs text-[#C7FF28] tracking-widest uppercase font-semibold">
                  {step.action}
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F5F7F2] tracking-tight">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-[#9AA09A] leading-relaxed">
                  {step.summary}
                </p>

                {/* Micro bullets */}
                <div className="pt-4 space-y-2">
                  {step.details.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2.5 text-xs font-mono text-[#F5F7F2]/80"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C7FF28] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#9AA09A] uppercase">
                  VERIFIABLE CONTRACT
                </span>
                <Link
                  href="/stake"
                  className="inline-flex items-center gap-1 font-mono text-xs text-[#F5F7F2] group-hover:text-[#C7FF28] transition-colors uppercase font-medium"
                >
                  <span>EXECUTE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Bottom Interactive Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-white/[0.02] via-[#C7FF28]/[0.04] to-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-[#C7FF28]/10 border border-[#C7FF28]/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#C7FF28]" />
            </div>
            <div>
              <div className="font-display font-bold text-sm sm:text-base text-[#F5F7F2] uppercase">
                Ready to begin streaming?
              </div>
              <div className="font-sans text-xs sm:text-sm text-[#9AA09A]">
                Connect your Web3 wallet and deposit USDG to start accumulating Aegis yield instantly.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/stake"
              className="px-6 py-3 rounded-full bg-[#C7FF28] hover:bg-[#d5fa5b] text-[#050706] font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(199,255,40,0.3)] hover:scale-[1.02]"
            >
              LAUNCH STAKING
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-[#F5F7F2] font-mono text-xs uppercase tracking-wider border border-white/[0.1] transition-all"
            >
              READ SPECS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
