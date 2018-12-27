# blockchain-provenance
This is a simple example of a blockchain smart contract being used to track the location of items over time (item provenance). This app contains the smart contracts (the real meat of the matter) as well as a GUI using [drizzle](https://github.com/trufflesuite/drizzle) to interact with the deployed smart contracts.





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

You're going to have to change the addresses in these places:
```
./truffle.js
./truffle-config.js
```
Technically `truffle.js` is the config file for unix and `truffle-config.js` is for Windows, but I just change them both.

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
npm run start
```
A window should pop up saying Metamask is not found (if you do not have Metamask installed).

Install the browser extension Metamask, set up/import accounts, connect to your geth node (for me `192.168.1.41:8545`) then you might need to refresh the page then it will be working! It's just that easy!

These steps are mostly for my use. If you actually want to see this working and get stuck feel free to reach out.


# Alternate Method
I have found another method that is excellent for speedy development and debugging. We can leverage truffle to eliminate basically all overhead of running your own node.

In the root directory use:
```
truffle develop
```

This sets us up a testing network with 10 accounts ready to go and output something like this:
```
Truffle Develop started at http://127.0.0.1:9545/

Accounts:
(0) 0x627306090ab...
(1) 0xf17f52151eb...
(2) 0xc5fdf4076b8...
(3) 0x821aea9a577...
...

Private Keys:
(0) c87509a1c067bbde78beb79...
(1) ae6ae8e5ccbfb0459040599...
(2) 0dbbe8e4ae425a6d2687f1a...
(3) c88b703fb08cbea894b6aef...
...
```

All we need to do is connect to `http://127.0.0.1:9545` in Metamask and import any accounts you want to use using the private keys. They even all come preloaded with 100 eth!

Deploy the smart contracts using `deploy` and then copy the new build files from `build/contracts` to `src/contracts` then everything should be working when you use `npm run start` to serve the page!

## Nonce problems?
Since this creates a new chain every time there can be nonce problems where Metamask nonce is different from chain nonce. This is because the chain will start at 0 every time it is run but Metamask assumes the nonce persists which is how it would work with a normal chain. There is a Reset Account button in the metamask settings to reset the nonce. You will have to do this every time you deploy again, but that's a small price to pay for the convenience.







