// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;

    event CoinFlipped(address indexed player, bool guess, bool outcome, uint256 amountWon);

    constructor() {
        owner = msg.sender;
    }

    function flipCoin(bool _guess) public payable {
        require(msg.value > 0, "Bet amount must be greater than 0");

        // Generate a pseudo-random outcome (true or false)
        bool outcome = (block.timestamp % 2 == 0); 

        if (outcome == _guess) {
            uint256 winnings = msg.value * 2;
            payable(msg.sender).transfer(winnings);
            emit CoinFlipped(msg.sender, _guess, outcome, winnings);
        } else {
            emit CoinFlipped(msg.sender, _guess, outcome, 0);
        }
    }

    // Function to withdraw contract balance to the owner's address
    function withdraw() external {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // Fallback function to accept ETH sent directly to the contract
    receive() external payable {}
}
