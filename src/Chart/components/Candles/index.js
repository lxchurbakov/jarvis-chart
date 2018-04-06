import React from 'react';

import Matrix from '../../../matrix';
import MatrixTransformer from '../../providers/MatrixTransformer';

import Candle from '../Candle';

const transform = (matrixB) => (matrixA) => Matrix.multiply(matrixA, matrixB);

const Candles = ({ data }) => {
  return (
    <MatrixTransformer transform={transform(Matrix.scale(1, 1))}>
      <MatrixTransformer transform={transform(Matrix.translate(0, 0))}>

        {data.map(({ min, max, open, close }, index) => (
          <MatrixTransformer key={index} transform={transform(Matrix.translate(index * 10, 0))}>
            <Candle min={min} max={max} open={open} close={close} />
          </MatrixTransformer>
        ))}

      </MatrixTransformer>
    </MatrixTransformer>
  );
};

export default Candles;
