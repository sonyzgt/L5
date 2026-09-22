const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("----------------------------------------------------");
  console.log("Deploying KAWA Protocol on Robinhood Chain...");
  console.log("Deployer account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Check if token addresses are provided in env, else deploy mock tokens for testnet/local
  let stakingTokenAddress = process.env.STAKE_TOKEN_ADDRESS || process.env.NEXT_PUBLIC_STAKE_TOKEN_ADDRESS;
  let rewardTokenAddress = process.env.REWARD_TOKEN_ADDRESS || process.env.NEXT_PUBLIC_REWARD_TOKEN_ADDRESS;

  if (!stakingTokenAddress) {
    console.log("\nDeploying Mock USDG Staking Token...");
    const MockToken = await hre.ethers.getContractFactory("MockToken");
    const stakingToken = await MockToken.deploy("USD Global", "USDG", 18);
    await stakingToken.waitForDeployment();
    stakingTokenAddress = await stakingToken.getAddress();
    console.log("Mock Staking Token deployed to:", stakingTokenAddress);
  }

  if (!rewardTokenAddress) {
    console.log("\nDeploying Mock KAWA Reward Token...");
    const MockToken = await hre.ethers.getContractFactory("MockToken");
    const rewardToken = await MockToken.deploy("KAWA Protocol", "KAWA", 18);
    await rewardToken.waitForDeployment();
    rewardTokenAddress = await rewardToken.getAddress();
    console.log("Mock Reward Token deployed to:", rewardTokenAddress);
  }

  // Initial reward rate: 0.0005 tokens per second (~43.2 L5/day, 5x speed)
  const initialRewardRate = hre.ethers.parseUnits("0.0005", 18);

  console.log("\nDeploying Layer5Staking contract...");
  const Layer5Staking = await hre.ethers.getContractFactory("Layer5Staking");
  const stakingContract = await Layer5Staking.deploy(
    stakingTokenAddress,
    rewardTokenAddress,
    initialRewardRate
  );
  await stakingContract.waitForDeployment();
  const stakingContractAddress = await stakingContract.getAddress();

  console.log("Layer5Staking contract deployed to:", stakingContractAddress);
  console.log("----------------------------------------------------");
  console.log("\nEnvironment configuration variables for .env:");
  console.log(`STAKING_CONTRACT_ADDRESS=${stakingContractAddress}`);
  console.log(`STAKE_TOKEN_ADDRESS=${stakingTokenAddress}`);
  console.log(`REWARD_TOKEN_ADDRESS=${rewardTokenAddress}`);
  console.log("----------------------------------------------------");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
