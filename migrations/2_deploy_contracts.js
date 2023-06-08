var coffee = artifacts.require("./coffee.sol");

module.exports = function(deployer) {
  deployer.deploy(coffee);
};
