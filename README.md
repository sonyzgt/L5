# Layer5 — Web3 Staking Protocol on Robinhood Chain

> **STAKE → FLOW → GROW → REWARD**  
> A minimal, futuristic, cinematic staking protocol built natively for **Robinhood Chain**.
> Hosted at: [layerfive.io](https://layerfive.io)

---

## 1. Overview & Architecture

Layer5 is designed as an independent living protocol with its own world and identity. Value is not treated as static rows in a table, but as a continuous kinetic stream.

- **Settlement Layer**: Robinhood Chain (Sub-second finality, negligible transaction gas costs, Chain ID: 4663).
- **Core Visual Artifact**: `Layer5Core` — An abstract 3D geometric object rendered in Three.js / React Three Fiber that reactively evolves across 5 staking phases:
  1. `Dormant` (0 tokens staked)
  2. `Activated` (Staked > 0, duration < 1 day)
  3. `Growing` (Duration 1–7 days)
  4. `Mature` (Duration 7–30 days)
  5. `Awakened` (Duration 30+ days)
- **Mathematical Yield Model**: Synthetix-standard $O(1)$ `rewardPerToken` accounting implemented in Solidity 0.8.20.
- **Web3 Engine**: Wagmi v2 + RainbowKit + Viem + TanStack Query with automatic wrong-network detection and "Switch to Robinhood Chain" recovery.
- **Transaction State System**: Transparent transitions across `IDLE`, `CONFIRMING`, `PENDING`, `SUCCESS`, and `FAILED` with humane error message translation.

---

## 2. Directory Layout

```text
├── contracts/
│   ├── Layer5Staking.sol        # Core Synthetix-standard staking & reward engine
│   └── MockToken.sol            # Test ERC20 token for testnets and simulation
├── test/
│   └── Layer5Staking.test.cjs   # 18 passing tests covering all staking mechanics
├── scripts/
│   ├── deploy.cjs               # Deployment script for Robinhood Chain
│   ├── deploy-layer5.cjs        # Mainnet deployment script
│   └── set-reward-rate.cjs      # Admin reward rate configuration
├── src/
│   ├── app/
│   │   ├── layout.tsx           # SEO metadata, Open Graph, fonts & Web3 providers
│   │   ├── page.tsx             # Cinematic scene-based experience
│   │   ├── stake/page.tsx       # Dedicated staking console
│   │   ├── position/page.tsx    # Dedicated personal position & 3D Layer5Core viewer
│   │   ├── stats/page.tsx       # On-chain network statistics & verified contracts
│   │   ├── docs/page.tsx        # Technical documentation
│   │   └── api/                 # Analytics & indexing endpoints
│   ├── components/
│   │   ├── Layer5Core/          # 3D R3F artifact + CSS fallback
│   │   ├── Scene/               # Cinematic scenes and SceneContainer
│   │   ├── Navigation/          # Minimal navbar & mobile drawer
│   │   ├── Staking/             # Clean staking dashboard & actions
│   │   ├── Position/            # Position card & state derivation
│   │   ├── Stats/               # Real on-chain metrics viewer
│   │   ├── Transaction/         # Reusable transaction status modal
│   │   └── Wallet/              # EVM wallet connection & network banner
│   └── lib/
│       ├── blockchain/          # Centralized Robinhood Chain config & Wagmi
│       ├── contracts/           # Centralized ABI definitions
│       └── hooks/               # useLayer5Staking unified hook
└── prisma/
    └── schema.prisma            # Database models for indexing & analytics
```

---

## 3. Quick Start

### Prerequisites
- Node.js 18+ (tested on v20 and v22)
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

## 4. VPS Deployment Guide (domain: layerfive.io)

### Step 1: Clone Repository on VPS
```bash
git clone https://github.com/sonyzgt/L5.git
cd L5
```

### Step 2: Install Dependencies & Setup Environment
```bash
pnpm install
cp .env.example .env
# Edit .env with your environment settings
nano .env
```

### Step 3: Build & Start with PM2
```bash
pnpm build
pm2 start pnpm --name "layer5" -- start
pm2 save
```

### Step 4: Configure Nginx & SSL
Point `layerfive.io` to your VPS IP:
```nginx
server {
    server_name layerfive.io www.layerfive.io;

    location / {
        proxy_pass http://127.0.0.1:3023; # or your configured port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Issue SSL certificate with Certbot:
```bash
certbot --nginx -d layerfive.io -d www.layerfive.io
```

---

## 5. Security Standards
- OpenZeppelin `SafeERC20` guards all transfers.
- `ReentrancyGuard` protects all mutative operations (`stake`, `unstake`, `claim`, `exit`).
- Pure on-chain mathematical source of truth.
- Zero private keys or server secrets exposed to the client.
