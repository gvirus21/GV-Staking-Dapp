// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//utils
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract TokenFarm is Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _stakeIdCounter;

    uint256 public customAPY;

    struct Stake {
        uint256 id;
        address person;
        uint256 amount;
        uint256 createdAt;
    }

    mapping (uint256 => Stake) public idToStake;
    mapping(address => Stake[]) public userToStakes;

    Stake[] public stakings;

    address[] public stakers;

    IERC20 public gvToken;

    constructor(address _gvToken) {
        gvToken = IERC20(_gvToken);
        customAPY = 100;
    }

    function stakeTokens() public payable {
    
        require(msg.value > 0, "Staking amount must more than 0");

        uint256 _id = _stakeIdCounter.current();
        _stakeIdCounter.increment();

        Stake memory _stake = Stake(_id, msg.sender, msg.value, block.timestamp);

        idToStake[_id] = _stake;

        userToStakes[msg.sender].push(_stake);
        stakings.push(_stake);
        stakers.push(msg.sender);

        console.log("user-stakes id: %s", userToStakes[msg.sender][0].id);
    }

    function unStake( uint256 _stakeId ) public payable {

        Stake memory _stake = idToStake[_stakeId];
        require(isUserCurrentlyStaking(_stake.person), "User is not staking");
        uint256 _userBalance = _stake.amount;

        require(isStakeDurationOver(_stakeId), "You can't Unstake before 3 days");
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

       payable(msg.sender).transfer(_userBalance);
    }

    function issueTokens() public onlyOwner payable {

        for(uint256 index; index < stakings.length; index++) {
            Stake memory _stake = stakings[index];
            uint256 id = _stake.id;
            address recipient = _stake.person;

            uint256 rewardAmount = calculateReward(id);

            gvToken.transfer(recipient, rewardAmount);
        }
    } 

    function isStakeDurationOver( uint256 _stakeId ) public view returns (bool) {

        Stake memory _stake = idToStake[_stakeId];
        uint256 stakeCreatedAt = _stake.createdAt;
        uint256 diff = block.timestamp - stakeCreatedAt;

        if ( (diff) * 1 days >= 3 days ) {
            return true;
        }
        return false;
    }

    function calculateReward( uint256 _stakeId) public view returns ( uint256 ) {

        Stake memory _stake = idToStake[_stakeId];
        uint256 amount = ( _stake.amount * customAPY ) / 100000;

        return amount;

    }

    function isUserCurrentlyStaking(address _user) public view returns (bool) {
        
        if (userToStakes[_user].length != 0) {
            return true;
        } else {
            return false;
        }
    }

    function changeAPY(uint256 _value) public onlyOwner {

        require(
            _value > 0,
            "APY value has to be more than 0, try 100 for (0.100% daily) instead"
        );
        customAPY = _value;

    }
    
}
