const hre = require("hardhat");
async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log("Signer address:", signer.address);
}
main();
