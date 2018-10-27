import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'

class DisplayContractMethod extends React.Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;

    this.dataKey = this.contracts[this.props.contract].methods[this.props.method].cacheCall();
  }

  render() {
    // Contract is not yet intialized.
    if(!this.props.contracts[this.props.contract].initialized) {
      return (
        <span>Contract Initializing...</span>
      )
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(this.dataKey in this.props.contracts[this.props.contract][this.props.method])) {
      return (
        <span>Fetching data from contract...</span>
      )
    }

    var displayData = this.props.contracts[this.props.contract][this.props.method][this.dataKey].value;

    return (
      <span>Data from method {this.props.method}: {displayData} </span>
    );
  }
}

DisplayContractMethod.contextTypes = {
  drizzle: PropTypes.object
}

// Export connected component.
const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(DisplayContractMethod, mapStateToProps)
