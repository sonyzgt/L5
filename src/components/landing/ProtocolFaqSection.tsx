"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const ProtocolFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: "LIQUIDITY",
      question: "Are there any lockup periods, unbonding delays, or exit penalties?",
      answer:
        "No. Aegis operates with zero artificial lockup epochs. You can deposit USDG and withdraw your full principal at any second. There are no 7-day cooldowns or slashing penalties.",
    },
    {
      category: "ALGORITHM",
      question: "How does the Synthetix O(1) mathematical streaming engine work?",
      answer:
        "Traditional staking iterates through staker lists linearly, causing gas spikes. Aegis uses constant-time O(1) reward per token accumulators. Rewards accrue deterministically per block with minimal computational overhead regardless of protocol participant volume.",
    },
    {
      category: "ASSET SECURITY",
      question: "Is Aegis non-custodial and verified on Robinhood Chain?",
      answer:
        "Yes. The staking contract is completely non-custodial and EVM-native. Only your wallet holds the cryptographic authority to deposit and withdraw collateral. Smart contract bytecode is fully verifiable on the Robinhood Chain explorer.",
    },
    {
      category: "YIELD HARVESTING",
      question: "When and how are Aegis reward tokens distributed?",
      answer:
        "Rewards accrue in real-time with every Robinhood Chain block. You can click 'Claim Rewards' at any time to transfer earned Aegis directly to your wallet without touching your staked USDG principal.",
    },
    {
      category: "NETWORK",
      question: "Why Robinhood Chain L2?",
      answer:
        "Robinhood Chain provides sub-second transaction finality and fractional-cent gas costs. This allows frequent yield compounding, staking, and rebalancing without paying punitive Ethereum Layer 1 gas fees.",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-8 lg:px-12 bg-[#EFECE3] border-t border-black/[0.08] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#E2DDD0]/60 blur-[170px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-black/[0.08] pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#283615] uppercase font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#283615]" />
              <span>05 // FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-[-0.03em] uppercase text-[#1C1B18]">
              PROTOCOL
              <br />
              <span className="text-[#283615]">INTELLIGENCE.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-[#6B665E] uppercase tracking-widest max-w-sm text-left lg:text-right">
            DETERMINISTIC VERIFICATION // TRANSPARENT DEFI
          </div>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="group transition-colors duration-300 hover:bg-black/[0.02]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-6 sm:py-8 flex items-start sm:items-center justify-between gap-6 text-left select-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
                    <span className="font-mono text-xs text-[#6B665E] tracking-widest uppercase">
                      [{faq.category}]
                    </span>
                    <span
                      className={`font-display font-bold text-lg sm:text-xl md:text-2xl tracking-tight uppercase transition-colors ${
                        isOpen
                          ? "text-[#283615]"
                          : "text-[#1C1B18] group-hover:text-black"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div className="p-2 rounded-full border border-black/[0.12] group-hover:border-black/30 shrink-0 text-[#1C1B18] transition-colors mt-1 sm:mt-0">
                    {isOpen ? <Minus className="w-4 h-4 text-[#283615]" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pr-6 sm:pr-16 sm:pl-28 font-sans text-sm sm:text-base text-[#6B665E] leading-relaxed max-w-4xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Support Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-display font-bold text-base text-[#1C1B18] uppercase">
              Need technical documentation?
            </div>
            <div className="font-sans text-xs sm:text-sm text-[#6B665E]">
              Read full smart contract architecture, mathematical derivations, and integration guides.
            </div>
          </div>
          <Link
            href="/docs"
            className="px-6 py-3 rounded-full bg-[#FAF8F5] hover:bg-white border border-black/[0.12] hover:border-black/30 text-[#1C1B18] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 shrink-0 shadow-sm"
          >
            <span>OPEN DOCUMENTATION</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#283615]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProtocolFaqSection;
