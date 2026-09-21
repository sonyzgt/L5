"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { formatAddress } from "@/lib/utils/formatters";
import { WalletConnectModal } from "../Wallet/WalletConnectModal";
import { KawaEmblem } from "../Brand/KawaEmblem";
import { Menu, X, BookOpen, Layers, User, BarChart2 } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "PROTOCOL", href: "/protocol", icon: BookOpen },
    { label: "STAKE", href: "/stake", icon: Layers },
    { label: "POSITION", href: "/position", icon: User },
    { label: "STATS", href: "/stats", icon: BarChart2 },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHome && !isScrolled
            ? "bg-transparent border-b border-transparent py-4"
            : "bg-[#090a0c]/85 backdrop-blur-md border-b border-white/[0.06] py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand Logo & Wordmark -> / (Home) */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="group-hover:scale-105 transition duration-300">
              <KawaEmblem size={24} variant="white" animate={false} />
            </div>
            <span className="text-base font-semibold tracking-[0.25em] text-white uppercase font-sans">
              KAWA
            </span>
          </Link>

          {/* Desktop Global Navigation — Floating Segmented Pill matching reference */}
          <nav className="hidden md:flex items-center bg-[#131418]/90 border border-white/[0.1] rounded-full px-5 py-2 backdrop-blur-md shadow-lg shadow-black/40">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] transition duration-200 ${
                      isActive
                        ? "text-[#c8f53c] font-semibold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 opacity-75" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Wallet Action Button: Floating Dark Pill with Green Glowing Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setWalletModalOpen(true)}
              className="flex items-center gap-2.5 py-2 px-4 rounded-full bg-[#131418] border border-white/[0.12] hover:border-white/30 text-white transition duration-200 text-xs font-mono tracking-[0.1em] uppercase font-medium shadow-sm hover:bg-[#1a1c22]"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected
                    ? "bg-[#c8f53c] shadow-[0_0_8px_#c8f53c]"
                    : "bg-neutral-600"
                }`}
              />
              {isConnected && address ? (
                <span className="text-neutral-200 font-mono">{formatAddress(address)}</span>
              ) : (
                <span className="text-neutral-300">CONNECT WALLET</span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0e1014] px-6 py-6 space-y-4">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest py-2 ${
                    isActive ? "text-[#c8f53c] font-semibold" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  <IconComponent className="w-4 h-4 opacity-75" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      <WalletConnectModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />
    </>
  );
};
