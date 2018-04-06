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
      scale: Matrix.identity(),
      translate: Matrix.identity()
    };
  }

  onZoom = (delta, e) => {
    e.preventDefault();
    e.stopPropagation();

    const modifier = Matrix.scale(1 - (delta / 1000), 1);

    this.setState((state) => {
      return {
        scale: Matrix.multiply(state.scale, modifier)
      };
    });
  }

  onDrag = (x, y, e) => {
    e.preventDefault();
    e.stopPropagation();

    const modifier = Matrix.translate(x, 0);

    this.setState((state) => {
      return {
        translate: Matrix.multiply(state.translate, modifier)
      };
    });
  }

  getMatrix = () => {
    return Matrix.multiply(Matrix.translate(500, 0), Matrix.multiply(this.state.scale, this.state.translate));
  }

  render () {
    return (
      <EventsWindow onClick={onClick} onZoom={this.onZoom} onDrag={this.onDrag} onPath={onPath}>
        <RenderProvider render={SvgRender}>
          <MatrixProvider matrix={this.getMatrix()}>
            <Candles data={data} />
          </MatrixProvider>
        </RenderProvider>
      </EventsWindow>
    );
  }
};

export default Chart;
