var SmartContractTracksItemState = artifacts.require("SmartContractTracksItemState");
var BlockchainTracksItemState = artifacts.require("BlockchainTracksItemState");
var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
    deployer.deploy(SmartContractTracksItemState);
    deployer.deploy(BlockchainTracksItemState);
    deployer.deploy(SimpleStorage);
};