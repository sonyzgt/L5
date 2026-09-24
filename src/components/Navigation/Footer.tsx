"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layer5Emblem } from "../Brand/Layer5Emblem";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Home page has Scene08FinalCTA with its own monumental bottom closure
  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="w-full border-t border-black/[0.08] bg-[#FAF8F5] py-8 sm:py-12 px-4 sm:px-12 text-xs font-mono text-[#6B665E] mt-auto">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Brand & Editorial Signature */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-3 group">
              <Layer5Emblem size={24} variant="black" animate={false} />
              <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#1C1B18] uppercase group-hover:text-[#283615] transition">
                AEGIS PROTOCOL
              </span>
            </Link>
            <div className="font-cursive text-base text-[#283615] lowercase">
              ~ autonomous liquidity streams on robinhood chain ~
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono uppercase tracking-wider">
            <Link href="/" className="text-[#6B665E] hover:text-[#1C1B18] transition">
              Protocol
            </Link>
            <Link href="/stake" className="text-[#6B665E] hover:text-[#1C1B18] transition">
              Stake
            </Link>
            <Link href="/position" className="text-[#6B665E] hover:text-[#1C1B18] transition">
              Position
            </Link>
            <Link href="/stats" className="text-[#6B665E] hover:text-[#1C1B18] transition">
              Stats
            </Link>
            <Link href="/docs" className="text-[#6B665E] hover:text-[#1C1B18] transition">
              Docs
            </Link>
            <a
              href="https://x.com/layer5dotio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B665E] hover:text-[#1C1B18] transition flex items-center gap-1"
            >
              <span>X (Twitter)</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Metadata & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-black/[0.08] text-[11px]">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#283615] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#283615]" /> Synthetix Non-Custodial Architecture
            </span>
            <span className="text-black/20 hidden sm:inline">•</span>
            <span className="text-[#6B665E]">Robinhood Chain L2</span>
          </div>

          <div className="text-[#6B665E] uppercase tracking-widest font-mono text-[10px]">
            &copy; 2026 AEGIS PROTOCOL • ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
