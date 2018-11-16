pragma solidity ^0.4.24;

// This is a simple example of a smart contract where the smart contract holds the
// complete state history of each item using a mapping of unique identifiers to 
// dynamically sized arrays of item states.

contract ArrayMapTracksItemState {

    struct ItemState {
        uint256 barcode;      // The general identifier, what is this item?
        uint256 locationCode; // Where is this item?
        uint256 timeStamp;    // When was this item submitted?
    }
    
    // A mapping of unique identifier hashes of items to their records.
    mapping(bytes32 => ItemState[]) public itemRecords;
    
    /**
        @dev Adds a new item to the collection of item states
     */
    function addItem(string _identifier, uint256 _barcode, uint256 _locationCode, uint256 _timeStamp) public {
        
        ItemState memory newIS = ItemState({
            barcode:_barcode,
            locationCode:_locationCode,
            timeStamp: _timeStamp
        });
    
        itemRecords[keccak256(abi.encodePacked(_identifier))].push(newIS);
    }

    /**
        @dev Adds a new state to an item that is already in the collection of item states.
     */
    function updateItem(string _identifier, uint256 _locationCode, uint256 _timeStamp) public {

        // The barcode will be the same (a shipment of bananas will still be a shipment of bananas), 
        // so just grab the barcode from the first entry.
        ItemState memory newIS = ItemState({
            barcode: itemRecords[keccak256(abi.encodePacked(_identifier))][0].barcode,
            locationCode:_locationCode,
            timeStamp: _timeStamp
        });
    
        itemRecords[keccak256(abi.encodePacked(_identifier))].push(newIS);
    }

    /**
        @dev Until Solidity allows for returning arrays of structs, we need to use this workaround to get the length on the front end
     */
    function getStateCount(string _identifier) public view returns (uint256) {
        return itemRecords[keccak256(abi.encodePacked(_identifier))].length;
    }
}
