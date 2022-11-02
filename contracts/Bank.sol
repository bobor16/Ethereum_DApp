// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;

contract Bank {
    mapping(address => uint256) private _balances;

    function deposit() public payable {
        _balances[msg.sender] += msg.value;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function withdraw(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount);

        _balances[msg.sender] -= amount;

        payable (msg.sender).transfer(amount);
    }
}
