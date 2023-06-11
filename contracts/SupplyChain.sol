// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SupplyChain {

    struct Item {
        uint upc;    // Universal Product Code
        string itemType;
        address payable producer;
        address payable consumer;
        uint itemPrice; // In wei, 1 ETH = 10^18 Wei
    }

    mapping(uint => Item) public items;
    uint public nextUpc;

    constructor() {
        nextUpc = 1;
    }

    function addItem(uint _price, string memory itemType) public {
        Item memory newItem = Item({
            upc: nextUpc,
            itemType: itemType,
            producer: payable(msg.sender),
            consumer: payable(address(0)),
            itemPrice: _price
        });
        
        items[nextUpc] = newItem;
        nextUpc += 1;
    }

    function getItem(uint _upc) public view returns (uint, string memory, address, address, uint) {
        Item memory item = items[_upc];
        return (item.upc, item.itemType, item.producer, item.consumer, item.itemPrice);
    }

    function buyItem(uint _upc) public payable {
        Item memory item = items[_upc];
        require(item.consumer == address(0), "This item has already been purchased");
        require(msg.value >= item.itemPrice, "Insufficient payment");
        item.consumer = payable(msg.sender);
        item.producer.transfer(msg.value);
    }

    function fetchItemBufferOne(uint _upc) public view returns (
        uint upc,
        string memory itemType,
        address producer,
        address consumer,
        uint itemPrice
    ) {
        upc = items[_upc].upc;
        itemType = items[_upc].itemType;
        producer = items[_upc].producer;
        consumer = items[_upc].consumer;
        itemPrice = items[_upc].itemPrice;
    
        return
        (
            upc,
            itemType,
            producer,
            consumer,
            itemPrice
        );
    }
}
