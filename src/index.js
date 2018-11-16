import React from 'react';
import ReactDOM from 'react-dom';
import SimpleStorage from './contracts/SimpleStorage.json';
import BlockchainTracksItemState from './contracts/BlockchainTracksItemState'
import ArrayMapTracksItemState from './contracts/ArrayMapTracksItemState'
import { generateStore } from 'drizzle';
import { DrizzleProvider } from 'drizzle-react'
import { LoadingContainer } from 'drizzle-react-components'

// Layouts
import App from './App'

const options = { contracts: [SimpleStorage, BlockchainTracksItemState, ArrayMapTracksItemState] }
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