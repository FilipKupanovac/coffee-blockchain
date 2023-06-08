// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract CoffeeChain {

    struct Coffee {
        uint upc;    // Universal Product Code
        address payable producer;
        address payable consumer;
        uint itemPrice; // In wei, 1 ETH = 10^18 Wei
    }

    mapping(uint => Coffee) public coffees;
    uint public nextUpc;

    constructor() {
        nextUpc = 1;
    }

    function addCoffee(uint _price) public {
        Coffee memory newCoffee = Coffee({
            upc: nextUpc,
            producer: payable(msg.sender),
            consumer: payable(address(0)),
            itemPrice: _price
        });
        
        coffees[nextUpc] = newCoffee;
        nextUpc += 1;
    }

    function getCoffee(uint _upc) public view returns (uint, address, address, uint) {
        Coffee memory coffee = coffees[_upc];
        return (coffee.upc, coffee.producer, coffee.consumer, coffee.itemPrice);
    }

    function buyCoffee(uint _upc) public payable {
        Coffee memory coffee = coffees[_upc];
        require(coffee.consumer == address(0), "This coffee has already been purchased");
        require(msg.value >= coffee.itemPrice, "Insufficient payment");
        coffee.consumer = payable(msg.sender);
        coffee.producer.transfer(msg.value);
    }

    function fetchItemBufferOne(uint _upc) public view returns (
        uint upc,
        address producer,
        address consumer,
        uint itemPrice
    ) {
        upc = coffees[_upc].upc;
        producer = coffees[_upc].producer;
        consumer = coffees[_upc].consumer;
        itemPrice = coffees[_upc].itemPrice;
    
        return
        (
            upc,
            producer,
            consumer,
            itemPrice
        );
    }

    function fetchItemBufferTwo(uint _upc) public view returns (
        uint upc,
        address producer,
        address consumer,
        uint itemPrice
    ) {
        upc = coffees[_upc].upc;
        producer = coffees[_upc].producer;
        consumer = coffees[_upc].consumer;
        itemPrice = coffees[_upc].itemPrice;
    
        return
        (
            upc,
            producer,
            consumer,
            itemPrice
        );
    }
}
