var SmartContractTracksItemState = artifacts.require("SmartContractTracksItemState");
var BlockchainTracksItemState = artifacts.require("BlockchainTracksItemState");

module.exports = function(deployer) {
    deployer.deploy(SmartContractTracksItemState);
    deployer.deploy(BlockchainTracksItemState);
};