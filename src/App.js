import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import ReadSimpleStorage from './ReadSimpleStorage.js'
import WriteSimpleStorage from './WriteSimpleStorage.js'
import './App.css'

import logo from './logo.png';

class App extends Component {

  constructor(props, context) {
    super(props);

    this.web3 = context.drizzle.web3;
    this.identifier = "Hello, World!";
  }
  
  // componentDidMount() {
  //   console.log(this.props);
  //   const { drizzle } = this.props;
  
  //   // subscribe to changes in the store
  //   this.unsubscribe = drizzle.store.subscribe(() => {
  
  //     // every time the store updates, grab the state from drizzle
  //     const drizzleState = drizzle.store.getState();
  
  //     // check to see if it's ready, if so, update local component state
  //     if (drizzleState.drizzleStatus.initialized) {
  //       this.setState({ loading: false, drizzleState });
  //     }
  //   });
  // }

  // compomentWillUnmount() {
  //   this.unsubscribe();
  // }

  // componentDidMount() {
  //   this.context.drizzle
  // }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="center-picture">
            <img className="center-picture" width="200" height ="200" src={logo} alt="Provenance Logo" />
            <h1>Blockchain Provenance Example</h1>
            <p>Tracking a item's location over time and other information related to the item on a blockchain</p>
          </div>
          <ReadSimpleStorage />
          {/* <WriteSimpleStorage
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />  */}
          {/* <ContractData contract="SimpleStorage" method="storedData" /> */}
          {/* <ContractForm contract="SimpleStorage" method="set" /> */}
          <h2>Enter an item:</h2>
          <ContractForm contract="ArrayMapTracksItemState" labels={["Unique Identifier", "Barcode", "Location Code", "Timestamp"]} method="updateOrAddItem" />
          <h2>Item history for {this.identifier} </h2>

          {/* TODO:
              Just figured out how to actually display the information
              Look at github for drizzle react components to figure out how to actually call this method directly (and put that in a loop)
              Maybe hold amounts of records in the smart contract, then we would know how long to loop for. (in another map or something)

              Clean up outputs on the webpage to list timestamp first and list names better

              include a way to sort by timestamp possible (but it is already sorted)


              Someday show functionality of the page even if we don't have access to the blockchain (just storing values locally or something), this would be awesome.
          */}


          <ContractData contract="ArrayMapTracksItemState" method="itemRecords" methodArgs={[this.web3.utils.keccak256(this.identifier), 0]}  />
          <ContractData contract="ArrayMapTracksItemState" method="itemRecords" methodArgs={[this.web3.utils.keccak256(this.identifier), 1]}  />
          <br></br>
          <h2>Active Account:</h2>
          <AccountData accountIndex="0" units="ether" precision="3" />


        </div>
      </div>
    );
  }
}

App.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(App, mapStateToProps);
