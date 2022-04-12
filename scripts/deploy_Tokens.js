const hre = require("hardhat");

const main = async () => {
  //deploying GVToken

  const GVToken = await hre.ethers.getContractFactory("GVToken");
  const gvToken = await GVToken.deploy();

  await gvToken.deployed();

  console.log("GVToken deployed to: ", gvToken.address);

  //deploying StakeToken

  const StakeToken = await hre.ethers.getContractFactory("StakeToken");
  const stakeToken = await StakeToken.deploy();

  await stakeToken.deployed();

  console.log("StakeToken deployed to: ", stakeToken.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
