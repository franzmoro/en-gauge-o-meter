import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { SmartGaugeContainer } from './smart_gauge/';

class EnGaugeOMeter extends Component {
  render () {
    return (
      <SmartGaugeContainer />
    );
  }
}
const node = document.getElementById('enGaugeOMeter');

ReactDOM.render(<EnGaugeOMeter/>, node);
