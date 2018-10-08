import React from 'react';
import ReactDOM from 'react-dom';
import SimpleStorage from './contracts/SimpleStorage.json';
import { Drizzle, generateStore } from 'drizzle';

// Layouts
import App from './App'

const options = { contracts: [SimpleStorage] }
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render((
    <App drizzle={drizzle}/>
  ),
  document.getElementById('root')
);