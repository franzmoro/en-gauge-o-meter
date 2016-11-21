'use strict';
import React, { Component, PropTypes } from 'react';

class SmartGaugeComponent extends Component {
  constructor () {
    super();
    this.setupCanvas = this.setupCanvas.bind(this);
    this.renderGauge = this.renderGauge.bind(this);
    this.renderLabels = this.renderLabels.bind(this);
    this.renderNeedleBase = this.renderNeedleBase.bind(this);
    this.renderNeedle = this.renderNeedle.bind(this);
  }
  componentDidMount () {
    this.renderGauge();
    this.renderNeedle();
  }
  setupCanvas (canvasConfigObj) {
    const ctx = this.refs.gauge.getContext('2d');
    return Object.assign(ctx, canvasConfigObj, {});
  }
  renderNeedleBase () {
    const {
      dimensions: { xRef, yRef },
      style: { needleStrokeStyle }
    } = this.props;
    const ctx = this.setupCanvas({
      lineWidth: 5,
      strokeStyle: needleStrokeStyle,
      fillStyle: needleStrokeStyle
    });
    ctx.beginPath();
    ctx.arc(xRef, yRef, 5, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
  }
  renderNeedle () {
    const {
      dimensions: { xRef, yRef, radius },
      ratio,
      style: { needleStrokeStyle }
    } = this.props;
    const ctx = this.setupCanvas({
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
    this.renderNeedleBase();
  }
  renderGauge () {
    const {
      dimensions: { xRef, yRef, radius },
      style: { gaugeStrokeStyle }
    } = this.props;
    const ctx = this.setupCanvas({
      lineWidth: 3,
      strokeStyle: gaugeStrokeStyle
    });
    ctx.beginPath();
    ctx.arc(xRef, yRef, radius, 0, Math.PI, true);
    ctx.closePath();
    ctx.stroke();
    this.renderLabels();
  }
  renderLabels () {
    const {
      dimensions: { xRef, yRef, radius },
      minLabel, maxLabel, valueLabel,
      style: { labelFont }
    } = this.props;
    const ctx = this.setupCanvas({
      font: labelFont
    });
    const labelsOffset = 20;
    ctx.fillText(minLabel,  (xRef - radius), (yRef + labelsOffset));
    ctx.fillText(maxLabel,  (xRef + radius), (yRef + labelsOffset));
    ctx.fillText(valueLabel, xRef,           (yRef - radius - labelsOffset));
  }
  render () {
    return (
      <div style = { styles.container }>
        <h1 style = { styles.title }>THE EN-GAUGE-O-METER</h1>
        <div>
          <canvas ref = 'gauge'
            width = { 600 }
            height = { 600 }
            />
        </div>
      </div>
    );
  }
}

const styles = {
  title: {
    // fontFamily
  },
  container: {
    backgroundColor: 'grey',
    textAlign: 'center'
  }
};

SmartGaugeComponent.propTypes = {
  minLabel: PropTypes.string,
  maxLabel: PropTypes.string,
  valueLabel: PropTypes.string,
  ratio: PropTypes.number,
  dimensions: PropTypes.object,
  style: PropTypes.object
};

SmartGaugeComponent.defaultProps = {
  minLabel: '£ 0',
  maxLabel: '£ 100',
  valueLabel: '£ 50',
  ratio: 0.5,
  dimensions: {
    radius: 250,
    xRef: 250,
    yRef: 375
  },
  style: {
    needleStrokeStyle: 'blue',
    gaugeStrokeStyle: '#550000',
    labelFont: '20px Verdana'
  }
};

module.exports = SmartGaugeComponent;
