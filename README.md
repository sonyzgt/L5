# Aegis — Web3 Staking Protocol on Robinhood Chain

> **STAKE → FLOW → GROW → REWARD**  
> An institutional-grade, cinematic staking protocol built natively for **Robinhood Chain**.  
> Twitter/X: [@aegistak](https://x.com/aegistak)

---

## 1. Overview & Architecture

Aegis is engineered as an autonomous, non-custodial decentralized liquidity and staking protocol on Robinhood Chain L2. Value is not treated as static rows in a database, but as a continuous algorithmic stream.

- **Settlement Layer**: Robinhood Chain (Sub-second finality, negligible transaction gas costs, Chain ID: 4663).
- **Core Visual Artifact**: `AegisCore` — A reactive emblem evolving across 5 dynamic staking phases:
  1. `Dormant` (0 USDG staked)
  2. `Activated` (Staked > 0, duration < 1 day)
  3. `Growing` (Duration 1–7 days)
  4. `Mature` (Duration 7–30 days)
  5. `Awakened` (Duration 30+ days)
- **Mathematical Yield Model**: Synthetix-standard $O(1)$ `rewardPerToken` accounting implemented in Solidity.
- **Web3 Engine**: Wagmi v2 + RainbowKit + Viem + TanStack Query with automatic wrong-network detection and "Switch to Robinhood Chain" recovery.
- **Transaction State System**: Transparent transitions across `IDLE`, `CONFIRMING`, `PENDING`, `SUCCESS`, and `FAILED` with human-readable error messaging.

---

## 2. Directory Layout

```text
├── contracts/
│   ├── KAWAStaking.sol          # Core Synthetix-standard staking & reward engine
│   └── MockToken.sol            # Test ERC20 token for simulation
├── src/
│   ├── app/
│   │   ├── layout.tsx           # SEO metadata, Open Graph, fonts & Web3 providers
│   │   ├── page.tsx             # Cinematic Warm Paper landing experience
│   │   ├── stake/page.tsx       # Dedicated USDG staking console
│   │   ├── position/page.tsx    # Dedicated personal position viewer
│   │   ├── stats/page.tsx       # On-chain network statistics & verified contracts
│   │   ├── docs/page.tsx        # Technical documentation & smart contract interfaces
│   │   └── api/                 # Analytics & telemetry endpoints
│   ├── components/
│   │   ├── Brand/               # Aegis emblem & watermark assets
│   │   ├── Scene/               # Cinematic scenes & interactive landing components
│   │   ├── Navigation/          # Minimal responsive navbar & drawer
│   │   ├── Staking/             # Clean USDG staking dashboard & actions
│   │   ├── Position/            # Position card & state derivation
│   │   ├── Stats/               # Real on-chain metrics viewer
│   │   └── Wallet/              # EVM wallet connection modal
│   └── lib/
│       ├── blockchain/          # Centralized Robinhood Chain config & Wagmi
│       ├── contracts/           # Centralized ABI definitions
│       └── hooks/               # useAegisStaking unified hook
└── prisma/
    └── schema.prisma            # Database models for indexing & analytics
```

---

## 3. Quick Start

### Prerequisites
- Node.js 18+ (tested on v20 and v22)
- pnpm 9+ / 10+ or npm

### Installation
```bash
pnpm install
```

### Run Smart Contract Tests
```bash
npx hardhat test
```

### Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to experience the protocol.

### Production Build
```bash
pnpm build
pnpm start
```

---

## 4. Security Standards
- OpenZeppelin `SafeERC20` guards all asset transfers.
- `ReentrancyGuard` protects all mutative operations (`stake`, `unstake`, `claim`, `exit`).
- Pure on-chain mathematical source of truth.
- Zero admin custody backdoors over user principal deposits.
