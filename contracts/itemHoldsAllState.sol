pragma solidity ^0.4.24;

// This is a simple example of a smart contract where each item holds the
// complete state history of the item being tracked.

contract itemHoldsAllState {

    struct itemState {
        uint256 barcode;      // The general identifier, what is this item?
        uint256 locationCode; // Where is this item?
        uint256 timeStamp;    // When was this?
    }
    
    // A mapping of unique identifier hashes of items to their records.
    mapping(bytes32 => itemState[]) public itemRecords;
    
    function createItem(string _identifier, uint256 _barcode, uint256 _locationCode, uint256 _timeStamp) public {
        
        itemState memory newIS = itemState({barcode:_barcode, locationCode:_locationCode, timeStamp:_timeStamp});
    
        itemRecords[keccak256(abi.encodePacked(_identifier))].push(newIS);
    }

    function getItemBarcode(string _identifier) public view returns (uint256 barcode) {
        
        return itemRecords[keccak256(abi.encodePacked(_identifier))][0].barcode;
    }
}
