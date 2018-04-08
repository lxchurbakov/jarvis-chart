import circle from '../primitives/circle';
import line from '../primitives/line';
import rectangle from '../primitives/rectangle';
import text from '../primitives/text';
import group from '../primitives/group';

import Matrix from '../../../matrix';

const candle = ({ x, y, min, max, open, close, matrix }, options, context) => {
  const marginBottom = min;
  const lineHeight = max - min;
  const bodyHeight = Math.abs(open - close);
  const paddingBottom = Math.min(open, close) - min;

  const direction = open > close ? 'down' : 'up';
  const color = direction === 'up' ? '#15E6C1' : '#FA2C50';

  group({ matrix }, options, context, () => {
    line({ x0: 3.5 + x, y0: marginBottom + y, x1: 3.5 + x, y1: marginBottom + lineHeight + y, color }, options, context);
    rectangle({ x, y: marginBottom + paddingBottom + y, width: 7, height: bodyHeight, color }, options, context);
  });
};

export default ({ values, matrix }, options, context) => {
  // Crop visible
  const [zeroAt, _1] = Matrix.apply([0, 0], matrix);
  const [firstAt, _2] = Matrix.apply([10, 0], matrix);

  const start = zeroAt;
  const width = firstAt - zeroAt;

  const offset = (-start) / width;
  const last   = (900 / width) + offset;

  group({ matrix }, options, context, () => {
    values.forEach(({ min, max, open, close }, index) => {
      if (index < offset || index > last)
        return;
      candle({ x: index * 10, y: 0, min, max, open, close }, options, context);
    });
  });
};
