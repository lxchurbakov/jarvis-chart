import React from 'react';

import Matrix from '../../../matrix';
import MatrixTransformer from '../../providers/MatrixTransformer';

import { Line, Rectangle, Group } from '../../elements';

const Candle = ({ min, max, open, close }) => {
  const marginBottom = min;
  const lineHeight = max - min;
  const bodyHeight = Math.abs(open - close);
  const paddingBottom = Math.min(open, close) - min;

  const direction = open > close ? 'down' : 'up';
  const color = direction === 'up' ? '#15E6C1' : '#FA2C50';

  return (
    <Group>
      <Line x0={3.5} y0={marginBottom} x1={3.5} y1={marginBottom + lineHeight} color={color} />
      <MatrixTransformer transform={matrix => Matrix.multiply(matrix, Matrix.translate(0, marginBottom + paddingBottom))}>
        <Rectangle width={7} height={bodyHeight} color={color} />
      </MatrixTransformer>
    </Group>
  );
};

export default Candle;
