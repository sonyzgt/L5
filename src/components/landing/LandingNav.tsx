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
import { ArrowUpRight, ChevronRight, Menu, ShieldCheck, Wallet, X } from "lucide-react";

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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
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
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 px-3 sm:px-6 lg:px-8 ${
          isScrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto bg-[#10170e]/85 backdrop-blur-xl px-4 sm:px-6 py-2.5 rounded-full border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-all duration-300">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 group select-none cursor-pointer shrink-0"
          >
            <div className="transition-transform duration-300 group-hover:scale-105">
              <Layer5Emblem size={28} variant="white" animate={false} />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-sm sm:text-base font-extrabold tracking-[-0.02em] text-[#F4F1E8] uppercase leading-none">
                Aegis
              </span>
              <span className="text-[8px] font-mono tracking-[0.2em] text-[#A0AA98] uppercase pt-1 leading-none">
                ROBINHOOD L2
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full p-1 backdrop-blur-sm">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 select-none ${
                    isActive
                      ? "text-[#10170e] font-bold bg-[#B8F34A] shadow-[0_0_18px_rgba(184,243,74,0.35)]"
                      : "text-[#A0AA98] hover:text-[#F4F1E8] hover:bg-white/[0.05]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Network Badge (Desktop) */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-[#A0AA98] select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8F34A] animate-pulse" />
              <span className="uppercase tracking-widest text-[#F4F1E8]">ROBINHOOD MAINNET</span>
            </div>

            {/* Wallet Connect Button */}
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
                className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-[#B8F34A]/60 transition-all duration-300 font-mono text-[11px] sm:text-xs text-[#F4F1E8] shadow-sm select-none cursor-pointer"
                title="Account Settings"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8F34A] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B8F34A]" />
                </span>
                <span className="font-semibold tracking-wider group-hover:text-[#B8F34A] transition-colors">
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
                className="group relative flex items-center gap-2 px-3.5 sm:px-4.5 py-1.5 rounded-full bg-[#B8F34A] hover:bg-[#cbfb65] text-[#10170e] font-display text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 shadow-[0_0_24px_rgba(184,243,74,0.3)] hover:shadow-[0_0_32px_rgba(184,243,74,0.5)] hover:scale-[1.02] active:scale-[0.98] select-none cursor-pointer"
                title="Connect Web3 Wallet"
              >
                <Wallet className="w-3.5 h-3.5 text-[#10170e]" />
                <span>
                  <span className="hidden sm:inline">CONNECT </span>WALLET
                </span>
              </button>
            )}

            {/* Mobile / Tablet Menu Button (lg:hidden) */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex items-center justify-center p-2 rounded-full bg-[#151e12] hover:bg-[#1a2517] border border-white/[0.1] text-[#F4F1E8] hover:text-[#B8F34A] transition-colors select-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-4 h-4 text-[#B8F34A]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Glass Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#10170e]/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 overflow-y-auto lg:hidden"
          >
            {/* Mobile Navigation List */}
            <div className="space-y-3 max-w-lg mx-auto w-full my-auto">
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#A0AA98] uppercase pb-2 border-b border-white/[0.08]">
                NAVIGATION
              </div>
              <ul className="space-y-2">
                {navLinks.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 ${
                          isActive
                            ? "bg-[#B8F34A] text-[#10170e] font-bold border-[#B8F34A] shadow-[0_0_20px_rgba(184,243,74,0.3)]"
                            : "bg-[#151e12]/60 text-[#F4F1E8] border-white/[0.06] hover:border-white/[0.15]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-xs ${
                              isActive ? "text-[#10170e]/70" : "text-[#A0AA98]"
                            }`}
                          >
                            {item.num}
                          </span>
                          <span className="font-display font-bold text-lg uppercase tracking-wide">
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 ${
                            isActive ? "text-[#10170e]" : "text-[#A0AA98]"
                          }`}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Protocol Specs Quick Card */}
              <div className="p-4 rounded-2xl bg-[#151e12] border border-white/[0.08] space-y-2 font-mono text-xs text-[#A0AA98] mt-6">
                <div className="flex items-center justify-between text-[11px] text-[#F4F1E8]">
                  <span>NETWORK</span>
                  <span className="text-[#B8F34A]">ROBINHOOD CHAIN</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#F4F1E8]">
                  <span>ENGINE</span>
                  <span>SYNTHETIX O(1)</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#F4F1E8]">
                  <span>SECURITY</span>
                  <span>NON-CUSTODIAL</span>
                </div>
              </div>
            </div>

            {/* Mobile Footer Links */}
            <div className="max-w-lg mx-auto w-full pt-6 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-[#A0AA98]">
              <a
                href={`${protocolConfig.explorerUrl}/address/${protocolConfig.stakingContractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8F34A] transition-colors flex items-center gap-1"
              >
                <span>Explorer</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://x.com/layer5dotio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8F34A] transition-colors flex items-center gap-1"
              >
                <span>Twitter</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/sonyzgt/L5"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8F34A] transition-colors flex items-center gap-1"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
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
