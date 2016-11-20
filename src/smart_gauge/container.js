import React, { Component } from 'react';

class LiveMeterContainer extends Component {
  constructor () {
    super();
    const radius = 200;
    const ref = 250;
    this.state = {
      radius,
      xRef: ref,
      yRef: ref + radius / 2,
      ratio: 0.5
    }
    this.getCanvasContext = this.getCanvasContext.bind(this);
    this.setupCanvas = this.setupCanvas.bind(this);
    this.renderGauge = this.renderGauge.bind(this);
    this.renderNeedle = this.renderNeedle.bind(this);
  }
  componentDidMount () {
    this.renderGauge();
    this.renderNeedleBase();
    this.renderNeedle();
  }
  getCanvasContext () {
    return this.refs.gauge.getContext('2d');
  }
  setupCanvas (canvasConfigObj) {
    const ctx = this.getCanvasContext();
    return Object.assign(ctx, canvasConfigObj, {});
  }
  renderNeedleBase () {
    const ctx = this.getCanvasContext();
    const { xRef, yRef, radius, ratio } = this.state;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.arc(xRef, yRef, 5, 0, Math.PI * 2, true);
    ctx.fillStyle = 'blue';
    ctx.stroke();
    ctx.fill();
  }
  renderNeedle () {
    const ctx = this.getCanvasContext();
    const { xRef, yRef, radius, ratio } = this.state;

    const needleAngle = (Math.PI) * (1 - ratio);
    ctx.lineCap = 'round';
    // needle pointer
    ctx.beginPath();
    ctx.moveTo(xRef, yRef);
    const newX = xRef + radius * Math.cos(needleAngle);
    const newY = yRef - radius * Math.sin(needleAngle);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.lineTo(newX, newY);
    ctx.stroke();
  }
  renderGauge () {
    const ctx = this.getCanvasContext();
    const { xRef, yRef, radius } = this.state;
    ctx.beginPath();
    ctx.arc(xRef, yRef, radius, 0, Math.PI, true);
    ctx.lineWidth = 3;
    ctx.closePath();
    ctx.strokeStyle = '#550000';
    ctx.stroke();
    ctx.font = '20px Verdana';
    ctx.fillText('£ 0', xRef - (radius + 20), yRef + 30);
    ctx.fillText('£ 100', xRef + (radius - 20), yRef + 30);
    ctx.fillText('£ 50', xRef - 10, yRef - radius - 20);
  }
  render () {
    return (
      <div style = { styles.container }>
        <h1 style = { styles.title }>THE EN-GAUGE-O-METER</h1>
        <div>
          <canvas
            ref = 'gauge'
            width = { 500 }
            height = { 500 }
            />
        </div>
      </div>
    );
  }
};

const styles = {
  title: {
    // fontFamily
  },
  container: {
    backgroundColor: 'grey',
    textAlign: 'center'
  }
}

module.exports = LiveMeterContainer;
