pragma solidity ^0.5.0;

import "openzeppelin-eth/contracts/ownership/Ownable.sol";
import "openzeppelin-eth/contracts/token/ERC721/ERC721Mintable.sol";
import "./ProxyRegistry.sol";
import './Strings.sol';

contract DaoVinciToken is ERC721Mintable, Ownable {
    // Used
    address proxyRegistryAddress;

    // Zepkit has a pattern of initializing instead of constructing instance
    function initialize(address _proxyRegistryAddress) initializer public {
        proxyRegistryAddress = _proxyRegistryAddress;
    }

  /**
   * @dev Returns an URI for a given token ID
   */
    function tokenURI(uint256 _tokenId) public view returns (string memory) {
        return Strings.strConcat(
            baseTokenURI(),
            Strings.uint2str(_tokenId)
        );
    }

    function baseTokenURI() public view returns (string memory) {
        return "https://opensea-creatures-api.herokuapp.com/api/creature/";
    }

  /**
   * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
   * https://docs.opensea.io/docs/1-structuring-your-smart-contract
   */
    function isApprovedForAll(
        address owner,
        address operator
    )
    public
    view
    returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }
}
