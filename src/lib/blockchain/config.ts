import { isAddress } from "viem";
import { robinhoodChain, hardhatChain } from "./chains";

export interface ProtocolConfig {
  chainId: number;
  chainName: string;
  stakeAsset: "USDG";
  rewardAsset: "KAWA";
  gasAsset: "ETH";
  currencySymbol: "USDG";
  rpcUrl: string;
  explorerUrl: string;
  stakingContractAddress?: `0x${string}`;
  stakeTokenAddress?: `0x${string}`;
  rewardTokenAddress?: `0x${string}`;
  isConfigured: boolean;
  isDevMode: boolean;
}

const parseAddress = (addr?: string): `0x${string}` | undefined => {
  if (addr && isAddress(addr)) {
    return addr as `0x${string}`;
  }
  return undefined;
};

export const protocolConfig: ProtocolConfig = {
  chainId: robinhoodChain.id,
  chainName: robinhoodChain.name,
  stakeAsset: "USDG",
  rewardAsset: "KAWA",
  gasAsset: "ETH",
  currencySymbol: "USDG",
  rpcUrl: robinhoodChain.rpcUrls.default.http[0],
  explorerUrl: robinhoodChain.blockExplorers?.default.url || "",
  stakingContractAddress: parseAddress(
    process.env.STAKING_CONTRACT_ADDRESS || process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "0x4944EDF557C36e9b4964fc5988871ea61748d918"
  ),
  stakeTokenAddress: parseAddress(
    process.env.STAKE_TOKEN_ADDRESS || process.env.NEXT_PUBLIC_STAKE_TOKEN_ADDRESS || "0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168"
  ),
  rewardTokenAddress: parseAddress(
    process.env.REWARD_TOKEN_ADDRESS || process.env.NEXT_PUBLIC_REWARD_TOKEN_ADDRESS || "0xdcc66603f5f60cf154366b5d7901f3c30639c3b4"
  ),
  isConfigured: Boolean(
    parseAddress(
      process.env.STAKING_CONTRACT_ADDRESS || process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "0x4944EDF557C36e9b4964fc5988871ea61748d918"
    )
  ),
  isDevMode: process.env.NEXT_PUBLIC_ENABLE_TESTNET_MODE === "true",
};

export const SUPPORTED_CHAINS = [robinhoodChain, hardhatChain] as const;

export type KawaCoreState = "dormant" | "activated" | "growing" | "mature" | "awakened";

export function deriveKawaState(stakedAmount: bigint, durationSeconds: number): KawaCoreState {
  if (stakedAmount === 0n) {
    return "dormant";
  }
  const ONE_DAY = 86400;
  const ONE_WEEK = 7 * ONE_DAY;
  const ONE_MONTH = 30 * ONE_DAY;

  if (durationSeconds < ONE_DAY) {
    return "activated";
  } else if (durationSeconds < ONE_WEEK) {
    return "growing";
  } else if (durationSeconds < ONE_MONTH) {
    return "mature";
  } else {
    return "awakened";
  }
}
