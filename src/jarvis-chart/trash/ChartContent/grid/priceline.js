import Matrix from 'lib/matrix';

const matrixForTimeline = (matrix, position) =>
  Matrix.join(
    Matrix.translate(position, 0),
    Matrix.resetTranslate(matrix, true, false),
    Matrix.resetScale(matrix, true, false),
  );

const matrixForTimepoint = (matrix, price) =>
  Matrix.join(
    Matrix.resetScale(matrix),
    Matrix.translate(0, price),
  );

export default (p, context, {}, cb) => {
  let count, offset, nth;

  p.render.primitives.group(context, { matrix: matrixForTimeline(context.api.matrix.get(), context.api.screen.width() - 50) }, () => {

    /* Do not draw elements that are outside the screen */
    const [ _0,  screenFirst ] = context.api.screen.inside([ 0, 0 ]);
    const [ _1, screenSecond ] = context.api.screen.inside([ 0, -1 ]);

    const screenStart = context.api.screen.height() - screenFirst;
    const screenHeight = screenSecond - screenFirst;

    offset = Math.floor(-screenStart / screenHeight) - 1;
    count  = Math.max(Math.ceil(context.api.screen.height() / screenHeight) + 2, 1);

    nth = Math.abs(Math.floor(count / 10));

    const bb = (new Array(count)).fill(0).map((v, i) => i + offset);

    bb.forEach((price) => {
      if (Math.abs(price) % nth > 0) return;

      p.render.primitives.group(context, { matrix: matrixForTimepoint(context.api.matrix.get(), price) }, () => {
        p.render.primitives.line(context, { x0: -context.api.screen.width(), y0: 0, x1: 0, y1: 0, color: '#dddddd' });
      });
    })
  })

  cb();

  p.render.primitives.group(context, { matrix: matrixForTimeline(context.api.matrix.get(), context.api.screen.width() - 50) }, () => {

    p.render.primitives.rectangle(context, { x:0, y: -2000, width: 50, height: 4000, color: 'white' });
    p.render.primitives.line(context, { x0: 0, y0: -2000, x1: 0, y1: 2000, color: '#ccc' });

    const bb = (new Array(count)).fill(0).map((v, i) => i + offset);
      bb.forEach((price) => {
        if (Math.abs(price) % nth > 0) return;

        p.render.primitives.group(context, { matrix: matrixForTimepoint(context.api.matrix.get(), price) }, () => {
          p.render.primitives.text(context, { x: 10, y: -5, text: price.toFixed(2), font: '100 13px Open Sans', color: '#4A4A4A', textAlign: 'left', crop: false });
        });
      });
  });
};
