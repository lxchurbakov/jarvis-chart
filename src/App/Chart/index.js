import React from 'react';

import Matrix from '../../matrix';

import SvgRender from './render/svg';
import CanvasRender from './render/canvas';

import RenderProvider from './providers/RenderProvider';
import MatrixProvider from './providers/MatrixProvider';
import MatrixTransformer from './providers/MatrixTransformer';

import Candles from './components/Candles';
import Timeline from './components/Timeline';
import Priceline from './components/Priceline';
import EventsWindow from './components/EventsWindow';

import generateRandomData from './data';

const data = (new Array(100)).fill(0).map(() => generateRandomData());

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

  onZoom = (delta, e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((state) => ({ zoomX: state.zoomX - (delta / 1000), zoomY: state.zoomX - (delta / 1000), }));
  }

  onDrag = (x, y, e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((state) => ({ translateX: state.translateX + (x / state.zoomX), translateY: state.translateY - (y / state.zoomY) }));
  }

  /**
   * Create Main Chart Matrix
   */
  getMatrix = () => Matrix.join(
    // Translate the way we dragged
    Matrix.translate(this.state.translateX, this.state.translateY),

    // Apply zoom (in the middle)
    Matrix.translate(-450, -250),
    Matrix.scale(this.state.zoomX, this.state.zoomY),
    Matrix.translate(450, 250),

    // Make the left bottom corner the center of XY
    Matrix.scale(1, -1),
    Matrix.translate(0, 500),
  )

  render () {
    return (
      <div style={{ width: 900, height: 500, border: '1px dashed #ccc', overflow: 'hidden', margin: '0 auto' }}>
        <EventsWindow onClick={onClick} onZoom={this.onZoom} onDrag={this.onDrag} onPath={onPath}>
          <RenderProvider render={CanvasRender}>
            <MatrixProvider matrix={this.getMatrix()}>
              <Candles data={data} />
              <Timeline data={data} nth={5} />
              <Priceline />
            </MatrixProvider>
          </RenderProvider>
        </EventsWindow>
      </div>
    );
  }
};

export default Chart;
