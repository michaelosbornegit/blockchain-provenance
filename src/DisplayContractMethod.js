import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class DisplayContractMethod extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts
    this.web3 = context.drizzle.web3




    // Fetch initial value from chain and return cache key for reactive updates.
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : []
    var globalThis = this;
    this.states = [];

    this.contracts.ArrayMapTracksItemState.methods.getStateCount(this.props.identifier).call()
      .then(function (length) {
        var i;
        for (i = 0; i < length; i++) {
          globalThis.states.push(globalThis.contracts.ArrayMapTracksItemState.methods.itemRecords.cacheCall(globalThis.web3.utils.keccak256(globalThis.props.identifier), i))
          // globalThis.contracts.ArrayMapTracksItemState.methods.itemRecords(globalThis.web3.utils.keccak256(globalThis.props.identifier), i).call()
          // .then(function(singleState) {
          //   globalThis.states.push(singleState);
          // });
        }
      });
    // this.length = this.getValue
    // this.nextMethod()
    // var length = this.props.contracts["ArrayMapTracksItemState"]["getStateCount"][this.lengthKey].value
    // this.state = {
    //   itemStates: Array(length)
    // }

    // console.log(this.states)
    // console.log(this.contracts.ArrayMapTracksItemState.methods.getStateCount.cacheCall(this.props.identifier))
    // console.log(this.contracts.ArrayMapTracksItemState.methods.itemRecords.cacheCall(globalThis.web3.utils.keccak256(globalThis.props.identifier), 0))

  }

  nextMethod() {
    this.state = {
      stateKeys: Array(this.length).fill(null),
      values: Array(this.length).fill(null)
    }

    // Lets CacheCall all of our method calls
    var i;
    for (i = 0; i < this.length; i++) {
      this.state.stateKeys[i] = this.contracts.ArrayMapTracksItemState.methods.itemRecords.cacheCall([this.web3.utils.keccak256(this.props.identifier), i])
    }

    // console.log(this.state.stateKeys)
  }

  getValue() {
    return this.props.contracts["ArrayMapTracksItemState"]["getStateCount"][this.lengthKey].value;
  }

  render() {
    // Contract is not yet intialized.
    if (!this.props.contracts["ArrayMapTracksItemState"].initialized) {
      return (
        <span>Initializing...</span>
      )
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    // if(!(this.lengthKey in this.props.contracts["ArrayMapTracksItemState"]["getStateCount"])) {
    //   return (
    //     <span>Fetching...</span>
    //   )
    // }

    // Show a loading spinner for future updates.
    var pendingSpinner = this.props.contracts[this.props.contract].synced ? '' : ' 🔄'

    // // Optionally hide loading spinner (EX: ERC20 token symbol).
    // if (this.props.hideIndicator) {
    //   pendingSpinner = ''
    // }

    // var displayData = this.props.contracts[this.props.contract][this.props.method][this.dataKey].value
    // // Optionally convert to UTF8
    // if (this.props.toUtf8) {
    //   displayData = this.context.drizzle.web3.utils.hexToUtf8(displayData)
    // }

    // // Optionally convert to Ascii
    // if (this.props.toAscii) {
    //   displayData = this.context.drizzle.web3.utils.hexToAscii(displayData)
    // }

    // TODO: This was causing an error, look into that.
    // // If return value is an array
    // if (typeof displayData === 'array') {
    //   const displayListItems = displayData.map((datum, index) => {
    //     <li key={index}>{`${datum}`}{pendingSpinner}</li>
    //   })

    //   return(
    //     <ul>
    //       {displayListItems}
    //     </ul>
    //   )
    // }

    // // If retun value is an object
    // if (typeof displayData === 'object') {
    //   var i = 0
    //   const displayObjectProps = []

    //   Object.keys(displayData).forEach((key) => {
    //     if (i != key) {
    //       displayObjectProps.push(<li key={i}>
    //         <strong>{key}</strong>{pendingSpinner}<br/>
    //         {`${displayData[key]}`}
    //       </li>)
    //     }

    //     i++
    //   })

    //   return(
    //     <ul>
    //       {displayObjectProps}
    //     </ul>
    //   )
    // }

    const displayObjectProps = [];
    var globalThis = this;

    this.states.forEach(function (currentStruct) {
      if (!globalThis.props.contracts[globalThis.props.contract]["itemRecords"][currentStruct]) {
        return (
          <span>The transaction has not been mined yet</span>
        )
      }
      var i = 0;
      var displayData = globalThis.props.contracts[globalThis.props.contract]["itemRecords"][currentStruct].value
      Object.keys(displayData).forEach(function (currentKey) {
        // Shave off the first 3 values (for some reason they're indexed)
        if (i != currentKey) {
          displayObjectProps.push(<li key={i}>{currentKey}{pendingSpinner}: {displayData[currentKey]}</li>)
        }
        i++;

      })
      displayObjectProps.push(<br></br>)
    });

    return (
      <ul>
        {displayObjectProps}
      </ul>
    )

    // var i;
    // var length = this.props.contracts["ArrayMapTracksItemState"]["getStateCount"][this.lengthKey].value
    // console.log(length)
    // for (i = 0; i < length; i++) {
    //   var dataKey = this.contracts["ArrayMapTracksItemState"].methods["itemRecords"].cacheCall(this.web3.utils.keccak256(this.props.identifier), i);
    //   // var displayData = this.props.contracts["ArrayMapTracksItemState"]["itemRecords"][dataKey].value
    // }

    // return(
    //   // <span>{`${displayData}`}{pendingSpinner}</span>
    // )
    // return (null)
  }
}

DisplayContractMethod.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(DisplayContractMethod, mapStateToProps)
