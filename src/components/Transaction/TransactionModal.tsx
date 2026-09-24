"use client";

import React from "react";
import { TransactionState } from "@/lib/hooks/useLayer5Staking";
import { protocolConfig } from "@/lib/blockchain/config";
import { Layer5Emblem } from "../Brand/Layer5Emblem";
import { ExternalLink, X } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

interface TransactionModalProps {
  state: TransactionState;
  onClose: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ state, onClose }) => {
  if (state.step === "IDLE") return null;

  const isClosable = state.step === "SUCCESS" || state.step === "FAILED";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150 font-sans">
      <div
        className="relative w-full max-w-sm bg-white border border-black/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 text-[#1C1B18]"
        onClick={(e) => e.stopPropagation()}
      >
        {isClosable && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF8F5] border border-black/[0.08] text-[#6B665E] hover:text-[#1C1B18] transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Central Graphic */}
        <div className="flex justify-center pt-2">
          <div className="p-4 bg-[#FAF8F5] border border-black/[0.08] rounded-full shadow-inner">
            <Layer5Emblem
              size={56}
              variant="black"
              animate={state.step === "CONFIRMING" || state.step === "PENDING"}
              state={state.step === "SUCCESS" ? "awakened" : "dormant"}
            />
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-[#1C1B18] font-bold">
            {state.title}
          </h3>
          <p className="text-xs text-[#6B665E] leading-relaxed font-sans max-w-xs mx-auto">
            {state.description}
          </p>
        </div>

        {state.txHash && protocolConfig.explorerUrl && (
          <div className="flex justify-center">
            <a
              href={`${protocolConfig.explorerUrl}/tx/${state.txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              <LiquidButton
                size="sm"
                variant="kawa"
                className="text-xs font-mono uppercase tracking-wider font-medium"
              >
                <span className="flex items-center gap-1.5">
                  EXPLORER <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </LiquidButton>
            </a>
          </div>
        )}

        <div className="pt-2">
          {state.step === "CONFIRMING" && (
            <LiquidButton
              size="default"
              variant="secondary"
              onClick={onClose}
              className="text-sm font-mono uppercase tracking-wider min-h-[44px]"
            >
              CANCEL
            </LiquidButton>
          )}

          {isClosable && (
            <LiquidButton
              variant="default"
              size="xl"
              onClick={onClose}
              className="w-full min-h-[52px] text-sm sm:text-base font-mono uppercase tracking-[0.16em] font-bold shadow-md"
            >
              CLOSE
            </LiquidButton>
          )}
        </div>
      </div>
    </div>
  );
};
