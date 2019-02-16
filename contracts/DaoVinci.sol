pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/ownership/Ownable.sol";

contract DaoVinci is Initializable, Ownable {

    function initialize(uint num) initializer public {
        Ownable.initialize(msg.sender);
    }

    function withdraw(uint amount) public {

    }

    function withdrawOnBehalf(uint amount, address destination) public onlyOwner {

    }
}
