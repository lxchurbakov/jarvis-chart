import circle from '../../primitives/circle';
import line from '../../primitives/line';
import rectangle from '../../primitives/rectangle';
import text from '../../primitives/text';
import group from '../../primitives/group';

import Matrix from '../../../../matrix';

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

export default ({ prices, matrix }, options, context) => {
  group({ matrix: matrixForTimeline(context.matrix.get(), context.matrix.screen.dimensions().width - 50) }, options, context, () => {

    /* Do not draw elements that are outside the screen */
    const [ _0,  screenFirst ] = context.matrix.screen([ 0, 0 ]);
    const [ _1, screenSecond ] = context.matrix.screen([ 0, -1 ]);

    const screenStart = context.matrix.screen.dimensions().height - screenFirst;
    const screenHeight = screenSecond - screenFirst;

    const offset = Math.floor(-screenStart / screenHeight) - 1;
    const count  = Math.max(Math.ceil(context.matrix.screen.dimensions().height / screenHeight) + 2, 1);

    const nth = Math.abs(Math.floor(count / 10));

    line({ x0: 0, y0: -2000, x1: 0, y1: 2000, color: '#ccc' }, options, context);

    (new Array(count).fill(0).map((v, i) => i + offset))
      .forEach((price) => {
        if (Math.abs(price) % nth > 0) return;

        group({ matrix: matrixForTimepoint(context.matrix.get(), price) }, options, context, () => {
          text({ x: 20, y: -5, text: price, font: '100 13px Open Sans', color: '#4A4A4A', textAlign: 'left', crop: false }, options, context);
          line({ x0: -options.width, y0: 0, x1: 100, y1: 0, color: '#ddd' }, options, context);
        });
      });
    //
    // prices.forEach((price, index) => {
    //   /* Do not render invisible elements */
    //   if (price < offset || price > count + offset) return;
    //   /* Render only 10 elements */
    //   if (index % nth > 0) return;
    //   // if ((price / 10) < offset || (price / 10) > last) return;
    //
    //   group({ matrix: matrixForTimepoint(context.matrix.get(), price) }, options, context, () => {
    //     text({ x: 20, y: -5, text: price, font: '100 13px Open Sans', color: '#4A4A4A', textAlign: 'left', crop: false }, options, context);
    //     line({ x0: -options.width, y0: 0, x1: 100, y1: 0, color: '#ddd' }, options, context);
    //   });
    // });
  });
};
