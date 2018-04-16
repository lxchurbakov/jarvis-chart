import Chart from './index';

import React from 'react';

/**
 * React Оболочка для jarvis-chart'а
 */
export default class ChartComponent extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  componentDidMount () {
    const { options } = this.props;
    const { render, values, doubleBuffer, clickThreshold } = options;

    this.chart = Chart(this.mountNode, {
      render,
      values,
      doubleBuffer,
      clickThreshold
    });
  }

  render () {
    const { options } = this.props;
    const { width, height } = options;

    return (<div style={{ width, height }} ref={node => this.mountNode = node}></div>);
  }
};
