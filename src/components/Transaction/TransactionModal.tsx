"use client";

import React from "react";
import { TransactionState } from "@/lib/hooks/useKawaStaking";
import { protocolConfig } from "@/lib/blockchain/config";
import { KawaEmblem } from "../Brand/KawaEmblem";
import { ExternalLink, X } from "lucide-react";

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
        className="relative w-full max-w-sm bg-[#121418] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {isClosable && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Central Graphic */}
        <div className="flex justify-center pt-2">
          <KawaEmblem
            size={56}
            variant="white"
            animate={state.step === "CONFIRMING" || state.step === "PENDING"}
            state={state.step === "SUCCESS" ? "awakened" : "dormant"}
          />
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
          <a
            href={`${protocolConfig.explorerUrl}/tx/${state.txHash}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 py-2 px-5 rounded-full border border-[#c8f53c]/30 text-xs font-mono text-[#c8f53c] hover:border-[#c8f53c] transition uppercase tracking-wider font-medium"
          >
            EXPLORER <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        <div className="pt-2">
          {state.step === "CONFIRMING" && (
            <button
              onClick={onClose}
              className="text-xs font-mono text-[#8e95a2] hover:text-white transition uppercase tracking-wider"
            >
              CANCEL
            </button>
          )}

          {isClosable && (
            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-full bg-[#c8f53c] text-[#090a0c] text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-[#b8e52c] transition duration-200 shadow-md shadow-[#c8f53c]/15"
            >
              CLOSE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
