"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { protocolConfig } from "@/lib/blockchain/config";
import { Layer5Emblem } from "@/components/Brand/Layer5Emblem";
import { 
  BookOpen, 
  Layers, 
  Coins, 
  TrendingUp, 
  FileCode, 
  ShieldCheck, 
  Network, 
  HelpCircle, 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowRight, 
  ArrowLeft,
  Terminal,
  Zap,
  Lock,
  Cpu
} from "lucide-react";

interface DocSection {
  id: string;
  num: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const sections: DocSection[] = [
    {
      id: "intro",
      num: "01",
      title: "Introduction",
      category: "Protocol",
      icon: BookOpen,
      description: "Overview, vision, and architectural tenets of Aegis Protocol.",
    },
    {
      id: "how-it-works",
      num: "02",
      title: "How Aegis Works",
      category: "Architecture",
      icon: Layers,
      description: "The perpetual 4-stage cycle: Stake, Flow, Grow, and Reward.",
    },
    {
      id: "staking",
      num: "03",
      title: "Staking Mechanics",
      category: "Mechanics",
      icon: Coins,
      description: "2-step approval pipeline, deposit flow, and non-custodial exits.",
    },
    {
      id: "rewards",
      num: "04",
      title: "Reward Mathematics",
      category: "Yield Engine",
      icon: TrendingUp,
      description: "Continuous Synthetix-standard mathematical yield distribution with O(1) gas.",
    },
    {
      id: "contracts",
      num: "05",
      title: "Smart Contracts",
      category: "Contracts",
      icon: FileCode,
      description: "Deployed addresses, interfaces, Solidity methods, and verified sources.",
    },
    {
      id: "security",
      num: "06",
      title: "Security & Auditing",
      category: "Security",
      icon: ShieldCheck,
      description: "Reentrancy resistance, SafeERC20 guards, and zero-backdoor guarantees.",
    },
    {
      id: "robinhood-chain",
      num: "07",
      title: "Robinhood Chain L2",
      category: "Network",
      icon: Network,
      description: "Network parameters, RPC endpoints, and one-click wallet integration.",
    },
    {
      id: "faq",
      num: "08",
      title: "FAQ & Support",
      category: "Support",
      icon: HelpCircle,
      description: "Common questions regarding lockup periods, APY calculation, and gas.",
    },
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAddNetwork = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${protocolConfig.chainId.toString(16)}`,
              chainName: protocolConfig.chainName,
              nativeCurrency: {
                name: protocolConfig.gasAsset,
                symbol: protocolConfig.gasAsset,
                decimals: 18,
              },
              rpcUrls: [protocolConfig.rpcUrl],
              blockExplorerUrls: protocolConfig.explorerUrl ? [protocolConfig.explorerUrl] : undefined,
            },
          ],
        });
      } catch (err) {
        console.error("Failed to add network:", err);
      }
    }
  };

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  return (
    <div className="relative min-h-screen bg-[#F6F3EC] text-[#1C1B18] pt-28 pb-20 px-4 sm:px-8 lg:px-12 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Banner */}
        <div className="liquid-glass-subcard rounded-2xl p-6 sm:p-10 border border-white/[0.08] relative overflow-hidden">
          {/* Subtle Ambient Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8f53c]/[0.04] blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Layer5Emblem size={32} variant="white" animate={false} />
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#c8f53c]/10 border border-[#c8f53c]/20 text-[10px] font-mono tracking-widest text-[#c8f53c] uppercase">
                  <span>ROBINHOOD CHAIN L2</span>
                  <span>•</span>
                  <span>OFFICIAL DOCUMENTATION</span>
                </div>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                AEGIS PROTOCOL DOCS
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base max-w-2xl font-sans">
                Comprehensive technical architecture, non-custodial smart contracts, mathematical yield formulas, and integration references for Aegis on Robinhood Chain.
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 font-mono text-xs">
              <button
                type="button"
                onClick={handleAddNetwork}
                className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-[#c8f53c]/40 text-neutral-300 hover:text-white transition flex items-center gap-2"
              >
                <Network className="w-3.5 h-3.5 text-[#c8f53c]" />
                <span>Add Robinhood Chain</span>
              </button>
              <Link
                href="/stake"
                className="px-4 py-2 rounded-xl bg-[#c8f53c] hover:bg-[#d6ff47] text-[#08090c] font-bold transition flex items-center gap-2"
              >
                <span>Launch App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative mt-8">
            <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation (e.g. stake, reward rate, contract address, RPC)..."
              className="w-full bg-[#040406]/60 border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c8f53c]/60 transition font-mono"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-white font-mono"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Mobile Section Nav (Horizontal scroll on < lg) */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
          {filteredSections.map((sec) => {
            const isActive = activeSection === sec.id;
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => {
                  setActiveSection(sec.id);
                }}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition whitespace-nowrap ${
                  isActive
                    ? "bg-[#c8f53c] text-[#08090c] font-bold shadow-[0_0_15px_rgba(200,245,60,0.3)]"
                    : "liquid-glass-subcard text-neutral-300 border border-white/10"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#08090c]" : "text-[#c8f53c]"}`} />
                <span>{sec.title}</span>
              </button>
            );
          })}
        </div>

        {/* Documentation Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sticky Navigation Column (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 space-y-2">
            <div className="liquid-glass-subcard rounded-2xl p-3 border border-white/[0.08] space-y-1">
              <div className="px-3 py-2 text-[10px] font-mono tracking-widest text-[#8e95a2] uppercase border-b border-white/[0.06] mb-1">
                SECTIONS ({filteredSections.length})
              </div>

              {filteredSections.map((sec) => {
                const isActive = activeSection === sec.id;
                const Icon = sec.icon;

                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(sec.id);
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition font-mono text-xs ${
                      isActive
                        ? "bg-[#c8f53c] text-[#08090c] font-bold shadow-[0_0_20px_rgba(200,245,60,0.2)]"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#08090c]" : "text-[#c8f53c]"}`} />
                      <span className="truncate">{sec.title}</span>
                    </div>
                    <span className={`text-[10px] font-mono shrink-0 ml-2 ${isActive ? "text-[#08090c]/70" : "text-neutral-600"}`}>
                      {sec.num}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Support / Community Card */}
            <div className="liquid-glass-subcard rounded-2xl p-4 border border-white/[0.06] text-xs font-mono space-y-3">
              <span className="text-[10px] uppercase text-[#8e95a2] tracking-wider block">
                DEVELOPER RESOURCES
              </span>
              <div className="space-y-1.5 text-neutral-400">
                <a
                  href="https://x.com/layer5dotio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-[#c8f53c] transition py-1"
                >
                  <span>Protocol Twitter / X</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={protocolConfig.explorerUrl || "https://explorer.robinhood.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-[#c8f53c] transition py-1"
                >
                  <span>Block Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* Right Main Article Reader */}
          <main className="lg:col-span-8 xl:col-span-9 liquid-glass-subcard rounded-2xl p-6 sm:p-10 border border-white/[0.08] space-y-10 min-h-[600px]">
            
            {/* =============================================================
                SECTION 01: INTRODUCTION
                ============================================================= */}
            {activeSection === "intro" && (
              <article className="space-y-8 animate-fadeIn">
                <div className="space-y-2 border-b border-white/[0.08] pb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c8f53c] uppercase tracking-widest">
                    <span>SECTION 01</span>
                    <span>•</span>
                    <span>OVERVIEW</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                    Introduction to Aegis Protocol
                  </h2>
                  <p className="text-neutral-400 text-sm font-sans leading-relaxed">
                    Aegis is an institutional-grade, non-custodial decentralized staking protocol natively engineered for Robinhood Chain L2.
                  </p>
                </div>

                <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-sans">
                  <p>
                    Built upon the perpetual cycle of value—<strong className="text-white font-mono">STAKE &rarr; FLOW &rarr; GROW &rarr; REWARD</strong>—Aegis enables liquid capital to compound autonomously every second without administrative gatekeepers, custody surrender, or lockup restrictions.
                  </p>
                  <p>
                    By coupling mathematically provable yield distributions with zero-fee instant withdrawals, Aegis serves as the core financial bedrock for autonomous liquidity on the high-throughput Robinhood Chain ecosystem.
                  </p>
                </div>

                {/* 4 Pillars Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold font-mono text-xs uppercase">
                      <Zap className="w-4 h-4 text-[#c8f53c]" />
                      <span>Continuous Compounding</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Yield accrues in real-time on every L2 block without requiring manual re-staking or batch processing.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold font-mono text-xs uppercase">
                      <Lock className="w-4 h-4 text-[#c8f53c]" />
                      <span>Zero Lockup Policy</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Stakers retain complete sovereign ownership. Withdraw 100% of your principle anytime in a single atomic transaction.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold font-mono text-xs uppercase">
                      <ShieldCheck className="w-4 h-4 text-[#c8f53c]" />
                      <span>Synthetix Math Engine</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Battle-tested reward calculation algorithms with O(1) gas consumption, immune to unbounded looping exploits.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold font-mono text-xs uppercase">
                      <Cpu className="w-4 h-4 text-[#c8f53c]" />
                      <span>Robinhood Chain Native</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Sub-second finality and near-zero gas costs enable micro-yield claims and seamless automated execution.
                    </p>
                  </div>
                </div>
              </article>
            )}

            {/* =============================================================
                SECTION 02: HOW AEGIS WORKS
                ============================================================= */}
            {activeSection === "how-it-works" && (
              <article className="space-y-8 animate-fadeIn">
                <div className="space-y-2 border-b border-white/[0.08] pb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c8f53c] uppercase tracking-widest">
                    <span>SECTION 02</span>
                    <span>•</span>
                    <span>ARCHITECTURE & FLOW</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                    How Aegis Works
                  </h2>
                  <p className="text-neutral-400 text-sm font-sans leading-relaxed">
                    A walkthrough of the 4 continuous phases in the Aegis staking lifecycle.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-[#040406]/60 border border-white/[0.08] space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#c8f53c] font-bold tracking-wider">PHASE 01 • STAKE</span>
                      <span className="text-neutral-500">ENTRYPOINT</span>
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase font-sans">
                      Non-Custodial Asset Commitment
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                      You approve and transfer USDG tokens into the immutable <code className="text-[#c8f53c] font-mono text-xs">KAWAStaking.sol</code> vault. The smart contract captures your balance snapshot and timestamp instantly on Robinhood Chain.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#040406]/60 border border-white/[0.08] space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#c8f53c] font-bold tracking-wider">PHASE 02 • FLOW</span>
                      <span className="text-neutral-500">AGGREGATION</span>
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase font-sans">
                      Algorithmic Liquidity Pooling
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                      Your position merges with the collective pool. The global reward accumulator (<code className="text-[#c8f53c] font-mono text-xs">rewardPerToken</code>) continuously streams Aegis emission tokens based on your proportion of the total staked assets.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#040406]/60 border border-white/[0.08] space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#c8f53c] font-bold tracking-wider">PHASE 03 • GROW</span>
                      <span className="text-neutral-500">VISUAL STATE</span>
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase font-sans">
                      Kawa Core Emblem Morphing
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                      As your staking duration increases, your client-side Kawa Core entity dynamically evolves through 5 harmonic phases: <span className="text-white font-mono">Dormant &rarr; Activated &rarr; Growing &rarr; Mature &rarr; Awakened</span>.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#040406]/60 border border-white/[0.08] space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#c8f53c] font-bold tracking-wider">PHASE 04 • REWARD</span>
                      <span className="text-neutral-500">SETTLEMENT</span>
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase font-sans">
                      Frictionless Yield Harvest & Exit
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                      Execute <code className="text-[#c8f53c] font-mono text-xs">claimReward()</code> to transfer earned Aegis tokens to your wallet while keeping your principle active, or invoke <code className="text-[#c8f53c] font-mono text-xs">exit()</code> to simultaneously harvest all rewards and withdraw your entire initial deposit.
                    </p>
                  </div>
                </div>
              </article>
            )}

            {/* =============================================================
                SECTION 03: STAKING MECHANICS
                ============================================================= */}
            {activeSection === "staking" && (
              <article className="space-y-8 animate-fadeIn">
                <div className="space-y-2 border-b border-white/[0.08] pb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c8f53c] uppercase tracking-widest">
                    <span>SECTION 03</span>
                    <span>•</span>
                    <span>EXECUTION PIPELINE</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                    Staking Mechanics
                  </h2>
                  <p className="text-neutral-400 text-sm font-sans leading-relaxed">
                    Standardized 2-step EVM pipeline: Approval & Deposit.
                  </p>
                </div>

                <div className="space-y-4 text-sm text-neutral-300 font-sans leading-relaxed">
                  <p>
                    In accordance with standard ERC-20 token design, staking tokens requires granting the staking contract permission to pull the specified amount from your account. The KAWA user interface automatically queries your current allowance and executes seamlessly:
                  </p>

                  <ol className="list-decimal list-inside space-y-2 text-xs font-mono text-neutral-300 pl-2">
                    <li><strong className="text-white">Check Allowance:</strong> Read <code className="text-[#c8f53c]">allowance(user, stakingContract)</code>.</li>
                    <li><strong className="text-white">Approve (if insufficient):</strong> Call <code className="text-[#c8f53c]">token.approve(stakingContract, amount)</code>.</li>
                    <li><strong className="text-white">Execute Stake:</strong> Call <code className="text-[#c8f53c]">stakingContract.stake(amount)</code>.</li>
                  </ol>
                </div>

                {/* Solidity Interface Code Block */}
                <div className="rounded-xl bg-[#040406] border border-white/[0.08] overflow-hidden font-mono text-xs">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] text-neutral-400">
                    <span className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#c8f53c]" />
                      <span>IKAWAStaking.sol</span>
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          `interface IKAWAStaking {\n  function stake(uint256 amount) external;\n  function unstake(uint256 amount) external;\n  function claimReward() external;\n  function exit() external;\n  function earned(address account) external view returns (uint256);\n}`,
                          "sol-interface"
                        )
                      }
                      className="hover:text-white transition flex items-center gap-1.5"
                    >
                      {copiedKey === "sol-interface" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#c8f53c]" />
                          <span className="text-[#c8f53c]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-neutral-300 leading-relaxed overflow-x-auto">
{`interface IKAWAStaking {
    // Deposits USDG into staking pool (requires prior approval)
    function stake(uint256 amount) external;

    // Withdraws staked USDG without forfeiting accrued rewards
    function unstake(uint256 amount) external;

    // Transfers all accumulated Aegis rewards to caller
    function claimReward() external;

    // Atomic combined operation: claims all rewards and withdraws full principle
    function exit() external;

    // View function calculating pending Aegis rewards for account
    function earned(address account) external view returns (uint256);
}`}
                  </pre>
                </div>
              </article>
            )}

            {/* =============================================================
                SECTION 04: REWARD MATHEMATICS
                ============================================================= */}
            {activeSection === "rewards" && (
              <article className="space-y-8 animate-fadeIn">
                <div className="space-y-2 border-b border-white/[0.08] pb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c8f53c] uppercase tracking-widest">
                    <span>SECTION 04</span>
                    <span>•</span>
                    <span>MATHEMATICAL FOUNDATION</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                    Reward Mathematics
                  </h2>
                  <p className="text-neutral-400 text-sm font-sans leading-relaxed">
                    Synthetix-grade reward distribution engine with constant O(1) gas complexity.
                  </p>
                </div>

                <div className="space-y-4 text-sm text-neutral-300 font-sans leading-relaxed">
                  <p>
                    Rather than iterating through stakers in expensive and vulnerable loops, Aegis computes reward distributions continuously using the cumulative integral of yield per token:
                  </p>

                  <div className="p-5 rounded-xl bg-[#040406] border border-[#c8f53c]/20 font-mono text-xs text-[#c8f53c] leading-relaxed space-y-2">
                    <div className="text-neutral-400 text-[10px] uppercase tracking-wider">// Global Reward Index Accumulator</div>
                    <div>
                      R(t) = R(t₀) + [ (t - t₀) × rewardRate × 1e18 ] / totalStaked
                    </div>
                  </div>

                  <p className="pt-2">
                    When any user interacts with the contract or queries their pending balance, their earned rewards are derived in a single math step:
                  </p>

                  <div className="p-5 rounded-xl bg-[#040406] border border-white/[0.08] font-mono text-xs text-white leading-relaxed space-y-2">
                    <div className="text-neutral-400 text-[10px] uppercase tracking-wider">// User Earned Calculation</div>
                    <div>
                      earned(user) = [ balance(user) × ( R(t) - userRewardPerTokenPaid(user) ) ] / 1e18 + storedRewards(user)
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-neutral-400 space-y-2">
                    <div className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c8f53c]" />
                      <span>Mathematical Invariants</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Gas cost remains constant whether there is 1 staker or 100,000 stakers.</li>
                      <li>Precision is guarded to 18 decimal places using 1e18 scaling.</li>
                      <li>Reward rates are bounded by strictly capped emission budgets.</li>
                    </ul>
                  </div>
                </div>
              </article>
            )}

            {/* =============================================================
                SECTION 05: SMART CONTRACTS & ADDRESSES
                ============================================================= */}
            {activeSection === "contracts" && (
              <article className="space-y-8 animate-fadeIn">
                <div className="space-y-2 border-b border-white/[0.08] pb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c8f53c] uppercase tracking-widest">
                    <span>SECTION 05</span>
                    <span>•</span>
                    <span>ON-CHAIN REGISTRY</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                    Smart Contracts & Addresses
                  </h2>
                  <p className="text-neutral-400 text-sm font-sans leading-relaxed">
                    Verified smart contract deployments on Robinhood Chain L2.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Staking Vault Contract */}
                  <div className="p-5 rounded-xl bg-[#040406]/60 border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white font-bold uppercase">Staking Vault Contract</span>
                      <span className="text-[#c8f53c] text-[10px] bg-[#c8f53c]/10 px-2 py-0.5 rounded">Core Contract</span>
                    </div>
                    <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/[0.04] text-xs font-mono">
                      <span className="text-neutral-300 truncate mr-2 select-all">
                        {protocolConfig.stakingContractAddress || "TBA (Announced upon Mainnet Launch)"}
                      </span>
                      {protocolConfig.stakingContractAddress && (
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              protocolConfig.stakingContractAddress!,
                              "addr-vault"
                            )
                          }
                          className="text-neutral-400 hover:text-white transition shrink-0 p-1"
                        >
                          {copiedKey === "addr-vault" ? (
                            <Check className="w-3.5 h-3.5 text-[#c8f53c]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Staking Asset (USDG) */}
                  <div className="p-5 rounded-xl bg-[#040406]/60 border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white font-bold uppercase">Staking Asset (USDG Token)</span>
                      <span className="text-neutral-400 text-[10px]">ERC-20 (18 Decimals)</span>
                    </div>
                    <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/[0.04] text-xs font-mono">
                      <span className="text-neutral-300 truncate mr-2 select-all">
                        {protocolConfig.stakeTokenAddress || "TBA (Announced upon Mainnet Launch)"}
                      </span>
                      {protocolConfig.stakeTokenAddress && (
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              protocolConfig.stakeTokenAddress!,
                              "addr-usdg"
                            )
                          }
                          className="text-neutral-400 hover:text-white transition shrink-0 p-1"
                        >
                          {copiedKey === "addr-usdg" ? (
                            <Check className="w-3.5 h-3.5 text-[#c8f53c]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Reward Token */}
                  <div className="p-5 rounded-xl bg-[#040406]/60 border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white font-bold uppercase">Reward Asset</span>
                      <span className="text-neutral-400 text-[10px]">ERC-20 (18 Decimals)</span>
                    </div>
                    <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/[0.04] text-xs font-mono">
                      <span className="text-neutral-300 truncate mr-2 select-all">
                        {protocolConfig.rewardTokenAddress || "TBA (Announced upon Mainnet Launch)"}
                      </span>
                      {protocolConfig.rewardTokenAddress && (
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              protocolConfig.rewardTokenAddress!,
                              "addr-reward"
                            )
                          }
                          className="text-neutral-400 hover:text-white transition shrink-0 p-1"
                        >
                          {copiedKey === "addr-reward" ? (
                            <Check className="w-3.5 h-3.5 text-[#c8f53c]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* =============================================================
                SECTION 06: SECURITY ARCHITECTURE
                ============================================================= */}
            {activeSection === "security" && (
              <article className="space-y-8 animate-fadeIn">
                <div className="space-y-2 border-b border-white/[0.08] pb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c8f53c] uppercase tracking-widest">
                    <span>SECTION 06</span>
                    <span>•</span>
                    <span>AUDIT & INTEGRITY</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                    Security Architecture
                  </h2>
                  <p className="text-neutral-400 text-sm font-sans leading-relaxed">
                    Formal defenses against common smart contract vulnerabilities.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold font-mono text-xs uppercase">
                      <ShieldCheck className="w-4 h-4 text-[#c8f53c]" />
                      <span>Reentrancy Protection</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      All state-changing functions enforce OpenZeppelin's <code className="text-[#c8f53c] font-mono">ReentrancyGuard</code>. Internal accounting balances are decremented before external token transfers take place (Checks-Effects-Interactions pattern).
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold font-mono text-xs uppercase">
                      <Lock className="w-4 h-4 text-[#c8f53c]" />
                      <span>Zero Custody Backdoors</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      The protocol contains zero admin withdrawal functions for user principle. Even protocol owners cannot touch or freeze stakers' deposited tokens.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold font-mono text-xs uppercase">
                      <FileCode className="w-4 h-4 text-[#c8f53c]" />
                      <span>SafeERC20 Token Wrappers</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      All token transfers use OpenZeppelin's <code className="text-[#c8f53c] font-mono">SafeERC20</code>, ensuring proper handling of non-standard ERC-20 return values and revert cases.
                    </p>
                  </div>
                </div>
              </article>
            )}

            {/* =============================================================
                SECTION 07: ROBINHOOD CHAIN L2
                ============================================================= */}
            {activeSection === "robinhood-chain" && (
              <article className="space-y-8 animate-fadeIn">
                <div className="space-y-2 border-b border-white/[0.08] pb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c8f53c] uppercase tracking-widest">
                    <span>SECTION 07</span>
                    <span>•</span>
                    <span>NETWORK CONFIGURATION</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                    Robinhood Chain L2
                  </h2>
                  <p className="text-neutral-400 text-sm font-sans leading-relaxed">
                    Network parameters and direct wallet RPC connection details.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-[#040406]/60 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-neutral-400 uppercase">Network Name</span>
                    <span className="text-white font-bold">{protocolConfig.chainName}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#040406]/60 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-neutral-400 uppercase">Chain ID</span>
                    <span className="text-[#c8f53c] font-bold">{protocolConfig.chainId}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#040406]/60 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-neutral-400 uppercase">Gas Currency</span>
                    <span className="text-white font-bold">{protocolConfig.gasAsset} (18 Decimals)</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#040406]/60 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-neutral-400 uppercase">RPC Endpoint</span>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-300 select-all">{protocolConfig.rpcUrl}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(protocolConfig.rpcUrl, "rpc-url")}
                        className="text-neutral-400 hover:text-white"
                      >
                        {copiedKey === "rpc-url" ? (
                          <Check className="w-3.5 h-3.5 text-[#c8f53c]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleAddNetwork}
                      className="w-full py-3.5 rounded-xl bg-[#c8f53c] hover:bg-[#d6ff47] text-[#08090c] font-bold tracking-wider transition uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(200,245,60,0.2)]"
                    >
                      <Network className="w-4 h-4" />
                      <span>Connect / Add Network to MetaMask & Rabby</span>
                    </button>
                  </div>
                </div>
              </article>
            )}

            {/* =============================================================
                SECTION 08: FAQ & SUPPORT
                ============================================================= */}
            {activeSection === "faq" && (
              <article className="space-y-8 animate-fadeIn">
                <div className="space-y-2 border-b border-white/[0.08] pb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c8f53c] uppercase tracking-widest">
                    <span>SECTION 08</span>
                    <span>•</span>
                    <span>QUESTIONS & ANSWERS</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-neutral-400 text-sm font-sans leading-relaxed">
                    Clear answers to protocol fundamentals, yield mechanics, and security guarantees.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-[#040406]/60 border border-white/[0.08] space-y-2">
                    <h3 className="text-white font-bold font-sans text-sm">
                      Are my staked USDG tokens locked for any minimum time period?
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      No. Aegis strictly follows a zero lockup policy. You may unstake any portion or 100% of your principle at any moment without penalty or withdrawal fees.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#040406]/60 border border-white/[0.08] space-y-2">
                    <h3 className="text-white font-bold font-sans text-sm">
                      How frequently do staking rewards accrue?
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      Rewards accrue continuously per second / per block. Your pending balance updates in real-time on your dashboard as new blocks are finalized on Robinhood Chain.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#040406]/60 border border-white/[0.08] space-y-2">
                    <h3 className="text-white font-bold font-sans text-sm">
                      Can I claim my Aegis rewards without withdrawing my staked USDG?
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      Yes. Calling the <code className="text-[#c8f53c] font-mono">claimReward()</code> function transfers all accrued yield directly to your wallet while leaving your staked deposit intact to continue earning.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#040406]/60 border border-white/[0.08] space-y-2">
                    <h3 className="text-white font-bold font-sans text-sm">
                      What wallet software is compatible with Aegis?
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      Any standard EVM-compatible Web3 wallet, including MetaMask, Rabby, Coinbase Wallet, Rainbow, and WalletConnect v2 mobile apps.
                    </p>
                  </div>
                </div>
              </article>
            )}

            {/* Bottom Section Pager Navigation */}
            <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
              {prevSection ? (
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection(prevSection.id);
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{prevSection.title}</span>
                </button>
              ) : (
                <div />
              )}

              {nextSection ? (
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection(nextSection.id);
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 text-[#c8f53c] hover:text-[#d6ff47] transition font-bold"
                >
                  <span>{nextSection.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div />
              )}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
