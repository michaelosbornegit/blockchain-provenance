pragma solidity ^0.4.24;

// This is a simple example of a smart contract where the blockchain tracks all item state.
// This means the smart contract simply holds the current state of each item and would 
// overwrite it when a new state is added. Then a front-end would sift through previous 
// transactions to build the history of the item. This is desirable as it puts 
// a smaller amount of data on the blockchain compared to the smart contract holding all state 
// history for each item, however we have to process more on the front-end.

contract BlockchainTracksItemState {

    struct itemState {
        uint256 barcode;      // The general identifier, what is this item?
        uint256 locationCode; // Where is this item?
        uint256 timeStamp;    // When was this?
    }
    
    // A mapping of unique identifier hashes of items to current item state.
    mapping(bytes32 => itemState) public itemRecords;
    
    function updateOrAddItem(string _identifier, uint256 _barcode, uint256 _locationCode, uint256 _timeStamp) public {
        
        itemState memory newIS = itemState({barcode:_barcode, locationCode:_locationCode, timeStamp:_timeStamp});
    
        itemRecords[keccak256(abi.encodePacked(_identifier))] = newIS;
    }

}
