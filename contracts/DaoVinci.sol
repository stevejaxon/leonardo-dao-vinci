pragma experimental ABIEncoderV2;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/ownership/Ownable.sol";

contract DaoVinci is Initializable, Ownable {

    struct Reward {
        address payee;
        uint amount;
    }

    mapping(address => uint) public balances;

    function initialize() initializer public {
        Ownable.initialize(msg.sender);
    }

    function distributeRewards(Reward[] memory _rewards) public payable onlyOwner {
        uint soldPrice = msg.value;
        uint totalRewards;
        for (uint i = 0; i < _rewards.length; i++) {
            Reward memory reward = _rewards[i];
            bool balanceIncreased = _increaseBalance(reward);
            if (balanceIncreased) {
                totalRewards = totalRewards + reward.amount;
            }
        }
        require(soldPrice >= totalRewards);
    }

    function withdraw() public {
        uint balance = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(balance);
    }

    function withdrawOnBehalf(address payable usersAddress) public onlyOwner {
        uint balance = balances[usersAddress];
        balances[usersAddress] = 0;
        usersAddress.transfer(balance);
    }

    function _increaseBalance(Reward memory _reward) private returns(bool) {
        if (_reward.amount > 0) {
            balances[_reward.payee] = balances[_reward.payee] + _reward.amount;
            return true;
        }
        return false;
    }
}
