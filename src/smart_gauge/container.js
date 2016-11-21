'use strict';
import React from 'react';
import { connect } from 'react-redux';

import SmartGaugeComponent from './component.js';
import * as SmartGaugeActions from './actions.js';

const SmartGaugeContainer = props =>
  <SmartGaugeComponent { ...props } />;

const mapStateToProps = state => {
  const { dimensions, style, data } = state.toJS();

  return {
    ...style,
    ...dimensions,
    ...data
  };
};

module.exports =
  connect(mapStateToProps, SmartGaugeActions)(SmartGaugeContainer);
