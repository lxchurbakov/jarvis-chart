import React from 'react';

import Line from '../../elements/Line'
import Rectangle from '../../elements/Rectangle'
import Group from '../../elements/Group'

const Candle = ({ x, y, min, max, open, close, matrix }) => {
  const marginBottom = min;
  const lineHeight = max - min;
  const bodyHeight = Math.abs(open - close);
  const paddingBottom = Math.min(open, close) - min;

  const direction = open > close ? 'down' : 'up';
  const color = direction === 'up' ? '#15E6C1' : '#FA2C50';

  return (
    <Group>
      <Line x0={3.5 + x} y0={marginBottom + y} x1={3.5 + x} y1={marginBottom + lineHeight + y} color={color} matrix={matrix} />
      <Rectangle x={0 + x} y={marginBottom + paddingBottom + y} width={7} height={bodyHeight} color={color} matrix={matrix} />
    </Group>
  );
};

const Candles = ({ values, first, count, matrix }) => {
  return values.map(({ min, max, open, close }, index) => (
    <Candle key={index} x={(index) * 10} y={0} min={min} max={max} open={open} close={close} matrix={matrix} />
  ));
};

export default Candles;
