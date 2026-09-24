"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { Layer5Emblem } from "@/components/Brand/Layer5Emblem";
import { formatAddress } from "@/lib/utils/formatters";
import { protocolConfig } from "@/lib/blockchain/config";
import { WalletConnectModal } from "@/components/Wallet/WalletConnectModal";
import { ArrowUpRight, ShieldCheck, Wallet } from "lucide-react";

export const LandingNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const pathname = usePathname();

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scroll when fullscreen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { num: "01", label: "HOME", href: "/" },
    { num: "02", label: "STAKE", href: "/stake" },
    { num: "03", label: "POSITION", href: "/position" },
    { num: "04", label: "STATS", href: "/stats" },
    { num: "05", label: "DOCS", href: "/docs" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none px-4 sm:px-8 lg:px-12 ${
          isScrolled ? "py-3 sm:py-4" : "py-6 sm:py-8"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-500 ${
            isScrolled
              ? "bg-[#050706]/85 backdrop-blur-xl px-5 sm:px-7 py-3 rounded-full border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
              : "bg-transparent px-2 py-1"
          }`}
        >
          {/* Brand Logo & Chain Tag */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3.5 group select-none cursor-pointer"
          >
            <div className="transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
              <Layer5Emblem size={30} variant="white" animate={false} />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-sm sm:text-base font-extrabold tracking-[-0.02em] text-[#F5F7F2] uppercase leading-none">
                Layer5
              </span>
              <span className="text-[8px] font-mono tracking-[0.25em] text-[#9AA09A] uppercase pt-1 leading-none">
                ROBINHOOD CHAIN
              </span>
            </div>
          </Link>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Functional Connect Wallet Button */}
            {isConnected && address ? (
              <button
                type="button"
                onClick={() => {
                  if (openAccountModal) {
                    openAccountModal();
                  } else {
                    setWalletModalOpen(true);
                  }
                }}
                className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-[#C7FF28]/60 transition-all duration-300 font-mono text-[11px] sm:text-xs text-[#F5F7F2] shadow-sm select-none cursor-pointer"
                title="Account Settings"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7FF28] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C7FF28]" />
                </span>
                <span className="font-semibold tracking-wider group-hover:text-[#C7FF28] transition-colors">
                  {formatAddress(address)}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (openConnectModal) {
                    openConnectModal();
                  } else {
                    setWalletModalOpen(true);
                  }
                }}
                className="group relative flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-full bg-[#C7FF28] hover:bg-[#d5fa5b] text-[#050706] font-display text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 shadow-[0_0_24px_rgba(199,255,40,0.25)] hover:shadow-[0_0_32px_rgba(199,255,40,0.45)] hover:scale-[1.02] active:scale-[0.98] select-none cursor-pointer"
                title="Connect Web3 Wallet"
              >
                <Wallet className="w-3.5 h-3.5 text-[#050706]" />
                <span>
                  <span className="hidden sm:inline">CONNECT </span>WALLET
                </span>
              </button>
            )}

            {/* Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="group flex items-center gap-2 px-3.5 sm:px-4.5 py-2 rounded-full bg-[#080B09]/90 hover:bg-[#121614] border border-white/[0.12] hover:border-[#C7FF28]/50 text-[#F5F7F2] font-mono text-xs uppercase tracking-widest transition-all duration-300 select-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <span className="text-[11px] font-bold">
                {isOpen ? "CLOSE" : "MENU"}
              </span>
              <span className="text-sm font-light text-[#C7FF28] transition-transform duration-300 group-hover:rotate-90">
                {isOpen ? "×" : "+"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Dark Editorial Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="l5-fullscreen-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#050706]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 lg:p-20 overflow-y-auto"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between w-full pt-2 border-b border-white/[0.08] pb-6">
              <div className="flex items-center gap-3">
                <Layer5Emblem size={26} variant="white" animate={false} />
                <span className="font-display font-bold text-sm tracking-widest text-[#F5F7F2] uppercase">
                  LAYER5 PROTOCOL
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#9AA09A] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF28]" />
                <span>ROBINHOOD CHAIN ({protocolConfig.chainId})</span>
              </div>
            </div>

            {/* Central Giant Editorial Navigation Links */}
            <div className="my-auto py-12 max-w-5xl w-full mx-auto">
              <ul className="space-y-4 sm:space-y-6">
                {navLinks.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{
                        delay: 0.06 * idx,
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b border-white/[0.06] pb-4 sm:pb-6 group"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-baseline justify-between w-full text-left"
                      >
                        <div className="flex items-baseline gap-4 sm:gap-8">
                          <span className="font-mono text-xs sm:text-sm tracking-widest text-[#9AA09A] group-hover:text-[#C7FF28] transition-colors">
                            {item.num}
                          </span>
                          <span className="font-display font-extrabold text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] uppercase text-[#F5F7F2] group-hover:text-[#C7FF28] transition-all duration-300 group-hover:translate-x-3">
                            {item.label}
                          </span>
                        </div>
                        <span className="font-mono text-xs sm:text-sm text-[#9AA09A] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          EXPLORE <ArrowUpRight className="w-4 h-4 text-[#C7FF28]" />
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Footer Metadata in Fullscreen Overlay */}
            <div className="w-full pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#9AA09A]">
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="https://x.com/layer5dotio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C7FF28] transition-colors flex items-center gap-1.5 uppercase"
                >
                  <span>X / Twitter (@layer5dotio)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://github.com/sonyzgt/L5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C7FF28] transition-colors flex items-center gap-1.5 uppercase"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#9AA09A]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C7FF28]" />
                <span>SYNTHETIX O(1) CONSTANT-TIME ARCHITECTURE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback Connect Modal */}
      <WalletConnectModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />
    </>
  );
};
