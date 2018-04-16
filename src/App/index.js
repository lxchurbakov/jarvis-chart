import React from 'react';

import values from './values';

import Chart from '../jarvis-chart/react';
import UI from './UI';

import { getParameterByName } from './helpers';

const render = getParameterByName('render') || 'canvas';
const doubleBuffer = (getParameterByName('double-buffer') || 'on') === 'on';
const clickThreshold = 100;

class App extends React.Component {
  left = () => this.chart.chartWindowsScaleTranslate.translate(200);
  right = () => this.chart.chartWindowsScaleTranslate.translate(-200);

  zoomIn = () => this.chart.chartWindowsScaleTranslate.zoom(1);
  zoomOut = () => this.chart.chartWindowsScaleTranslate.zoom(-1);

  paint = () => this.chart.chartWindowsModes.set('brush');
  eye = () => this.chart.chartWindowsModes.set('view');
  vector = () => this.chart.chartWindowsModes.set('vector');

  lineCircle = () => this.chart.chartWindowsModes.set('line');
  lineCircleHorizontal = () => this.chart.chartWindowsModes.set('line-horizontal');
  segmentDiagonal = () => this.chart.chartWindowsModes.set('segment');
  segmentHorizontal = () => this.chart.chartWindowsModes.set('segment-horizontal');
  rectangle = () => this.chart.chartWindowsModes.set('rectangle');
  circle = () => this.chart.chartWindowsModes.set('circle');
  triangle = () => this.chart.chartWindowsModes.set('triangle');
  text = () => this.chart.chartWindowsModes.set('text');

  render () {
    const width = '100%';
    const height = '800px';

    const options = {
      render, values, doubleBuffer, clickThreshold,
      width, height
    };

    return (
      <div>
        <h1>Jarvis Chart Example</h1>
        <UI
          onLeft={this.left}
          onRight={this.right}
          onZoomIn={this.zoomIn}
          onZoomOut={this.zoomOut}
          onPaint={this.paint}
          onEye={this.eye}
          onVector={this.vector}
          onLineCircle={this.lineCircle}
          onLineCircleHorizontal={this.lineCircleHorizontal}
          onSegmentDiagonal={this.segmentDiagonal}
          onSegmentHorizontal={this.segmentHorizontal}
          onRectangle={this.rectangle}
          onCircle={this.circle}
          onTriangle={this.triangle}
          onText={this.text}
        >
          <Chart ref={n => this.chart = n.chart} options={options} />
        </UI>
      </div>
    );
  }
}

export default App;
