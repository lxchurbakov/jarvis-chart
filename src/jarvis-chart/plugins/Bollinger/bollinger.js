export default (p, context, { values, distance }) => {
  const [  screenFirst ] = context.matrix.screen([ 0, 0 ]);
  const [ screenSecond ] = context.matrix.screen([ 10, 0 ]);

  const screenStart = -screenFirst;
  const screenWidth = screenSecond - screenFirst;

  const offset = Math.floor(Math.max(screenStart / screenWidth - 1, 0));
  const count  = Math.ceil(context.matrix.screen.dimensions().width / screenWidth) + 2;

  const movingAverage = values.map((value, index, arr) => {
    const sliceInstance = values.slice(Math.max(0, index - distance), Math.min(values.length - 1, index + distance));

    return sliceInstance.reduce((acc, value) => acc + value.close, 0) / sliceInstance.length;
  });

  movingAverage.forEach((value, index) => {
    if (index < 1) return;
    if (index < offset || index > offset + count) return;

    const prev = movingAverage[index - 1];

    const x0 = 10 * (index - 1);
    const y0 = prev;

    const x1 = 10 * (index);
    const y1 = value;

    p.render.primitives.line(context, { x0, y0, x1, y1, color: '#7437e8', width: 2 });
  });
};
