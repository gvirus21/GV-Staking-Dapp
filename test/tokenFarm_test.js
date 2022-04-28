const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Farm Tests", async () => {
  let gvTokenAddress;
  let tokenFarmAddress;

  let gvToken;
  let tokenFarm;
  let address1;
  let address2;

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
    [address1, address2] = await ethers.getSigners();
    const totalGVTokens = await gvToken.totalSupply();
    await gvToken.transfer(address1.address, totalGVTokens);


  });

  it("TokenFarm Should deploy GVToken", async () => {
    expect(await tokenFarm.gvToken()).to.equal(gvTokenAddress);
  });

  it("Staking 0 eth should revert", async () => {
    await expect(tokenFarm.connect(address1).stakeTokens()).to.be.revertedWith(
      "Staking amount must more than 0"
    );
  });

  it("Staking 1 Eth should update all the required arrays with correct amount", async () => {
    const tx = await tokenFarm
      .connect(address1)
      .stakeTokens({ value: ethers.utils.parseEther("1.0") });
    
    await tx.wait()

    const firstStake = await tokenFarm.stakings(0);
    expect(firstStake.amount).to.equal(ethers.utils.parseEther("1.0"))
    expect(firstStake.person).to.equal(address1.address)

    const firstStaker = await tokenFarm.stakers(0);
    expect(firstStaker).to.equal(address1.address)
  });

  it("Staking 1 Eth should update all the required Mappings with correct inputs", async () => {
    const tx = await tokenFarm.connect(address1).stakeTokens({ value: ethers.utils.parseEther("1.0") })
    await tx.wait()

    const firstStake = await tokenFarm.stakings(0)
    const firstId = firstStake.id

    const idToStakeValue = await tokenFarm.idToStake(firstId)

    expect(idToStakeValue.id).to.equal(firstStake.id)
    expect(idToStakeValue.person).to.equal(firstStake.person)
    expect(idToStakeValue.amount).to.equal(firstStake.amount)
  })

  it("Should unstake if provided correct stake Id by owner", async () => {
    const tx = await tokenFarm
      .connect(address1)
      .stakeTokens({ value: ethers.utils.parseEther("1.0") });
    await tx.wait();

    const firstStake = await tokenFarm.stakings(0);
    expect(firstStake.amount).to.equal(ethers.utils.parseEther("1.0"));

    const firstId = firstStake.id;

    const unstakeTx = await tokenFarm.connect(address1).unStake(firstId);
    await unstakeTx.wait()

    const idToStakeValue = await tokenFarm.idToStake(firstId);
    expect(idToStakeValue.amount).to.equal(ethers.utils.parseEther("0"))
    
  })

  it("Should revert if unstake called by other user", async () => {
        const tx = await tokenFarm
          .connect(address1)
          .stakeTokens({ value: ethers.utils.parseEther("1.0") });
        await tx.wait();

        const firstStake = await tokenFarm.stakings(0);
        expect(firstStake.amount).to.equal(ethers.utils.parseEther("1.0"));

    const firstId = firstStake.id;
    
    await expect(
      tokenFarm.connect(address2).unStake(firstId)
    ).to.be.revertedWith("Not verified user");
  })
});
