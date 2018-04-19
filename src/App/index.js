import React from 'react';

import values from './values.ts';

import Chart from '../jarvis-chart/react';
import UI from './UI';

import { getParameterByName } from './helpers';

const render       = getParameterByName('render') || 'canvas';
const doubleBuffer = (getParameterByName('double-buffer') || 'on') === 'on';
const clickThreshold = 200;

class App extends React.Component {
  left  = () => this.chart.chartWindowsScaleTranslate.translate(200);
  right = () => this.chart.chartWindowsScaleTranslate.translate(-200);

  zoomIn  = () => this.chart.chartWindowsScaleTranslate.zoom(1);
  zoomOut = () => this.chart.chartWindowsScaleTranslate.zoom(-1);

  paint = () => this.chart.chartWindowsModes.set('brush');
  eye   = () => this.chart.chartWindowsModes.set('view');
  // vector = () => this.chart.chartWindowsModes.set('vector');

  lineCircle           = () => this.chart.chartWindowsModes.set('line');
  lineCircleHorizontal = () => this.chart.chartWindowsModes.set('line-horizontal');
  segmentDiagonal      = () => this.chart.chartWindowsModes.set('segment');
  segmentHorizontal    = () => this.chart.chartWindowsModes.set('segment-horizontal');
  rectangle = () => this.chart.chartWindowsModes.set('rectangle');
  circle    = () => this.chart.chartWindowsModes.set('ellipse');
  triangle  = () => this.chart.chartWindowsModes.set('triangle');
  text      = () => this.chart.chartWindowsModes.set('text');

  fibonacci = () => this.chart.chartWindowsModes.set('fibonacci');
  ellipse   = () => this.chart.chartWindowsModes.set('ellipse');
  triangle  = () => this.chart.chartWindowsModes.set('triangle');

  erase  = () => this.chart.chartWindowsModes.set('erase');

  /* Временный метод и временный мост с графиком */
  done = ({ indicators, graph }) => this.chart.debug.update(indicators, graph)

  render () {
    const width = '100%';
    const height = '800px';

    const options = {
      render, values, doubleBuffer, clickThreshold,
      width, height
    };

    const { modal } = this.props;

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
          onGoldenRatio={this.fibonacci}
          onCircle={this.ellipse}
          onTriangle={this.triangle}
          onEraser={this.erase}
          modal={modal}
          onDone={this.done}
        >
          <Chart ref={n => this.chart = n.chart} options={options} />
        </UI>
      </div>
    );
  }
}

export default App;
