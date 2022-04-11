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
    mapping(address => bool) public isStaking;

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

        stakeToken.transferFrom(msg.sender, address(this), _amount);

        idToStake[_id] = _stake;
        isStaking[msg.sender] = true;
        stakings.push(_stake);
        stakers.push(msg.sender);
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

    function unStake( uint256 stakeId ) public {

    }

    function calculateReward( uint256 _stakeId, address _recipient ) public returns ( uint256 ) {

    }
}
