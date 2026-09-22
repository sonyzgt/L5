import React from "react";
import { Layer5Emblem } from "@/components/Brand/Layer5Emblem";

export const metadata = {
  title: "Protocol • Layer5",
  description: "Comprehensive specification and architectural lore of Layer5 Staking Protocol on Robinhood Chain.",
};

export default function ProtocolPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-20 px-6 sm:px-12 bg-transparent text-white font-sans overflow-hidden">
      <article className="relative z-10 max-w-3xl mx-auto space-y-16">
        {/* Editorial Header */}
        <header className="space-y-4 text-center sm:text-left border-b border-white/10 pb-12">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#8e95a2] uppercase">
              SPECIFICATION • ARCHITECTURE 01
            </span>
            <div className="hidden sm:block">
              <Layer5Emblem size={28} variant="white" animate={false} />
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl font-light tracking-[0.1em] text-white uppercase font-sans">
            THE <span className="text-[#c8f53c] font-normal">PROTOCOL</span>
          </h1>
          <p className="text-sm font-mono tracking-[0.15em] text-[#8e95a2] uppercase max-w-xl">
            CONTINUOUS STREAM LIQUIDITY AND STAKING MECHANICS ON ROBINHOOD CHAIN.
          </p>
        </header>

        {/* Section 1: Lore & Philosophy */}
        <section className="space-y-6">
          <div className="flex items-baseline gap-4">
            <span className="text-xs font-mono text-[#c8f53c]">01</span>
            <h2 className="text-lg font-mono font-medium tracking-[0.15em] uppercase text-white">
              PHILOSOPHY & ETHOS
            </h2>
          </div>
          <p className="text-neutral-300 leading-relaxed text-sm sm:text-base font-light font-sans">
            In Japanese, <strong className="font-medium text-white">川 (Kawa)</strong> signifies a river—an unbroken, continuous flow of energy that shapes its terrain without brute force. KAWA translates this natural principle into a decentralized staking protocol engineered for Robinhood Chain.
          </p>
          <p className="text-[#8e95a2] leading-relaxed text-sm sm:text-base font-light font-sans">
            Traditional staking systems rely on rigid lockup epochs, punitive slashing schedules, and gas-intensive multi-stage interactions. KAWA replaces friction with flow: capital deposited into the smart contract instantly enters an algorithmic reward stream calculated per block.
          </p>
        </section>

        {/* Section 2: Mathematical Foundation */}
        <section className="space-y-6">
          <div className="flex items-baseline gap-4">
            <span className="text-xs font-mono text-[#c8f53c]">02</span>
            <h2 className="text-lg font-mono font-medium tracking-[0.15em] uppercase text-white">
              MATHEMATICAL ACCOUNTING MODEL
            </h2>
          </div>
          <p className="text-neutral-300 leading-relaxed text-sm font-light font-sans">
            KAWA implements constant-time <code className="text-xs font-mono bg-[#16181e] text-[#c8f53c] px-2 py-0.5 rounded border border-white/10">O(1)</code> Synthetix-standard reward distribution. Regardless of the number of concurrent stakers, every interaction executes with minimal computation and predictable gas.
          </p>

          <div className="p-6 bg-[#121418] border border-white/[0.08] rounded-2xl font-mono text-xs space-y-4 shadow-lg">
            <div className="text-[#8e95a2] text-[10px] tracking-widest uppercase">
              Accumulated Reward Per Token Equation
            </div>
            <div className="text-white font-medium leading-loose tracking-wider text-sm sm:text-base">
              r(t) = r(t₀) + [ (t - t₀) &times; R &times; 10¹⁸ ] / S
            </div>
            <div className="text-[#8e95a2] text-[11px] leading-relaxed pt-2 border-t border-white/[0.05]">
              Where <strong className="text-white">R</strong> is the protocol reward rate per second, <strong className="text-white">S</strong> is the total staked supply in the contract, and <strong className="text-white">(t - t₀)</strong> is the elapsed duration since the last checkpoint.
            </div>
          </div>

          <div className="p-6 bg-[#121418] border border-white/[0.08] rounded-2xl font-mono text-xs space-y-4 shadow-lg">
            <div className="text-[#8e95a2] text-[10px] tracking-widest uppercase">
              User Claimable Reward Calculation
            </div>
            <div className="text-[#c8f53c] font-medium leading-loose tracking-wider text-sm sm:text-base">
              E(u) = E_stored(u) + [ s(u) &times; ( r(t) - r_paid(u) ) ] / 10¹⁸
            </div>
            <div className="text-[#8e95a2] text-[11px] leading-relaxed pt-2 border-t border-white/[0.05]">
              Where <strong className="text-white">s(u)</strong> represents user balance, and <strong className="text-white">r_paid(u)</strong> represents the reward per token checkpoint already settled.
            </div>
          </div>
        </section>

        {/* Section 3: The Flow Lifecycle */}
        <section className="space-y-6">
          <div className="flex items-baseline gap-4">
            <span className="text-xs font-mono text-[#c8f53c]">03</span>
            <h2 className="text-lg font-mono font-medium tracking-[0.15em] uppercase text-white">
              LIFECYCLE OF STAKED CAPITAL
            </h2>
          </div>

          <div className="border border-white/[0.08] rounded-2xl divide-y divide-white/[0.06] bg-[#121418] overflow-hidden">
            <div className="p-5 flex flex-col sm:flex-row justify-between gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white sm:w-1/3">
                Deposit (Stake USDG)
              </span>
              <span className="text-xs sm:text-sm text-[#8e95a2] sm:w-2/3 leading-relaxed">
                User deposits USDG into KAWAStaking.sol via standard ERC-20 approval. Account checkpoint is immediately captured.
              </span>
            </div>
            <div className="p-5 flex flex-col sm:flex-row justify-between gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white sm:w-1/3">
                Continuous Stream
              </span>
              <span className="text-xs sm:text-sm text-[#8e95a2] sm:w-2/3 leading-relaxed">
                Layer5 (L5) yield accrues seamlessly every second without requiring manual re-staking or lock-in penalties.
              </span>
            </div>
            <div className="p-5 flex flex-col sm:flex-row justify-between gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white sm:w-1/3">
                Claim (Harvest L5)
              </span>
              <span className="text-xs sm:text-sm text-[#8e95a2] sm:w-2/3 leading-relaxed">
                Accrued Layer5 (L5) rewards are transferred directly to the user wallet while USDG principal remains actively staked.
              </span>
            </div>
            <div className="p-5 flex flex-col sm:flex-row justify-between gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white sm:w-1/3">
                Exit (Unstake USDG)
              </span>
              <span className="text-xs sm:text-sm text-[#8e95a2] sm:w-2/3 leading-relaxed">
                Users can withdraw their staked USDG principal at any time with zero lockup penalty and instant settlement.
              </span>
            </div>
          </div>
        </section>

        {/* Section 4: Security & Verification */}
        <section className="space-y-6">
          <div className="flex items-baseline gap-4">
            <span className="text-xs font-mono text-[#c8f53c]">04</span>
            <h2 className="text-lg font-mono font-medium tracking-[0.15em] uppercase text-white">
              SECURITY INVARIANTS & AUDIT
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#121418] border border-white/[0.08] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c8f53c]">GUARD</span>
              <div className="text-xs font-mono font-medium text-white">ReentrancyGuard</div>
              <p className="text-xs text-[#8e95a2] leading-relaxed">All state-modifying deposit, withdrawal, and claim functions enforce nonReentrant execution.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#121418] border border-white/[0.08] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c8f53c]">TRANSFER SAFETY</span>
              <div className="text-xs font-mono font-medium text-white">OpenZeppelin SafeERC20</div>
              <p className="text-xs text-[#8e95a2] leading-relaxed">Strict boolean verification handles non-standard ERC-20 return behaviors safely.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#121418] border border-white/[0.08] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c8f53c]">GAS ASSET</span>
              <div className="text-xs font-mono font-medium text-white">Robinhood Chain ETH</div>
              <p className="text-xs text-[#8e95a2] leading-relaxed">Network transactions utilize native ETH for execution gas fees only.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#121418] border border-white/[0.08] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c8f53c]">NETWORK</span>
              <div className="text-xs font-mono font-medium text-white">Robinhood Chain EVM</div>
              <p className="text-xs text-[#8e95a2] leading-relaxed">Sub-second transaction finality with robust settlement guarantees.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Contract Addresses */}
        <section className="space-y-6 pt-4 border-t border-white/10">
          <div className="flex items-baseline gap-4">
            <span className="text-xs font-mono text-[#c8f53c]">05</span>
            <h2 className="text-lg font-mono font-medium tracking-[0.15em] uppercase text-white">
              DEPLOYED CONTRACT SPECIFICATION
            </h2>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#121418] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[#8e95a2] uppercase text-[10px] tracking-wider">Staking Vault Contract</span>
              <span className="text-[#c8f53c] font-medium font-mono text-[11px]">TBA (Announced at Mainnet Launch)</span>
            </div>
            <div className="p-4 rounded-xl bg-[#121418] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[#8e95a2] uppercase text-[10px] tracking-wider">Staking Asset (USDG)</span>
              <span className="text-white font-medium font-mono text-[11px]">TBA (Announced at Mainnet Launch)</span>
            </div>
            <div className="p-4 rounded-xl bg-[#121418] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[#8e95a2] uppercase text-[10px] tracking-wider">Reward Token (L5)</span>
              <span className="text-white font-medium font-mono text-[11px]">TBA (Announced at Mainnet Launch)</span>
            </div>
          </div>
        </section>

        {/* Editorial Colophon */}
        <footer className="pt-12 border-t border-white/10 text-center text-xs font-mono text-[#8e95a2] uppercase tracking-widest space-y-3">
          <div>LAYER5 PROTOCOL • SPECIFICATION RELEASE 1.0</div>
          <div className="flex items-center justify-center gap-2">
            <a
              href="https://x.com/layer5dotio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-[#c8f53c] transition lowercase text-xs"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>@layer5dotio</span>
            </a>
          </div>
          <div className="text-[10px] text-neutral-500">ROBINHOOD CHAIN MAINNET • ARCHITECTURAL SPECIFICATION</div>
        </footer>
      </article>
    </div>
  );
}
