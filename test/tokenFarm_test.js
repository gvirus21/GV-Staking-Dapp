const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Farm Tests", async () => {
  let gvTokenAddress;
  let tokenFarmAddress;

  let gvToken
  let tokenFarm;
  let address1;

  before(async () => {
    let GVToken = await ethers.getContractFactory("GVToken");
    gvToken = await GVToken.deploy();
    await gvToken.deployed();

    gvTokenAddress = gvToken.address;
    console.log("GVToken is deployed to: ", gvTokenAddress);

    let TokenFarm = await ethers.getContractFactory("TokenFarm");
    tokenFarm = await TokenFarm.deploy(gvTokenAddress);
    await tokenFarm.deployed();

    tokenFarmAddress = tokenFarm.address;
    console.log("TokenFarm is deployed to: ", tokenFarmAddress);
  });

  beforeEach(async () => {
    [address1] = await ethers.getSigners();
    const totalGVTokens = await gvToken.totalSupply();
    await gvToken.transfer(address1.address, totalGVTokens)
  });

  it("TokenFarm Should deploy GVToken", async () => {
    expect(await tokenFarm.gvToken()).to.equal(gvTokenAddress);
  });
});
