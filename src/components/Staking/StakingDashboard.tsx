"use client";

import React, { useState } from "react";
import Image from "next/image";
import { parseUnits } from "viem";
import { useKawaStaking } from "@/lib/hooks/useKawaStaking";
import { formatTokenAmount, formatApy, formatAddress } from "@/lib/utils/formatters";
import { TransactionModal } from "../Transaction/TransactionModal";
import { WrongNetworkBanner } from "../Wallet/WrongNetworkBanner";
import { WalletConnectModal } from "../Wallet/WalletConnectModal";
import { Coins, Sparkles, TrendingUp, Wallet, ArrowDown } from "lucide-react";

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
    calculatedApy,
    isContractConfigured,
    txState,
    resetTxState,
    stake,
    unstake,
    claim,
  } = useKawaStaking();

  const [inputAmount, setInputAmount] = useState<string>("");
  const [unstakeModalOpen, setUnstakeModalOpen] = useState<boolean>(false);
  const [unstakeAmount, setUnstakeAmount] = useState<string>("");
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);

  const hasStaked = isConnected && stakedBalance > 0n;
  const hasRewards = isConnected && pendingRewards > 0n;

  const handleMaxStake = () => {
    setInputAmount(formatTokenAmount(tokenBalance, stakeDecimals, 6));
  };

  const handleMaxUnstake = () => {
    setUnstakeAmount(formatTokenAmount(stakedBalance, stakeDecimals, 6));
  };

  const handleStakeSubmit = async () => {
    if (!inputAmount || parseFloat(inputAmount) <= 0) return;
    await stake(inputAmount);
    setInputAmount("");
  };

  const handleUnstakeSubmit = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) return;
    await unstake(unstakeAmount);
    setUnstakeModalOpen(false);
    setUnstakeAmount("");
  };

  return (
    <div className="w-full space-y-8 font-sans text-left text-white">
      {isWrongNetwork && (
        <div className="mb-4">
          <WrongNetworkBanner onSwitch={switchToRobinhood} />
        </div>
      )}

      {/* Editorial Header */}
      <div className="space-y-2 border-b border-white/10 pb-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#8e95a2] uppercase">
            KAWA PROTOCOL • ROBINHOOD CHAIN
          </span>
          {isConnected && address && (
            <span className="text-[11px] font-mono text-neutral-300 bg-[#16181d] border border-white/10 px-3 py-1 rounded-full">
              {formatAddress(address)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3.5">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-white/20 shadow-lg shadow-[#c8f53c]/10 shrink-0">
            <Image
              src="/usdg-icon.png"
              alt="USDG"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-[0.08em] text-white uppercase font-sans">
            STAKE <span className="text-[#c8f53c] font-normal">USDG</span>
          </h1>
        </div>
        <p className="text-xs sm:text-sm font-mono tracking-[0.05em] text-[#8e95a2] max-w-lg">
          Deposit USDG to earn continuous KAWA token emissions. Network gas is paid in ETH.
        </p>
      </div>

      {/* Primary Staking Card */}
      <div className="border border-white/[0.08] rounded-2xl p-6 sm:p-8 bg-[#121418] space-y-6 shadow-xl">
        {/* User Balance Header */}
        <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-4">
          <span className="text-[#8e95a2] uppercase tracking-wider text-[11px]">
            YOUR USDG BALANCE
          </span>
          <div className="flex items-center gap-2 text-white font-medium">
            <Image
              src="/usdg-icon.png"
              alt="USDG"
              width={16}
              height={16}
              className="rounded-full shrink-0"
            />
            <span>{isConnected ? formatTokenAmount(tokenBalance, stakeDecimals, 2) : "0.00"} USDG</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-[#8e95a2] uppercase tracking-wider block">
            AMOUNT TO STAKE
          </label>
          <div className="border border-white/10 rounded-xl p-4 bg-[#0a0b0d] flex items-center justify-between focus-within:border-[#c8f53c] transition">
            <input
              type="number"
              placeholder="0.00"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              className="w-full bg-transparent font-mono text-2xl sm:text-4xl text-white outline-none placeholder:text-neutral-600 font-light"
            />
            <div className="flex items-center gap-2.5 shrink-0 ml-4 bg-[#14161b] px-3 py-1.5 rounded-xl border border-white/10">
              <Image
                src="/usdg-icon.png"
                alt="USDG"
                width={20}
                height={20}
                className="rounded-full shrink-0"
              />
              <span className="text-xs sm:text-sm font-mono tracking-wider text-white uppercase font-semibold">
                USDG
              </span>
              <button
                type="button"
                onClick={handleMaxStake}
                className="px-2 py-0.5 rounded-md bg-[#1f2229] border border-white/15 text-[11px] font-mono text-[#c8f53c] hover:bg-[#2a2d36] transition font-semibold uppercase ml-1"
              >
                MAX
              </button>
            </div>
          </div>
        </div>

        {/* Rate Parameters Bar */}
        <div className="grid grid-cols-2 gap-4 py-2 text-xs font-mono border-t border-b border-white/10">
          <div className="space-y-1">
            <span className="text-[#8e95a2] uppercase text-[10px] block">REWARD RATE</span>
            <span className="text-white font-medium text-sm">
              {calculatedApy !== undefined ? formatApy(calculatedApy) : "—"}
            </span>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-[#8e95a2] uppercase text-[10px] block">ESTIMATED KAWA REWARDS</span>
            <span className="text-[#c8f53c] font-medium text-sm">
              {calculatedApy !== undefined ? "Continuous Stream" : "— KAWA"}
            </span>
          </div>
        </div>

        {/* Stake Button */}
        {!isConnected ? (
          <button
            onClick={() => setWalletModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-[#c8f53c] text-[#090a0c] text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-[#b8e52c] transition duration-200 shadow-md shadow-[#c8f53c]/20"
          >
            <Wallet className="w-4 h-4" /> CONNECT WALLET TO STAKE
          </button>
        ) : !isContractConfigured ? (
          <button
            disabled
            className="w-full py-4 px-8 rounded-full bg-[#1a1c22] border border-white/10 text-neutral-400 font-mono text-xs tracking-[0.15em] uppercase font-medium cursor-not-allowed"
          >
            STAKING CONTRACT PENDING DEPLOYMENT
          </button>
        ) : (
          <button
            onClick={handleStakeSubmit}
            disabled={!inputAmount || parseFloat(inputAmount) <= 0 || (tokenBalance > 0n && parseUnits(inputAmount || "0", stakeDecimals) > tokenBalance)}
            className="w-full py-4 px-8 rounded-full bg-[#c8f53c] text-[#090a0c] font-mono text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#b8e52c] disabled:opacity-30 disabled:cursor-not-allowed transition duration-200 shadow-lg shadow-[#c8f53c]/20"
          >
            STAKE USDG
          </button>
        )}
      </div>

      {/* Position Section */}
      <div className="border border-white/[0.08] rounded-2xl p-6 sm:p-8 bg-[#121418] space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-mono tracking-[0.15em] text-white uppercase font-medium">
            YOUR POSITION
          </h2>
          <span className="text-[10px] font-mono text-[#8e95a2] uppercase">
            ROBINHOOD CHAIN
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#0a0b0d] border border-white/5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#8e95a2]">STAKED</span>
              <Image
                src="/usdg-icon.png"
                alt="USDG"
                width={16}
                height={16}
                className="rounded-full opacity-80"
              />
            </div>
            <div className="text-2xl sm:text-3xl font-light font-mono text-white flex items-baseline gap-2">
              <span>{isConnected ? formatTokenAmount(stakedBalance, stakeDecimals, 2) : "0.00"}</span>
              <span className="text-xs text-[#8e95a2]">USDG</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0b0d] border border-white/5 space-y-1">
            <div className="text-[10px] font-mono uppercase text-[#8e95a2]">KAWA REWARDS</div>
            <div className="text-2xl sm:text-3xl font-light font-mono text-[#c8f53c]">
              {isConnected ? formatTokenAmount(pendingRewards, 18, 4) : "0.0000"}{" "}
              <span className="text-xs text-[#8e95a2]">KAWA</span>
            </div>
          </div>
        </div>

        {isConnected && (
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setUnstakeModalOpen(true)}
              disabled={!hasStaked}
              className="flex-1 py-3.5 px-6 rounded-full bg-[#16181d] border border-white/15 text-white font-mono text-xs tracking-[0.2em] uppercase font-medium hover:border-white/30 hover:bg-[#1f2229] disabled:opacity-30 disabled:cursor-not-allowed transition duration-200 text-center"
            >
              UNSTAKE USDG
            </button>

            <button
              onClick={claim}
              disabled={!hasRewards}
              className="flex-1 py-3.5 px-6 rounded-full bg-[#c8f53c] text-[#090a0c] font-mono text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#b8e52c] disabled:opacity-30 disabled:cursor-not-allowed transition duration-200 shadow-md shadow-[#c8f53c]/15 text-center"
            >
              CLAIM KAWA
            </button>
          </div>
        )}
      </div>

      {/* Unstake Modal */}
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
                AMOUNT TO UNSTAKE
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
                  onClick={handleMaxUnstake}
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
                CONFIRM
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
