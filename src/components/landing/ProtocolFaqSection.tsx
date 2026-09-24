"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus, Minus, HelpCircle } from "lucide-react";
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
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-8 lg:px-12 bg-[#12190f] border-t border-white/[0.08] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#283615]/[0.35] blur-[170px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#B8F34A] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8F34A]" />
              <span>05 // FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-[-0.03em] uppercase text-[#F4F1E8]">
              PROTOCOL
              <br />
              <span className="text-[#B8F34A]">INTELLIGENCE.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-[#A0AA98] uppercase tracking-widest max-w-sm text-left lg:text-right">
            DETERMINISTIC VERIFICATION // TRANSPARENT DEFI
          </div>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="group transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-6 sm:py-8 flex items-start sm:items-center justify-between gap-6 text-left select-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
                    <span className="font-mono text-xs text-[#A0AA98] tracking-widest uppercase">
                      [{faq.category}]
                    </span>
                    <span
                      className={`font-display font-bold text-lg sm:text-xl md:text-2xl tracking-tight uppercase transition-colors ${
                        isOpen
                          ? "text-[#B8F34A]"
                          : "text-[#F4F1E8] group-hover:text-white"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div className="p-2 rounded-full border border-white/[0.1] group-hover:border-[#B8F34A]/50 shrink-0 text-[#F4F1E8] group-hover:text-[#B8F34A] transition-colors mt-1 sm:mt-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                      <div className="pb-8 pr-6 sm:pr-16 sm:pl-28 font-sans text-sm sm:text-base text-[#A0AA98] leading-relaxed max-w-4xl">
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
        <div className="p-6 sm:p-8 rounded-2xl bg-[#151e12] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-display font-bold text-base text-[#F4F1E8] uppercase">
              Need technical documentation?
            </div>
            <div className="font-sans text-xs sm:text-sm text-[#A0AA98]">
              Read full smart contract architecture, mathematical derivations, and integration guides.
            </div>
          </div>
          <Link
            href="/docs"
            className="px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-[#B8F34A]/50 text-[#F4F1E8] font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 shrink-0"
          >
            <span>OPEN DOCUMENTATION</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B8F34A]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProtocolFaqSection;
