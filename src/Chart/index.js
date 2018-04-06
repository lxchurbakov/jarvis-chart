import React from 'react';

import Matrix from '../matrix';

import SvgRender from './render/SvgRender';
import CanvasRender from './render/CanvasRender';

import RenderProvider from './providers/RenderProvider';
import MatrixProvider from './providers/MatrixProvider';

import Circle from './elements/Circle';

class Chart extends React.Component {
  render () {
    return (
      <RenderProvider render={CanvasRender}>
        <MatrixProvider matrix={Matrix.identity()}>
          <Circle cx={100} cy={100} radius={20} color="red" />
          <Circle cx={100} cy={150} radius={40} color="red" />
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
