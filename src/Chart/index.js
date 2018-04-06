import React from 'react';

import Matrix from '../matrix';

import SvgRender from './render/svg';
import CanvasRender from './render/canvas';

import RenderProvider from './providers/RenderProvider';
import MatrixProvider from './providers/MatrixProvider';
import MatrixTransformer from './providers/MatrixTransformer';

import Candle from './components/Candle';

const transform = (matrixB) => (matrixA) => Matrix.multiply(matrixA, matrixB);

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

class Chart extends React.Component {
  constructor() {
    super();

    this.state = { scaleX: 1 };

    setInterval(() => {
      this.setState((state) => ({ scaleX: state.scaleX + 0.001 }))
    }, 20);
  }

  render () {
    const { scaleX } = this.state;

    return (
      <RenderProvider render={SvgRender}>
        <MatrixProvider matrix={Matrix.identity()}>

          <MatrixTransformer transform={transform(Matrix.scale(scaleX, -4))}>
            <MatrixTransformer transform={transform(Matrix.translate(0, -100))}>

              {data.map(({ min, max, open, close }, index) => (
                <MatrixTransformer key={index} transform={transform(Matrix.translate(index * 10, 0))}>
                  <Candle min={min} max={max} open={open} close={close} />
                </MatrixTransformer>
              ))}

            </MatrixTransformer>
          </MatrixTransformer>

        </MatrixProvider>
      </RenderProvider>
    );
  }
};

/*
<RenderProvider render={SvgRender}>
  <ChartWindow>
    <ChartDataGraph type="candles" data={data} />
    <ChartDataLegend type="candles" data={data} />
    <ChartDataDraws draws={draws} />
  </ChartWindow>
</RenderProvider>
*/

/*
const Candle = ({ max, min, open, close }) => {
  const lineDiff = max - min;
  const topPadding = max - Math.max(open, close);
  const bodyDiff = Math.abs(open - close);
  const bodyDirection = open < close ? 'up' : 'down';

  const color = bodyDirection === 'up' ? '#15E6C1' : '#FA2C50';

  // Assume width is 10
  return (
    <Group>
      <Line x0={5} y0={0} x1={5} y1={lineDiff} color={color} width={1} />
      <Transform matrix={Matrix.translate(0, topPadding)}>
        <Rectangle width={10} height={bodyDiff} color={color} />
      </Transform>
    </Group>
  );
};

const translate = Matrix.translate(100, 0);
const rotate = Matrix.rotate(Matrix.toRad(30));

const matrix = Matrix.mul(rotate, translate);
const matrixTransform = matrix.toCss();

<div style={{ position: 'relative', width: 400, height: '400px', background: '#f0f0f0' }}>
  <svg width="400" height="400">
    <Transform matrix={Matrix.translate(0, 100)}>
      <Transform matrix={Matrix.scale(1, -1)}>
        <Transform matrix={Matrix.translate(0, 0)}>
          <Candle max={90} min={45} open={50} close={70} />
        </Transform>
        <Transform matrix={Matrix.translate(15, 0)}>
          <Candle max={85} min={12} open={70} close={20} />
        </Transform>
        <Transform matrix={Matrix.translate(30, 0)}>
          <Candle max={36} min={0} open={20} close={10} />
        </Transform>
      </Transform>
    </Transform>
  </svg>
</div>
*/

export default Chart;
