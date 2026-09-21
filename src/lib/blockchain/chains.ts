import { defineChain } from "viem";

/**
 * Centralized Robinhood Chain definition.
 * Reads parameters dynamically from environment variables without hardcoded or fabricated values.
 * Native gas asset on Robinhood Chain is ETH.
 */
const chainId = process.env.ROBINHOOD_CHAIN_ID || process.env.NEXT_PUBLIC_ROBINHOOD_CHAIN_ID
  ? parseInt((process.env.ROBINHOOD_CHAIN_ID || process.env.NEXT_PUBLIC_ROBINHOOD_CHAIN_ID)!, 10)
  : 4663;

const rpcUrl = process.env.ROBINHOOD_RPC_URL || process.env.NEXT_PUBLIC_ROBINHOOD_RPC_URL || "https://rpc.mainnet.chain.robinhood.com";
const explorerUrl = process.env.ROBINHOOD_EXPLORER_URL || process.env.NEXT_PUBLIC_ROBINHOOD_EXPLORER_URL || "https://robinhoodchain.blockscout.com";
const chainName = process.env.ROBINHOOD_CHAIN_NAME || process.env.NEXT_PUBLIC_ROBINHOOD_CHAIN_NAME || "Robinhood Chain";

export const robinhoodChain = defineChain({
  id: chainId,
  name: chainName,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [rpcUrl],
    },
    public: {
      http: [rpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: "Robinhood Blockscout",
      url: explorerUrl,
    },
  },
  testnet: false,
});

// Local Hardhat chain for local development and testing
export const hardhatChain = defineChain({
  id: 31337,
  name: "Hardhat Local Testnet",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
  },
  testnet: true,
});
