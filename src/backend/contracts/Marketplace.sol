//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {

    //state variables

    address payable public immutable feeAccount;
    uint public immutable feePercent;
    uint public itemCount;

    struct Item{
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );

    mapping(uint => Item) public items;

    constructor(uint _feePercent){
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function makeItems(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price == 0,"Price must be greater than zero");

        //increment ItemCount
        itemCount ++;

        // transfer nft
        _nft.transferFrom(msg.sender,address(this), _tokenId);

        //adding new item to the list
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false

        );

        emit Offered(itemCount, address(_nft), _tokenId, _price, msg.sender);

        



        
    }

}