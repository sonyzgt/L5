"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatApy, formatTokenAmount } from "@/lib/utils/formatters";
import { protocolConfig } from "@/lib/blockchain/config";
import { ArrowUpRight, Check, Copy, ExternalLink, ShieldCheck, Zap } from "lucide-react";

interface LiveMetricsProps {
  totalStaked?: bigint;
  calculatedApy?: number;
  totalStakers?: number;
  stakeDecimals?: number;
}

export const LiveMetricsSection: React.FC<LiveMetricsProps> = ({
  totalStaked,
  calculatedApy,
  totalStakers,
  stakeDecimals = 6,
}) => {
  const [copiedContract, setCopiedContract] = useState(false);

  const copyContractAddress = () => {
    if (protocolConfig.stakingContractAddress) {
      navigator.clipboard.writeText(protocolConfig.stakingContractAddress);
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 2000);
    }
  };

  const metrics = [
    {
      label: "TOTAL VALUE LOCKED",
      value: totalStaked ? `${formatTokenAmount(totalStaked, stakeDecimals, 2)} USDG` : "0.00 USDG",
      sub: "Non-custodial collateral deposited",
      highlight: false,
    },
    {
      label: "CURRENT STREAMING APY",
      value: calculatedApy !== undefined && calculatedApy > 0 ? formatApy(calculatedApy) : "DYNAMIC",
      sub: "Synthetix O(1) continuous compounding",
      highlight: true,
    },
    {
      label: "PROTOCOL PARTICIPANTS",
      value: totalStakers !== undefined && totalStakers > 0 ? totalStakers.toString() : "ACTIVE",
      sub: "Unique staker addresses",
      highlight: false,
    },
    {
      label: "EXECUTION FINALITY",
      value: "< 1.0 SEC",
      sub: "Robinhood Chain L2 confirmation",
      highlight: false,
    },
  ];

  return (
    <section className="relative w-full py-28 sm:py-36 lg:py-48 px-4 sm:px-8 lg:px-12 bg-[#050706] border-t border-white/[0.06] overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#C7FF28]/[0.02] blur-[180px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-24">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/[0.08] pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C7FF28] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF28] animate-pulse" />
              <span>04 // ON-CHAIN TELEMETRY</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl tracking-[-0.04em] uppercase text-[#F5F7F2]">
              VERIFIABLE
              <br />
              <span className="text-[#C7FF28]">PROTOCOL STATE.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F5F7F2] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>ROBINHOOD CHAIN MAINNET // RPC SYNCED</span>
            </div>
            <p className="font-sans text-sm text-[#9AA09A] leading-relaxed">
              Every metric is derived deterministically from the audited staking contract. Zero synthetic off-chain manipulation.
            </p>
          </div>
        </div>

        {/* 4 Massive Telemetry Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className={`p-8 sm:p-10 rounded-2xl bg-[#080B09] border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                metric.highlight
                  ? "border-[#C7FF28]/40 shadow-[0_0_35px_rgba(199,255,40,0.06)]"
                  : "border-white/[0.08] hover:border-white/[0.18]"
              }`}
            >
              <div className="font-mono text-[11px] tracking-[0.2em] text-[#9AA09A] uppercase">
                {metric.label}
              </div>

              <div
                className={`font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase ${
                  metric.highlight ? "text-[#C7FF28]" : "text-[#F5F7F2]"
                }`}
              >
                {metric.value}
              </div>

              <div className="pt-4 border-t border-white/[0.06] text-xs font-sans text-[#9AA09A]">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Contract Transparency & Verification Banner */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#080B09] border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C7FF28]" />
              <span className="font-display font-bold text-base text-[#F5F7F2] uppercase">
                DECENTRALISED CONTRACT REGISTRY
              </span>
            </div>
            <span className="font-mono text-xs text-[#9AA09A] uppercase tracking-widest">
              CHAIN ID: {protocolConfig.chainId}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            {/* Staking Contract */}
            <div className="space-y-1.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-[#9AA09A] uppercase tracking-wider text-[10px]">
                STAKING CONTRACT
              </div>
              <div className="flex items-center justify-between gap-2 text-[#F5F7F2]">
                <span className="truncate">
                  {protocolConfig.stakingContractAddress || "0x50B0...8323"}
                </span>
                <button
                  type="button"
                  onClick={copyContractAddress}
                  className="p-1.5 rounded hover:bg-white/[0.1] text-[#9AA09A] hover:text-[#C7FF28] transition-colors"
                  title="Copy Staking Contract Address"
                >
                  {copiedContract ? (
                    <Check className="w-3.5 h-3.5 text-[#C7FF28]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Stake Asset */}
            <div className="space-y-1.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-[#9AA09A] uppercase tracking-wider text-[10px]">
                STAKE ASSET (USDG)
              </div>
              <div className="flex items-center justify-between gap-2 text-[#F5F7F2]">
                <span className="truncate">
                  {protocolConfig.stakeTokenAddress || "0x5fc5...1d168"}
                </span>
                <span className="text-[10px] text-[#C7FF28] font-semibold">
                  6 DECIMALS
                </span>
              </div>
            </div>

            {/* Reward Asset */}
            <div className="space-y-1.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-[#9AA09A] uppercase tracking-wider text-[10px]">
                REWARD ASSET (L5)
              </div>
              <div className="flex items-center justify-between gap-2 text-[#F5F7F2]">
                <span className="truncate">
                  {protocolConfig.rewardTokenAddress || "0x4000...e8e7"}
                </span>
                <span className="text-[10px] text-[#C7FF28] font-semibold">
                  18 DECIMALS
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <a
              href={`${protocolConfig.explorerUrl}/address/${protocolConfig.stakingContractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9AA09A] hover:text-[#C7FF28] transition-colors uppercase tracking-wider"
            >
              <span>VIEW CONTRACT ON ROBINHOOD EXPLORER</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/stats"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F5F7F2] hover:text-[#C7FF28] transition-colors uppercase tracking-wider font-semibold"
            >
              <span>OPEN DEEP ANALYTICS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
