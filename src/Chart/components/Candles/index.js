import React from 'react';

import Matrix from '../../../matrix';
import MatrixTransformer from '../../providers/MatrixTransformer';

import Candle from '../Candle';

const Candles = ({ data }) => {
  return (
    <MatrixTransformer transform={Matrix.transform(Matrix.scale(1, 1))}>
      {data.map(({ min, max, open, close }, index) => (
        <MatrixTransformer key={index} transform={Matrix.transform(Matrix.translate(index * 10, 0))}>
          <Candle min={min} max={max} open={open} close={close} />
        </MatrixTransformer>
      ))}
    </MatrixTransformer>
  );
};

/*

<MatrixTransformer transform={Matrix.transform(Matrix.scale(1, 1))}>
  <MatrixTransformer transform={Matrix.transform(Matrix.translate(0, 0))}>

*/

export default Candles;
