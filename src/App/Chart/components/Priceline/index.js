import React from 'react';

import Matrix from '../../../../matrix';
import MatrixTransformer from '../../providers/MatrixTransformer';

import { Text, Circle, Line, Group } from '../../elements';

const prices = new Array(100).fill(1).map((v, i) => i * 50);

const Priceline = ({ data, nth = 1 }) => {
  return (
    <MatrixTransformer transform={matrix => Matrix.join(Matrix.resetScale(matrix, true, false), matrix)}>
      <MatrixTransformer transform={matrix => Matrix.join(Matrix.resetTranslate(matrix, true, false), matrix)}>

        <MatrixTransformer transform={Matrix.transformLeft(Matrix.translate(820, 0))}>
          <Line x0={0} y0={-2000} x1={0} y1={2000} color="#CCC" width={1} />
          {prices.map((price, index) => (
            <Group key={index}>
              <MatrixTransformer transform={Matrix.transformLeft(Matrix.translate(0, price))}>
                <MatrixTransformer transform={matrix => Matrix.multiply(Matrix.resetScale(matrix), matrix)}>
                  <Text x={20} y={0} color="#4A4A4A" font="13px 'Open Sans'" text={price.toFixed(2)} textAlign="left" />
                </MatrixTransformer>
              </MatrixTransformer>
            </Group>
          ))}
        </MatrixTransformer>

      </MatrixTransformer>
    </MatrixTransformer>
  );
};

export default Priceline;
