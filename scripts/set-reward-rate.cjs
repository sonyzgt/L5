const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log("Calling setRewardRate on Robinhood Chain...");
  console.log("Signer / Owner:", signer.address);

  const contractAddress = "0x4944EDF557C36e9b4964fc5988871ea61748d918";
  const KAWAStaking = await hre.ethers.getContractAt("KAWAStaking", contractAddress);

  const currentRate = await KAWAStaking.rewardRate();
  console.log("Current Reward Rate:", hre.ethers.formatUnits(currentRate, 18), "KAWA/sec");

  // Setting back to 1 KAWA per second (1e18) like before
  const newRate = hre.ethers.parseUnits("1", 18);
  console.log("Setting New Reward Rate to:", hre.ethers.formatUnits(newRate, 18), "KAWA/sec");

  const tx = await KAWAStaking.setRewardRate(newRate);
  console.log("Transaction Hash:", tx.hash);
  console.log("Waiting for confirmation...");
  const receipt = await tx.wait();
  console.log("Transaction confirmed in block:", receipt.blockNumber);

  const updatedRate = await KAWAStaking.rewardRate();
  console.log("Updated Reward Rate:", hre.ethers.formatUnits(updatedRate, 18), "KAWA/sec");
  console.log("SUCCESS!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error setting reward rate:", err);
    process.exit(1);
  });
