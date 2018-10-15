var ArrayMapTracksItemState = artifacts.require("ArrayMapTracksItemState");
var BlockchainTracksItemState = artifacts.require("BlockchainTracksItemState");
var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
    deployer.deploy(ArrayMapTracksItemState);
    deployer.deploy(BlockchainTracksItemState);
    deployer.deploy(SimpleStorage);
};