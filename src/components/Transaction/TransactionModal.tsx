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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150 font-sans">
      <div
        className="relative w-full max-w-sm liquid-glass-modal rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {isClosable && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full liquid-glass-pill text-neutral-400 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Central Graphic */}
        <div className="flex justify-center pt-2">
          <div className="p-4 liquid-glass-subcard rounded-full shadow-inner">
            <Layer5Emblem
              size={56}
              variant="white"
              animate={state.step === "CONFIRMING" || state.step === "PENDING"}
              state={state.step === "SUCCESS" ? "awakened" : "dormant"}
            />
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-white font-semibold">
            {state.title}
          </h3>
          <p className="text-xs text-[#8e95a2] leading-relaxed font-sans max-w-xs mx-auto">
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
              size="sm"
              onClick={onClose}
              className="text-xs font-mono text-neutral-400 hover:text-white uppercase tracking-wider"
            >
              CANCEL
            </LiquidButton>
          )}

          {isClosable && (
            <LiquidButton
              variant="kawa"
              size="xl"
              onClick={onClose}
              className="w-full text-xs font-mono uppercase tracking-[0.2em] font-semibold shadow-xl shadow-black/40"
            >
              CLOSE
            </LiquidButton>
          )}
        </div>
      </div>
    </div>
  );
};
