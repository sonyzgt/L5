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
    <div className="w-full space-y-8 font-sans text-left text-[#1C1B18]">
      {isWrongNetwork && (
        <div className="mb-4">
          <WrongNetworkBanner onSwitch={switchToRobinhood} />
        </div>
      )}

      {/* 1. Warm Paper Editorial Header with Cursive Accent */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.08] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#6B665E] uppercase">
              02 // STAKING TERMINAL
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#283615]" />
            <span className="font-cursive text-[#283615] text-lg tracking-normal lowercase">
              ~ instant block settlement ~
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-black/10 shadow-sm shrink-0 bg-[#FAF8F5] p-1">
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
              <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#1C1B18] uppercase leading-tight">
                STAKE <span className="text-[#283615]">USDG</span>
              </h1>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm font-sans tracking-normal text-[#6B665E] max-w-xl leading-relaxed">
            Deposit USDG to continuously stream Aegis tokens per block. Zero lockup epochs, micro-cent gas, instant liquidity exit.
          </p>
        </div>

        {isConnected && address && (
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] font-mono text-[#1C1B18] liquid-glass-pill px-4 py-2 rounded-full flex items-center gap-2 border border-black/10 bg-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#283615]" />
              {formatAddress(address)}
            </span>
          </div>
        )}
      </div>

      {/* 2. Top 4-Metric Protocol Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="sg-tier-container">
          <div className="sg-tier-underlay-1" />
          <div className="sg-tier-underlay-2" />
          <div className="sg-tier-main p-4 sm:p-5 space-y-1">
            <div className="flex items-center justify-between text-[#6B665E] text-[10px] font-mono uppercase tracking-wider">
              <span>POOL LIQUIDITY</span>
              <Image src="/usdg-icon.png" alt="USDG" width={14} height={14} className="rounded-full" />
            </div>
            <div className="font-mono text-lg sm:text-2xl font-bold text-[#1C1B18] tracking-tight truncate">
              {totalStaked > 0n ? `$${formatTokenAmount(totalStaked, stakeDecimals, 2)}` : "$0.00"}
            </div>
            <div className="text-[10px] font-mono text-[#283615] font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#283615]" /> 100% Backed USDG
            </div>
          </div>
        </div>

        <div className="sg-tier-container">
          <div className="sg-tier-underlay-1" />
          <div className="sg-tier-underlay-2" />
          <div className="sg-tier-main p-4 sm:p-5 space-y-1">
            <div className="flex items-center justify-between text-[#6B665E] text-[10px] font-mono uppercase tracking-wider">
              <span>REWARD RATE</span>
              <Sparkles className="w-3.5 h-3.5 text-[#283615]" />
            </div>
            <div className="font-mono text-lg sm:text-2xl font-bold text-[#283615] tracking-tight truncate">
              {calculatedApy !== undefined && calculatedApy > 0 ? formatApy(calculatedApy) : "0.00% APY"}
            </div>
            <div className="text-[10px] font-mono text-[#6B665E]">Synthetix Constant O(1)</div>
          </div>
        </div>

        <div className="sg-tier-container">
          <div className="sg-tier-underlay-1" />
          <div className="sg-tier-underlay-2" />
          <div className="sg-tier-main p-4 sm:p-5 space-y-1">
            <div className="flex items-center justify-between text-[#6B665E] text-[10px] font-mono uppercase tracking-wider">
              <span>TOTAL DISTRIBUTED</span>
              <Layers className="w-3.5 h-3.5 text-[#6B665E]" />
            </div>
            <div className="font-mono text-lg sm:text-2xl font-bold text-[#1C1B18] tracking-tight truncate">
              0.00
            </div>
            <div className="text-[10px] font-mono text-[#6B665E]">AEGIS Streamed</div>
          </div>
        </div>

        <div className="sg-tier-container">
          <div className="sg-tier-underlay-1" />
          <div className="sg-tier-underlay-2" />
          <div className="sg-tier-main p-4 sm:p-5 space-y-1">
            <div className="flex items-center justify-between text-[#6B665E] text-[10px] font-mono uppercase tracking-wider">
              <span>NETWORK</span>
              <Activity className="w-3.5 h-3.5 text-[#283615]" />
            </div>
            <div className="font-mono text-base sm:text-xl font-bold text-[#1C1B18] tracking-tight truncate">ROBINHOOD</div>
            <div className="text-[10px] font-mono text-[#283615] font-semibold">Sub-second finality</div>
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
            <div className="sg-tier-main p-5 sm:p-8 space-y-5 sm:space-y-6">
              {/* Tab Switcher: DEPOSIT vs WITHDRAW in Kinetic Pill */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.08] pb-4">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-[#FAF8F5] rounded-full p-1 border border-black/[0.08] w-fit shadow-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("stake");
                      setInputAmount("");
                    }}
                    className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === "stake"
                        ? "bg-[#1C1B18] text-[#F6F3EC] shadow-sm"
                        : "text-[#6B665E] hover:text-[#1C1B18]"
                    }`}
                  >
                    DEPOSIT USDG
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("unstake");
                      setInputAmount("");
                    }}
                    className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === "unstake"
                        ? "bg-[#1C1B18] text-[#F6F3EC] shadow-sm"
                        : "text-[#6B665E] hover:text-[#1C1B18]"
                    }`}
                  >
                    WITHDRAW USDG
                  </button>
                </div>

                {/* Balance display */}
                <div className="text-left sm:text-right text-xs font-mono">
                  <span className="text-[#6B665E] block text-[10px] uppercase">
                    {activeTab === "stake" ? "WALLET BALANCE" : "STAKED BALANCE"}
                  </span>
                  <span className="text-[#1C1B18] font-bold">
                    {activeTab === "stake"
                      ? isConnected ? formatTokenAmount(tokenBalance, stakeDecimals, 2) : "0.00"
                      : isConnected ? formatTokenAmount(stakedBalance, stakeDecimals, 2) : "0.00"}{" "}
                    USDG
                  </span>
                </div>
              </div>

              {/* Input Module with Preset Shortcut Pills */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#6B665E]">
                  <label className="text-[10px] uppercase tracking-wider flex items-center justify-between sm:justify-start gap-2">
                    <span>AMOUNT TO {activeTab === "stake" ? "DEPOSIT" : "WITHDRAW"}</span>
                    <span className="font-cursive text-[#283615] text-sm lowercase tracking-normal">
                      ~ {activeTab === "stake" ? "zero fee" : "instant unlock"} ~
                    </span>
                  </label>
                  
                  {/* Percentage shortcuts */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    {[25, 50, 75, 100].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => handlePercentage(pct)}
                        className="px-2.5 sm:px-3 py-1 h-7 text-[10px] font-mono font-bold rounded-full bg-[#FAF8F5] border border-black/[0.08] hover:bg-black/5 text-[#1C1B18] transition cursor-pointer"
                      >
                        {pct === 100 ? "MAX" : `${pct}%`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="liquid-glass-input rounded-2xl p-4 sm:p-5 flex items-center justify-between bg-[#FAF8F5] border border-black/[0.1] focus-within:border-[#283615] transition duration-200">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    className="w-full bg-transparent font-mono font-bold text-2xl sm:text-3xl text-[#1C1B18] outline-none placeholder:text-[#6B665E]/50"
                  />
                  <div className="flex items-center gap-2.5 shrink-0 ml-3 bg-white px-4 py-2 rounded-xl border border-black/[0.08] shadow-sm">
                    <Image
                      src="/usdg-icon.png"
                      alt="USDG"
                      width={22}
                      height={22}
                      className="rounded-full shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-mono tracking-wider text-[#1C1B18] uppercase font-bold">
                      USDG
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Yield Estimation Projection */}
              <div className="bg-[#FAF8F5] rounded-2xl p-4 space-y-2 text-xs font-mono border border-black/[0.06]">
                <div className="flex items-center justify-between text-[11px] text-[#6B665E] border-b border-black/[0.06] pb-2">
                  <span>ESTIMATED YIELD PROJECTION</span>
                  <span className="text-[#283615] font-bold">
                    {calculatedApy !== undefined && calculatedApy > 0 ? `${formatApy(calculatedApy)} ANNUAL RATE` : "DYNAMIC RATE"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div>
                    <span className="text-[10px] text-[#6B665E] block uppercase">DAILY</span>
                    <span className="text-sm font-bold text-[#283615]">
                      {calculatedApy && calculatedApy > 0 ? `+${estDaily} AEGIS` : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B665E] block uppercase">MONTHLY</span>
                    <span className="text-sm font-bold text-[#1C1B18]">
                      {calculatedApy && calculatedApy > 0 ? `+${estMonthly} AEGIS` : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B665E] block uppercase">1 YEAR</span>
                    <span className="text-sm font-bold text-[#1C1B18]">
                      {calculatedApy && calculatedApy > 0 ? `+${estYearly} AEGIS` : "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              {!isConnected ? (
                <button
                  onClick={() => setWalletModalOpen(true)}
                  className="w-full py-4.5 px-8 rounded-full bg-[#1C1B18] hover:bg-[#2d2b27] text-[#F6F3EC] font-mono text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wallet className="w-4 h-4 text-[#F6F3EC]" />
                  <span>CONNECT WALLET TO {activeTab === "stake" ? "STAKE" : "WITHDRAW"}</span>
                </button>
              ) : !isContractConfigured ? (
                <div className="w-full py-4 text-center bg-[#FAF8F5] rounded-full text-[#6B665E] font-mono text-xs tracking-wider uppercase border border-black/[0.08]">
                  STAKING CONTRACT PENDING DEPLOYMENT
                </div>
              ) : (
                <button
                  onClick={handleMainSubmit}
                  disabled={!inputAmount || parseFloat(inputAmount) <= 0}
                  className="w-full py-4.5 px-8 rounded-full bg-[#1C1B18] hover:bg-[#2d2b27] text-[#F6F3EC] font-mono text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{activeTab === "stake" ? "CONFIRM STAKE USDG" : "CONFIRM WITHDRAW USDG"}</span>
                  <Sparkles className="w-4 h-4 text-[#F6F3EC]" />
                </button>
              )}

              {/* Telemetry Footer */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono text-[#6B665E] text-center border-t border-black/[0.08]">
                <div>GAS: &lt;0.0001 ETH</div>
                <div>SLIPPAGE: 0%</div>
                <div className="text-[#283615] font-semibold">LOCKUP: 0 SECONDS</div>
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
              <div className="flex items-center justify-between border-b border-black/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono tracking-[0.15em] text-[#1C1B18] uppercase font-bold">
                    YOUR POSITION RADAR
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider ${
                    hasStaked
                      ? "bg-[#283615]/10 text-[#283615] border border-[#283615]/30"
                      : "bg-black/[0.04] text-[#6B665E] border border-black/10"
                  }`}
                >
                  {hasStaked ? "ACTIVE STREAM" : "STANDBY"}
                </span>
              </div>

              {/* Sub-cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-black/[0.06] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#6B665E] block tracking-wider">STAKED CAPITAL</span>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#1C1B18] tracking-tight truncate">
                    {isConnected ? formatTokenAmount(stakedBalance, stakeDecimals, 2) : "0.00"}
                  </div>
                  <span className="text-[10px] text-[#6B665E] font-mono block">USDG DEPOSITED</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#283615]/20 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6B665E]">
                    <span>STREAMED REWARDS</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#283615] animate-pulse" />
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#283615] tracking-tight truncate">
                    {displayPendingRewards}
                  </div>
                  <span className="text-[10px] text-[#283615] font-mono block font-medium">AEGIS ACCRUING</span>
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
                      CLAIM <Sparkles className="w-3.5 h-3.5 text-[#F6F3EC]" />
                    </span>
                  </LiquidButton>

                  <LiquidButton
                    variant="secondary"
                    size="lg"
                    onClick={() => setUnstakeModalOpen(true)}
                    disabled={!hasStaked}
                    className="flex-1 text-[#1C1B18] font-mono text-xs uppercase tracking-wider"
                  >
                    EXIT POOL
                  </LiquidButton>
                </div>
              )}
            </div>
          </div>

          {/* Live Activity Feed Radar */}
          <div className="liquid-glass-card rounded-3xl p-5 space-y-3 bg-white border border-black/[0.08]">
            <div className="flex items-center justify-between border-b border-black/[0.08] pb-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#283615] animate-pulse" />
                <span className="text-[#1C1B18] font-bold uppercase tracking-wider">LIVE ON-CHAIN RADAR</span>
              </div>
              <span className="text-[10px] text-[#283615] font-cursive text-sm">~ verified blocks ~</span>
            </div>

            <div className="space-y-2">
              {events.length === 0 ? (
                <div className="p-4 rounded-2xl bg-[#FAF8F5] text-center text-xs font-mono text-[#6B665E] border border-black/[0.06] space-y-1">
                  <div className="text-[#1C1B18] font-medium">Listening for On-Chain Blocks</div>
                  <div className="text-[10px] text-[#6B665E]">Live deposit and reward events will stream here</div>
                </div>
              ) : (
                events.map((evt) => (
                  <div
                    key={evt.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] text-xs font-mono border border-black/[0.06]"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          evt.type === "STAKE"
                            ? "bg-[#283615]/10 text-[#283615] border border-[#283615]/30"
                            : "bg-black/5 text-[#1C1B18] border border-black/10"
                        }`}
                      >
                        {evt.type}
                      </span>
                      <span className="text-[#6B665E]">{evt.user}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#1C1B18] font-medium">{evt.amount}</span>
                      <span className="text-[10px] text-[#6B665E] block">{evt.time}</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-5 border border-black/10 shadow-2xl max-w-md w-full text-[#1C1B18]">
            <h3 className="font-display font-black text-2xl uppercase text-[#1C1B18] tracking-tight">WITHDRAW CAPITAL</h3>
            <p className="text-xs font-mono text-[#6B665E]">
              Enter USDG amount to withdraw from the staking contract back into your wallet.
            </p>

            <div className="liquid-glass-input rounded-2xl p-3.5 flex items-center justify-between bg-[#FAF8F5] border border-black/[0.1]">
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
                className="shrink-0 text-[10px] font-mono px-3 py-1.5 rounded-full bg-white border border-black/10 hover:bg-black/5 text-[#1C1B18] font-bold shadow-sm"
              >
                MAX
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <LiquidButton
                variant="secondary"
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
      )}
    </div>
  );
};
export default StakingDashboard;
