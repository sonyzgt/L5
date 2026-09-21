"use client";

import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect, useBalance, useReadContract } from "wagmi";
import { formatAddress, formatTokenAmount } from "@/lib/utils/formatters";
import { protocolConfig } from "@/lib/blockchain/config";
import { erc20Abi } from "@/lib/contracts/erc20Abi";
import { KawaEmblem } from "../Brand/KawaEmblem";
import { X, ExternalLink, Copy, Check, Fuel } from "lucide-react";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ isOpen, onClose }) => {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  // Native ETH balance (Network Gas)
  const { data: ethBalanceData } = useBalance({ address });

  // USDG Token balance (Staking Asset)
  const { data: usdgBalanceRaw } = useReadContract({
    address: protocolConfig.stakeTokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(protocolConfig.stakeTokenAddress && address),
    },
  });

  // KAWA Token balance (Reward Asset)
  const { data: kawaBalanceRaw } = useReadContract({
    address: protocolConfig.rewardTokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(protocolConfig.rewardTokenAddress && address),
    },
  });

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const usdgFormatted = usdgBalanceRaw
    ? formatTokenAmount(BigInt(usdgBalanceRaw.toString()), 6, 2)
    : "0.00";

  const kawaFormatted = kawaBalanceRaw
    ? formatTokenAmount(BigInt(kawaBalanceRaw.toString()), 18, 2)
    : "0.00";

  const ethFormatted = ethBalanceData
    ? formatTokenAmount(ethBalanceData.value, ethBalanceData.decimals, 4)
    : "0.0000";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150 font-sans">
      <div
        className="relative w-full max-w-md bg-[#121418] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden space-y-6 text-left text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div>
              <KawaEmblem size={20} variant="white" animate={false} />
            </div>
            <span className="text-xs font-mono tracking-[0.25em] text-white uppercase font-semibold">
              {isConnected ? "CONNECTED WALLET" : "CONNECT PROTOCOL"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isConnected ? (
          <div className="space-y-6">
            {/* Account Info */}
            <div className="border border-white/10 rounded-xl p-4 divide-y divide-white/5 font-mono text-xs bg-[#0c0d10] space-y-2">
              <div className="pb-2.5 flex items-center justify-between">
                <span className="text-[#8e95a2] uppercase tracking-wider">ADDRESS</span>
                <div className="flex items-center gap-2 text-white font-medium">
                  <span>{formatAddress(address)}</span>
                  <button
                    onClick={handleCopy}
                    className="p-0.5 text-neutral-400 hover:text-[#c8f53c] transition"
                    title="Copy Address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#c8f53c]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#8e95a2] uppercase tracking-wider">NETWORK</span>
                <span className="text-neutral-200">
                  {chain?.name || protocolConfig.chainName}
                </span>
              </div>

              {/* USDG Staking Asset Balance */}
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#8e95a2] uppercase tracking-wider">USDG (STAKE ASSET)</span>
                <span className="text-white font-medium">
                  {usdgFormatted} USDG
                </span>
              </div>

              {/* KAWA Reward Asset Balance */}
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#8e95a2] uppercase tracking-wider">KAWA (REWARDS)</span>
                <span className="text-[#c8f53c] font-medium">
                  {kawaFormatted} KAWA
                </span>
              </div>

              {/* Native Gas Fee Asset */}
              <div className="pt-2.5 flex items-center justify-between">
                <span className="text-[#8e95a2] uppercase tracking-wider flex items-center gap-1">
                  <Fuel className="w-3 h-3 opacity-60" /> GAS (ETH)
                </span>
                <span className="text-neutral-300 font-medium">
                  {ethFormatted} ETH
                </span>
              </div>
            </div>

            {/* Pill Buttons */}
            <div className="flex gap-3">
              {protocolConfig.explorerUrl && address && (
                <a
                  href={`${protocolConfig.explorerUrl}/address/${address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-white/20 text-xs font-mono text-white hover:border-white transition uppercase tracking-wider font-medium"
                >
                  EXPLORER <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => {
                  disconnect();
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-full bg-[#1a1c22] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:bg-[#252830] transition uppercase tracking-wider font-medium"
              >
                DISCONNECT
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-[#8e95a2] font-mono leading-relaxed">
              Connect an authorized EVM wallet to deposit USDG and harvest KAWA rewards on Robinhood Chain.
            </p>

            <div className="space-y-2 pt-1">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  disabled={isPending}
                  onClick={() => {
                    connect({ connector });
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-[#181a20] transition group text-left"
                >
                  <span className="text-xs font-mono tracking-widest text-white uppercase font-medium">
                    {connector.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#8e95a2] group-hover:text-[#c8f53c] transition">
                    &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
