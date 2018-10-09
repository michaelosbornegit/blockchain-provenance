import React from 'react'

class ReadSimpleStorage extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.SimpleStorage;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["storedData"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { SimpleStorage } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myNumber = SimpleStorage.storedData[this.state.dataKey];

    // if it exists, then we display its value
    return (
      <div className="center-text">
        <p>Stored Number: {myNumber && myNumber.value}</p>
      </div>
    );
  }
}

export default ReadSimpleStorage;
