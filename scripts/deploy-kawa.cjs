const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("====================================================");
  console.log("DEPLOYING KAWA STAKING CONTRACT (MAINNET)");
  console.log("====================================================");
  console.log("Deployer / Owner:", deployer.address);
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance:", hre.ethers.formatEther(balance), "ETH");

  const stakingTokenAddress = "0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168"; // USDG
  const rewardTokenAddress = "0xdcc66603f5f60cf154366b5d7901f3c30639c3b4";  // KAWA

  console.log("\nStaking Token (USDG):", stakingTokenAddress);
  console.log("Reward Token (KAWA):", rewardTokenAddress);

  // Check ERC20 details of reward token
  try {
    const rewardToken = await hre.ethers.getContractAt(
      ["function name() view returns (string)", "function symbol() view returns (string)", "function decimals() view returns (uint8)"],
      rewardTokenAddress
    );
    const name = await rewardToken.name();
    const symbol = await rewardToken.symbol();
    const decimals = await rewardToken.decimals();
    console.log(`Verified Reward Token: ${name} (${symbol}), Decimals: ${decimals}`);
  } catch (err) {
    console.warn("Could not read token details directly (might not implement full ERC20 metadata or contract):", err.message);
  }

  // Initial reward rate: 0.0001 tokens per second (~8.64 KAWA/day). Owner can change this anytime via setRewardRate()
  const initialRewardRate = hre.ethers.parseUnits("0.0001", 18);

  console.log("\nDeploying KAWAStaking smart contract...");
  const KAWAStaking = await hre.ethers.getContractFactory("KAWAStaking");
  const stakingContract = await KAWAStaking.deploy(
    stakingTokenAddress,
    rewardTokenAddress,
    initialRewardRate
  );

  await stakingContract.waitForDeployment();
  const stakingContractAddress = await stakingContract.getAddress();

  console.log("\n>>> SUCCESS! KAWAStaking deployed at:", stakingContractAddress);
  console.log("Contract Owner:", await stakingContract.owner());
  console.log("====================================================");
  console.log("\nConfiguration for your VPS .env file:");
  console.log(`NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS="${stakingContractAddress}"`);
  console.log(`STAKING_CONTRACT_ADDRESS="${stakingContractAddress}"`);
  console.log(`NEXT_PUBLIC_STAKE_TOKEN_ADDRESS="${stakingTokenAddress}"`);
  console.log(`STAKE_TOKEN_ADDRESS="${stakingTokenAddress}"`);
  console.log(`NEXT_PUBLIC_REWARD_TOKEN_ADDRESS="${rewardTokenAddress}"`);
  console.log(`REWARD_TOKEN_ADDRESS="${rewardTokenAddress}"`);
  console.log("====================================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
