'use strict';
import Immutable from 'immutable';
import {
  SET_DATA,
  SET_GAUGE_DIMENSIONS,
  SET_STYLE
} from '../action_types.js';

const initialState = Immutable.fromJS({
  data: {
    minLabel: undefined,
    maxLabel: undefined,
    valueLabel: undefined,
    ratio: undefined,
    isShowingErrorMessage: false
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
    case SET_DATA:
      return state.set('data', Immutable.fromJS(action.data));
    case SET_GAUGE_DIMENSIONS:
      return state.set('dimensions', Immutable.fromJS(action.dimensions));
    case SET_STYLE:
      return state.set('style', Immutable.fromJS(action.style));
    default:
      return state;
  }
};
