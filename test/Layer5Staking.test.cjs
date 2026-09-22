const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Layer5Staking Protocol", function () {
  let stakingToken;
  let rewardToken;
  let layer5Staking;
  let owner;
  let alice;
  let bob;
  let carol;

  // 1 token per second = 1e18 wei/sec
  const INITIAL_REWARD_RATE = ethers.parseEther("1");
  const INITIAL_REWARD_SUPPLY = ethers.parseEther("1000000");
  const USER_STAKE_AMOUNT = ethers.parseEther("100");

  beforeEach(async function () {
    [owner, alice, bob, carol] = await ethers.getSigners();

    // Deploy Mock ERC20 Tokens
    const MockToken = await ethers.getContractFactory("MockToken");
    stakingToken = await MockToken.deploy("USD Global", "USDG", 18);
    await stakingToken.waitForDeployment();

    rewardToken = await MockToken.deploy("Layer5 Protocol", "L5", 18);
    await rewardToken.waitForDeployment();

    // Deploy Layer5Staking
    const Layer5Staking = await ethers.getContractFactory("Layer5Staking");
    layer5Staking = await Layer5Staking.deploy(
      await stakingToken.getAddress(),
      await rewardToken.getAddress(),
      INITIAL_REWARD_RATE
    );
    await layer5Staking.waitForDeployment();

    // Fund KAWAStaking with reward tokens
    await rewardToken.approve(await layer5Staking.getAddress(), INITIAL_REWARD_SUPPLY);
    await layer5Staking.depositRewardTokens(INITIAL_REWARD_SUPPLY);

    // Fund alice and bob with staking tokens
    await stakingToken.transfer(alice.address, ethers.parseEther("1000"));
    await stakingToken.transfer(bob.address, ethers.parseEther("1000"));

    // Approve staking contract
    await stakingToken.connect(alice).approve(await layer5Staking.getAddress(), ethers.MaxUint256);
    await stakingToken.connect(bob).approve(await layer5Staking.getAddress(), ethers.MaxUint256);
  });

  describe("Deployment & Configuration", function () {
    it("should set initial parameters correctly", async function () {
      expect(await layer5Staking.stakingToken()).to.equal(await stakingToken.getAddress());
      expect(await layer5Staking.rewardToken()).to.equal(await rewardToken.getAddress());
      expect(await layer5Staking.rewardRate()).to.equal(INITIAL_REWARD_RATE);
      expect(await layer5Staking.totalStaked()).to.equal(0);
      expect(await layer5Staking.totalStakers()).to.equal(0);
    });

    it("should allow owner to set reward rate", async function () {
      const newRate = ethers.parseEther("2");
      await expect(layer5Staking.connect(owner).setRewardRate(newRate))
        .to.emit(layer5Staking, "RewardRateUpdated")
        .withArgs(newRate);
      expect(await layer5Staking.rewardRate()).to.equal(newRate);
    });

    it("should reject non-owner setting reward rate", async function () {
      await expect(
        layer5Staking.connect(alice).setRewardRate(ethers.parseEther("5"))
      ).to.be.revertedWithCustomError(layer5Staking, "OwnableUnauthorizedAccount");
    });
  });

  describe("Staking", function () {
    it("should allow a user to stake tokens", async function () {
      const tx = await layer5Staking.connect(alice).stake(USER_STAKE_AMOUNT);
      await expect(tx).to.emit(layer5Staking, "Staked");

      expect(await layer5Staking.stakedBalance(alice.address)).to.equal(USER_STAKE_AMOUNT);
      expect(await layer5Staking.totalStaked()).to.equal(USER_STAKE_AMOUNT);
      expect(await layer5Staking.totalStakers()).to.equal(1);
    });

    it("should revert if staking 0 tokens", async function () {
      await expect(layer5Staking.connect(alice).stake(0)).to.be.revertedWith("Cannot stake 0");
    });

    it("should revert if insufficient allowance", async function () {
      await stakingToken.connect(alice).approve(await layer5Staking.getAddress(), 0);
      await expect(
        layer5Staking.connect(alice).stake(USER_STAKE_AMOUNT)
      ).to.be.reverted;
    });

    it("should revert if insufficient balance", async function () {
      const hugeAmount = ethers.parseEther("100000000");
      await stakingToken.connect(alice).approve(await layer5Staking.getAddress(), hugeAmount);
      await expect(
        layer5Staking.connect(alice).stake(hugeAmount)
      ).to.be.reverted;
    });

    it("should handle multiple stakes from the same user", async function () {
      await layer5Staking.connect(alice).stake(USER_STAKE_AMOUNT);
      await layer5Staking.connect(alice).stake(USER_STAKE_AMOUNT);

      expect(await layer5Staking.stakedBalance(alice.address)).to.equal(USER_STAKE_AMOUNT * 2n);
      expect(await layer5Staking.totalStakers()).to.equal(1);
    });
  });

  describe("Reward Accrual Over Time", function () {
    it("should accumulate rewards correctly for a single staker", async function () {
      await layer5Staking.connect(alice).stake(USER_STAKE_AMOUNT);

      // Fast-forward 100 seconds
      await time.increase(100);

      // Pending rewards should be ~100 tokens (1 token/sec * 100 sec)
      const earned = await layer5Staking.pendingRewards(alice.address);
      const earnedTokens = ethers.formatEther(earned);
      expect(parseFloat(earnedTokens)).to.be.closeTo(100, 1.5);
    });

    it("should split rewards proportionally between multiple stakers", async function () {
      // Alice stakes 100
      await layer5Staking.connect(alice).stake(USER_STAKE_AMOUNT);

      // Fast-forward 50 seconds (Alice earns ~50)
      await time.increase(50);

      // Bob stakes 300 (total = 400, Alice has 25%, Bob has 75%)
      await layer5Staking.connect(bob).stake(ethers.parseEther("300"));

      // Fast-forward another 100 seconds (100 rewards distributed: 25 to Alice, 75 to Bob)
      await time.increase(100);

      const alicePending = parseFloat(ethers.formatEther(await layer5Staking.pendingRewards(alice.address)));
      const bobPending = parseFloat(ethers.formatEther(await layer5Staking.pendingRewards(bob.address)));

      // Alice should have roughly 50 + 25 = 75
      expect(alicePending).to.be.closeTo(75, 2.5);
      // Bob should have roughly 75
      expect(bobPending).to.be.closeTo(75, 2.5);
    });
  });

  describe("Claiming Rewards", function () {
    it("should transfer accrued rewards when claim is called", async function () {
      await layer5Staking.connect(alice).stake(USER_STAKE_AMOUNT);
      await time.increase(60);

      const initialRewardBal = await rewardToken.balanceOf(alice.address);
      await layer5Staking.connect(alice).claim();
      const finalRewardBal = await rewardToken.balanceOf(alice.address);

      const claimed = parseFloat(ethers.formatEther(finalRewardBal - initialRewardBal));
      expect(claimed).to.be.closeTo(60, 2);

      // Pending rewards should reset to ~0
      const pendingAfter = await layer5Staking.pendingRewards(alice.address);
      expect(parseFloat(ethers.formatEther(pendingAfter))).to.be.closeTo(0, 0.5);
    });

    it("should do nothing if reward is 0", async function () {
      const initialBal = await rewardToken.balanceOf(carol.address);
      await layer5Staking.connect(carol).claim();
      const finalBal = await rewardToken.balanceOf(carol.address);
      expect(finalBal).to.equal(initialBal);
    });
  });

  describe("Unstaking", function () {
    it("should allow partial unstake", async function () {
      await layer5Staking.connect(alice).stake(USER_STAKE_AMOUNT);
      const halfAmount = USER_STAKE_AMOUNT / 2n;

      await expect(layer5Staking.connect(alice).unstake(halfAmount))
        .to.emit(layer5Staking, "Unstaked");

      expect(await layer5Staking.stakedBalance(alice.address)).to.equal(halfAmount);
      expect(await layer5Staking.totalStaked()).to.equal(halfAmount);
    });

    it("should allow full unstake", async function () {
      await layer5Staking.connect(alice).stake(USER_STAKE_AMOUNT);
      await layer5Staking.connect(alice).unstake(USER_STAKE_AMOUNT);

      expect(await layer5Staking.stakedBalance(alice.address)).to.equal(0);
      expect(await layer5Staking.totalStaked()).to.equal(0);
      expect(await layer5Staking.getStakingDuration(alice.address)).to.equal(0);
    });

    it("should revert if unstaking 0", async function () {
      await expect(layer5Staking.connect(alice).unstake(0)).to.be.revertedWith("Cannot unstake 0");
    });

    it("should revert if unstaking more than staked balance", async function () {
      await layer5Staking.connect(alice).stake(USER_STAKE_AMOUNT);
      await expect(
        layer5Staking.connect(alice).unstake(USER_STAKE_AMOUNT + 1n)
      ).to.be.revertedWith("Insufficient staked balance");
    });

    it("should correctly support exit() which unstakes all and claims", async function () {
      await layer5Staking.connect(alice).stake(USER_STAKE_AMOUNT);
      await time.increase(30);

      await layer5Staking.connect(alice).exit();

      expect(await layer5Staking.stakedBalance(alice.address)).to.equal(0);
      const rewardBal = await rewardToken.balanceOf(alice.address);
      expect(parseFloat(ethers.formatEther(rewardBal))).to.be.greaterThan(25);
    });
  });

  describe("Position Duration Tracking", function () {
    it("should track staking duration accurately", async function () {
      await layer5Staking.connect(alice).stake(USER_STAKE_AMOUNT);
      await time.increase(3600); // 1 hour

      const duration = await layer5Staking.getStakingDuration(alice.address);
      expect(Number(duration)).to.be.closeTo(3600, 5);
    });
  });
});
