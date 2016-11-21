'use strict';
import React, { Component, PropTypes } from 'react';

class SmartGaugeComponent extends Component {
  componentDidMount () {
    const {
      xRef, yRef, radius,
      needleStrokeStyle, gaugeStrokeStyle, labelFont,
      setGaugeDimensions, getNewData, setStyle
    } = this.props;

    setGaugeDimensions({ xRef, yRef, radius });
    setStyle({ needleStrokeStyle, gaugeStrokeStyle, labelFont });
    getNewData(this.refs.gauge);
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
    margin: 10,
    font: '40px Impact'
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
  radius: PropTypes.number,
  xRef: PropTypes.number,
  yRef: PropTypes.number,
  style: PropTypes.object,
  needleStrokeStyle: PropTypes.string,
  gaugeStrokeStyle: PropTypes.string,
  labelFont: PropTypes.string,
  getNewData: PropTypes.func.isRequired,
  setGaugeDimensions: PropTypes.func.isRequired,
  setStyle: PropTypes.func.isRequired,
  isShowingErrorMessage: PropTypes.bool.isRequired
};

SmartGaugeComponent.defaultProps = {
  minLabel: '£ 0',
  maxLabel: '£ 100',
  valueLabel: '£ 0',
  ratio: 0,
  radius: 250,
  xRef: 250,
  yRef: 375,
  needleStrokeStyle: 'blue',
  gaugeStrokeStyle: '#550000',
  labelFont: '20px Impact'
};

module.exports = SmartGaugeComponent;
