# blockchain-provenance
This is a simple example of a blockchain smart contract being used to track the location of items over time (item provenance). This app contains the smart contracts (the real meat of the matter) as well as a GUI using React to interact with the deployed smart contracts.


---


## Smart Contracts
This project uses the [Truffle](https://truffleframework.com/docs/truffle/overview) smart contract development environment.

To observe the smart contracts running, first download Truffle, clone this repository, and run:
```
> truffle develop
```
in the root directory of this repository. Then inside the Truffle console run:
```
truffle(develop)> test
```
and watch as the tests (hopefully) pass with flying colors. Then inspect the code in `./tests` and `./contracts` to see what actually just happened. 


---


## drizzle-react Front End
Naturally, because I use Truffle, I chose to use [Drizzle](https://truffleframework.com/docs/drizzle/overview) (more specifically drizzle-react) to interact with our deployed contracts on a blockchain from the front-end of our Dapp.

Getting this set up is a little tricky, but here is my current process:

Clone this repository, then install everything we need using npm:
```
npm install
```
Now spin up a local Ethereum node. There are guides online to do this, I use go Ethereum. For reference, here are my geth arguments (with the unlocked account blocked out for obvious reasons):
```
geth --nodiscover --networkid 1337 --datadir . --unlock 0x5f..... --mine --rpc --rpcaddr 192.168.1.41 --rpcapi eth,net,web3
```

Notice the rpcaddr, I run my geth node in a vm and this is it's address on the network. You might want to change it from `192.168.1.41` to `127.0.0.1` (localhost).

The places you're going to have to change the address are:
```
./truffle.js
./truffle-config.js
```
Technically `truffle.js` is the config file for unix and `truffle-config.js` is for Windows, but just change them both to be safe 😉

Now we're close to the magic happening. After you change the address to your node's address, run:
```
> truffle console
```
Then from the truffle console run:
```
truffle(develop)> deploy
```
Now our contracts are on the network!

Now exit out of the console and run:
```
> npm run start
```
A window should pop up saying Metamask is not found.

Install the browser extension Metamask, set up/import accounts, connect to your geth node (for me `192.168.1.41:8545`) then you might need to refresh the page then it will be working! It's just that easy!

These steps are mostly for me, if you actually want to see this working and get stuck feel free to reach out.





