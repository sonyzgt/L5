"use client";

import React, { useState } from "react";
import { protocolConfig } from "@/lib/blockchain/config";
import { KawaWatermark } from "@/components/Brand/KawaWatermark";
import { KawaEmblem } from "@/components/Brand/KawaEmblem";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro");

  const sections = [
    { id: "intro", title: "01 Introduction" },
    { id: "how-it-works", title: "02 How KAWA Works" },
    { id: "staking", title: "03 Staking Mechanics" },
    { id: "rewards", title: "04 Reward Model" },
    { id: "contract", title: "05 Smart Contract" },
    { id: "security", title: "06 Security Architecture" },
    { id: "robinhood-chain", title: "07 Robinhood Chain" },
    { id: "faq", title: "08 FAQ" },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-white text-black py-12 px-6 sm:px-10 overflow-hidden font-sans">
      <KawaWatermark />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 text-left">
        {/* Editorial Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-2 border-b lg:border-b-0 lg:border-r border-black/10 pb-6 lg:pb-0 lg:pr-6">
            <div className="flex items-center gap-2 pb-3">
              <div className="text-black">
                <KawaEmblem size={18} animate={false} />
              </div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
                DOCUMENTATION
              </span>
            </div>

            <nav className="space-y-1">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition text-left ${
                      isActive
                        ? "bg-black text-white font-medium"
                        : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                    }`}
                  >
                    <span>{sec.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Editorial Content Area */}
        <main className="flex-1 space-y-10 max-w-2xl">
          {activeSection === "intro" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
                  SECTION 01
                </span>
                <h1 className="text-3xl sm:text-4xl font-light tracking-[0.15em] text-black uppercase font-mono">
                  INTRODUCTION TO KAWA
                </h1>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                KAWA is a non-custodial decentralized staking protocol natively engineered for{" "}
                <strong className="text-black font-medium">Robinhood Chain</strong>. Designed around
                the perpetual cycle of value—<span className="text-black font-mono">STAKE &rarr; FLOW &rarr; GROW &rarr; REWARD</span>—the
                protocol unlocks algorithmic liquidity and continuous yield accrual.
              </p>

              <div className="border-t border-b border-black/10 py-5 space-y-3">
                <div className="text-xs font-mono tracking-[0.2em] text-black uppercase font-medium">
                  CORE TENETS
                </div>
                <ul className="text-xs text-neutral-600 space-y-2 font-mono list-disc list-inside">
                  <li>On-Chain Authority: Smart contracts are the single source of mathematical truth.</li>
                  <li>Instant Liquidity: No lockup periods or artificial penalties.</li>
                  <li>Continuous Accrual: Yield compounds every block on Robinhood Chain.</li>
                  <li>Zero Opaque Intermediaries: Direct non-custodial EVM interaction.</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === "how-it-works" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
                  SECTION 02
                </span>
                <h1 className="text-3xl sm:text-4xl font-light tracking-[0.15em] text-black uppercase font-mono">
                  HOW KAWA WORKS
                </h1>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed">
                When you deposit assets into KAWA, your tokens are placed directly into the immutable{" "}
                <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono text-black">
                  KAWAStaking.sol
                </code>{" "}
                smart contract on Robinhood Chain.
              </p>

              <div className="border-t border-b border-black/10 divide-y divide-black/10">
                <div className="py-4 flex flex-col sm:flex-row justify-between gap-2">
                  <span className="text-xs font-mono font-medium tracking-wider text-black sm:w-1/3">1. STAKE</span>
                  <p className="text-xs text-neutral-600 sm:w-2/3">
                    Deposit supported tokens. Contract records your balance snapshot and initializes duration.
                  </p>
                </div>
                <div className="py-4 flex flex-col sm:flex-row justify-between gap-2">
                  <span className="text-xs font-mono font-medium tracking-wider text-black sm:w-1/3">2. FLOW</span>
                  <p className="text-xs text-neutral-600 sm:w-2/3">
                    Your position merges into the aggregate pool, computing proportional yield per second.
                  </p>
                </div>
                <div className="py-4 flex flex-col sm:flex-row justify-between gap-2">
                  <span className="text-xs font-mono font-medium tracking-wider text-black sm:w-1/3">3. GROW</span>
                  <p className="text-xs text-neutral-600 sm:w-2/3">
                    Your KAWA Core emblem visually evolves: Dormant &rarr; Activated &rarr; Growing &rarr; Mature &rarr; Awakened.
                  </p>
                </div>
                <div className="py-4 flex flex-col sm:flex-row justify-between gap-2">
                  <span className="text-xs font-mono font-medium tracking-wider text-black sm:w-1/3">4. REWARD</span>
                  <p className="text-xs text-neutral-600 sm:w-2/3">
                    Claim accumulated KAWA rewards at any moment or exit cleanly in a single transaction.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "staking" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
                  SECTION 03
                </span>
                <h1 className="text-3xl sm:text-4xl font-light tracking-[0.15em] text-black uppercase font-mono">
                  STAKING MECHANICS
                </h1>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed">
                Staking adheres strictly to a 2-step EVM pipeline: ERC-20 token approval followed by the deposit transaction. If your allowance is already sufficient, the protocol automatically skips the approval step.
              </p>

              <div className="border-t border-b border-black/10 py-4 space-y-2 font-mono text-xs">
                <div className="text-neutral-400">// Staking entrypoint</div>
                <div className="text-black font-medium">function stake(uint256 amount) external nonReentrant</div>
                <div className="text-neutral-400 pt-2">// Partial or full exit</div>
                <div className="text-black font-medium">function unstake(uint256 amount) external nonReentrant</div>
                <div className="text-neutral-400 pt-2">// Combined full exit + claim</div>
                <div className="text-black font-medium">function exit() external</div>
              </div>
            </div>
          )}

          {activeSection === "rewards" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
                  SECTION 04
                </span>
                <h1 className="text-3xl sm:text-4xl font-light tracking-[0.15em] text-black uppercase font-mono">
                  REWARD MODEL
                </h1>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed">
                KAWA avoids naive linear looping. Staking rewards rely on the battle-tested Synthetix-standard mathematical model:
              </p>

              <div className="p-4 rounded-xl bg-neutral-50 border border-black/10 font-mono text-xs text-black leading-relaxed">
                rewardPerToken = rewardPerTokenStored + ((lastTime - lastUpdateTime) * rewardRate * 1e18) / totalStaked
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                User accrued rewards are computed instantaneously upon any user interaction or query with O(1) gas efficiency:
              </p>

              <div className="p-4 rounded-xl bg-neutral-50 border border-black/10 font-mono text-xs text-black leading-relaxed">
                earned(account) = (balance * (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18 + rewards[account]
              </div>
            </div>
          )}

          {activeSection === "contract" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
                  SECTION 05
                </span>
                <h1 className="text-3xl sm:text-4xl font-light tracking-[0.15em] text-black uppercase font-mono">
                  SMART CONTRACT
                </h1>
              </div>

              <div className="border-t border-b border-black/10 divide-y divide-black/10 text-xs font-mono">
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-500 uppercase">CONTRACT</span>
                  <span className="text-black font-medium">KAWAStaking.sol</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-500 uppercase">COMPILER</span>
                  <span className="text-black">Solidity 0.8.20</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-500 uppercase">DEPLOYED ADDRESS</span>
                  <span className="text-black select-all">
                    {protocolConfig.stakingContractAddress || "Configured upon mainnet release"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
                  SECTION 06
                </span>
                <h1 className="text-3xl sm:text-4xl font-light tracking-[0.15em] text-black uppercase font-mono">
                  SECURITY ARCHITECTURE
                </h1>
              </div>

              <div className="border-t border-b border-black/10 divide-y divide-black/10 text-xs font-mono space-y-0">
                <div className="py-4 space-y-1">
                  <strong className="text-black block">REENTRANCY RESISTANT</strong>
                  <p className="text-neutral-600 font-sans text-xs">
                    All mutative functions (`stake`, `unstake`, `claim`, `exit`) enforce OpenZeppelin's `nonReentrant` modifier.
                  </p>
                </div>
                <div className="py-4 space-y-1">
                  <strong className="text-black block">SAFE ERC-20 TRANSFERS</strong>
                  <p className="text-neutral-600 font-sans text-xs">
                    Token transfers utilize `SafeERC20`, defending against non-compliant tokens.
                  </p>
                </div>
                <div className="py-4 space-y-1">
                  <strong className="text-black block">ZERO BACKDOORS</strong>
                  <p className="text-neutral-600 font-sans text-xs">
                    No administrator key has authority to seize or confiscate user staked assets.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "robinhood-chain" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
                  SECTION 07
                </span>
                <h1 className="text-3xl sm:text-4xl font-light tracking-[0.15em] text-black uppercase font-mono">
                  ROBINHOOD CHAIN
                </h1>
              </div>

              <div className="border-t border-b border-black/10 divide-y divide-black/10 text-xs font-mono">
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-500 uppercase">NETWORK NAME</span>
                  <span className="text-black">{protocolConfig.chainName}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-500 uppercase">CHAIN ID</span>
                  <span className="text-black">{protocolConfig.chainId}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-500 uppercase">GAS CURRENCY</span>
                  <span className="text-black">{protocolConfig.gasAsset}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-500 uppercase">STAKING ASSET</span>
                  <span className="text-black">{protocolConfig.stakeAsset}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-500 uppercase">REWARD TOKEN</span>
                  <span className="text-black">{protocolConfig.rewardAsset}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-500 uppercase">RPC ENDPOINT</span>
                  <span className="text-black select-all">{protocolConfig.rpcUrl}</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === "faq" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
                  SECTION 08
                </span>
                <h1 className="text-3xl sm:text-4xl font-light tracking-[0.15em] text-black uppercase font-mono">
                  FREQUENTLY ASKED QUESTIONS
                </h1>
              </div>

              <div className="border-t border-b border-black/10 divide-y divide-black/10">
                <div className="py-4 space-y-1">
                  <div className="text-xs font-mono font-medium text-black uppercase">
                    Are my staked tokens locked?
                  </div>
                  <p className="text-xs text-neutral-600 font-sans">
                    No. You may unstake any or all of your assets at any time with zero withdrawal fees or lockup periods.
                  </p>
                </div>

                <div className="py-4 space-y-1">
                  <div className="text-xs font-mono font-medium text-black uppercase">
                    How is APY computed?
                  </div>
                  <p className="text-xs text-neutral-600 font-sans">
                    APY is derived dynamically on-chain from the current reward emission rate relative to the aggregate total tokens staked in the protocol.
                  </p>
                </div>

                <div className="py-4 space-y-1">
                  <div className="text-xs font-mono font-medium text-black uppercase">
                    What is the KAWA Emblem?
                  </div>
                  <p className="text-xs text-neutral-600 font-sans">
                    The KAWA symbol represents the continuous flow of value (derived from the Japanese river kanji 川 and Kamon loop geometry), reactively animating according to your personal staking phase.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
