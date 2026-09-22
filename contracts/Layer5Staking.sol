// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Layer5Staking
 * @notice Production-grade staking contract for Layer5 Protocol on Robinhood Chain.
 * @dev Implements Synthetix-standard rewardPerToken accounting with SafeERC20,
 *      ReentrancyGuard, and position timestamp tracking.
 */
contract Layer5Staking is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    /// @notice The token users stake (USDG)
    IERC20 public immutable stakingToken;

    /// @notice The token distributed as rewards (KAWA)
    IERC20 public immutable rewardToken;

    /// @notice Emission rate: rewards distributed per second (scaled by 1e18)
    uint256 public rewardRate;

    /// @notice Last timestamp when rewardPerTokenStored was updated
    uint256 public lastUpdateTime;

    /// @notice Accumulated reward per token stored (scaled by 1e18)
    uint256 public rewardPerTokenStored;

    /// @notice Total tokens staked in the protocol
    uint256 private _totalStaked;

    /// @notice User staked balance
    mapping(address => uint256) private _balances;

    /// @notice User rewardPerToken snapshot at last update
    mapping(address => uint256) public userRewardPerTokenPaid;

    /// @notice User accrued rewards ready for claiming
    mapping(address => uint256) public rewards;

    /// @notice Timestamp of first stake / position genesis for each user
    mapping(address => uint256) public stakingSince;

    /// @notice Total historical stakers count
    uint256 public totalStakers;

    /// @notice Has user staked previously
    mapping(address => bool) private _hasStaked;

    /* ========== EVENTS ========== */

    event Staked(address indexed user, uint256 amount, uint256 timestamp);
    event Unstaked(address indexed user, uint256 amount, uint256 timestamp);
    event RewardPaid(address indexed user, uint256 reward, uint256 timestamp);
    event RewardRateUpdated(uint256 newRate);
    event RewardTokensDeposited(uint256 amount);

    /* ========== MODIFIERS ========== */

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    /**
     * @param _stakingToken Address of the token to be staked
     * @param _rewardToken Address of the reward token
     * @param _initialRewardRate Initial reward tokens emitted per second (in wei)
     */
    constructor(
        address _stakingToken,
        address _rewardToken,
        uint256 _initialRewardRate
    ) Ownable(msg.sender) {
        require(_stakingToken != address(0), "Invalid staking token");
        require(_rewardToken != address(0), "Invalid reward token");

        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        rewardRate = _initialRewardRate;
        lastUpdateTime = block.timestamp;
    }

    /* ========== VIEWS ========== */

    /// @notice Total amount of staking tokens locked in the contract
    function totalStaked() external view returns (uint256) {
        return _totalStaked;
    }

    /// @notice Staked token balance of an account
    function stakedBalance(address account) external view returns (uint256) {
        return _balances[account];
    }

    /// @notice Calculates accumulated reward per token since genesis
    function rewardPerToken() public view returns (uint256) {
        if (_totalStaked == 0) {
            return rewardPerTokenStored;
        }
        uint256 timeDelta = block.timestamp - lastUpdateTime;
        return rewardPerTokenStored + (timeDelta * rewardRate * 1e18) / _totalStaked;
    }

    /// @notice Calculates pending unclaimed rewards for an account
    function earned(address account) public view returns (uint256) {
        return
            (_balances[account] * (rewardPerToken() - userRewardPerTokenPaid[account])) /
            1e18 +
            rewards[account];
    }

    /// @notice Alias for earned(account) conforming to prompt specification
    function pendingRewards(address account) external view returns (uint256) {
        return earned(account);
    }

    /// @notice Get staking duration in seconds for an account
    function getStakingDuration(address account) external view returns (uint256) {
        if (_balances[account] == 0 || stakingSince[account] == 0) {
            return 0;
        }
        return block.timestamp - stakingSince[account];
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    /**
     * @notice Stakes tokens into the protocol
     * @param amount Amount of staking tokens to deposit
     */
    function stake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot stake 0");

        if (!_hasStaked[msg.sender]) {
            _hasStaked[msg.sender] = true;
            totalStakers += 1;
        }

        if (_balances[msg.sender] == 0) {
            stakingSince[msg.sender] = block.timestamp;
        }

        _totalStaked += amount;
        _balances[msg.sender] += amount;

        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount, block.timestamp);
    }

    /**
     * @notice Withdraws staked tokens from the protocol
     * @param amount Amount of staking tokens to withdraw
     */
    function unstake(uint256 amount) public nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot unstake 0");
        require(_balances[msg.sender] >= amount, "Insufficient staked balance");

        _totalStaked -= amount;
        _balances[msg.sender] -= amount;

        if (_balances[msg.sender] == 0) {
            stakingSince[msg.sender] = 0;
        }

        stakingToken.safeTransfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount, block.timestamp);
    }

    /**
     * @notice Claims all accrued rewards
     */
    function claim() public nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardToken.safeTransfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward, block.timestamp);
        }
    }

    /**
     * @notice Convenience function to unstake entire balance and claim rewards
     */
    function exit() external {
        unstake(_balances[msg.sender]);
        claim();
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    /**
     * @notice Updates the reward emission rate per second
     * @param _rewardRate New reward rate in wei per second
     */
    function setRewardRate(uint256 _rewardRate) external onlyOwner updateReward(address(0)) {
        rewardRate = _rewardRate;
        emit RewardRateUpdated(_rewardRate);
    }

    /**
     * @notice Admin function to supply reward tokens to the contract
     * @param amount Amount of reward tokens to deposit
     */
    function depositRewardTokens(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be > 0");
        rewardToken.safeTransferFrom(msg.sender, address(this), amount);
        emit RewardTokensDeposited(amount);
    }

    /**
     * @notice Admin function to withdraw staked tokens (USDG)
     * @param amount Amount of staking tokens to withdraw
     */
    function adminWithdrawStakingToken(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be > 0");
        stakingToken.safeTransfer(owner(), amount);
    }

    /**
     * @notice Admin function to withdraw reward tokens (KAWA)
     * @param amount Amount of reward tokens to withdraw
     */
    function adminWithdrawRewardToken(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be > 0");
        rewardToken.safeTransfer(owner(), amount);
    }

    /**
     * @notice Emergency withdrawal of any tokens sent to the contract
     */
    function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyOwner {
        IERC20(tokenAddress).safeTransfer(owner(), tokenAmount);
    }
}
