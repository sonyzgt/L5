"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLayer5Staking } from "@/lib/hooks/useLayer5Staking";
import { formatTokenAmount, formatApy, formatDuration, formatAddress } from "@/lib/utils/formatters";
import { protocolConfig } from "@/lib/blockchain/config";
import { Layer5Emblem } from "../Brand/Layer5Emblem";
import { TransactionModal } from "../Transaction/TransactionModal";
import { WalletConnectModal } from "../Wallet/WalletConnectModal";
import { ArrowUpRight, ShieldCheck, Sparkles, Clock, Coins, Wallet, Layers, Activity } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

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
  } = useLayer5Staking();

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
      {/* 1. Sterling Gate Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#8e95a2] uppercase">
              03 // PORTFOLIO TELEMETRY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f53c] shadow-[0_0_6px_#c8f53c] animate-pulse" />
            <span className="font-cursive text-[#c8f53c] text-lg tracking-normal lowercase">
              ~ live non-custodial ~
            </span>
          </div>

          <h1 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] text-white uppercase leading-tight">
            USER <span className="text-[#c8f53c]">POSITION</span>
          </h1>

          <p className="text-xs sm:text-sm font-mono tracking-[0.05em] text-[#8e95a2] max-w-xl">
            Autonomous USDG staking stream and cryptographic Aegis reward checkpoint on Robinhood Chain.
          </p>
        </div>

        {isConnected && address && (
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] font-mono text-neutral-200 liquid-glass-pill px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#c8f53c] shadow-[0_0_8px_#c8f53c]" />
              {formatAddress(address)}
            </span>
          </div>
        )}
      </div>

      {/* 2. Top Metric Ribbon (4 Tiered Tiles) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="sg-tier-container">
          <div className="sg-tier-underlay-1" />
          <div className="sg-tier-underlay-2" />
          <div className="sg-tier-main p-3.5 sm:p-5 space-y-1">
            <span className="text-[10px] font-mono text-[#8e95a2] uppercase block">TOTAL STAKED</span>
            <div className="font-mono text-lg sm:text-2xl font-bold text-white tracking-tight truncate">
              {isConnected ? formatTokenAmount(stakedBalance, stakeDecimals, 2) : "0.00"}
            </div>
            <span className="text-[10px] font-mono text-[#c8f53c]">USDG Principal</span>
          </div>
        </div>

        <div className="sg-tier-container">
          <div className="sg-tier-underlay-1" />
          <div className="sg-tier-underlay-2" />
          <div className="sg-tier-main p-3.5 sm:p-5 space-y-1">
            <span className="text-[10px] font-mono text-[#8e95a2] uppercase block">UNCLAIMED REWARDS</span>
            <div className="font-mono text-lg sm:text-2xl font-bold text-[#c8f53c] tracking-tight truncate">
              {isConnected ? formatTokenAmount(pendingRewards, 18, 4) : "0.0000"}
            </div>
            <span className="text-[10px] font-mono text-neutral-400">AEGIS Streamed</span>
          </div>
        </div>

        <div className="sg-tier-container">
          <div className="sg-tier-underlay-1" />
          <div className="sg-tier-underlay-2" />
          <div className="sg-tier-main p-3.5 sm:p-5 space-y-1">
            <span className="text-[10px] font-mono text-[#8e95a2] uppercase block">EFFECTIVE RATE</span>
            <div className="font-mono text-lg sm:text-2xl font-bold text-white tracking-tight truncate">
              {calculatedApy !== undefined && calculatedApy > 0 ? formatApy(calculatedApy) : "0.00%"}
            </div>
            <span className="text-[10px] font-mono text-[#8e95a2]">Synthetix O(1)</span>
          </div>
        </div>

        <div className="sg-tier-container">
          <div className="sg-tier-underlay-1" />
          <div className="sg-tier-underlay-2" />
          <div className="sg-tier-main p-3.5 sm:p-5 space-y-1">
            <span className="text-[10px] font-mono text-[#8e95a2] uppercase block">STAKING DURATION</span>
            <div className="font-mono text-lg sm:text-2xl font-bold text-white tracking-tight truncate">
              {isConnected && hasStaked ? formatDuration(stakingDuration) : "0d"}
            </div>
            <span className="text-[10px] font-mono text-[#c8f53c]">0s Lockup</span>
          </div>
        </div>
      </div>

      {/* 3. Main Position Cards (Bento) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Position Overview & Actions */}
        <div className="lg:col-span-8 space-y-6">
          <div className="sg-tier-container">
            <div className="sg-tier-underlay-1" />
            <div className="sg-tier-underlay-2" />
            <div className="sg-tier-main p-4 sm:p-8 space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 sm:p-3 rounded-2xl liquid-glass-subcard border border-white/10 shrink-0">
                    <Layer5Emblem size={24} variant="white" animate={hasStaked} state={kawaState} />
                  </div>
                  <div>
                    <h2 className="font-editorial text-lg sm:text-2xl font-bold uppercase text-white">
                      LIQUID POSITION STATUS
                    </h2>
                    <span className="text-xs font-mono text-[#8e95a2]">
                      Contract: {formatAddress(protocolConfig.stakingContractAddress)}
                    </span>
                  </div>
                </div>

                <span className="w-fit liquid-glass-pill px-3 py-1 rounded-full text-xs font-mono text-[#c8f53c] font-semibold border border-[#c8f53c]/30">
                  {hasStaked ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>

              {/* State Narrative */}
              <div className="p-3.5 sm:p-4 rounded-2xl liquid-glass-subcard border border-white/5 space-y-1 text-xs font-mono">
                <span className="text-[#8e95a2] uppercase tracking-wider text-[10px] block">
                  POSITION STATE DIAGNOSTIC
                </span>
                <p className="text-neutral-200 leading-relaxed">{getStateDescription()}</p>
              </div>

              {/* Position Action Trigger Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                {isConnected ? (
                  <>
                    <LiquidButton
                      variant="kawa"
                      size="xl"
                      onClick={claim}
                      disabled={!hasRewards}
                      className="w-full sm:flex-1 font-mono text-xs uppercase tracking-wider font-bold shadow-xl shadow-[#c8f53c]/20"
                    >
                      <span className="flex items-center justify-center gap-2">
                        CLAIM REWARDS <Sparkles className="w-4 h-4 text-[#c8f53c]" />
                      </span>
                    </LiquidButton>

                    <LiquidButton
                      variant="default"
                      size="xl"
                      onClick={() => setUnstakeModalOpen(true)}
                      disabled={!hasStaked}
                      className="w-full sm:flex-1 font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white"
                    >
                      UNSTAKE LIQUIDITY
                    </LiquidButton>

                    <LiquidButton
                      variant="default"
                      size="xl"
                      href="/stake"
                      className="w-full sm:w-auto px-6 font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white"
                    >
                      + ADD CAPITAL
                    </LiquidButton>
                  </>
                ) : (
                  <LiquidButton
                    size="xl"
                    onClick={() => setWalletModalOpen(true)}
                    className="w-full flex items-center justify-center font-mono uppercase tracking-[0.2em] text-white shadow-xl shadow-black/40"
                  >
                    <span className="flex items-center gap-2 text-xs font-semibold">
                      <Wallet className="w-4 h-4 text-[#c8f53c]" /> CONNECT WALLET TO VIEW POSITION
                    </span>
                  </LiquidButton>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Protocol Invariants */}
        <div className="lg:col-span-4 space-y-6">
          <div className="liquid-glass-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs font-mono">
              <span className="text-white font-bold uppercase tracking-wider">PROTOCOL GUARANTEES</span>
              <ShieldCheck className="w-4 h-4 text-[#c8f53c]" />
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl liquid-glass-subcard border border-white/5 space-y-1">
                <span className="text-[10px] text-[#8e95a2] uppercase block">UNBONDING SCHEDULE</span>
                <span className="text-white font-semibold">Instant (0 Blocks)</span>
                <span className="text-[10px] text-neutral-500 block">No lockup or cooldown periods</span>
              </div>

              <div className="p-3 rounded-xl liquid-glass-subcard border border-white/5 space-y-1">
                <span className="text-[10px] text-[#8e95a2] uppercase block">SETTLEMENT GUARANTEE</span>
                <span className="text-white font-semibold">Micro-cent Execution</span>
                <span className="text-[10px] text-neutral-500 block">Sub-second Robinhood Chain finality</span>
              </div>

              <div className="p-3 rounded-xl liquid-glass-subcard border border-white/5 space-y-1">
                <span className="text-[10px] text-[#8e95a2] uppercase block">SECURITY AUDIT</span>
                <span className="text-[#c8f53c] font-semibold">Synthetix Non-Custodial</span>
                <span className="text-[10px] text-neutral-500 block">OpenZeppelin audited libraries</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction & Unstake Modals */}
      <TransactionModal state={txState} onClose={resetTxState} />
      <WalletConnectModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />

      {/* Exit Pool Unstake Modal */}
      {unstakeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="sg-tier-container max-w-md w-full">
            <div className="sg-tier-underlay-1" />
            <div className="sg-tier-underlay-2" />
            <div className="sg-tier-main p-6 space-y-4">
              <h3 className="font-editorial text-2xl font-bold uppercase text-white">UNSTAKE CAPITAL</h3>
              <p className="text-xs font-mono text-neutral-400">
                Enter USDG amount to unstake. Max balance: {formatTokenAmount(stakedBalance, stakeDecimals, 2)} USDG
              </p>

              <div className="liquid-glass-input rounded-xl p-3 flex items-center justify-between">
                <input
                  type="number"
                  placeholder="0.00"
                  value={unstakeAmount}
                  onChange={(e) => setUnstakeAmount(e.target.value)}
                  className="w-full bg-transparent font-editorial text-2xl text-white outline-none font-bold"
                />
                <LiquidButton
                  type="button"
                  size="sm"
                  onClick={() => setUnstakeAmount(formatTokenAmount(stakedBalance, stakeDecimals, 6))}
                  className="shrink-0 text-[10px] font-mono px-3 py-1"
                >
                  MAX
                </LiquidButton>
              </div>

              <div className="flex gap-3 pt-2">
                <LiquidButton
                  variant="default"
                  size="lg"
                  onClick={() => setUnstakeModalOpen(false)}
                  className="flex-1 font-mono text-xs uppercase"
                >
                  CANCEL
                </LiquidButton>
                <LiquidButton
                  variant="kawa"
                  size="lg"
                  onClick={handleUnstakeSubmit}
                  disabled={!unstakeAmount || parseFloat(unstakeAmount) <= 0}
                  className="flex-1 font-mono text-xs uppercase font-bold"
                >
                  CONFIRM UNSTAKE
                </LiquidButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PositionViewer;
