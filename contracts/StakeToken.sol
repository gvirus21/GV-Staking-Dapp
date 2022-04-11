// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GVToken is ERC20 {
    constructor() ERC20("StakeToken", "STK") {
        _mint(msg.sender, 1000000000000000000000000);
    }
}

