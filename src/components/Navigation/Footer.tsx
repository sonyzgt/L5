"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { KawaEmblem } from "../Brand/KawaEmblem";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Home page has Scene05TheEnd with its own interactive bottom colophon
  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#090a0c]/80 backdrop-blur-sm py-8 px-6 sm:px-12 text-xs font-mono text-[#8e95a2] mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <KawaEmblem size={18} variant="white" animate={false} />
          <span className="text-white font-medium tracking-[0.2em] uppercase">KAWA PROTOCOL</span>
          <span className="text-neutral-600">•</span>
          <span className="text-[11px] text-neutral-500">ROBINHOOD CHAIN</span>
        </div>

        {/* Twitter / X link */}
        <div className="flex items-center gap-6">
          <a
            href="https://x.com/kawafiORG"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-neutral-300 hover:text-[#c8f53c] transition duration-200"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="tracking-wider">@kawafiORG</span>
          </a>
        </div>

        {/* Copyright / verification */}
        <div className="text-[10px] text-neutral-500 uppercase tracking-widest">
          &copy; 2026 KAWA • IMMUTABLE
        </div>
      </div>
    </footer>
  );
};
