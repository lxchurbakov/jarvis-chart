import React from 'react';

import values from './values';

import Chart from '../jarvis-chart/react';
import UI from './UI';

import { getParameterByName } from './helpers';

const render = getParameterByName('render') || 'canvas';
const doubleBuffer = (getParameterByName('double-buffer') || 'on') === 'on';
const clickThreshold = 100;

class App extends React.Component {
  left = () => {
    this.chart.chartWindowsScaleTranslate.translate(200);
  }

  right = () => {
    this.chart.chartWindowsScaleTranslate.translate(-200);
  }

  zoomIn = () => {
    this.chart.chartWindowsScaleTranslate.zoom(1);
  }

  zoomOut = () => {
    this.chart.chartWindowsScaleTranslate.zoom(-1);
  }

  render () {
    const width = '100%';
    const height = '600px';

    const options = {
      render, values, doubleBuffer, clickThreshold,
      width, height
    };

    return (
      <div>
        <h1>Jarvis Chart Example</h1>
        <UI onLeft={this.left} onRight={this.right} onZoomIn={this.zoomIn} onZoomOut={this.zoomOut}>
          <Chart ref={n => this.chart = n.chart} options={options} />
        </UI>
      </div>
    );
  }
}

export default App;
