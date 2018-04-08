import React from 'react';

import Matrix from '../../../../matrix';
import MatrixTransformer from '../../providers/MatrixTransformer';

import Candle from './Candle';

import { MatrixConsumer } from '../../elements'

const Candles = ({ values, first, count }) => {
  return (
    <MatrixConsumer>
      {values.slice(first, first + count).map(({ min, max, open, close }, index) => (
        <Candle x={(index + first) * 10} y={0} min={min} max={max} open={open} close={close} />
      ))}
    </MatrixConsumer>
  );
};

export default Candles;
