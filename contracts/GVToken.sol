
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GVToken is ERC20 {
    constructor() ERC20("GVToken", "GVT") {
        _mint(msg.sender, 1000000000000000000000000000);
    }
}


