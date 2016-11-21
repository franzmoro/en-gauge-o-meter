'use strict';
import axios from 'axios';
import {
  SET_DATA,
  SET_GAUGE_DIMENSIONS,
  SET_STYLE
} from '../action_types.js';

export const isResponseOk = response => {
  const { error, status, statusText, data: { min, max, value } } = response;
  return (
    !error && (status === 200) && (statusText === 'OK') &&
    (min && max && value) &&
    (min <= value) && (value <= max) && (min < max)
  );
};

export const getNewData = canvasContext => dispatch => {
  axios.get('https://widgister.herokuapp.com/challenge/frontend')
  .then(response => {
    if (isResponseOk(response)) {
      dispatch(setNewData(response.data));
      dispatch(renderSmartGauge(canvasContext));
    } else {
      dispatch(displayErrorMessage(canvasContext));
      dispatch(renderOnlyGauge(canvasContext));
    }
  }).catch(() => {
    dispatch(displayErrorMessage(canvasContext));
    dispatch(renderOnlyGauge(canvasContext));
  });
};


const formatLabel = (value, format, unit) => {
  const formatMapping = {
    currency: 'left',
    default: 'none'
  };
  const position = formatMapping[format] || formatMapping.default;
  return position === 'left'
    ? `${unit} ${value}`
    : position === 'right'
      ? `${value} ${unit}`
      : `${value}`;
};

export const setNewData = data => {
  const { format, max, min, unit, value } = data;
  const [minLabel, maxLabel, valueLabel] = [min, max, value].map(val =>
    formatLabel(val, format, unit)
  );
  const ratio = (value - min) / (max - min);

  return {
    type: SET_DATA,
    data: {
      minLabel,
      maxLabel,
      valueLabel,
      ratio,
      isShowingErrorMessage: false
    }
  };
};

export const setGaugeDimensions = dimensions => ({
  type: SET_GAUGE_DIMENSIONS,
  dimensions
});

export const setStyle = style => ({
  type: SET_STYLE,
  style
});

export const renderSmartGauge = canvas => dispatch => {
  dispatch(renderGauge(canvas));
  dispatch(renderNeedle(canvas));
};

const setupCanvas  = (canvas, canvasConfigObj) =>
  Object.assign(canvas.getContext('2d'), canvasConfigObj, {});

const renderGauge = canvas => dispatch => {
  dispatch(renderOnlyGauge(canvas));
  dispatch(renderLabels(canvas));
};

export const displayErrorMessage = canvas => (dispatch, getState) => {
  const {
    dimensions: { xRef, yRef, radius },
    style: { labelFont }
  } = getState().toJS();

  const ctx = setupCanvas(canvas, {
    font: labelFont,
    fillStyle: 'red'
  });

  ctx.fillText(
    'API Error!',
    xRef,
    yRef - radius - 20
  );
};

const renderOnlyGauge = canvas => (dispatch, getState) => {
  const {
    dimensions: { xRef, yRef, radius },
    style: { gaugeStrokeStyle }
  } = getState().toJS();

  const ctx = setupCanvas(canvas, {
    lineWidth: 3,
    strokeStyle: gaugeStrokeStyle
  });
  ctx.beginPath();
  ctx.arc(xRef, yRef, radius, 0, Math.PI, true);
  ctx.closePath();
  ctx.stroke();
};

const renderLabels = canvas => (dispatch, getState) => {
  const {
    data: { minLabel, maxLabel, valueLabel },
    dimensions: { xRef, yRef, radius },
    style: { labelFont }
  } = getState().toJS();

  const ctx = setupCanvas(canvas, {
    font: labelFont
  });
  const labelsOffset = 20;
  ctx.fillText(minLabel,  (xRef - radius), (yRef + labelsOffset));
  ctx.fillText(maxLabel,  (xRef + radius), (yRef + labelsOffset));
  ctx.fillText(valueLabel, xRef,           (yRef - radius - labelsOffset));
};

const renderNeedle = canvas => (dispatch, getState) => {
  const {
    data: { ratio },
    dimensions: { xRef, yRef, radius },
    style: { needleStrokeStyle }
  } = getState().toJS();

  const ctx = setupCanvas(canvas, {
    lineCap: 'round',
    lineWidth: 5,
    strokeStyle: needleStrokeStyle
  });
  ctx.beginPath();
  ctx.moveTo(xRef, yRef);
  const needleAngle = (Math.PI) * (1 - ratio);
  const newX = xRef + radius * Math.cos(needleAngle);
  const newY = yRef - radius * Math.sin(needleAngle);
  ctx.lineTo(newX, newY);
  ctx.stroke();
  dispatch(renderNeedleBase(canvas));
};

const renderNeedleBase = canvas => (dispatch, getState) => {
  const {
    dimensions: { xRef, yRef },
    style: { needleStrokeStyle }
  } = getState().toJS();

  const ctx = setupCanvas(canvas, {
    lineWidth: 5,
    strokeStyle: needleStrokeStyle,
    fillStyle: needleStrokeStyle
  });
  ctx.beginPath();
  ctx.arc(xRef, yRef, 5, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
};
