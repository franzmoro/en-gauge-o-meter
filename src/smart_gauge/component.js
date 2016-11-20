'use strict';
import React, { Component } from 'react';

class LiveMeterComponent extends Component {
  constructor () {
    super();
    const radius = 200;
    const ref = 250;
    this.state = {
      radius,
      xRef: ref,
      yRef: ref + radius / 2,
      ratio: 0.5
    };
    this.setupCanvas = this.setupCanvas.bind(this);
    this.renderGauge = this.renderGauge.bind(this);
    this.renderNeedle = this.renderNeedle.bind(this);
    this.renderNeedleBase = this.renderNeedleBase.bind(this);
  }
  componentDidMount () {
    this.renderGauge();
    this.renderNeedleBase();
    this.renderNeedle();
  }
  setupCanvas (canvasConfigObj) {
    const ctx = this.refs.gauge.getContext('2d');
    return Object.assign(ctx, canvasConfigObj, {});
  }
  renderNeedleBase () {
    const { xRef, yRef } = this.state;
    const ctx = this.setupCanvas({
      lineWidth: 5,
      strokeStyle: 'blue',
      fillStyle: 'blue'
    });
    ctx.beginPath();
    ctx.arc(xRef, yRef, 5, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
  }
  renderNeedle () {
    const { xRef, yRef, radius, ratio } = this.state;
    const ctx = this.setupCanvas({
      lineCap: 'round',
      lineWidth: 5,
      strokeStyle: 'blue'
    });
    ctx.beginPath();
    ctx.moveTo(xRef, yRef);
    const needleAngle = (Math.PI) * (1 - ratio);
    const newX = xRef + radius * Math.cos(needleAngle);
    const newY = yRef - radius * Math.sin(needleAngle);
    ctx.lineTo(newX, newY);
    ctx.stroke();
  }
  renderGauge () {
    const { xRef, yRef, radius } = this.state;
    const ctx = this.setupCanvas({
      lineWidth: 3,
      strokeStyle: '#550000',
      font: '20px Verdana'
    });
    ctx.beginPath();
    ctx.arc(xRef, yRef, radius, 0, Math.PI, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fillText('£ 0', xRef - (radius + 20), yRef + 30);
    ctx.fillText('£ 100', xRef + (radius - 20), yRef + 30);
    ctx.fillText('£ 50', xRef - 10, yRef - radius - 20);
  }
  render () {
    return (
      <div style = { styles.container }>
        <h1 style = { styles.title }>THE EN-GAUGE-O-METER</h1>
        <div>
          <canvas ref = 'gauge'
            width = { 500 }
            height = { 500 }
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

module.exports = LiveMeterComponent;
