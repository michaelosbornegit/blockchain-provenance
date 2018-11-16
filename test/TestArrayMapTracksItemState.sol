pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ArrayMapTracksItemState.sol";

contract TestArrayMapTracksItemState {

    ArrayMapTracksItemState theContract;

    function beforeEach() public {
        theContract = new ArrayMapTracksItemState();
    }

    // function testOneItemEntry() public {

    //     uint256 expectedBarcode = 1;
    //     uint256 expectedLocationCode = 5;

    //     theContract.addItem("ITEM1", expectedBarcode, expectedLocationCode);

    //     uint256 actualBarcode; 
    //     uint256 actualLocationCode; 

    //     // The call to the function returns a tuple(uint256,uint256,uint256) so we need to assign it to a tuple.
    //     (actualBarcode, actualLocationCode, ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM1")), 0);

    //     Assert.equal(actualBarcode, expectedBarcode, "Barcode was not set correctly");
    //     Assert.equal(actualLocationCode, expectedLocationCode, "Location code was not set correctly");

    // }

    function testMultipleItemEntriesUnderSameIdentifier() public {
        theContract.addItem("ITEM1", 1, 5, 10);
        theContract.updateItem("ITEM1", 2, 10);
        theContract.updateItem("ITEM1", 3, 20);

        uint256 actualLocationCode1;
        uint256 actualLocationCode2;
        uint256 actualLocationCode3;

        (actualLocationCode1, , ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM1")), 0);
        (actualLocationCode2, , ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM1")), 1);
        (actualLocationCode3, , ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM1")), 2);

        Assert.equal(actualLocationCode1, 1, "LocationCode1 was not set correctly");
        Assert.equal(actualLocationCode2, 2, "LocationCode2 was not set correctly");
        Assert.equal(actualLocationCode3, 3, "LocationCode3 was not set correctly");
        
    }

    function testMultipleItemEntriesDifferentIdentifiers() public {
        theContract.addItem("ITEM1", 1, 5, 10);
        theContract.addItem("ITEM2", 2, 10, 10);
        theContract.addItem("ITEM3", 3, 20, 10);

        uint256 actualLocationCode1;
        uint256 actualLocationCode2;
        uint256 actualLocationCode3;

        (actualLocationCode1, , ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM1")), 0);
        (actualLocationCode2, , ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM2")), 0);
        (actualLocationCode3, , ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM3")), 0);

        Assert.equal(actualLocationCode1, 1, "LocationCode1 was not set correctly");
        Assert.equal(actualLocationCode2, 2, "LocationCode2 was not set correctly");
        Assert.equal(actualLocationCode3, 3, "LocationCode3 was not set correctly");
    }

    // function testGetState() public {

    //     uint256 expectedBarcode = 1;
    //     uint256 expectedLocationCode = 5;

    //     theContract.addItem("ITEM1", expectedBarcode, expectedLocationCode);

    //     uint256 actualBarcode; 
    //     uint256 actualLocationCode; 

    //     // The call to the function returns a tuple(uint256,uint256,uint256) so we need to assign it to a tuple.
    //     (actualBarcode, actualLocationCode, ) = theContract.getState("ITEM1", 0);

    //     Assert.equal(actualBarcode, expectedBarcode, "Barcode was not set correctly");
    //     Assert.equal(actualLocationCode, expectedLocationCode, "Location code was not set correctly");

    // }
}
