// This script is designed to test the solidity smart contract - coffee.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact

var CoffeeChain = artifacts.require("CoffeeChain");
const Web3 = require("web3");
const web3 = new Web3();

contract("CoffeeChain", function(accounts) {
    var upc = 1;
    const producerID = accounts[0];
    const consumerID = accounts[1];
    const itemPrice = web3.utils.toWei("0.0002", "ether");

    console.log("producer Account ", accounts[0]);
    console.log("consumer Account ", accounts[1]);

    it("Testing smart contract function addCoffee(uint _price) that allows adding new coffee to the market", async () => {
            const coffeeChain = await CoffeeChain.deployed(); // Updated contract name

            let transaction = await coffeeChain.addCoffee(
                itemPrice //Wei price of coffee
            );

            const resultBufferOne = await coffeeChain.fetchItemBufferOne.call(upc);
            console.log(resultBufferOne)

            assert.equal(resultBufferOne[3].toString(), itemPrice.toString(), "PRICE NOT EQUAL"); // Updated assertion
    });

    it("Expected price is different that existing", async () => {
        
            const coffeeChain = await CoffeeChain.deployed(); // Updated contract name

            let transaction = await coffeeChain.addCoffee(
                2*10^13 //Wei price of coffee
            );
            const resultBufferOne = await coffeeChain.fetchItemBufferOne.call(2);
            console.log(resultBufferOne)

            assert.notEqual(resultBufferOne[3].toString(), itemPrice.toString(), "PRICE IS NOT EQUAL"); // Updated assertion
        
    })
});