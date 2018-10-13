import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import ReadSimpleStorage from './ReadSimpleStorage.js'
import WriteSimpleStorage from './WriteSimpleStorage.js'
import './App.css'

import logo from './logo.png';

class App extends Component {
  state = { loading: false, drizzleState: null };

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

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="center-picture">
            <img className="center-picture" width="200" height ="200" src={logo} alt="Provenance Logo" />
            <h1>Blockchain Provenance Example</h1>
            <p>Tracking a item's location over time and other information related to the item on a blockchain</p>
          </div>
          <ReadSimpleStorage
          />
          {/* <WriteSimpleStorage
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />  */}
          <ContractData contract="SimpleStorage" method="storedData" />
          <ContractForm contract="SimpleStorage" method="set" />
          <ContractForm contract="SmartContractTracksItemState" method="updateOrAddItem" />
          <ContractData contract="SmartContractTracksItemState" method="" />
          


        </div>
      </div>
    );
  }
}

export default App;
