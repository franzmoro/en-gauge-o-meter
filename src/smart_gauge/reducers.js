'use strict';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  data: {
    minLabel: undefined,
    maxLabel: undefined,
    valueLabel: undefined,
    ratio: undefined
  },
  // stretch goal to set dimensions from user input
  dimensions: {
    radius: undefined,
    xRef: undefined,
    yRef: undefined
  },
  // stretch goal to set style from user input
  style: {
    needleStrokeStyle: undefined,
    gaugeStrokeStyle: undefined,
    labelFont: undefined
  }
});

module.exports = (state = initialState, action) => {
  switch (action.type) {
    default: return state;
  }
};
