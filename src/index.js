import React from 'react';
import ReactDOM from 'react-dom';
import SimpleStorage from './contracts/SimpleStorage.json';
import BlockchainTracksItemState from './contracts/BlockchainTracksItemState'
import SmartContractTracksItemState from './contracts/SmartContractTracksItemState'
import { generateStore } from 'drizzle';
import { DrizzleProvider } from 'drizzle-react'
import drizzleOptions from './drizzleOptions'
import { LoadingContainer } from 'drizzle-react-components'

// Layouts
import App from './App'

const options = { contracts: [SimpleStorage, BlockchainTracksItemState, SmartContractTracksItemState] }
const drizzleStore = generateStore(options);

ReactDOM.render((
  <DrizzleProvider options={options} store={drizzleStore}>
    <LoadingContainer>
      <App />
    </LoadingContainer>
  </DrizzleProvider>
  ),
  document.getElementById('root')
);