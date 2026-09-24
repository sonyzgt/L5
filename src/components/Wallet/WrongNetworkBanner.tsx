"use client";

import React from "react";
import { protocolConfig } from "@/lib/blockchain/config";
import { AlertTriangle } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

interface WrongNetworkBannerProps {
  onSwitch: () => void;
}

export const WrongNetworkBanner: React.FC<WrongNetworkBannerProps> = ({ onSwitch }) => {
  return (
    <div className="w-full border border-amber-500/30 bg-white px-6 py-4 text-[#1C1B18] rounded-3xl shadow-sm">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#1C1B18]">
              WRONG NETWORK
            </div>
            <div className="text-[11px] text-[#6B665E]">
              Switch your wallet to {protocolConfig.chainName} ({protocolConfig.chainId}) to execute transactions.
            </div>
          </div>
        </div>

        <LiquidButton
          size="lg"
          variant="kawa"
          onClick={onSwitch}
          className="font-mono text-xs uppercase tracking-[0.15em] font-semibold shrink-0 shadow-lg shadow-black/40"
        >
          SWITCH NETWORK
        </LiquidButton>
      </div>
    </div>
  );
};
