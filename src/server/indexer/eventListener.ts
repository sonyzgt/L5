import { createPublicClient, http, parseAbiItem } from "viem";
import { robinhoodChain } from "@/lib/blockchain/chains";
import { protocolConfig } from "@/lib/blockchain/config";

const client = createPublicClient({
  chain: robinhoodChain,
  transport: http(protocolConfig.rpcUrl),
});

export async function startIndexer() {
  const contractAddress = protocolConfig.stakingContractAddress;
  if (!contractAddress) {
    console.log("[Indexer] Staking contract address not configured. Indexer waiting...");
    return;
  }

  console.log(`[Indexer] Starting event listener on ${protocolConfig.chainName} for ${contractAddress}`);

  // Event signatures
  const stakedEvent = parseAbiItem(
    "event Staked(address indexed user, uint256 amount, uint256 timestamp)"
  );
  const unstakedEvent = parseAbiItem(
    "event Unstaked(address indexed user, uint256 amount, uint256 timestamp)"
  );
  const rewardPaidEvent = parseAbiItem(
    "event RewardPaid(address indexed user, uint256 reward, uint256 timestamp)"
  );

  // Watch for Staked events
  client.watchEvent({
    address: contractAddress,
    event: stakedEvent,
    onLogs: (logs) => {
      for (const log of logs) {
        const { user, amount, timestamp } = (log as any).args;
        console.log(`[Indexer:Staked] User: ${user}, Amount: ${amount}, Tx: ${log.transactionHash}`);
      }
    },
  });

  // Watch for Unstaked events
  client.watchEvent({
    address: contractAddress,
    event: unstakedEvent,
    onLogs: (logs) => {
      for (const log of logs) {
        const { user, amount, timestamp } = (log as any).args;
        console.log(`[Indexer:Unstaked] User: ${user}, Amount: ${amount}, Tx: ${log.transactionHash}`);
      }
    },
  });

  // Watch for RewardPaid events
  client.watchEvent({
    address: contractAddress,
    event: rewardPaidEvent,
    onLogs: (logs) => {
      for (const log of logs) {
        const { user, reward, timestamp } = (log as any).args;
        console.log(`[Indexer:RewardPaid] User: ${user}, Reward: ${reward}, Tx: ${log.transactionHash}`);
      }
    },
  });
}
