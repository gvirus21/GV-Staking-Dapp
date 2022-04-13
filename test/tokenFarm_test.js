const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Farm Tests", async () => {

  let gvTokenAddress;
  let stakeTokenAddress;
  let tokenFarmAddress;

  let tokenFarm;

  before(async () => {
    let GVToken = await ethers.getContractFactory("GVToken");
    let gvToken = await GVToken.deploy();
    await gvToken.deployed();

    gvTokenAddress = gvToken.address;
    console.log("GVToken is deployed to: ", gvTokenAddress);

    let StakeToken = await ethers.getContractFactory("StakeToken");
    let stakeToken = await StakeToken.deploy();
    await stakeToken.deployed();

    stakeTokenAddress = stakeToken.address;
    console.log("StakeToken is deployed to: ", stakeTokenAddress);

    let TokenFarm = await ethers.getContractFactory("TokenFarm");
    tokenFarm = await TokenFarm.deploy(gvTokenAddress, stakeTokenAddress);
    await tokenFarm.deployed();

    tokenFarmAddress = tokenFarm.address;
    console.log("TokenFarm is deployed to: ", tokenFarmAddress);
  });
    
    beforeEach(async () => {
        const [signer] = await ethers.getSigners()
    })

    it("TokenFarm Should deploy both GVToken and StakeToken addresses", async () => {
      expect(await tokenFarm.gvToken()).to.equal(gvTokenAddress)
      expect(await tokenFarm.stakeToken()).to.equal(stakeTokenAddress)
    });
    
    it("Staking 0 eth should revert", async () => {
        const amount = await ethers.utils.parseEther("0")
        await expect(tokenFarm.stakeTokens(amount)).to.be.revertedWith('Staking amount must more than 0');
    })
});
