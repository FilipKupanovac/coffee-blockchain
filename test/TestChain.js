// This script is designed to test the solidity smart contract - SupplyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact

var SupplyChain = artifacts.require("SupplyChain");
const Web3 = require("web3");
const web3 = new Web3();

contract("SupplyChain", function(accounts) {
    var upc = 1;
    const producerID = accounts[0];
    const consumerID = accounts[1];
    const itemPrice = web3.utils.toWei("0.0002", "ether");
    const itemType = "Coffee";

    console.log("producer Account ", accounts[0]);
    console.log("consumer Account ", accounts[1]);

    it("Testing smart contract function addItem(uint _price, string memory itemType) that allows adding new item to the market", async () => {
            const supplyChain = await SupplyChain.deployed(); // Updated contract name

            let transaction = await supplyChain.addItem(
                itemPrice, //Wei price of item
                itemType
            );

            const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
            console.log(resultBufferOne)

            assert.equal(resultBufferOne[4].toString(), itemPrice.toString(), "PRICE NOT EQUAL"); // Updated assertion
            assert.equal(resultBufferOne[1].toString(), itemType.toString(), "TYPE NOT EQUAL"); // Updated assertion
    });

    it("Expected details are different that existing", async () => {
        
            const supplyChain = await SupplyChain.deployed(); // Updated contract name

            let transaction = await supplyChain.addItem(
                2*10^13, //Wei price of item
                "Banana"
            );
            const resultBufferOne = await supplyChain.fetchItemBufferOne.call(2);
            console.log(resultBufferOne)

            assert.notEqual(resultBufferOne[4].toString(), itemPrice.toString(), "PRICE IS NOT EQUAL"); // Updated assertion
            assert.notEqual(resultBufferOne[1].toString(), itemType.toString(), "TYPE IS NOT EQUAL"); // Updated assertion
    })
});