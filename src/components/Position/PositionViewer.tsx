"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useKawaStaking } from "@/lib/hooks/useKawaStaking";
import { formatTokenAmount, formatApy, formatDuration, formatAddress } from "@/lib/utils/formatters";
import { protocolConfig } from "@/lib/blockchain/config";
import { KawaEmblem } from "../Brand/KawaEmblem";
import { TransactionModal } from "../Transaction/TransactionModal";
import { WalletConnectModal } from "../Wallet/WalletConnectModal";
import { ArrowUpRight, ShieldCheck, Sparkles, Clock, Coins, Wallet } from "lucide-react";

export const PositionViewer: React.FC = () => {
  const {
    isConnected,
    address,
    stakeDecimals,
    stakedBalance,
    pendingRewards,
    stakingDuration,
    calculatedApy,
    kawaState,
    claim,
    unstake,
    txState,
    resetTxState,
  } = useKawaStaking();

  const [unstakeModalOpen, setUnstakeModalOpen] = useState(false);
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const hasStaked = isConnected && stakedBalance > 0n;
  const hasRewards = isConnected && pendingRewards > 0n;

  const handleUnstakeSubmit = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) return;
    await unstake(unstakeAmount);
    setUnstakeModalOpen(false);
    setUnstakeAmount("");
  };

  const getStateDescription = () => {
    if (!isConnected) return "Connect an authorized Web3 wallet to inspect your staked liquidity.";
    if (!hasStaked) return "Capital is resting. Stake tokens into the stream to begin compounding yield.";
    if (kawaState === "awakened") return "Maximum protocol resonance achieved. Peak emission multiplier active.";
    if (kawaState === "mature" || kawaState === "growing") return "Position continuously compounding across Robinhood Chain blocks.";
    return "Position registered in protocol contract. Yield stream active.";
  };

  return (
    <div className="w-full space-y-8 font-sans text-left text-white">
      {/* Editorial Page Header */}
      <div className="space-y-2 border-b border-white/10 pb-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.35em] text-[#8e95a2] uppercase">
            PORTFOLIO • REAL-TIME SETTLEMENT
          </span>
          {isConnected && address && (
            <span className="text-[11px] font-mono text-neutral-300 bg-[#16181d] border border-white/10 px-3 py-1 rounded-full">
              {formatAddress(address)}
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-5xl font-light tracking-[0.08em] text-white uppercase font-sans">
          YOUR KAWA <span className="text-[#c8f53c] font-normal">POSITION</span>
        </h1>
        <p className="text-xs sm:text-sm font-mono tracking-[0.05em] text-[#8e95a2] max-w-lg">
          Autonomous USDG staking stream and cryptographic KAWA reward checkpoint on Robinhood Chain.
        </p>
      </div>

      {/* Position Identity Card */}
      <div className="border border-white/[0.08] rounded-2xl p-6 sm:p-8 bg-[#121418] shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Frame for Emblem */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-white/10 bg-[#0a0b0d] flex items-center justify-center p-4 shadow-inner shrink-0">
            <KawaEmblem size="100%" variant="white" state={kawaState} animate={hasStaked} />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#8e95a2] uppercase">
                KAWA STATE
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-[#1a1c22] text-[10px] font-mono tracking-[0.2em] text-white uppercase font-medium">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    hasStaked ? "bg-[#c8f53c] shadow-[0_0_6px_#c8f53c] animate-pulse" : "bg-neutral-500"
                  }`}
                />
                {kawaState}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-light tracking-[0.08em] text-white uppercase font-mono">
              {hasStaked ? "ACTIVE USDG STAKE STREAM" : "DORMANT ACCOUNT"}
            </h2>

            <p className="text-xs text-[#8e95a2] font-sans leading-relaxed max-w-md">
              {getStateDescription()}
            </p>
          </div>
        </div>

        {/* Network & Protocol Status Hairline Strip */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-[11px] font-mono">
          <div>
            <span className="text-[#8e95a2] uppercase block text-[10px]">NETWORK & GAS</span>
            <span className="text-white font-medium">{protocolConfig.chainName} (ETH Gas)</span>
          </div>
          <div>
            <span className="text-[#8e95a2] uppercase block text-[10px]">SETTLEMENT</span>
            <span className="text-white font-medium">Constant O(1) Stream</span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-[#8e95a2] uppercase block text-[10px]">LOCKUP</span>
            <span className="text-[#c8f53c] font-medium">0s • Instant Exit</span>
          </div>
        </div>
      </div>

      {/* 2x2 Clean Modular Metric Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Metric 1: Staked Balance */}
        <div className="border border-white/[0.08] rounded-2xl p-6 bg-[#121418] space-y-3 hover:border-white/20 transition duration-200">
          <div className="flex items-center justify-between text-[#8e95a2]">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-medium">
              STAKED
            </span>
            <Image
              src="/usdg-icon.png"
              alt="USDG"
              width={18}
              height={18}
              className="rounded-full"
            />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-light font-mono tracking-tight text-white">
              {isConnected ? formatTokenAmount(stakedBalance, stakeDecimals, 4) : "0.00"}
            </span>
            <span className="text-xs font-mono font-medium text-[#8e95a2] uppercase">
              USDG
            </span>
          </div>
          <p className="text-[11px] text-[#8e95a2] font-mono">
            {hasStaked ? "Deposited in KAWAStaking.sol" : "No USDG deposited yet"}
          </p>
        </div>

        {/* Metric 2: Accrued Rewards */}
        <div className="border border-white/[0.08] rounded-2xl p-6 bg-[#121418] space-y-3 hover:border-white/20 transition duration-200">
          <div className="flex items-center justify-between text-[#8e95a2]">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-medium">
              KAWA EARNED
            </span>
            <Sparkles className="w-4 h-4 text-[#c8f53c]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-light font-mono tracking-tight text-[#c8f53c]">
              {isConnected ? formatTokenAmount(pendingRewards, 18, 4) : "0.0000"}
            </span>
            <span className="text-xs font-mono font-medium text-neutral-400 uppercase">
              KAWA
            </span>
          </div>
          <p className="text-[11px] text-[#8e95a2] font-mono">
            {hasRewards ? "Ready to harvest immediately" : "Accumulates continuously per block"}
          </p>
        </div>

        {/* Metric 3: Staking Duration */}
        <div className="border border-white/[0.08] rounded-2xl p-6 bg-[#121418] space-y-3 hover:border-white/20 transition duration-200">
          <div className="flex items-center justify-between text-[#8e95a2]">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-medium">
              STAKING DURATION
            </span>
            <Clock className="w-4 h-4 text-neutral-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-light font-mono tracking-tight text-white">
            {isConnected && hasStaked ? formatDuration(stakingDuration) : "0 DAYS"}
          </div>
          <p className="text-[11px] text-[#8e95a2] font-mono">
            Calculated from genesis USDG deposit timestamp
          </p>
        </div>

        {/* Metric 4: Effective APY */}
        <div className="border border-white/[0.08] rounded-2xl p-6 bg-[#121418] space-y-3 hover:border-white/20 transition duration-200">
          <div className="flex items-center justify-between text-[#8e95a2]">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-medium">
              REWARD RATE
            </span>
            <ShieldCheck className="w-4 h-4 text-[#c8f53c]" />
          </div>
          <div className="text-3xl sm:text-4xl font-light font-mono tracking-tight text-white">
            {formatApy(calculatedApy)}
          </div>
          <p className="text-[11px] text-[#8e95a2] font-mono">
            Annualized Synthetix reward rate formula
          </p>
        </div>
      </div>

      {/* Action Zone */}
      <div className="border-t border-white/10 pt-6 space-y-4">
        {!isConnected ? (
          /* Not Connected Callout */
          <div className="border border-white/10 rounded-2xl p-6 sm:p-8 bg-[#121418] text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#181a20] border border-white/10 text-white flex items-center justify-center mx-auto">
              <Wallet className="w-5 h-5 text-[#c8f53c]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-mono tracking-[0.2em] text-white uppercase font-medium">
                AUTHENTICATE WITH ROBINHOOD CHAIN
              </h3>
              <p className="text-xs text-[#8e95a2] font-sans max-w-sm mx-auto">
                Connect your Web3 wallet to manage your staked USDG, claim KAWA rewards, or withdraw liquidity.
              </p>
            </div>
            <button
              onClick={() => setWalletModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-full bg-[#c8f53c] text-[#090a0c] text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-[#b8e52c] transition duration-200 shadow-md shadow-[#c8f53c]/20"
            >
              CONNECT WALLET &rarr;
            </button>
          </div>
        ) : (
          /* Connected Actions */
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={claim}
                disabled={!hasRewards}
                className="flex-1 py-4 px-6 rounded-full bg-[#c8f53c] text-[#090a0c] font-mono text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#b8e52c] disabled:opacity-30 disabled:cursor-not-allowed transition duration-200 shadow-md shadow-[#c8f53c]/15 text-center"
              >
                CLAIM KAWA ({formatTokenAmount(pendingRewards, 18, 4)} KAWA)
              </button>

              <button
                onClick={() => setUnstakeModalOpen(true)}
                disabled={!hasStaked}
                className="flex-1 py-4 px-6 rounded-full bg-[#16181d] border border-white/15 text-white font-mono text-xs tracking-[0.2em] uppercase font-medium hover:border-white/30 hover:bg-[#1f2229] disabled:opacity-30 disabled:cursor-not-allowed transition duration-200 text-center"
              >
                UNSTAKE USDG
              </button>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#8e95a2] pt-2 px-1">
              <span>Want to increase your active position?</span>
              <Link
                href="/stake"
                className="text-[#c8f53c] font-medium inline-flex items-center gap-1 hover:underline"
              >
                Stake USDG <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Minimal Dark Unstake Modal */}
      {unstakeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-[#131418] border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 text-left shadow-2xl">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#8e95a2] uppercase">
                WITHDRAWAL
              </span>
              <h3 className="text-lg font-mono tracking-[0.15em] text-white uppercase font-medium">
                UNSTAKE USDG
              </h3>
            </div>

            <div className="p-4 bg-[#0a0b0d] rounded-xl border border-white/5 space-y-1 text-xs font-mono">
              <div className="text-[#8e95a2] uppercase text-[10px]">Staked USDG Balance</div>
              <div className="text-white font-medium text-sm flex items-center gap-2">
                <Image
                  src="/usdg-icon.png"
                  alt="USDG"
                  width={18}
                  height={18}
                  className="rounded-full"
                />
                <span>{formatTokenAmount(stakedBalance, stakeDecimals, 4)} USDG</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-[#8e95a2] uppercase tracking-wider block">
                AMOUNT TO UNSTAKE (USDG)
              </label>
              <div className="flex items-center border-b border-white/30 focus-within:border-[#c8f53c] pb-1.5 transition">
                <input
                  type="number"
                  placeholder="0.00"
                  value={unstakeAmount}
                  onChange={(e) => setUnstakeAmount(e.target.value)}
                  className="w-full bg-transparent font-mono text-2xl text-white outline-none font-light placeholder:text-neutral-600"
                />
                <button
                  type="button"
                  onClick={() => setUnstakeAmount(formatTokenAmount(stakedBalance, stakeDecimals, 6))}
                  className="text-xs font-mono text-[#c8f53c] font-medium uppercase tracking-wider underline underline-offset-2 ml-2"
                >
                  MAX
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setUnstakeModalOpen(false)}
                className="flex-1 py-3 rounded-full bg-[#1a1c22] border border-white/10 text-neutral-300 font-mono text-xs uppercase tracking-wider hover:bg-[#242730] transition"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleUnstakeSubmit}
                className="flex-1 py-3 rounded-full bg-[#c8f53c] text-[#090a0c] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#b8e52c] transition"
              >
                CONFIRM UNSTAKE
              </button>
            </div>
          </div>
        </div>
      )}

      <WalletConnectModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />

      <TransactionModal state={txState} onClose={resetTxState} />
    </div>
  );
};
