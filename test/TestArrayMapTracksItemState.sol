pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ArrayMapTracksItemState.sol";

contract TestArrayMapTracksItemState {

    ArrayMapTracksItemState theContract;

    function beforeEach() public {
        theContract = new ArrayMapTracksItemState();
    }

    function testOneItemEntry() public {

        uint256 expectedBarcode = 1;
        uint256 expectedLocationCode = 5;
        uint256 expectedTimeStamp = 1537684455;

        theContract.updateOrAddItem("ITEM1", expectedBarcode, expectedLocationCode, expectedTimeStamp);

        uint256 actualBarcode; 
        uint256 actualLocationCode; 
        uint256 actualTimeStamp;

        // The call to the function returns a tuple(uint256,uint256,uint256) so we need to assign it to a tuple.
        (actualBarcode, actualLocationCode, actualTimeStamp) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM1")), 0);

        Assert.equal(actualBarcode, expectedBarcode, "Barcode was not set correctly");
        Assert.equal(actualLocationCode, expectedLocationCode, "Location code was not set correctly");
        Assert.equal(actualTimeStamp, expectedTimeStamp, "Timestamp was not set correctly");

    }

    function testMultipleItemEntriesUnderSameIdentifier() public {
        theContract.updateOrAddItem("ITEM1", 1, 5, block.timestamp);
        theContract.updateOrAddItem("ITEM1", 2, 10, block.timestamp);
        theContract.updateOrAddItem("ITEM1", 3, 20, block.timestamp);

        uint256 actualBarcode1;
        uint256 actualBarcode2;
        uint256 actualBarcode3;

        (actualBarcode1, , ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM1")), 0);
        (actualBarcode2, , ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM1")), 1);
        (actualBarcode3, , ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM1")), 2);

        Assert.equal(actualBarcode1, 1, "Barcode1 was not set correctly");
        Assert.equal(actualBarcode2, 2, "Barcode2 was not set correctly");
        Assert.equal(actualBarcode3, 3, "Barcode3 was not set correctly");
        
    }

    function testMultipleItemEntriesDifferentIdentifiers() public {
        theContract.updateOrAddItem("ITEM1", 1, 5, block.timestamp);
        theContract.updateOrAddItem("ITEM2", 2, 10, block.timestamp);
        theContract.updateOrAddItem("ITEM3", 3, 20, block.timestamp);

        uint256 actualBarcode1;
        uint256 actualBarcode2;
        uint256 actualBarcode3;

        (actualBarcode1, , ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM1")), 0);
        (actualBarcode2, , ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM2")), 0);
        (actualBarcode3, , ) = theContract.itemRecords(keccak256(abi.encodePacked("ITEM3")), 0);

        Assert.equal(actualBarcode1, 1, "Barcode1 was not set correctly");
        Assert.equal(actualBarcode2, 2, "Barcode2 was not set correctly");
        Assert.equal(actualBarcode3, 3, "Barcode3 was not set correctly");
    }

    function testGetState() public {

        uint256 expectedBarcode = 1;
        uint256 expectedLocationCode = 5;
        uint256 expectedTimeStamp = 1537684455;

        theContract.updateOrAddItem("ITEM1", expectedBarcode, expectedLocationCode, expectedTimeStamp);

        uint256 actualBarcode; 
        uint256 actualLocationCode; 
        uint256 actualTimeStamp;

        // The call to the function returns a tuple(uint256,uint256,uint256) so we need to assign it to a tuple.
        (actualBarcode, actualLocationCode, actualTimeStamp) = theContract.getState("ITEM1", 0);

        Assert.equal(actualBarcode, expectedBarcode, "Barcode was not set correctly");
        Assert.equal(actualLocationCode, expectedLocationCode, "Location code was not set correctly");
        Assert.equal(actualTimeStamp, expectedTimeStamp, "Timestamp was not set correctly");

    }
}
