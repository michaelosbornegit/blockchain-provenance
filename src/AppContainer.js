import App from './App'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    ArrayMapTracksItemState : state.contracts.ArrayMapTracksItemState,
    drizzleStatus: state.drizzleStatus
  }
}

const AppContainer = drizzleConnect(App, mapStateToProps);

export default AppContainer