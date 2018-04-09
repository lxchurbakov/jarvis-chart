import circle from '../../primitives/circle';
import line from '../../primitives/line';
import rectangle from '../../primitives/rectangle';
import text from '../../primitives/text';
import group from '../../primitives/group';

import Matrix from '../../../lib/matrix';

const candle = ({ x, y, min, max, open, close }, options, context) => {
  const marginBottom = min;
  const lineHeight = max - min;
  const bodyHeight = Math.abs(open - close);
  const paddingBottom = Math.min(open, close) - min;

  const direction = open > close ? 'down' : 'up';
  const color = direction === 'up' ? '#15E6C1' : '#FA2C50';

  line({ x0: 3.5 + x, y0: marginBottom + y, x1: 3.5 + x, y1: marginBottom + lineHeight + y, color }, options, context);
  rectangle({ x, y: marginBottom + paddingBottom + y, width: 7, height: bodyHeight, color }, options, context);
};

export default ({ values, matrix }, options, context) => {
  group({ matrix }, options, context, () => {
    /* Do not draw elements that are outside the screen */
    const [ screenFirst,  _1 ] = context.matrix.screen([ 0, 0 ]);
    const [ screenSecond, _0 ] = context.matrix.screen([ 10, 0 ]);

    const screenStart = -screenFirst;
    const screenWidth = screenSecond - screenFirst;

    const offset = Math.floor(Math.max(screenStart / screenWidth - 1, 0));
    const count  = Math.ceil(context.matrix.screen.dimensions().width / screenWidth) + 2;

    values.forEach(({ min, max, open, close }, index) => {
      if (index < offset || index > offset + count) return;

      candle({ x: index * 10, y: 0, min, max, open, close }, options, context);
    });
  });
};
