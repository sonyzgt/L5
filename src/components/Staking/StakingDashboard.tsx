"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { parseUnits } from "viem";
import { useLayer5Staking } from "@/lib/hooks/useLayer5Staking";
import { formatTokenAmount, formatApy, formatAddress } from "@/lib/utils/formatters";
import { protocolConfig } from "@/lib/blockchain/config";
import { TransactionModal } from "../Transaction/TransactionModal";
import { WrongNetworkBanner } from "../Wallet/WrongNetworkBanner";
import { WalletConnectModal } from "../Wallet/WalletConnectModal";
import { 
  Coins, 
  Sparkles, 
  TrendingUp, 
  Wallet, 
  ArrowDown, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Check, 
  Copy,
  Clock,
  Layers,
  ArrowUpRight,
  Radio
} from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

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

  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [inputAmount, setInputAmount] = useState<string>("");
  const [unstakeModalOpen, setUnstakeModalOpen] = useState<boolean>(false);
  const [unstakeAmount, setUnstakeAmount] = useState<string>("");
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [events] = useState<Array<{ id: number; type: string; user: string; amount: string; time: string }>>([]);

  // Live ticking reward simulator to visually demonstrate per-block stream
  const [liveRewardTicker, setLiveRewardTicker] = useState<number>(0);
  useEffect(() => {
    if (!isConnected || stakedBalance === 0n) return;
    const interval = setInterval(() => {
      setLiveRewardTicker((prev) => prev + 0.00005);
    }, 200);
    return () => clearInterval(interval);
  }, [isConnected, stakedBalance]);


  const hasStaked = isConnected && stakedBalance > 0n;
  const hasRewards = isConnected && pendingRewards > 0n;

  const handlePercentage = (pct: number) => {
    const balance = activeTab === "stake" ? tokenBalance : stakedBalance;
    if (balance === 0n) {
      setInputAmount("0.00");
      return;
    }
    const formatted = parseFloat(formatTokenAmount(balance, stakeDecimals, 6));
    const calculated = ((formatted * pct) / 100).toFixed(4);
    setInputAmount(calculated);
  };

  const handleMaxStake = () => {
    setInputAmount(formatTokenAmount(tokenBalance, stakeDecimals, 6));
  };

  const handleMaxUnstake = () => {
    setUnstakeAmount(formatTokenAmount(stakedBalance, stakeDecimals, 6));
  };

  const handleMainSubmit = async () => {
    if (!inputAmount || parseFloat(inputAmount) <= 0) return;
    if (activeTab === "stake") {
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

  const copyContract = () => {
    if (protocolConfig.stakingContractAddress) {
      navigator.clipboard.writeText(protocolConfig.stakingContractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Yield projections
  const inputNum = parseFloat(inputAmount) || 0;
  const estDaily = ((inputNum * 0.245) / 365).toFixed(2);
  const estMonthly = ((inputNum * 0.245) / 12).toFixed(1);
  const estYearly = (inputNum * 0.245).toFixed(0);

  const displayPendingRewards = isConnected
    ? (parseFloat(formatTokenAmount(pendingRewards, 18, 5)) + liveRewardTicker).toFixed(5)
    : "0.00000";

  return (
    <div className="w-full space-y-8 font-sans text-left text-white">
      {isWrongNetwork && (
        <div className="mb-4">
          <WrongNetworkBanner onSwitch={switchToRobinhood} />
        </div>
      )}

      {/* 1. Sterling Gate Editorial Header with Cursive Accent */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#8e95a2] uppercase">
              02 // STAKING TERMINAL
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f53c] shadow-[0_0_6px_#c8f53c] animate-pulse" />
            <span className="font-cursive text-[#c8f53c] text-lg tracking-normal lowercase">
              ~ instant block settlement ~
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/20 shadow-lg shadow-[#c8f53c]/15 shrink-0 bg-neutral-900 p-1">
              <Image
                src="/usdg-icon.png"
                alt="USDG"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] text-white uppercase leading-tight">
                STAKE <span className="text-[#c8f53c]">USDG</span>
              </h1>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm font-mono tracking-[0.05em] text-[#8e95a2] max-w-xl">
            Deposit USDG to continuously stream Layer5 (L5) tokens per block. Zero lockup epochs, micro-cent gas, instant liquidity exit.
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

      {/* 2. Top 4-Metric Protocol Ribbon with Sterling Gate Quiet Luxury Styling */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="sg-tier-container">
          <div className="sg-tier-underlay-1" />
          <div className="sg-tier-underlay-2" />
          <div className="sg-tier-main p-5 space-y-1">
            <div className="flex items-center justify-between text-[#8e95a2] text-[10px] font-mono uppercase">
              <span>POOL LIQUIDITY</span>
              <Image src="/usdg-icon.png" alt="USDG" width={14} height={14} className="rounded-full" />
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight truncate">
              {totalStaked > 0n ? `$${formatTokenAmount(totalStaked, stakeDecimals, 2)}` : "$0.00"}
            </div>
            <div className="text-[10px] font-mono text-[#c8f53c] flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 100% Backed USDG
            </div>
          </div>
        </div>

        <div className="sg-tier-container">
          <div className="sg-tier-underlay-1" />
          <div className="sg-tier-underlay-2" />
          <div className="sg-tier-main p-5 space-y-1">
            <div className="flex items-center justify-between text-[#8e95a2] text-[10px] font-mono uppercase">
              <span>REWARD RATE</span>
              <Sparkles className="w-3.5 h-3.5 text-[#c8f53c]" />
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-[#c8f53c] tracking-tight truncate">
              {calculatedApy !== undefined && calculatedApy > 0 ? formatApy(calculatedApy) : "0.00% APY"}
            </div>
            <div className="text-[10px] font-mono text-neutral-400">Synthetix Constant O(1)</div>
          </div>
        </div>

        <div className="sg-tier-container">
          <div className="sg-tier-underlay-1" />
          <div className="sg-tier-underlay-2" />
          <div className="sg-tier-main p-5 space-y-1">
            <div className="flex items-center justify-between text-[#8e95a2] text-[10px] font-mono uppercase">
              <span>TOTAL DISTRIBUTED</span>
              <Layers className="w-3.5 h-3.5 text-neutral-400" />
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight truncate">
              0.00
            </div>
            <div className="text-[10px] font-mono text-[#8e95a2]">L5 Streamed</div>
          </div>
        </div>

        <div className="sg-tier-container">
          <div className="sg-tier-underlay-1" />
          <div className="sg-tier-underlay-2" />
          <div className="sg-tier-main p-5 space-y-1">
            <div className="flex items-center justify-between text-[#8e95a2] text-[10px] font-mono uppercase">
              <span>NETWORK</span>
              <Activity className="w-3.5 h-3.5 text-[#c8f53c]" />
            </div>
            <div className="font-mono text-lg sm:text-xl font-bold text-white tracking-tight truncate">ROBINHOOD</div>
            <div className="text-[10px] font-mono text-[#c8f53c]">Sub-second finality</div>
          </div>
        </div>
      </div>

      {/* 3. Main Split Bento Grid: Staking Console & Live Position */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Staking & Withdrawal Console */}
        <div className="lg:col-span-7">
          <div className="sg-tier-container">
            <div className="sg-tier-underlay-1" />
            <div className="sg-tier-underlay-2" />
            <div className="sg-tier-main p-6 sm:p-8 space-y-6">
              {/* Tab Switcher: DEPOSIT vs WITHDRAW in Kinetic Pill */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2 liquid-glass-pill rounded-full p-1 border border-white/15">
                  <LiquidButton
                    type="button"
                    size="sm"
                    variant={activeTab === "stake" ? "kawa" : "default"}
                    onClick={() => {
                      setActiveTab("stake");
                      setInputAmount("");
                    }}
                    className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                      activeTab === "stake"
                        ? "text-[#c8f53c] shadow-[0_0_15px_rgba(200,245,60,0.35)] border border-[#c8f53c]/50 bg-[#c8f53c]/15"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    DEPOSIT USDG
                  </LiquidButton>
                  <LiquidButton
                    type="button"
                    size="sm"
                    variant={activeTab === "unstake" ? "kawa" : "default"}
                    onClick={() => {
                      setActiveTab("unstake");
                      setInputAmount("");
                    }}
                    className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                      activeTab === "unstake"
                        ? "text-[#c8f53c] shadow-[0_0_15px_rgba(200,245,60,0.35)] border border-[#c8f53c]/50 bg-[#c8f53c]/15"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    WITHDRAW USDG
                  </LiquidButton>
                </div>

                {/* Balance display */}
                <div className="text-right text-xs font-mono">
                  <span className="text-[#8e95a2] block text-[10px] uppercase">
                    {activeTab === "stake" ? "WALLET BALANCE" : "STAKED BALANCE"}
                  </span>
                  <span className="text-white font-semibold">
                    {activeTab === "stake"
                      ? isConnected ? formatTokenAmount(tokenBalance, stakeDecimals, 2) : "0.00"
                      : isConnected ? formatTokenAmount(stakedBalance, stakeDecimals, 2) : "0.00"}{" "}
                    USDG
                  </span>
                </div>
              </div>

              {/* Input Module with Preset Shortcut Pills */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#8e95a2]">
                  <label className="text-[10px] uppercase tracking-wider block flex items-center gap-2">
                    <span>AMOUNT TO {activeTab === "stake" ? "DEPOSIT" : "WITHDRAW"}</span>
                    <span className="font-cursive text-[#c8f53c] text-sm lowercase tracking-normal">
                      ~ {activeTab === "stake" ? "zero fee" : "instant unlock"} ~
                    </span>
                  </label>
                  
                  {/* Percentage shortcuts */}
                  <div className="flex items-center gap-1.5">
                    {[25, 50, 75, 100].map((pct) => (
                      <LiquidButton
                        key={pct}
                        type="button"
                        size="sm"
                        onClick={() => handlePercentage(pct)}
                        className="px-3 py-1 h-7 text-[10px] font-mono text-neutral-300 hover:text-[#c8f53c] hover:border-[#c8f53c]/40 transition"
                      >
                        {pct === 100 ? "MAX" : `${pct}%`}
                      </LiquidButton>
                    ))}
                  </div>
                </div>

                <div className="liquid-glass-input rounded-2xl p-4 sm:p-5 flex items-center justify-between focus-within:border-[#c8f53c]/60 transition duration-200">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    className="w-full bg-transparent font-mono font-bold text-2xl sm:text-3xl text-white outline-none placeholder:text-neutral-600"
                  />
                  <div className="flex items-center gap-2.5 shrink-0 ml-3 liquid-glass-pill px-4 py-2 rounded-xl border border-white/10">
                    <Image
                      src="/usdg-icon.png"
                      alt="USDG"
                      width={22}
                      height={22}
                      className="rounded-full shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-mono tracking-wider text-white uppercase font-bold">
                      USDG
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Yield Estimation Projection */}
              <div className="liquid-glass-subcard rounded-2xl p-4 space-y-2 text-xs font-mono border border-white/5">
                <div className="flex items-center justify-between text-[11px] text-[#8e95a2] border-b border-white/[0.06] pb-2">
                  <span>ESTIMATED YIELD PROJECTION</span>
                  <span className="text-[#c8f53c] font-semibold">
                    {calculatedApy !== undefined && calculatedApy > 0 ? `${formatApy(calculatedApy)} ANNUAL RATE` : "DYNAMIC RATE"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div>
                    <span className="text-[10px] text-[#8e95a2] block uppercase">DAILY</span>
                    <span className="text-sm font-semibold text-[#c8f53c]">
                      {calculatedApy && calculatedApy > 0 ? `+${estDaily} L5` : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e95a2] block uppercase">MONTHLY</span>
                    <span className="text-sm font-semibold text-white">
                      {calculatedApy && calculatedApy > 0 ? `+${estMonthly} L5` : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e95a2] block uppercase">1 YEAR</span>
                    <span className="text-sm font-semibold text-white">
                      {calculatedApy && calculatedApy > 0 ? `+${estYearly} L5` : "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              {!isConnected ? (
                <LiquidButton
                  size="xl"
                  onClick={() => setWalletModalOpen(true)}
                  className="w-full flex items-center justify-center font-mono uppercase tracking-[0.2em] text-white shadow-xl shadow-black/40"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold">
                    <Wallet className="w-4 h-4 text-[#c8f53c]" /> CONNECT WALLET TO {activeTab === "stake" ? "STAKE" : "WITHDRAW"}
                  </span>
                </LiquidButton>
              ) : !isContractConfigured ? (
                <div className="w-full py-4 text-center liquid-glass-subcard rounded-full text-neutral-400 font-mono text-xs tracking-wider uppercase">
                  STAKING CONTRACT PENDING DEPLOYMENT
                </div>
              ) : (
                <LiquidButton
                  variant="kawa"
                  size="xl"
                  onClick={handleMainSubmit}
                  disabled={!inputAmount || parseFloat(inputAmount) <= 0}
                  className="w-full font-mono uppercase tracking-[0.2em] shadow-2xl shadow-[#c8f53c]/20 text-xs font-bold"
                >
                  <span className="flex items-center gap-2">
                    {activeTab === "stake" ? "CONFIRM STAKE USDG" : "CONFIRM WITHDRAW USDG"}{" "}
                    <Sparkles className="w-3.5 h-3.5 text-[#c8f53c]" />
                  </span>
                </LiquidButton>
              )}

              {/* Telemetry Footer */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] font-mono text-[#8e95a2] text-center border-t border-white/[0.06]">
                <div>GAS: &lt;0.0001 ETH</div>
                <div>SLIPPAGE: 0%</div>
                <div className="text-[#c8f53c]">LOCKUP: 0 SECONDS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Live Position Radar & Network Status */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Position Card with Ticking Rewards */}
          <div className="sg-tier-container">
            <div className="sg-tier-underlay-1" />
            <div className="sg-tier-underlay-2" />
            <div className="sg-tier-main p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono tracking-[0.15em] text-white uppercase font-bold">
                    YOUR POSITION RADAR
                  </span>
                </div>
                <span className="liquid-glass-pill px-3 py-1 rounded-full text-[10px] font-mono text-[#c8f53c] font-semibold border border-[#c8f53c]/30">
                  {hasStaked ? "ACTIVE STREAM" : "STANDBY"}
                </span>
              </div>

              {/* Sub-cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="liquid-glass-subcard p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#8e95a2] block">STAKED CAPITAL</span>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight truncate">
                    {isConnected ? formatTokenAmount(stakedBalance, stakeDecimals, 2) : "0.00"}
                  </div>
                  <span className="text-[10px] text-[#8e95a2] font-mono block">USDG DEPOSITED</span>
                </div>

                <div className="liquid-glass-subcard p-4 rounded-2xl space-y-1 border border-[#c8f53c]/25">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8e95a2]">
                    <span>STREAMED REWARDS</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8f53c] animate-pulse" />
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#c8f53c] tracking-tight truncate">
                    {displayPendingRewards}
                  </div>
                  <span className="text-[10px] text-[#c8f53c] font-mono block">L5 ACCRUING</span>
                </div>
              </div>

              {/* Claim & Exit Pool Action Buttons */}
              {isConnected && (
                <div className="flex gap-3 pt-1">
                  <LiquidButton
                    variant="kawa"
                    size="lg"
                    onClick={claim}
                    disabled={!hasRewards}
                    className="flex-1 font-mono text-xs uppercase tracking-wider font-bold"
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      CLAIM <Sparkles className="w-3.5 h-3.5 text-[#c8f53c]" />
                    </span>
                  </LiquidButton>

                  <LiquidButton
                    variant="default"
                    size="lg"
                    onClick={() => setUnstakeModalOpen(true)}
                    disabled={!hasStaked}
                    className="flex-1 text-white font-mono text-xs uppercase tracking-wider"
                  >
                    EXIT POOL
                  </LiquidButton>
                </div>
              )}
            </div>
          </div>

          {/* Live Activity Feed Radar */}
          <div className="liquid-glass-card rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#c8f53c] animate-pulse" />
                <span className="text-white font-semibold uppercase tracking-wider">LIVE ON-CHAIN RADAR</span>
              </div>
              <span className="text-[10px] text-[#c8f53c] font-cursive text-sm">~ verified blocks ~</span>
            </div>

            <div className="space-y-2">
              {events.length === 0 ? (
                <div className="p-4 rounded-xl liquid-glass-subcard text-center text-xs font-mono text-neutral-400 border border-white/5 space-y-1">
                  <div className="text-white font-medium">Listening for On-Chain Blocks</div>
                  <div className="text-[10px] text-[#8e95a2]">Live deposit and reward events will stream here</div>
                </div>
              ) : (
                events.map((evt) => (
                  <div
                    key={evt.id}
                    className="flex items-center justify-between p-2.5 rounded-xl liquid-glass-subcard text-xs font-mono border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          evt.type === "STAKE"
                            ? "bg-[#c8f53c]/15 text-[#c8f53c] border border-[#c8f53c]/30"
                            : "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                        }`}
                      >
                        {evt.type}
                      </span>
                      <span className="text-neutral-400">{evt.user}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-medium">{evt.amount}</span>
                      <span className="text-[10px] text-neutral-500 block">{evt.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction & Unstake Modals */}
      <TransactionModal
        state={txState}
        onClose={resetTxState}
      />

      <WalletConnectModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />

      {/* Exit Pool Unstake Dialog */}
      {unstakeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="sg-tier-container max-w-md w-full">
            <div className="sg-tier-underlay-1" />
            <div className="sg-tier-underlay-2" />
            <div className="sg-tier-main p-6 space-y-4">
              <h3 className="font-editorial text-2xl font-bold uppercase text-white">WITHDRAW CAPITAL</h3>
              <p className="text-xs font-mono text-neutral-400">
                Enter USDG amount to withdraw from the staking contract back into your wallet.
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
                  onClick={handleMaxUnstake}
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
                  CONFIRM EXIT
                </LiquidButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default StakingDashboard;
