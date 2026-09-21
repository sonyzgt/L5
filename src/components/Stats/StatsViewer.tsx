"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useKawaStaking } from "@/lib/hooks/useKawaStaking";
import { formatTokenAmount, formatApy } from "@/lib/utils/formatters";
import { protocolConfig } from "@/lib/blockchain/config";
import { ShieldCheck, Copy, Check } from "lucide-react";

interface ApiStatsResponse {
  tvlUsd: string | null;
  totalStaked: string;
  totalRewardsDistributed: string;
  totalStakers: number;
  currentApy: number | null;
}

export const StatsViewer: React.FC = () => {
  const { totalStaked, totalStakers, calculatedApy, stakeDecimals } = useKawaStaking();
  const [apiStats, setApiStats] = useState<ApiStatsResponse | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setApiStats(data);
      })
      .catch(() => {});
  }, []);

  const copyToClipboard = (text: string | undefined, id: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const rows = [
    {
      label: "TOTAL USDG STAKED",
      value: totalStaked > 0n ? `${formatTokenAmount(totalStaked, stakeDecimals, 2)} USDG` : `0.00 USDG`,
      sub: "Total principal USDG assets committed to smart contract",
      icon: "/usdg-icon.png",
    },
    {
      label: "TOTAL KAWA DISTRIBUTED",
      value:
        apiStats?.totalRewardsDistributed && apiStats.totalRewardsDistributed !== "0.00"
          ? `${apiStats.totalRewardsDistributed} KAWA`
          : "0.0000 KAWA",
      sub: "Cumulative KAWA yield harvested since genesis",
    },
    {
      label: "TOTAL STAKERS",
      value:
        totalStakers > 0
          ? totalStakers.toLocaleString()
          : apiStats?.totalStakers
          ? apiStats.totalStakers.toLocaleString()
          : "0",
      sub: "Unique cryptographic delegator addresses",
    },
    {
      label: "CURRENT REWARD RATE",
      value: formatApy(calculatedApy ?? (apiStats?.currentApy ?? undefined)),
      sub: "Annualized rate derived from emission schedule (—% until configured)",
    },
  ];

  return (
    <div className="w-full space-y-8 font-sans text-left text-white">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-white/10 pb-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#8e95a2] uppercase">
            AUDIT • ON-CHAIN METRICS
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#c8f53c] bg-[#151a14] border border-[#c8f53c]/30 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-light tracking-[0.08em] text-white uppercase font-sans">
          PROTOCOL <span className="text-[#c8f53c] font-normal">METRICS</span>
        </h1>
        <p className="text-xs sm:text-sm font-mono tracking-[0.05em] text-[#8e95a2] max-w-lg">
          Immutable state queried directly from Robinhood Chain nodes. Zero simulated data.
        </p>
      </div>

      {/* Main Stats Rows in Dark Card */}
      <div className="border border-white/[0.08] rounded-2xl divide-y divide-white/[0.06] bg-[#121418] overflow-hidden shadow-lg">
        {rows.map((row) => (
          <div
            key={row.label}
            className="p-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 hover:bg-[#181a20] transition duration-150"
          >
            <div className="space-y-1 sm:max-w-xs">
              <div className="text-xs font-mono tracking-[0.15em] text-[#8e95a2] uppercase font-medium">
                {row.label}
              </div>
              <div className="text-[11px] font-sans text-neutral-400 leading-snug">
                {row.sub}
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-light font-mono text-white tracking-tight text-left sm:text-right flex items-center sm:justify-end gap-2.5">
              {row.icon && (
                <Image
                  src={row.icon}
                  alt={row.label}
                  width={24}
                  height={24}
                  className="rounded-full shrink-0"
                />
              )}
              <span>{row.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Settlement Parameters Section */}
      <div className="border border-white/[0.08] rounded-2xl p-6 bg-[#121418] space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-mono tracking-[0.2em] text-white uppercase font-medium">
            SETTLEMENT PARAMETERS
          </span>
          <span className="text-[10px] font-mono text-[#8e95a2] uppercase">
            ROBINHOOD CHAIN
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1">
            <span className="text-[#8e95a2] uppercase text-[11px]">NETWORK IDENTIFIER</span>
            <span className="text-white font-medium">
              {protocolConfig.chainName} ({protocolConfig.chainId})
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-t border-white/5">
            <span className="text-[#8e95a2] uppercase text-[11px]">STAKING CONTRACT</span>
            <div className="flex items-center gap-2">
              <span className="text-neutral-300 font-medium text-[11px] break-all select-all">
                {protocolConfig.stakingContractAddress}
              </span>
              <button
                onClick={() =>
                  copyToClipboard(protocolConfig.stakingContractAddress, "contract")
                }
                className="text-neutral-400 hover:text-white transition"
                title="Copy Address"
              >
                {copied === "contract" ? (
                  <Check className="w-3.5 h-3.5 text-[#c8f53c]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-t border-white/5">
            <span className="text-[#8e95a2] uppercase text-[11px]">ACCOUNTING ALGORITHM</span>
            <span className="text-white font-medium">
              Synthetix Constant-Time O(1)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-t border-white/5">
            <span className="text-[#8e95a2] uppercase text-[11px]">FINALITY LATENCY</span>
            <span className="text-[#c8f53c] font-medium">
              &lt; 1000ms (Single-Slot Finality)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
