"use client";

import React from "react";
import { protocolConfig } from "@/lib/blockchain/config";
import { AlertTriangle } from "lucide-react";

interface WrongNetworkBannerProps {
  onSwitch: () => void;
}

export const WrongNetworkBanner: React.FC<WrongNetworkBannerProps> = ({ onSwitch }) => {
  return (
    <div className="w-full border border-amber-500/30 bg-[#16140f] px-6 py-4 text-white rounded-2xl shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              WRONG NETWORK
            </div>
            <div className="text-[11px] text-[#8e95a2]">
              Switch your wallet to {protocolConfig.chainName} ({protocolConfig.chainId}) to execute transactions.
            </div>
          </div>
        </div>

        <button
          onClick={onSwitch}
          className="px-6 py-2.5 rounded-full bg-[#c8f53c] text-[#090a0c] font-mono text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#b8e52c] transition duration-200 shrink-0 shadow-md shadow-[#c8f53c]/15"
        >
          SWITCH NETWORK
        </button>
      </div>
    </div>
  );
};
