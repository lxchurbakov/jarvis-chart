import React from 'react';

import Matrix from '../../../../matrix';
import MatrixTransformer from '../../providers/MatrixTransformer';

import Candle from './Candle';

const Candles = ({ values }) => {
  return (
    values.map(({ min, max, open, close }, index) => (
      <MatrixTransformer key={index} transform={Matrix.transformLeft(Matrix.translate(index * 10, 0))}>
        <Candle min={min} max={max} open={open} close={close} />
      </MatrixTransformer>
    ))
  );
};

export default Candles;
