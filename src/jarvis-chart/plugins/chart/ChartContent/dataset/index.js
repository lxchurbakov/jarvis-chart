import Matrix from 'lib/matrix';

const candle = (p, context, { x, y, min, max, open, close }) => {
  const marginBottom = min;
  const lineHeight = max - min;
  const bodyHeight = Math.abs(open - close);
  const paddingBottom = Math.min(open, close) - min;

  const direction = open > close ? 'down' : 'up';
  const color = direction === 'up' ? '#15E6C1' : '#FA2C50';

  p.render.primitives.line(context, { x0: 3.5 + x, y0: marginBottom + y, x1: 3.5 + x, y1: marginBottom + lineHeight + y, color });
  p.render.primitives.rectangle(context, { x, y: marginBottom + paddingBottom + y, width: 7, height: bodyHeight, color });
};

export default (p, context, { values }) => {
  /* Do not draw elements that are outside the screen */
  const [  screenFirst ] = context.matrix.screen([ 0, 0 ]);
  const [ screenSecond ] = context.matrix.screen([ 10, 0 ]);

  const screenStart = -screenFirst;
  const screenWidth = screenSecond - screenFirst;

  const offset = Math.floor(Math.max(screenStart / screenWidth - 1, 0));
  const count  = Math.ceil(context.matrix.screen.dimensions().width / screenWidth) + 2;

  values.forEach(({ min, max, open, close }, index) => {
    if (index < offset || index > offset + count) return;

    candle(p, context, { x: index * 10, y: 0, min, max, open, close });
  });
};
