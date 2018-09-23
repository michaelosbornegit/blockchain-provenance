var SmartContractHoldsAllState = artifacts.require("SmartContractHoldsAllState");

module.exports = function(deployer) {
    deployer.deploy(SmartContractHoldsAllState);
};