/**
 * Frontend data models conforming strictly to KAWA two-token DeFi architecture:
 * Staking Asset = USDG
 * Reward Token = KAWA
 * Gas Asset = ETH
 */

export type StakingPosition = {
  usdStaked: bigint;
  kawaRewards: bigint;
  durationSeconds?: number;
};

export type ProtocolStats = {
  totalUsdStaked: bigint;
  totalKawaDistributed: bigint;
  totalStakers: number;
  rewardRate: bigint;
};
