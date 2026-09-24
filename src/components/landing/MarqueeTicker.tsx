"use client";

import React from "react";

interface MarqueeTickerProps {
  reverse?: boolean;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ reverse = false }) => {
  const items = [
    "ROBINHOOD CHAIN L2",
    "USDG STAKING CORE",
    "SYNTHETIX O(1) ENGINE",
    "ZERO LOCKUP EPOCHS",
    "SUB-SECOND FINALITY",
    "NON-CUSTODIAL AUDITED VAULT",
    "INSTANT PRINCIPAL REDEMPTION",
    "PER-BLOCK ACCRETION",
    "AEGIS PROTOCOL",
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.08] bg-[#12190f]/90 backdrop-blur-md py-4 select-none">
      {/* Side gradient masks for smooth edge fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#10170e] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#10170e] to-transparent z-10 pointer-events-none" />

      <div
        className={`flex w-max ${
          reverse ? "animate-marqueeReverse" : "animate-marquee"
        } gap-8 hover:[animation-play-state:paused]`}
      >
        {[...items, ...items].map((text, i) => (
          <div
            key={i}
            className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.22em] text-[#A0AA98] shrink-0"
          >
            <span className="hover:text-[#B8F34A] transition-colors font-medium">
              {text}
            </span>
            <span className="text-[#B8F34A] font-bold text-sm">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeTicker;
