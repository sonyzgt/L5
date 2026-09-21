const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("KAWAStaking Protocol", function () {
  let stakingToken;
  let rewardToken;
  let kawaStaking;
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

    rewardToken = await MockToken.deploy("KAWA Protocol", "KAWA", 18);
    await rewardToken.waitForDeployment();

    // Deploy KAWAStaking
    const KAWAStaking = await ethers.getContractFactory("KAWAStaking");
    kawaStaking = await KAWAStaking.deploy(
      await stakingToken.getAddress(),
      await rewardToken.getAddress(),
      INITIAL_REWARD_RATE
    );
    await kawaStaking.waitForDeployment();

    // Fund KAWAStaking with reward tokens
    await rewardToken.approve(await kawaStaking.getAddress(), INITIAL_REWARD_SUPPLY);
    await kawaStaking.depositRewardTokens(INITIAL_REWARD_SUPPLY);

    // Fund alice and bob with staking tokens
    await stakingToken.transfer(alice.address, ethers.parseEther("1000"));
    await stakingToken.transfer(bob.address, ethers.parseEther("1000"));

    // Approve staking contract
    await stakingToken.connect(alice).approve(await kawaStaking.getAddress(), ethers.MaxUint256);
    await stakingToken.connect(bob).approve(await kawaStaking.getAddress(), ethers.MaxUint256);
  });

  describe("Deployment & Configuration", function () {
    it("should set initial parameters correctly", async function () {
      expect(await kawaStaking.stakingToken()).to.equal(await stakingToken.getAddress());
      expect(await kawaStaking.rewardToken()).to.equal(await rewardToken.getAddress());
      expect(await kawaStaking.rewardRate()).to.equal(INITIAL_REWARD_RATE);
      expect(await kawaStaking.totalStaked()).to.equal(0);
      expect(await kawaStaking.totalStakers()).to.equal(0);
    });

    it("should allow owner to set reward rate", async function () {
      const newRate = ethers.parseEther("2");
      await expect(kawaStaking.connect(owner).setRewardRate(newRate))
        .to.emit(kawaStaking, "RewardRateUpdated")
        .withArgs(newRate);
      expect(await kawaStaking.rewardRate()).to.equal(newRate);
    });

    it("should reject non-owner setting reward rate", async function () {
      await expect(
        kawaStaking.connect(alice).setRewardRate(ethers.parseEther("5"))
      ).to.be.revertedWithCustomError(kawaStaking, "OwnableUnauthorizedAccount");
    });
  });

  describe("Staking", function () {
    it("should allow a user to stake tokens", async function () {
      const tx = await kawaStaking.connect(alice).stake(USER_STAKE_AMOUNT);
      await expect(tx).to.emit(kawaStaking, "Staked");

      expect(await kawaStaking.stakedBalance(alice.address)).to.equal(USER_STAKE_AMOUNT);
      expect(await kawaStaking.totalStaked()).to.equal(USER_STAKE_AMOUNT);
      expect(await kawaStaking.totalStakers()).to.equal(1);
    });

    it("should revert if staking 0 tokens", async function () {
      await expect(kawaStaking.connect(alice).stake(0)).to.be.revertedWith("Cannot stake 0");
    });

    it("should revert if insufficient allowance", async function () {
      await stakingToken.connect(alice).approve(await kawaStaking.getAddress(), 0);
      await expect(
        kawaStaking.connect(alice).stake(USER_STAKE_AMOUNT)
      ).to.be.reverted;
    });

    it("should revert if insufficient balance", async function () {
      const hugeAmount = ethers.parseEther("100000000");
      await stakingToken.connect(alice).approve(await kawaStaking.getAddress(), hugeAmount);
      await expect(
        kawaStaking.connect(alice).stake(hugeAmount)
      ).to.be.reverted;
    });

    it("should handle multiple stakes from the same user", async function () {
      await kawaStaking.connect(alice).stake(USER_STAKE_AMOUNT);
      await kawaStaking.connect(alice).stake(USER_STAKE_AMOUNT);

      expect(await kawaStaking.stakedBalance(alice.address)).to.equal(USER_STAKE_AMOUNT * 2n);
      expect(await kawaStaking.totalStakers()).to.equal(1);
    });
  });

  describe("Reward Accrual Over Time", function () {
    it("should accumulate rewards correctly for a single staker", async function () {
      await kawaStaking.connect(alice).stake(USER_STAKE_AMOUNT);

      // Fast-forward 100 seconds
      await time.increase(100);

      // Pending rewards should be ~100 tokens (1 token/sec * 100 sec)
      const earned = await kawaStaking.pendingRewards(alice.address);
      const earnedTokens = ethers.formatEther(earned);
      expect(parseFloat(earnedTokens)).to.be.closeTo(100, 1.5);
    });

    it("should split rewards proportionally between multiple stakers", async function () {
      // Alice stakes 100
      await kawaStaking.connect(alice).stake(USER_STAKE_AMOUNT);

      // Fast-forward 50 seconds (Alice earns ~50)
      await time.increase(50);

      // Bob stakes 300 (total = 400, Alice has 25%, Bob has 75%)
      await kawaStaking.connect(bob).stake(ethers.parseEther("300"));

      // Fast-forward another 100 seconds (100 rewards distributed: 25 to Alice, 75 to Bob)
      await time.increase(100);

      const alicePending = parseFloat(ethers.formatEther(await kawaStaking.pendingRewards(alice.address)));
      const bobPending = parseFloat(ethers.formatEther(await kawaStaking.pendingRewards(bob.address)));

      // Alice should have roughly 50 + 25 = 75
      expect(alicePending).to.be.closeTo(75, 2.5);
      // Bob should have roughly 75
      expect(bobPending).to.be.closeTo(75, 2.5);
    });
  });

  describe("Claiming Rewards", function () {
    it("should transfer accrued rewards when claim is called", async function () {
      await kawaStaking.connect(alice).stake(USER_STAKE_AMOUNT);
      await time.increase(60);

      const initialRewardBal = await rewardToken.balanceOf(alice.address);
      await kawaStaking.connect(alice).claim();
      const finalRewardBal = await rewardToken.balanceOf(alice.address);

      const claimed = parseFloat(ethers.formatEther(finalRewardBal - initialRewardBal));
      expect(claimed).to.be.closeTo(60, 2);

      // Pending rewards should reset to ~0
      const pendingAfter = await kawaStaking.pendingRewards(alice.address);
      expect(parseFloat(ethers.formatEther(pendingAfter))).to.be.closeTo(0, 0.5);
    });

    it("should do nothing if reward is 0", async function () {
      const initialBal = await rewardToken.balanceOf(carol.address);
      await kawaStaking.connect(carol).claim();
      const finalBal = await rewardToken.balanceOf(carol.address);
      expect(finalBal).to.equal(initialBal);
    });
  });

  describe("Unstaking", function () {
    it("should allow partial unstake", async function () {
      await kawaStaking.connect(alice).stake(USER_STAKE_AMOUNT);
      const halfAmount = USER_STAKE_AMOUNT / 2n;

      await expect(kawaStaking.connect(alice).unstake(halfAmount))
        .to.emit(kawaStaking, "Unstaked");

      expect(await kawaStaking.stakedBalance(alice.address)).to.equal(halfAmount);
      expect(await kawaStaking.totalStaked()).to.equal(halfAmount);
    });

    it("should allow full unstake", async function () {
      await kawaStaking.connect(alice).stake(USER_STAKE_AMOUNT);
      await kawaStaking.connect(alice).unstake(USER_STAKE_AMOUNT);

      expect(await kawaStaking.stakedBalance(alice.address)).to.equal(0);
      expect(await kawaStaking.totalStaked()).to.equal(0);
      expect(await kawaStaking.getStakingDuration(alice.address)).to.equal(0);
    });

    it("should revert if unstaking 0", async function () {
      await expect(kawaStaking.connect(alice).unstake(0)).to.be.revertedWith("Cannot unstake 0");
    });

    it("should revert if unstaking more than staked balance", async function () {
      await kawaStaking.connect(alice).stake(USER_STAKE_AMOUNT);
      await expect(
        kawaStaking.connect(alice).unstake(USER_STAKE_AMOUNT + 1n)
      ).to.be.revertedWith("Insufficient staked balance");
    });

    it("should correctly support exit() which unstakes all and claims", async function () {
      await kawaStaking.connect(alice).stake(USER_STAKE_AMOUNT);
      await time.increase(30);

      await kawaStaking.connect(alice).exit();

      expect(await kawaStaking.stakedBalance(alice.address)).to.equal(0);
      const rewardBal = await rewardToken.balanceOf(alice.address);
      expect(parseFloat(ethers.formatEther(rewardBal))).to.be.greaterThan(25);
    });
  });

  describe("Position Duration Tracking", function () {
    it("should track staking duration accurately", async function () {
      await kawaStaking.connect(alice).stake(USER_STAKE_AMOUNT);
      await time.increase(3600); // 1 hour

      const duration = await kawaStaking.getStakingDuration(alice.address);
      expect(Number(duration)).to.be.closeTo(3600, 5);
    });
  });
});
