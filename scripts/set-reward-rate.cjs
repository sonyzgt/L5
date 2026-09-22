const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log("Calling setRewardRate on Robinhood Chain...");
  console.log("Signer / Owner:", signer.address);

  const contractAddress = process.env.STAKING_CONTRACT_ADDRESS || "";
  if (!contractAddress) {
    console.error("Please set STAKING_CONTRACT_ADDRESS in environment.");
    process.exit(1);
  }
  const Layer5Staking = await hre.ethers.getContractAt("Layer5Staking", contractAddress);

  const currentRate = await Layer5Staking.rewardRate();
  console.log("Current Reward Rate:", hre.ethers.formatUnits(currentRate, 18), "L5/sec");

  // Setting to 5 L5 per second (5x speed)
  const newRate = hre.ethers.parseUnits("5", 18);
  console.log("Setting New Reward Rate to:", hre.ethers.formatUnits(newRate, 18), "L5/sec");

  const tx = await KAWAStaking.setRewardRate(newRate);
  console.log("Transaction Hash:", tx.hash);
  console.log("Waiting for confirmation...");
  const receipt = await tx.wait();
  console.log("Transaction confirmed in block:", receipt.blockNumber);

  const updatedRate = await KAWAStaking.rewardRate();
  console.log("Updated Reward Rate:", hre.ethers.formatUnits(updatedRate, 18), "L5/sec");
  console.log("SUCCESS!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error setting reward rate:", err);
    process.exit(1);
  });
