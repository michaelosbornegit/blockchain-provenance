import BlockchainTracksItemState from './contracts/BlockchainTracksItemState.json'
import SimpleStorage from './contracts/SimpleStorage.json'
import ArrayMapTracksItemState from './contracts/ArrayMapTracksItemState.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'http',
      url: 'http://192.168.1.41:8545'
    }
  },
  contracts: [
    ArrayMapTracksItemState,
    SimpleStorage,
    BlockchainTracksItemState
  ],
  events: {
    SimpleStorage: ['StorageSet']
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions