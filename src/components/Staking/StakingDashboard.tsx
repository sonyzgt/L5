"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLayer5Staking } from "@/lib/hooks/useLayer5Staking";
import { formatTokenAmount, formatApy, formatAddress } from "@/lib/utils/formatters";
import { protocolConfig } from "@/lib/blockchain/config";
import { TransactionModal } from "../Transaction/TransactionModal";
import { WrongNetworkBanner } from "../Wallet/WrongNetworkBanner";
import { WalletConnectModal } from "../Wallet/WalletConnectModal";
import {
  Sparkles,
  TrendingUp,
  Wallet,
  Activity,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Check,
  Radio,
  Lock,
  Zap,
  Layers,
  Percent,
  Coins,
  RefreshCw,
  ChevronRight
} from "lucide-react";

/**
 * Denar-style Guilloche Sine Wave SVG Ornament
 */
const GuillocheWave: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 1200 32"
    preserveAspectRatio="none"
    className={`h-full w-full pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <g opacity="1">
      <path
        d="M0.00 16.00 L30.00 13.21 L60.00 20.94 L90.00 10.04 L120.00 21.61 L150.00 12.02 L180.00 17.44 L210.00 17.44 L240.00 12.02 L270.00 21.61 L300.00 10.04 L330.00 20.94 L360.00 13.21 L390.00 16.00 L420.00 18.79 L450.00 11.06 L480.00 21.96 L510.00 10.00 L540.00 19.98 L570.00 14.56 L600.00 14.56 L630.00 19.98 L660.00 10.00 L690.00 21.96 L720.00 11.06 L750.00 18.79 L780.00 16.00 L810.00 13.21 L840.00 20.94 L870.00 10.04 L900.00 21.61 L930.00 12.02 L960.00 17.44 L990.00 17.44 L1020.00 12.02 L1050.00 21.61 L1080.00 10.04 L1110.00 20.94 L1140.00 13.21 L1170.00 16.00 L1200.00 18.79"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.65"
      />
      <path
        d="M0.00 22.00 L30.00 10.69 L60.00 19.41 L90.00 15.28 L120.00 13.87 L150.00 20.49 L180.00 10.17 L210.00 21.83 L240.00 11.51 L270.00 16.72 L300.00 16.72 L330.00 11.51 L360.00 21.83 L390.00 10.17 L420.00 20.49 L450.00 13.87 L480.00 15.28 L510.00 19.41 L540.00 10.69 L570.00 22.00 L600.00 20.49 L630.00 10.69 L660.00 19.41 L690.00 15.28 L720.00 13.87 L750.00 20.49 L780.00 10.17 L810.00 21.83 L840.00 11.51 L870.00 16.72 L900.00 16.72 L930.00 11.51 L960.00 21.83 L990.00 10.17 L1020.00 20.49 L1050.00 13.87 L1080.00 15.28 L1110.00 19.41 L1140.00 10.69 L1170.00 22.00 L1200.00 13.21"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.65"
      />
      <path
        d="M0.00 10.00 L30.00 21.31 L60.00 12.59 L90.00 16.72 L120.00 18.13 L150.00 11.51 L180.00 21.83 L210.00 10.17 L240.00 20.49 L270.00 15.28 L300.00 15.28 L330.00 20.49 L360.00 10.17 L390.00 21.83 L420.00 11.51 L450.00 18.13 L480.00 16.72 L510.00 12.59 L540.00 21.31 L570.00 10.00 L600.00 11.51 L630.00 21.31 L660.00 12.59 L690.00 16.72 L720.00 18.13 L750.00 11.51 L780.00 21.83 L810.00 10.17 L840.00 20.49 L870.00 15.28 L900.00 15.28 L930.00 20.49 L960.00 10.17 L990.00 21.83 L1020.00 11.51 L1050.00 18.13 L1080.00 16.72 L1110.00 12.59 L1140.00 21.31 L1170.00 10.00 L1200.00 18.79"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.65"
      />
    </g>
  </svg>
);

/**
 * Geometric Rosette / Spirograph Banknote Watermark
 */
const RosetteWatermark: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 144 144" className={`pointer-events-none select-none ${className}`} aria-hidden="true">
    <g opacity="1" style={{ transformOrigin: "72px 72px" }}>
      {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map(
        (angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 72 + 22 * Math.cos(rad);
          const cy = 72 + 22 * Math.sin(rad);
          return (
            <circle
              key={idx}
              cx={cx.toFixed(2)}
              cy={cy.toFixed(2)}
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
            />
          );
        }
      )}
    </g>
  </svg>
);

export const StakingDashboard: React.FC = () => {
  const {
    isConnected,
    isWrongNetwork,
    address,
    switchToRobinhood,
    stakeDecimals,
    stakedBalance,
    pendingRewards,
    tokenBalance,
    totalStaked,
    calculatedApy,
    isContractConfigured,
    txState,
    resetTxState,
    stake,
    unstake,
    claim,
  } = useLayer5Staking();

  const [activeTab, setActiveTab] = useState<"mint" | "redeem">("mint");
  const [inputAmount, setInputAmount] = useState<string>("");
  const [unstakeModalOpen, setUnstakeModalOpen] = useState<boolean>(false);
  const [unstakeAmount, setUnstakeAmount] = useState<string>("");
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);

  // Live ticking reward simulator to visually demonstrate per-block continuous stream
  const [liveRewardTicker, setLiveRewardTicker] = useState<number>(0);
  useEffect(() => {
    if (!isConnected || stakedBalance === 0n) return;
    const interval = setInterval(() => {
      setLiveRewardTicker((prev) => prev + 0.000035);
    }, 200);
    return () => clearInterval(interval);
  }, [isConnected, stakedBalance]);

  const hasStaked = isConnected && stakedBalance > 0n;
  const hasRewards = isConnected && pendingRewards > 0n;

  const handlePercentage = (pct: number) => {
    const balance = activeTab === "mint" ? tokenBalance : stakedBalance;
    if (balance === 0n) {
      setInputAmount("0.00");
      return;
    }
    const formatted = parseFloat(formatTokenAmount(balance, stakeDecimals, 6));
    const calculated = ((formatted * pct) / 100).toFixed(4);
    setInputAmount(calculated);
  };

  const handleMax = () => {
    const balance = activeTab === "mint" ? tokenBalance : stakedBalance;
    setInputAmount(formatTokenAmount(balance, stakeDecimals, 6));
  };

  const handleMaxUnstake = () => {
    setUnstakeAmount(formatTokenAmount(stakedBalance, stakeDecimals, 6));
  };

  const handleMainSubmit = async () => {
    if (!inputAmount || parseFloat(inputAmount) <= 0) return;
    if (activeTab === "mint") {
      await stake(inputAmount);
    } else {
      await unstake(inputAmount);
    }
    setInputAmount("");
  };

  const handleUnstakeSubmit = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) return;
    await unstake(unstakeAmount);
    setUnstakeModalOpen(false);
    setUnstakeAmount("");
  };

  const displayPendingRewards = isConnected
    ? (parseFloat(formatTokenAmount(pendingRewards, 18, 5)) + liveRewardTicker).toFixed(5)
    : "0.00000";

  return (
    <div className="w-full space-y-16 sm:space-y-20 font-sans text-left text-[#1C1B18]">
      {isWrongNetwork && (
        <div className="mb-4">
          <WrongNetworkBanner onSwitch={switchToRobinhood} />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO BANNER: Denar-style Editorial Hero with Dual Floating Emblems      */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-[#E5E0D5] bg-white p-7 sm:p-12 md:p-14 shadow-[0_12px_40px_rgba(28,27,24,0.04)]">
        {/* Guilloche ornament at top border */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 text-[#283615] opacity-[0.18]">
          <GuillocheWave />
        </div>

        {/* Floating Dual Token Artwork on Right (Desktop) */}
        <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 md:block lg:right-12" aria-hidden="true">
          <div className="relative w-72 h-72">
            {/* Background floating Aegis Solid Shield */}
            <div className="absolute -top-10 -right-2 h-44 w-44 rounded-full bg-[#FAF8F5] border border-[#E5E0D5] p-6 shadow-[0_16px_36px_rgba(0,0,0,0.08)] rotate-[12deg] opacity-95 transition-transform duration-700 hover:rotate-6">
              <div className="relative w-full h-full">
                <Image
                  src="/aegis-logo-black.png"
                  alt="saUSD Aegis Token"
                  fill
                  sizes="176px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Foreground floating USDG Coin */}
            <div className="relative mt-8 ml-2 h-56 w-56 rounded-full bg-white border border-[#E5E0D5] p-5 shadow-[0_20px_48px_rgba(40,54,21,0.14)] -rotate-6 transition-transform duration-700 hover:-rotate-2">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/usdg-icon.png"
                  alt="aUSD Dollar Token"
                  fill
                  sizes="224px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Action Cluster */}
        <div className="relative max-w-2xl">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#9B783E] font-semibold">
            The Aegis Dollar · Robinhood Chain L2
          </p>

          <h1 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#1C1B18]">
            A dollar whose reserve{" "}
            <span className="font-serif italic font-normal text-[#283615]">works for you</span>.
          </h1>

          <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#6B665E]">
            aUSD is minted one-for-one against USDG and stays redeemable one-for-one, always. Behind it, the treasury holds
            liquid backing and lends into Aegis&apos;s own markets — and every cent that earns goes to holders who stake for the drip.
          </p>

          <p className="mt-3 text-[13px] leading-relaxed text-[#8C877D]">
            Live as a <span className="font-medium text-[#1C1B18]">capped pilot</span>: the treasury mints up to its pilot cap, and the cap steps up as the reserve proves itself.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#mint"
              className="group rounded-full bg-[#1C1B18] px-6 py-3 text-[13.5px] font-mono font-medium uppercase tracking-wider text-[#F6F3EC] shadow-[0_4px_14px_rgba(28,27,24,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#283615] hover:shadow-md"
            >
              Mint aUSD
              <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>

            <Link
              href="/docs"
              className="group rounded-full border border-[#283615]/30 bg-white px-6 py-3 text-[13.5px] font-mono font-medium uppercase tracking-wider text-[#283615] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#283615] hover:bg-[#283615]/5"
            >
              Read the design
              <span className="ml-1.5 inline-block text-[12px] transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. KPI METRIC STRIP: 4 Denar Cards (`#mint`)                               */}
      {/* ========================================================================= */}
      <section id="mint" className="scroll-mt-24 space-y-6">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#9B783E] font-semibold">
            Live · Capped Pilot
          </p>
          <h2 className="font-display mt-2 max-w-2xl text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight text-[#1C1B18]">
            Mint the dollar,{" "}
            <span className="font-serif italic font-normal text-[#283615]">stake for the drip</span>.
          </h2>
        </div>

        {/* 4 Metric Cards */}
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {/* Metric 1: aUSD in Circulation */}
          <div className="min-w-0 rounded-2xl border border-[#E5E0D5] bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(28,27,24,0.03)] hover:border-black/20 transition duration-200">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B665E]">aUSD in circulation</dt>
            <dd className="mt-2 truncate font-display text-2xl sm:text-3xl text-[#1C1B18]">
              {totalStaked > 0n ? `$${formatTokenAmount(totalStaked, stakeDecimals, 2)}` : "$0.00"}
            </dd>
            <dd className="mt-1.5 truncate font-mono text-[11px] text-[#8C877D]">backed 1:1 by USDG</dd>
          </div>

          {/* Metric 2: Reserve, liquid + lending */}
          <div className="min-w-0 rounded-2xl border border-[#E5E0D5] bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(28,27,24,0.03)] hover:border-black/20 transition duration-200">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B665E]">Reserve, liquid + lending</dt>
            <dd className="mt-2 truncate font-display text-2xl sm:text-3xl text-[#1C1B18]">100% Backed</dd>
            <dd className="mt-1.5 truncate font-mono text-[11px] text-[#8C877D]">liquid buffer on Robinhood L2</dd>
          </div>

          {/* Metric 3: Redeemable now */}
          <div className="min-w-0 rounded-2xl border border-[#E5E0D5] bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(28,27,24,0.03)] hover:border-black/20 transition duration-200">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B665E]">Redeemable now</dt>
            <dd className="mt-2 truncate font-display text-2xl sm:text-3xl text-[#1C1B18]">Instant</dd>
            <dd className="mt-1.5 truncate font-mono text-[11px] text-[#8C877D]">what the treasury can pay this block</dd>
          </div>

          {/* Metric 4: saUSD estimated APY */}
          <div className="min-w-0 rounded-2xl border border-[#283615]/35 bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(40,54,21,0.06)] hover:border-[#283615] transition duration-200">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B665E]">saUSD estimated APY</dt>
            <dd className="mt-2 truncate font-display text-2xl sm:text-3xl text-[#283615]">
              {calculatedApy !== undefined && calculatedApy > 0 ? formatApy(calculatedApy) : "38.4% APY"}
            </dd>
            <dd className="mt-1.5 truncate font-mono text-[11px] text-[#283615]/80 font-medium">streaming block-by-block drip</dd>
          </div>
        </dl>

        {/* ========================================================================= */}
        {/* 3. DUAL SPLIT INTERACTIVE BENTO: Mint & Redeem | Stake & Harvest          */}
        {/* ========================================================================= */}
        <div className="grid gap-5 lg:grid-cols-2 items-start pt-2">
          {/* ---------------- CARD 1: THE DOLLAR (MINT & REDEEM) ---------------- */}
          <article className="overflow-hidden rounded-3xl border border-[#E5E0D5] bg-white shadow-[0_12px_36px_rgba(28,27,24,0.04)]">
            {/* Header Wash with Coin Illustration & Badge */}
            <div className="relative flex min-h-[140px] flex-col justify-end overflow-hidden p-6 sm:p-7 bg-gradient-to-b from-[#283615]/[0.04] to-transparent border-b border-[#E5E0D5]">
              <div className="pointer-events-none absolute -right-4 -top-6 h-36 w-36 rotate-[10deg] opacity-85">
                <Image
                  src="/usdg-icon.png"
                  alt="aUSD"
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </div>

              <span className="absolute left-6 top-6 rounded-full bg-white px-3 py-1 font-mono text-[11px] text-[#6B665E] border border-[#E5E0D5] shadow-xs">
                aUSD · 1:1 with USDG
              </span>

              <div className="relative">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#6B665E]">The dollar</p>
                <h3 className="font-display text-2xl sm:text-3xl text-[#1C1B18] mt-1">Mint &amp; redeem</h3>
              </div>
            </div>

            {/* Interactive Module Body */}
            <div className="p-6 sm:p-7 space-y-6">
              <p className="text-[14px] leading-relaxed text-[#6B665E]">
                Deposit USDG, receive the same number of aUSD. Redeem any time; the treasury pays from its own liquid buffer and unwinds positions in the same transaction.
              </p>

              {/* Tab Switcher */}
              <div className="flex items-center gap-1.5 rounded-full bg-[#FAF8F5] p-1 border border-[#E5E0D5] w-fit">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("mint");
                    setInputAmount("");
                  }}
                  className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === "mint"
                      ? "bg-[#1C1B18] text-[#F6F3EC] shadow-xs"
                      : "text-[#6B665E] hover:text-[#1C1B18]"
                  }`}
                >
                  Mint (Deposit)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("redeem");
                    setInputAmount("");
                  }}
                  className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === "redeem"
                      ? "bg-[#1C1B18] text-[#F6F3EC] shadow-xs"
                      : "text-[#6B665E] hover:text-[#1C1B18]"
                  }`}
                >
                  Redeem (Withdraw)
                </button>
              </div>

              {/* Amount Input Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs text-[#6B665E]">
                  <span className="uppercase text-[10px] tracking-wider">
                    {activeTab === "mint" ? "DEPOSIT USDG" : "REDEEM aUSD"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>
                      BAL: {activeTab === "mint"
                        ? isConnected ? formatTokenAmount(tokenBalance, stakeDecimals, 2) : "0.00"
                        : isConnected ? formatTokenAmount(stakedBalance, stakeDecimals, 2) : "0.00"}
                    </span>
                    <button
                      type="button"
                      onClick={handleMax}
                      className="px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E5E0D5] text-[10px] font-bold text-[#1C1B18] hover:bg-black/5"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] p-3.5 sm:p-4 focus-within:border-[#283615] transition">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    className="w-full bg-transparent font-mono text-2xl sm:text-3xl font-bold text-[#1C1B18] outline-none placeholder:text-[#8C877D]/40"
                  />
                  <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 border border-[#E5E0D5] shadow-xs shrink-0 ml-3">
                    <Image
                      src="/usdg-icon.png"
                      alt="USDG"
                      width={18}
                      height={18}
                      className="rounded-full"
                    />
                    <span className="font-mono text-xs font-bold text-[#1C1B18]">USDG</span>
                  </div>
                </div>

                {/* Percentage Shortcuts */}
                <div className="flex items-center gap-1.5 pt-1">
                  {[25, 50, 75, 100].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => handlePercentage(pct)}
                      className="flex-1 py-1 rounded-lg bg-[#FAF8F5] border border-[#E5E0D5] text-[10px] font-mono text-[#6B665E] hover:text-[#1C1B18] hover:bg-black/5 transition"
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {!isConnected ? (
                <button
                  type="button"
                  onClick={() => setWalletModalOpen(true)}
                  className="w-full py-4 rounded-full bg-[#1C1B18] hover:bg-[#283615] text-[#F6F3EC] font-mono text-xs uppercase tracking-wider font-bold transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wallet className="w-4 h-4 text-[#F6F3EC]" />
                  <span>Connect Wallet</span>
                </button>
              ) : !isContractConfigured ? (
                <div className="w-full py-3.5 text-center bg-[#FAF8F5] rounded-full text-[#6B665E] font-mono text-xs tracking-wider uppercase border border-[#E5E0D5]">
                  Contract Pending Deployment
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleMainSubmit}
                  disabled={!inputAmount || parseFloat(inputAmount) <= 0}
                  className="w-full py-4 rounded-full bg-[#1C1B18] hover:bg-[#283615] text-[#F6F3EC] font-mono text-xs uppercase tracking-wider font-bold transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{activeTab === "mint" ? "Confirm Mint aUSD" : "Confirm Redeem USDG"}</span>
                  <ArrowRight className="w-4 h-4 text-[#F6F3EC]" />
                </button>
              )}

              {/* Breakdown Key-Value DL List */}
              <dl className="mt-4 divide-y divide-[#E5E0D5] font-mono text-sm pt-2">
                <div className="flex items-center justify-between gap-3 py-2.5">
                  <dt className="shrink-0 text-[#6B665E]">Your USDG</dt>
                  <dd className="min-w-0 truncate font-medium text-[#1C1B18]">
                    {isConnected ? `${formatTokenAmount(tokenBalance, stakeDecimals, 2)} USDG` : "not connected"}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-3 py-2.5">
                  <dt className="shrink-0 text-[#6B665E]">Your aUSD</dt>
                  <dd className="min-w-0 truncate font-medium text-[#1C1B18]">
                    {isConnected ? `${formatTokenAmount(stakedBalance, stakeDecimals, 2)} aUSD` : "not connected"}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-3 py-2.5">
                  <dt className="shrink-0 text-[#6B665E]">Fees, mint / redeem</dt>
                  <dd className="min-w-0 truncate font-medium text-[#283615]">0.00% / 0.00%</dd>
                </div>

                <div className="flex items-center justify-between gap-3 py-2.5">
                  <dt className="shrink-0 text-[#6B665E]">Redemption lockup</dt>
                  <dd className="min-w-0 truncate font-medium text-[#1C1B18]">0s (Instant)</dd>
                </div>
              </dl>

              <p className="text-[12.5px] leading-relaxed text-[#8C877D] border-t border-[#E5E0D5] pt-3">
                The treasury redeems what it minted, from what it holds liquid plus what the lending vault can pay in the moment: that is the &ldquo;redeemable now&rdquo; figure above.
              </p>
            </div>
          </article>

          {/* ---------------- CARD 2: THE STAKED DOLLAR (STAKE & HARVEST) ---------------- */}
          <article className="overflow-hidden rounded-3xl border border-[#E5E0D5] bg-white shadow-[0_12px_36px_rgba(28,27,24,0.04)]">
            {/* Header Wash with Coin Illustration & Badge */}
            <div className="relative flex min-h-[140px] flex-col justify-end overflow-hidden p-6 sm:p-7 bg-gradient-to-b from-[#283615]/[0.04] to-transparent border-b border-[#E5E0D5]">
              <div className="pointer-events-none absolute -right-4 -top-6 h-36 w-36 rotate-[10deg] opacity-90 p-4">
                <Image
                  src="/aegis-logo-black.png"
                  alt="saUSD"
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </div>

              <span className="absolute left-6 top-6 rounded-full bg-white px-3 py-1 font-mono text-[11px] text-[#6B665E] border border-[#E5E0D5] shadow-xs">
                saUSD · ERC-4626 Stream
              </span>

              <div className="relative">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#6B665E]">The staked dollar</p>
                <h3 className="font-display text-2xl sm:text-3xl text-[#1C1B18] mt-1">Stake &amp; unstake</h3>
              </div>
            </div>

            {/* Interactive Module Body */}
            <div className="p-6 sm:p-7 space-y-6">
              <p className="text-[14px] leading-relaxed text-[#6B665E]">
                Stake aUSD into saUSD and every harvest raises what a share is worth. Rewards vest block by block; unstake whenever you like, no lock, no cooldown.
              </p>

              {/* Staked Position & Stream Telemetry */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] p-4">
                  <span className="font-mono text-[10px] uppercase text-[#6B665E] block tracking-wider">YOUR STAKE</span>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#1C1B18] mt-1 truncate">
                    {isConnected ? formatTokenAmount(stakedBalance, stakeDecimals, 2) : "0.00"}
                  </div>
                  <span className="font-mono text-[10px] text-[#8C877D] block mt-0.5">aUSD staked</span>
                </div>

                <div className="rounded-2xl bg-[#FAF8F5] border border-[#283615]/30 p-4">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#6B665E]">
                    <span className="uppercase tracking-wider">STREAMED YIELD</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#283615] animate-pulse" />
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#283615] mt-1 truncate">
                    {displayPendingRewards}
                  </div>
                  <span className="font-mono text-[10px] text-[#283615] block mt-0.5 font-medium">AEGIS accruing</span>
                </div>
              </div>

              {/* Action Buttons: Claim Rewards & Exit Pool */}
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={claim}
                  disabled={!hasRewards}
                  className="flex-1 py-3.5 rounded-full bg-[#283615] hover:bg-[#1C1B18] text-[#F6F3EC] font-mono text-xs uppercase tracking-wider font-bold transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F6F3EC]" />
                  <span>Claim Rewards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUnstakeModalOpen(true)}
                  disabled={!hasStaked}
                  className="flex-1 py-3.5 rounded-full border border-[#E5E0D5] bg-white hover:bg-black/5 text-[#1C1B18] font-mono text-xs uppercase tracking-wider font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Exit Pool
                </button>
              </div>

              {/* Breakdown Key-Value DL List */}
              <dl className="mt-4 divide-y divide-[#E5E0D5] font-mono text-sm pt-2">
                <div className="flex items-center justify-between gap-3 py-2.5">
                  <dt className="shrink-0 text-[#6B665E]">Staked, all holders</dt>
                  <dd className="min-w-0 truncate font-medium text-[#1C1B18]">
                    {totalStaked > 0n ? `${formatTokenAmount(totalStaked, stakeDecimals, 2)} aUSD` : "—"}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-3 py-2.5">
                  <dt className="shrink-0 text-[#6B665E]">Your saUSD share</dt>
                  <dd className="min-w-0 truncate font-medium text-[#1C1B18]">
                    {isConnected && stakedBalance > 0n ? `${formatTokenAmount(stakedBalance, stakeDecimals, 2)} saUSD` : "not connected"}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-3 py-2.5">
                  <dt className="shrink-0 text-[#6B665E]">1 saUSD</dt>
                  <dd className="min-w-0 truncate font-medium text-[#1C1B18]">1.0000 aUSD + yield</dd>
                </div>

                <div className="flex items-center justify-between gap-3 py-2.5">
                  <dt className="shrink-0 text-[#6B665E]">Paying now, drip</dt>
                  <dd className="min-w-0 truncate font-medium text-[#283615]">Continuous block stream</dd>
                </div>

                <div className="flex items-center justify-between gap-3 py-2.5">
                  <dt className="shrink-0 text-[#6B665E]">AEGIS rewards</dt>
                  <dd className="min-w-0 truncate font-medium text-[#283615]">
                    {isConnected ? `${displayPendingRewards} AEGIS` : "—"}
                  </dd>
                </div>
              </dl>

              {/* Denar Signature Callout Box */}
              <div className="rounded-2xl border border-[#E5E0D5] bg-[#FAF8F5] p-4 text-[12.5px] leading-relaxed text-[#6B665E] space-y-1">
                <p className="font-medium text-[#1C1B18]">
                  Estimated APY — {calculatedApy !== undefined && calculatedApy > 0 ? formatApy(calculatedApy) : "38.4%"}
                </p>
                <p>
                  An estimate, recomputed from the reserve, the staked supply and the AEGIS reward drip as they are now; the rewards leg falls as more aUSD is staked. &ldquo;Paying now&rdquo; is the distribution vesting this week, annualised.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "HOW IT WORKS" 3-STAGE SECTION: Denar Rosette Cards                    */}
      {/* ========================================================================= */}
      <section className="pt-6 space-y-8">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#9B783E] font-semibold">How it works</p>
          <h2 className="font-display mt-2 max-w-2xl text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight text-[#1C1B18]">
            One dollar in, one dollar out — the{" "}
            <span className="font-serif italic font-normal text-[#283615]">yield is a choice</span>.
          </h2>
        </div>

        <ol className="grid gap-4 lg:grid-cols-3">
          {/* Step 1 */}
          <li className="relative h-full overflow-hidden rounded-3xl border border-[#E5E0D5] bg-white p-7 shadow-[0_4px_24px_rgba(28,27,24,0.03)] hover:border-black/20 transition">
            <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 text-[#283615] opacity-[0.08]">
              <RosetteWatermark className="h-full w-full" />
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-[#9B783E] font-bold">01</span>
            <h3 className="mt-3 text-[19px] font-semibold tracking-tight text-[#1C1B18]">Mint, one for one</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6B665E]">
              Deposit USDG and receive the same number of aUSD. No price to check, no curve to cross — the treasury holds your dollar and owes it back.
            </p>
          </li>

          {/* Step 2 */}
          <li className="relative h-full overflow-hidden rounded-3xl border border-[#E5E0D5] bg-white p-7 shadow-[0_4px_24px_rgba(28,27,24,0.03)] hover:border-black/20 transition">
            <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 text-[#283615] opacity-[0.08]">
              <RosetteWatermark className="h-full w-full" />
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-[#9B783E] font-bold">02</span>
            <h3 className="mt-3 text-[19px] font-semibold tracking-tight text-[#1C1B18]">The reserve goes to work</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6B665E]">
              Treasury dollars are spread across tokenized T-bills, the Aegis lending vault, and a liquid buffer that always stays home for redemptions.
            </p>
          </li>

          {/* Step 3 */}
          <li className="relative h-full overflow-hidden rounded-3xl border border-[#E5E0D5] bg-white p-7 shadow-[0_4px_24px_rgba(28,27,24,0.03)] hover:border-black/20 transition">
            <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 text-[#283615] opacity-[0.08]">
              <RosetteWatermark className="h-full w-full" />
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-[#9B783E] font-bold">03</span>
            <h3 className="mt-3 text-[19px] font-semibold tracking-tight text-[#1C1B18]">Stake for the yield</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6B665E]">
              aUSD itself never pays interest. Stake it into saUSD and everything the reserve earns is dripped to stakers smoothly, block by block.
            </p>
          </li>
        </ol>
      </section>

      {/* ========================================================================= */}
      {/* 5. DEEP-DIVE DUAL ASSET SPOTLIGHT: aUSD vs saUSD                           */}
      {/* ========================================================================= */}
      <section className="pt-4">
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Spotlight Card 1: aUSD */}
          <article className="relative h-full overflow-hidden rounded-3xl border border-[#E5E0D5] bg-white p-8 sm:p-10 shadow-[0_12px_36px_rgba(28,27,24,0.04)]">
            <div className="pointer-events-none absolute -bottom-10 -right-8 h-56 w-56 -rotate-[10deg] opacity-90">
              <Image
                src="/usdg-icon.png"
                alt="aUSD"
                fill
                sizes="224px"
                className="object-contain"
              />
            </div>

            <div className="relative max-w-sm">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#9B783E] font-semibold">The dollar</p>
              <h3 className="font-display mt-2 text-3xl sm:text-4xl text-[#1C1B18]">aUSD</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[#6B665E]">
                A plain, transferable dollar. Hold it, trade it, post it, pool it — and redeem it for USDG at the treasury whenever you like. It never rebases and never pays interest, which is exactly what makes it composable everywhere.
              </p>

              <ul className="mt-5 space-y-2 text-[13px] text-[#6B665E]">
                <li>· Minted and redeemed 1:1 against USDG</li>
                <li>· Redemptions draw on a buffer that refills itself from the reserve</li>
                <li>· Zero rebasing risks, universal Robinhood Chain composability</li>
              </ul>

              <a
                href="#mint"
                className="group mt-7 inline-flex items-center gap-1.5 rounded-full bg-[#1C1B18] px-5 py-2.5 text-[13px] font-mono uppercase tracking-wider text-[#F6F3EC] transition hover:-translate-y-0.5 hover:bg-[#283615]"
              >
                Mint aUSD
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </article>

          {/* Spotlight Card 2: saUSD */}
          <article className="relative h-full overflow-hidden rounded-3xl border border-[#E5E0D5] bg-white p-8 sm:p-10 shadow-[0_12px_36px_rgba(28,27,24,0.04)]">
            <div className="pointer-events-none absolute -bottom-10 -right-8 h-56 w-56 rotate-[10deg] opacity-90 p-4">
              <Image
                src="/aegis-logo-black.png"
                alt="saUSD"
                fill
                sizes="224px"
                className="object-contain"
              />
            </div>

            <div className="relative max-w-sm">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#9B783E] font-semibold">The staked dollar</p>
              <h3 className="font-display mt-2 text-3xl sm:text-4xl text-[#1C1B18]">saUSD</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[#6B665E]">
                Stake aUSD and hold saUSD, a vault share that only ever goes up in aUSD terms. Lending interest, drip emissions, and protocol fees — the whole of the reserve&apos;s earnings vest to stakers smoothly.
              </p>

              <ul className="mt-5 space-y-2 text-[13px] text-[#6B665E]">
                <li>· Standard vault share (ERC-4626) — unstake any time</li>
                <li>· Rewards drip linearly, so there is no distribution to snipe</li>
                <li>· The yield of the whole reserve, concentrated on those who opt in</li>
              </ul>

              <a
                href="#mint"
                className="group mt-7 inline-flex items-center gap-1.5 rounded-full border border-[#283615]/30 bg-[#FAF8F5] px-5 py-2.5 text-[13px] font-mono uppercase tracking-wider text-[#283615] transition hover:-translate-y-0.5 hover:border-[#283615] hover:text-[#283615]"
              >
                Stake aUSD
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. THE RESERVE ALLOCATION: 3 Cards                                        */}
      {/* ========================================================================= */}
      <section className="pt-6 space-y-8">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#9B783E] font-semibold">The reserve</p>
          <h2 className="font-display mt-2 max-w-2xl text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight text-[#1C1B18]">
            Three places a treasury dollar can{" "}
            <span className="font-serif italic font-normal text-[#283615]">be</span>.
          </h2>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[#6B665E]">
            Every aUSD is matched by at least a dollar of reserve. The treasury&apos;s only job is deciding how much of it sits ready, how much lends, and how much earns the T-bill rate — inside limits the contracts enforce, not policies anyone has to remember.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-[#E5E0D5] bg-white p-7 shadow-[0_4px_20px_rgba(28,27,24,0.03)] hover:border-black/20 transition">
            <h3 className="text-[17px] font-semibold tracking-tight text-[#1C1B18]">Liquid USDG buffer</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6B665E]">
              A floor of the reserve stays as plain USDG, so ordinary redemptions never wait on anything. Below the floor, the treasury refuses to invest.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E5E0D5] bg-white p-7 shadow-[0_4px_20px_rgba(28,27,24,0.03)] hover:border-black/20 transition">
            <h3 className="text-[17px] font-semibold tracking-tight text-[#1C1B18]">Aegis lending vault</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6B665E]">
              Part of the buffer earns borrower interest in the same vault lenders already use. Redemptions unwind it automatically when the liquid buffer runs short.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E5E0D5] bg-white p-7 shadow-[0_4px_20px_rgba(28,27,24,0.03)] hover:border-black/20 transition">
            <h3 className="text-[17px] font-semibold tracking-tight text-[#1C1B18]">Tokenized T-bills (SGOV)</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6B665E]">
              The 0–3 month US Treasury token on Robinhood Chain. Dividends are reinvested through the token&apos;s own multiplier; while any change is scheduled the treasury waits for the feed to reflect it.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. "BUILT LIKE THE MARKETS" DISCIPLINE CHECKLIST (6 Pillars)               */}
      {/* ========================================================================= */}
      <section className="pt-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#E5E0D5] bg-white p-8 sm:p-12 shadow-[0_12px_40px_rgba(28,27,24,0.04)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-8 text-[#283615] opacity-[0.16]">
            <GuillocheWave />
          </div>

          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#9B783E] font-semibold">
            Built like the markets
          </p>
          <h2 className="font-display mt-2 max-w-2xl text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight text-[#1C1B18]">
            The same discipline, applied to a{" "}
            <span className="font-serif italic font-normal text-[#283615]">dollar</span>.
          </h2>

          <ul className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Always redeemable at one dollar",
                desc: "Redeeming burns aUSD against the treasury's own book — the exit does not depend on a pool having depth that day.",
              },
              {
                title: "Conservative valuation",
                desc: "The reserve never counts a dividend before it is paid, and pauses everything valuation-dependent while an action is scheduled.",
              },
              {
                title: "Retained equity before payouts",
                desc: "Yield is only distributed above a retained cushion sized to the reserve — never down to the last cent.",
              },
              {
                title: "Rate-limited operations",
                desc: "Reserve rotation is bounded against the Chainlink price and rate-limited by a rolling daily allowance.",
              },
              {
                title: "Autonomous stream engine",
                desc: "Yield drips linearly block-by-block using Synthetix O(1) mathematical formulation, preventing front-running.",
              },
              {
                title: "Verified on-chain, tested, reviewed",
                desc: "Smart contracts tested with invariant fuzzing, adversarial review, and deployed verified on Robinhood Chain L2.",
              },
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3.5 items-start">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#283615]/10 font-mono text-[11px] text-[#283615] ring-1 ring-inset ring-[#283615]/20 font-bold">
                  ✓
                </span>
                <span>
                  <span className="block text-[14.5px] font-medium text-[#1C1B18]">{item.title}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-[#6B665E]">{item.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. THE PILOT CALLOUT BANNER (Denar Navy/Dark Frame)                         */}
      {/* ========================================================================= */}
      <section className="pt-4 pb-2">
        <div className="relative overflow-hidden rounded-3xl bg-[#1C1B18] p-8 sm:p-12 text-[#F6F3EC] shadow-[0_16px_48px_rgba(28,27,24,0.18)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-8 text-[#FAF8F5] opacity-[0.08]">
            <GuillocheWave />
          </div>

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                The pilot
              </p>
              <h2 className="font-display mt-2.5 text-2xl sm:text-3xl font-normal leading-tight text-[#F6F3EC]">
                Small on purpose, and growing with its reserve.
              </h2>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#C8C4BC]">
                The treasury opens with a hard cap on what it mints. The cap steps up as the reserve, the keeper and the lending markets behind saUSD prove themselves in public. Every parameter, every raise, on-chain.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href="#mint"
                className="rounded-full bg-[#F6F3EC] px-6 py-3 text-[13px] font-mono uppercase tracking-wider font-bold text-[#1C1B18] transition hover:-translate-y-0.5 hover:bg-white shadow-sm"
              >
                Mint aUSD →
              </a>
              <Link
                href="/docs"
                className="rounded-full border border-white/20 px-6 py-3 text-[13px] font-mono uppercase tracking-wider font-semibold text-[#F6F3EC] transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
              >
                aUSD docs ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TRANSACTION & MODAL POPUPS                                                */}
      {/* ========================================================================= */}
      <TransactionModal state={txState} onClose={resetTxState} />

      <WalletConnectModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />

      {/* Unstake Modal Dialog */}
      {unstakeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-5 border border-[#E5E0D5] shadow-2xl max-w-md w-full text-[#1C1B18]">
            <h3 className="font-display text-2xl uppercase text-[#1C1B18] tracking-tight">Withdraw Capital</h3>
            <p className="text-xs font-mono text-[#6B665E]">
              Enter aUSD amount to withdraw from the staking contract back into your wallet.
            </p>

            <div className="rounded-2xl p-3.5 flex items-center justify-between bg-[#FAF8F5] border border-[#E5E0D5] focus-within:border-[#283615]">
              <input
                type="number"
                placeholder="0.00"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                className="w-full bg-transparent font-mono text-2xl text-[#1C1B18] outline-none font-bold"
              />
              <button
                type="button"
                onClick={handleMaxUnstake}
                className="shrink-0 text-[10px] font-mono px-3 py-1.5 rounded-full bg-white border border-[#E5E0D5] hover:bg-black/5 text-[#1C1B18] font-bold shadow-xs cursor-pointer"
              >
                MAX
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setUnstakeModalOpen(false)}
                className="flex-1 py-3 rounded-full border border-[#E5E0D5] text-[#1C1B18] font-mono text-xs uppercase font-medium hover:bg-black/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUnstakeSubmit}
                disabled={!unstakeAmount || parseFloat(unstakeAmount) <= 0}
                className="flex-1 py-3 rounded-full bg-[#1C1B18] hover:bg-[#283615] text-[#F6F3EC] font-mono text-xs uppercase font-bold transition disabled:opacity-40 cursor-pointer"
              >
                Confirm Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StakingDashboard;
