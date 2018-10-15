pragma solidity ^0.4.24;

// This is a simple example of a smart contract where the smart contract holds the
// complete state history of each item using a mapping of unique identifiers to 
// dynamically sized arrays of item states.

contract ArrayMapTracksItemState {

    struct itemState {
        uint256 barcode;      // The general identifier, what is this item?
        uint256 locationCode; // Where is this item?
        uint256 timeStamp;    // When was this?
    }
    
    // A mapping of unique identifier hashes of items to their records.
    mapping(bytes32 => itemState[]) public itemRecords;
    
    function updateOrAddItem(string _identifier, uint256 _barcode, uint256 _locationCode) public {
        
        itemState memory newIS = itemState({barcode:_barcode, locationCode:_locationCode, timeStamp: block.timestamp});
    
        itemRecords[keccak256(abi.encodePacked(_identifier))].push(newIS);
    }

    function getState(string _identifier, uint256 _index) public view returns (uint256, uint256, uint256) {
        itemState memory tempIS = itemRecords[keccak256(abi.encodePacked(_identifier))][_index];
        return (tempIS.barcode, tempIS.locationCode, tempIS.timeStamp);
    }

}
