import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { DrizzleContext } from 'drizzle-react';
import SimpleStorage from './contracts/SimpleStorage.json';
import { Drizzle, generateStore } from 'drizzle';

// Layouts
import App from './App'

import drizzleOptions from './drizzleOptions'

const options = { contracts: [SimpleStorage] }
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render((
    <App drizzle={drizzle}/>
  ),
  document.getElementById('root')
);