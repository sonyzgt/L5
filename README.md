# KAWA — Web3 Staking Protocol on Robinhood Chain

> **STAKE → FLOW → GROW → REWARD**  
> A minimal, futuristic, cinematic staking protocol built natively for **Robinhood Chain**.

---

## 1. Overview & Architecture

KAWA is designed as an independent living protocol with its own world and identity. Value is not treated as static rows in a table, but as a continuous kinetic stream.

- **Settlement Layer**: Robinhood Chain (Sub-second finality, negligible transaction gas costs).
- **Core Visual Artifact**: `KawaCore` — An abstract 3D geometric object rendered in Three.js / React Three Fiber that reactively evolves across 5 staking phases:
  1. `Dormant` (0 tokens staked)
  2. `Activated` (Staked > 0, duration < 1 day)
  3. `Growing` (Duration 1–7 days)
  4. `Mature` (Duration 7–30 days)
  5. `Awakened` (Duration 30+ days)
- **Mathematical Yield Model**: Synthetix-standard $O(1)$ `rewardPerToken` accounting implemented in Solidity 0.8.20.
- **Web3 Engine**: Wagmi v2 + Viem + TanStack Query with automatic wrong-network detection and "Switch to Robinhood Chain" recovery.
- **Transaction State System**: Transparent transitions across `IDLE`, `CONFIRMING`, `PENDING`, `SUCCESS`, and `FAILED` with humane error message translation.

---

## 2. Directory Layout

```text
├── contracts/
│   ├── KAWAStaking.sol          # Core Synthetix-standard staking & reward engine
│   └── MockToken.sol            # Test ERC20 token for testnets and simulation
├── test/
│   └── KAWAStaking.test.cjs     # 18 passing tests covering all staking mechanics
├── scripts/
│   └── deploy.cjs               # Deployment script for Robinhood Chain
├── src/
│   ├── app/
│   │   ├── layout.tsx           # SEO metadata, Open Graph, fonts & Web3 providers
│   │   ├── page.tsx             # Cinematic scene-based experience (Scenes 01-06)
│   │   ├── stake/page.tsx       # Dedicated staking console
│   │   ├── position/page.tsx    # Dedicated personal position & 3D KawaCore viewer
│   │   ├── stats/page.tsx       # On-chain network statistics & verified contracts
│   │   ├── docs/page.tsx        # Technical documentation (8 sections)
│   │   └── api/                 # Analytics & indexing endpoints
│   ├── components/
│   │   ├── KawaCore/            # 3D R3F artifact + CSS fallback
│   │   ├── Scene/               # Scenes 01 to 06 and SceneContainer
│   │   ├── Navigation/          # Minimal navbar & mobile drawer
│   │   ├── Staking/             # Clean staking dashboard & actions
│   │   ├── Position/            # Position card & state derivation
│   │   ├── Stats/               # Real on-chain metrics viewer
│   │   ├── Transaction/         # Reusable transaction status modal
│   │   └── Wallet/              # EVM wallet connection & network banner
│   └── lib/
│       ├── blockchain/          # Centralized Robinhood Chain config & Wagmi
│       ├── contracts/           # Centralized ABI definitions
│       └── hooks/               # useKawaStaking unified hook
└── prisma/
    └── schema.prisma            # Database models for indexing & analytics
```

---

## 3. Quick Start

### Prerequisites
- Node.js 18+ (tested on v22)
- pnpm 9+ / 11+ or npm

### Installation
```bash
pnpm install
```

### Run Smart Contract Tests
```bash
npx hardhat test
```
*Output: 18 passing tests covering zero-amount staking, multiple stakers, proportional reward distribution, claim, partial/full unstake, exit, duration tracking, and reentrancy protection.*

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

## 4. Environment Variables

Create `.env.local` based on `.env.example`:

```env
# Robinhood Chain
NEXT_PUBLIC_ROBINHOOD_CHAIN_ID=999999
NEXT_PUBLIC_ROBINHOOD_CHAIN_NAME="Robinhood Chain"
NEXT_PUBLIC_ROBINHOOD_RPC_URL="https://rpc.robinhood-chain.network"
NEXT_PUBLIC_ROBINHOOD_EXPLORER_URL="https://explorer.robinhood-chain.network"
NEXT_PUBLIC_ROBINHOOD_CURRENCY_SYMBOL="ETH"

# Contracts
NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS=""
NEXT_PUBLIC_STAKE_TOKEN_ADDRESS=""   # USDG Token
NEXT_PUBLIC_REWARD_TOKEN_ADDRESS=""  # KAWA Token

# Web3 (Optional WalletConnect project ID)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=""

# Database
DATABASE_URL="file:./dev.db"
```

---

## 5. Smart Contract Deployment to Robinhood Chain

When deploying to live Robinhood Chain:
```bash
# Set private key and RPC
export DEPLOYER_PRIVATE_KEY="0x..."
export ROBINHOOD_RPC_URL="https://rpc.robinhood-chain.network"
export ROBINHOOD_CHAIN_ID="999999"

# Deploy
node scripts/deploy.cjs
```
Copy the logged contract addresses into your `.env.production`.

---

## 6. Security Standards
- OpenZeppelin `SafeERC20` guards all transfers.
- `ReentrancyGuard` protects all mutative operations (`stake`, `unstake`, `claim`, `exit`).
- Pure on-chain mathematical source of truth.
- Zero private keys or server secrets exposed to the client.
