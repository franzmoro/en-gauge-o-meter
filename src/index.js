import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { LiveMeterContainer } from './smart_gauge/';

class LiveOMeter extends Component {
  render () {
    return (
      <LiveMeterContainer />
    );
  }
}
const node = document.getElementById('enGaugeOMeter');

ReactDOM.render(<LiveOMeter/>, node);
