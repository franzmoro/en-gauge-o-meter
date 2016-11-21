/* global document */
'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './configure_store.js';
import { actions, reducers } from './smart_gauge/';
import { SmartGaugeContainer } from './smart_gauge/';

const store = configureStore({ actions, reducers });

class EnGaugeOMeterApp extends Component {
  render () {
    return (
      <Provider store={store}>
        <SmartGaugeContainer />
      </Provider>
    );
  }
}
const node = document.getElementById('enGaugeOMeter');

ReactDOM.render(<EnGaugeOMeterApp/>, node);
