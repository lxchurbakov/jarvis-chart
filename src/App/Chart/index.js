import React from 'react';

import Matrix from '../../matrix';

import SvgRender from './render/svg';
import CanvasRender from './render/canvas';

import RenderProvider from './providers/RenderProvider';
import MatrixProvider from './providers/MatrixProvider';
import MatrixTransformer from './providers/MatrixTransformer';

import Data from './components/Data';
import Timeline from './components/Timeline';
import Priceline from './components/Priceline';
import EventsWindow from './components/EventsWindow';

import { values } from './values';

const onClick = () => console.log('onClick');
const onPath  = () => console.log('onPath');

class Chart extends React.Component {
  constructor () {
    super();

    this.state = {
      zoomX: 1,
      zoomY: 1,
      translateX: 0,
      translateY: 0,
    };
  }

  getVisibleCandles = () => {
    const { translateX, zoomX } = this.state;
    const matrix = this.getMatrix();

    const start  = [ 0, 0];
    const candle = [10, 0];

    const startInValues = Matrix.apply(start, matrix);
    const candleInValues = Matrix.apply(candle, matrix);

    const startOffset = startInValues[0];
    const candleWidth = candleInValues[0] - startInValues[0];

    const firstCandleVisible = -Math.floor(startOffset / candleWidth) - 1;
    const candlesVisibleCount = Math.ceil(900 / candleWidth) + 1;

    return { first: Math.max(firstCandleVisible, 0), count: candlesVisibleCount };
  }

  calculateAutoZoom = () => {
    const { first, count } = this.getVisibleCandles();
    const candlesVisible = values.slice(first, first + count);

    const max = candlesVisible.reduce((res, candle) => Math.max(res, candle.max), -Infinity);
    const min = candlesVisible.reduce((res, candle) => Math.min(res, candle.min), Infinity);

    const zoom = 500 / (max - min);
    const translate = -min;

    this.setState((state) => ({ zoomY: zoom }));
    this.setState((state) => ({ translateY: translate }));
  }

  onZoom = (delta, e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((state) => ({ zoomX: state.zoomX - (delta / 1000), zoomY: state.zoomY - (delta / 1000), }));
    this.calculateAutoZoom();
  }

  onDrag = (x, y, e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((state) => ({ translateX: state.translateX + (x / state.zoomX), translateY: state.translateY - (y / state.zoomY) }));
    this.calculateAutoZoom();
  }

  /**
   * Create Main Chart Matrix
   */
  getMatrix = () => Matrix.join(
    // Translate the way we dragged
    Matrix.translate(this.state.translateX, this.state.translateY),

    // Apply zoom (in the middle)
    Matrix.translate(-450, 0),
    Matrix.scale(this.state.zoomX, this.state.zoomY),
    Matrix.translate(450, 0),

    // Make the left bottom corner the center of XY
    Matrix.scale(1, -1),
    Matrix.translate(0, 500),
  )

  render () {
    const { first, count } = this.getVisibleCandles();

    return (
      <div style={{ width: 900, height: 500, border: '1px dashed #ccc', overflow: 'hidden', margin: '0 auto' }}>
        <EventsWindow onClick={onClick} onZoom={this.onZoom} onDrag={this.onDrag} onPath={onPath}>
          <RenderProvider render={CanvasRender}>
            <MatrixProvider matrix={this.getMatrix()}>

              <Data values={values} first={first} count={count} />
              <Timeline values={values} nth={5} />

              <Priceline />

            </MatrixProvider>
          </RenderProvider>
        </EventsWindow>
      </div>
    );
  }
};

export default Chart;
