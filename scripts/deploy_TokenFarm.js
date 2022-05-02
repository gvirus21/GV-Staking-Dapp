const hre = require("hardhat");

async function main() {
  hre.run("compile");

  const gvTokenAddress = "0xE3DE370D11105c3C1B5D65Fa8f3e77a634367494";

  const TokenFarm = await hre.ethers.getContractFactory("TokenFarm");
  const tokenFarm = await TokenFarm.deploy(gvTokenAddress);

  await tokenFarm.deployed();

  console.log("TokenFarm deployed to:", tokenFarm.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
