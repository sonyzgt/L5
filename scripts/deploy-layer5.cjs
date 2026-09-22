const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("====================================================");
  console.log("DEPLOYING LAYER5 STAKING CONTRACT (MAINNET)");
  console.log("====================================================");
  console.log("Deployer / Owner:", deployer.address);
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance:", hre.ethers.formatEther(balance), "ETH");

  const stakingTokenAddress = process.env.STAKE_TOKEN_ADDRESS || ""; // USDG
  const rewardTokenAddress = process.env.REWARD_TOKEN_ADDRESS || "";  // Reward token

  if (!stakingTokenAddress || !rewardTokenAddress) {
    console.error("Please set STAKE_TOKEN_ADDRESS and REWARD_TOKEN_ADDRESS in environment.");
    process.exit(1);
  }

  console.log("\nStaking Token:", stakingTokenAddress);
  console.log("Reward Token:", rewardTokenAddress);

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

  // Initial reward rate: 0.0005 tokens per second (~43.2 L5/day, 5x speed). Owner can change this anytime via setRewardRate()
  const initialRewardRate = hre.ethers.parseUnits("0.0005", 18);

  console.log("\nDeploying Layer5Staking smart contract...");
  const Layer5Staking = await hre.ethers.getContractFactory("Layer5Staking");
  const stakingContract = await Layer5Staking.deploy(
    stakingTokenAddress,
    rewardTokenAddress,
    initialRewardRate
  );

  await stakingContract.waitForDeployment();
  const stakingContractAddress = await stakingContract.getAddress();

  console.log("\n>>> SUCCESS! Layer5Staking deployed at:", stakingContractAddress);
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
