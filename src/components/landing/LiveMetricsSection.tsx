"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatApy, formatTokenAmount } from "@/lib/utils/formatters";
import { protocolConfig } from "@/lib/blockchain/config";
import { ArrowUpRight, Check, Copy, ExternalLink, ShieldCheck } from "lucide-react";

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
    <section className="relative w-full py-28 sm:py-36 lg:py-48 px-4 sm:px-8 lg:px-12 bg-[#F6F3EC] border-t border-black/[0.08] overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#EAE4D6]/60 blur-[180px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-24">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-black/[0.08] pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#283615] uppercase font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#283615]" />
              <span>04 // ON-CHAIN TELEMETRY</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl tracking-tight uppercase text-[#1C1B18]">
              VERIFIABLE
              <br />
              <span className="text-[#283615]">PROTOCOL STATE.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#1C1B18] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>ROBINHOOD CHAIN MAINNET // RPC SYNCED</span>
            </div>
            <p className="font-sans text-sm text-[#6B665E] leading-relaxed">
              Every metric is derived deterministically from the audited staking contract. Zero synthetic off-chain manipulation.
            </p>
          </div>
        </div>

        {/* 4 Massive Telemetry Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className={`p-8 sm:p-10 rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between space-y-6 shadow-sm ${
                metric.highlight
                  ? "border-[#283615] shadow-[0_12px_35px_rgba(40,54,21,0.08)] ring-1 ring-[#283615]/20"
                  : "border-black/[0.08] hover:border-black/30"
              }`}
            >
              <div className="font-mono text-[11px] tracking-[0.2em] text-[#6B665E] uppercase font-medium">
                {metric.label}
              </div>

              <div
                className={`font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase ${
                  metric.highlight ? "text-[#283615]" : "text-[#1C1B18]"
                }`}
              >
                {metric.value}
              </div>

              <div className="pt-4 border-t border-black/[0.06] text-xs font-sans text-[#6B665E]">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Contract Transparency & Verification Banner */}
        <div className="p-6 sm:p-10 rounded-2xl bg-white border border-black/[0.08] space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#283615]" />
              <span className="font-display font-bold text-base text-[#1C1B18] uppercase">
                DECENTRALISED CONTRACT REGISTRY
              </span>
            </div>
            <span className="font-mono text-xs text-[#6B665E] uppercase tracking-widest">
              CHAIN ID: {protocolConfig.chainId}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            {/* Staking Contract */}
            <div className="space-y-1.5 p-4 rounded-xl bg-[#FAF8F5] border border-black/[0.06]">
              <div className="text-[#6B665E] uppercase tracking-wider text-[10px]">
                STAKING CONTRACT
              </div>
              <div className="flex items-center justify-between gap-2 text-[#1C1B18]">
                <span className="truncate">
                  {protocolConfig.stakingContractAddress || "0x50B0...8323"}
                </span>
                <button
                  type="button"
                  onClick={copyContractAddress}
                  className="p-1.5 rounded hover:bg-black/[0.05] text-[#6B665E] hover:text-[#1C1B18] transition-colors"
                  title="Copy Staking Contract Address"
                >
                  {copiedContract ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Stake Asset */}
            <div className="space-y-1.5 p-4 rounded-xl bg-[#FAF8F5] border border-black/[0.06]">
              <div className="text-[#6B665E] uppercase tracking-wider text-[10px]">
                STAKE ASSET (USDG)
              </div>
              <div className="flex items-center justify-between gap-2 text-[#1C1B18]">
                <span className="truncate">
                  {protocolConfig.stakeTokenAddress || "0x5fc5...1d168"}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold">
                  6 DECIMALS
                </span>
              </div>
            </div>

            {/* Reward Asset */}
            <div className="space-y-1.5 p-4 rounded-xl bg-[#FAF8F5] border border-black/[0.06]">
              <div className="text-[#6B665E] uppercase tracking-wider text-[10px]">
                REWARD ASSET (AEGIS)
              </div>
              <div className="flex items-center justify-between gap-2 text-[#1C1B18]">
                <span className="truncate">
                  {protocolConfig.rewardTokenAddress || "0x4000...e8e7"}
                </span>
                <span className="text-[10px] text-[#283615] font-bold">
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
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6B665E] hover:text-[#1C1B18] transition-colors uppercase tracking-wider font-medium"
            >
              <span>VIEW CONTRACT ON ROBINHOOD EXPLORER</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/stats"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#1C1B18] hover:text-[#283615] transition-colors uppercase tracking-wider font-bold"
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

export default LiveMetricsSection;
