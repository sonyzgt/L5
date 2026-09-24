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
    <section className="relative w-full py-28 sm:py-36 lg:py-48 px-4 sm:px-8 lg:px-12 bg-[#EFECE3] border-t border-black/[0.08] overflow-hidden">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-28 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-black/[0.08] pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#283615] uppercase font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#283615]" />
              <span>03 // EXECUTION ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl tracking-[-0.04em] uppercase text-[#1C1B18]">
              HOW CAPITAL
              <br />
              <span className="text-[#283615]">STREAMS.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-3">
            <p className="font-sans text-sm sm:text-base text-[#6B665E] leading-relaxed">
              Three streamlined steps engineered for maximum capital efficiency and security on Robinhood Chain L2.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-[#1C1B18]">
              <span className="flex items-center gap-1.5 text-[#283615] font-semibold">
                <Shield className="w-3.5 h-3.5" /> NON-CUSTODIAL
              </span>
              <span className="text-black/20">•</span>
              <span className="flex items-center gap-1.5 text-[#6B665E]">
                <Layers className="w-3.5 h-3.5" /> ROBINHOOD CHAIN
              </span>
            </div>
          </div>
        </div>

        {/* 3 Step Editorial Timeline Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-white border border-black/[0.08] hover:border-black/30 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
            >
              {/* Step Counter Top Row */}
              <div className="flex items-center justify-between pb-8 border-b border-black/[0.06]">
                <span className="font-display font-black text-4xl sm:text-5xl text-black/15 group-hover:text-[#283615] transition-colors">
                  {step.number}
                </span>
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#6B665E] uppercase px-3 py-1 rounded-full bg-[#FAF8F5] border border-black/[0.08]">
                  {step.tag}
                </span>
              </div>

              {/* Main Content */}
              <div className="py-8 space-y-4">
                <div className="font-mono text-xs text-[#283615] tracking-widest uppercase font-bold">
                  {step.action}
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1C1B18] tracking-tight">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-[#6B665E] leading-relaxed">
                  {step.summary}
                </p>

                {/* Micro bullets */}
                <div className="pt-4 space-y-2">
                  {step.details.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2.5 text-xs font-mono text-[#1C1B18]/90"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-6 border-t border-black/[0.06] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#6B665E] uppercase">
                  VERIFIABLE CONTRACT
                </span>
                <Link
                  href="/stake"
                  className="inline-flex items-center gap-1 font-mono text-xs text-[#1C1B18] group-hover:text-[#283615] transition-colors uppercase font-bold"
                >
                  <span>EXECUTE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Bottom Interactive Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-black/[0.08] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#283615]" />
            </div>
            <div>
              <div className="font-display font-bold text-sm sm:text-base text-[#1C1B18] uppercase">
                Ready to begin streaming?
              </div>
              <div className="font-sans text-xs sm:text-sm text-[#6B665E]">
                Connect your Web3 wallet and deposit USDG to start accumulating Aegis yield instantly.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/stake"
              className="px-6 py-3 rounded-full bg-[#1C1B18] hover:bg-[#2d2b27] text-[#F6F3EC] font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:scale-[1.02]"
            >
              LAUNCH STAKING
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3 rounded-full bg-[#FAF8F5] hover:bg-white text-[#1C1B18] font-mono text-xs uppercase tracking-wider border border-black/[0.1] transition-all"
            >
              READ SPECS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
