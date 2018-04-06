import React from 'react';

import Matrix from '../matrix';

import SvgRender from './render/svg';
import CanvasRender from './render/canvas';

import RenderProvider from './providers/RenderProvider';
import MatrixProvider from './providers/MatrixProvider';
import MatrixTransformer from './providers/MatrixTransformer';

import Candles from './components/Candles';
import EventsWindow from './components/EventsWindow';

let lastClose = 50;

const generateRandomData = () => {
  const open = lastClose;
  const close = Math.min(90, Math.max(10, open + (Math.random() * 30) - 15));

  lastClose = close;

  const min = Math.max(5, Math.min(close, open) - Math.random() * 20);
  const max = Math.min(95, Math.max(close, open) + Math.random() * 20);

  return { min, max, close, open };
};

const data = (new Array(100)).fill(0).map(() => generateRandomData());

const onClick = () => console.log('onClick');
const onPath = () => console.log('onPath');

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

  onZoom = (delta, e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((state) => ({ zoomX: state.zoomX - (delta / 1000), zoomY: state.zoomY - (delta / 1000) }));
  }

  onDrag = (x, y, e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((state) => ({ translateX: state.translateX + (x / this.state.zoomX), translateY: state.translateY - (y / this.state.zoomY) }));
  }

  getMatrix = () => {
    return Matrix.multiply(Matrix.translate(500, 0), Matrix.multiply(this.state.scale, this.state.translate));
  }

  render () {
    return (
      <div style={{ width: 900, height: 500, border: '1px dashed #ccc', overflow: 'hidden', margin: '0 auto' }}>
        <EventsWindow onClick={onClick} onZoom={this.onZoom} onDrag={this.onDrag} onPath={onPath}>
          <RenderProvider render={SvgRender}>
            /* Move the beginnig to the center */
            <MatrixProvider matrix={Matrix.multiply(Matrix.translate(450, 250), Matrix.scale(1, -1))}>
              /* Simple example of scaling */
              <MatrixTransformer transform={Matrix.transform(Matrix.scale(this.state.zoomX, this.state.zoomY))}>
                <MatrixTransformer transform={Matrix.transform(Matrix.translate(this.state.translateX, 0))}>
                  <Candles data={data} />
                </MatrixTransformer>
              </MatrixTransformer>
            </MatrixProvider>
          </RenderProvider>
        </EventsWindow>
      </div>
    );
  }
};

export default Chart;
