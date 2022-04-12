const hre = require("hardhat");

async function main() {
  hre.run("compile");

  const gvTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const stakeTokenAddres = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const TokenFarm = await hre.ethers.getContractFactory("TokenFarm");
  const tokenFarm = await TokenFarm.deploy(gvTokenAddress, stakeTokenAddres);

  await tokenFarm.deployed();

  console.log("TokenFarm deployed to:", tokenFarm.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
