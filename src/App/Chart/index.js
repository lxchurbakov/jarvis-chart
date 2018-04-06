import React from 'react';

import Matrix from '../../matrix';

import SvgRender from './render/svg';
import CanvasRender from './render/canvas';

import RenderProvider from './providers/RenderProvider';
import MatrixProvider from './providers/MatrixProvider';
import MatrixTransformer from './providers/MatrixTransformer';

import Candles from './components/Candles';
import Timeline from './components/Timeline';
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

  /**
   * Create Main Chart Matrix
   */
  getMatrix = () => {
    const zoomY      = Matrix.scale(1, 5);
    const reverseY   = Matrix.scale(1, -1);
    const translateY = Matrix.translate(0, 500);

    const translateX    = Matrix.translate(this.state.translateX - 450, 0);
    const zoomX         = Matrix.scale(this.state.zoomX, 1);
    const translateBack = Matrix.translate(450, 0);

    return Matrix.join(
      zoomY,
      reverseY, translateY, translateX,
      zoomX,
      translateBack,
    );
  }

  render () {
    return (
      <div style={{ width: 900, height: 500, border: '1px dashed #ccc', overflow: 'hidden', margin: '0 auto' }}>
        <EventsWindow onClick={onClick} onZoom={this.onZoom} onDrag={this.onDrag} onPath={onPath}>
          <RenderProvider render={CanvasRender}>
            <MatrixProvider matrix={this.getMatrix()}>
              <Candles data={data} />
              <Timeline data={data} nth={3} />
            </MatrixProvider>
          </RenderProvider>
        </EventsWindow>
      </div>
    );
  }
};

export default Chart;
