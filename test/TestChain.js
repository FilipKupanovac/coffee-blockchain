// This script is designed to test the solidity smart contract - coffee.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact

var Coffee = artifacts.require("CoffeeChain");
const Web3 = require("web3");
const web3 = new Web3();

contract("CoffeeChain", function(accounts) {
    var upc = 1;
    const producerID = accounts[0];
    const consumerID = accounts[1];
    const itemPrice = web3.utils.toWei("0.02", "ether");


    console.log("producer Account ", accounts[0]);
    console.log("consumer Account ", accounts[1]);

    it("Testing smart contract function  addCoffee(uint _price) that allows adding new coffee to the market ", async () => {
        try {
            const covfefe = await Coffee.deployed();

            let transaction = await covfefe.addCoffee(
                250 //Wei price of covfefe
            );

            assert.equal(covfefe[1].itemPrice, 250, "PRICE NOT EQUAL")
        }
        catch (error) {
            console.log("addCoffee() - error:", error);
        }
    })
})