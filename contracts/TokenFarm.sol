// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//utils
import "@openzeppelin/contracts/utils/Counters.sol";

contract TokenFarm is Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _stakeIdCounter;

    struct Stake {
        uint256 id;
        address person;
        uint256 amount;
    }

    mapping (uint256 => Stake) public idToStake;
    mapping(address => Stake[]) public userToStakes;

    Stake[] public stakings;

    address[] public stakers;

    IERC20 public gvToken;
    IERC20 public stakeToken;

    constructor(address _gvToken, address _stakeToken) {
        gvToken = IERC20(_gvToken);
        stakeToken = IERC20(_stakeToken);
    }

    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "Staking amount must more than 0");
        uint256 _id = _stakeIdCounter.current();
        _stakeIdCounter.increment();

        Stake memory _stake = Stake(_id, msg.sender, _amount);

        idToStake[_id] = _stake;

        userToStakes[msg.sender].push(_stake);
        stakings.push(_stake);
        stakers.push(msg.sender);

        stakeToken.transferFrom(msg.sender, address(this), _amount);
    }

    function issueTokens() public onlyOwner {
        for(uint256 index; index < stakings.length; index++) {
            Stake memory _stake = stakings[index];
            uint256 id = _stake.id;
            address recipient = _stake.person;

            uint256 rewardAmount = calculateReward(id, recipient);

            gvToken.transfer(recipient, rewardAmount);
        }
    } 

    function unStake( uint256 _stakeId ) public {
        Stake memory _stake = idToStake[_stakeId];
        require(isUserCurrentlyStaking(_stake.person), "User is not staking");
        uint256 _userBalance = _stake.amount;

        require(_stake.person == msg.sender, "Not verified user");
        require(_userBalance > 0, "User balance must be greater than 0");

        //remove from userToStake mapping
        for(uint256 index; index < userToStakes[msg.sender].length; index++) {
            Stake memory _userStake = userToStakes[msg.sender][index];
            if (_userStake.id == _stakeId ) {
                delete userToStakes[msg.sender][index];
            }
        }

        idToStake[_stakeId].amount = 0;

        //operations
        stakeToken.transfer(msg.sender, _userBalance);
    }

    function calculateReward( uint256 _stakeId, address _recipient ) public returns ( uint256 ) {

    }

    function isUserCurrentlyStaking(address _user) internal view returns (bool) {
        if (userToStakes[_user].length != 0) {
            return true;
        } else {
            return false;
        }
    }
}
