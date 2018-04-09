import circle from '../../primitives/circle';
import line from '../../primitives/line';
import rectangle from '../../primitives/rectangle';
import text from '../../primitives/text';
import group from '../../primitives/group';

import Matrix from '../../../lib/matrix';

const OFFSET = 10;

const matrixForTimeline = (matrix, position) =>
  Matrix.join(
    Matrix.translate(0, position),
    Matrix.resetTranslate(matrix, false, true),
    Matrix.resetScale(matrix, false, true),
  );

const matrixForTimepoint = (matrix, index) =>
  Matrix.join(
    Matrix.resetScale(matrix),
    Matrix.translate(index * OFFSET + 3.5, 0)
  );

export default ({ values, matrix, showIndicator }, options, context) => {

  group({ matrix: matrixForTimeline(context.matrix.get(), context.matrix.screen.dimensions().height - 40) }, options, context, () => {
    line({ x0: -20000, y0: 0, x1: 20000, y1: 0, color: '#ccc' }, options, context);

    /* Do not draw elements that are outside the screen */
    const [  screenFirst ] = context.matrix.screen([ 0, 0 ]);
    const [ screenSecond ] = context.matrix.screen([ OFFSET, 0 ]);

    const screenStart = -screenFirst;
    const screenWidth = screenSecond - screenFirst;

    const offset = Math.floor(Math.max((screenStart / screenWidth) - 1, 0));
    const count  = Math.ceil(context.matrix.screen.dimensions().width / screenWidth) + 2;

    /* Draw only ten timepoints per screen */
    const nth    = Math.floor(count / 10);

    if (showIndicator) {
      values
        .forEach(({ max, min, time }, index) => {
          /* Draw only visible elements */
          if (index < offset || index > offset + count) return;

          group({ matrix: matrixForTimepoint(context.matrix.get(), index) }, options, context, () => {
            const v = (max - min) / 10;

            rectangle({ x: 0, y: - v, width: 7, height: v, color: '#15E6C155' }, options, context);
            // circle({ cx: 0, cy: 0, radius: 3, color: '#15E6C1', crop: false }, options, context);
            // text({ x: 0, y: 20, text: time, color: '#ccc', crop: false }, options, con/text);
            // line({ x0: 0, y0: -2000, x1: 0, y1: 2000, color: '#ddd' }, options, context);
          });
        });
    }

    values
      .forEach(({ time }, index) => {
        /* Draw only visible elements */
        if (index < offset || index > offset + count) return;
        /* Draw only every nth element */
        if (index % nth > 0) return;

        group({ matrix: matrixForTimepoint(context.matrix.get(), index) }, options, context, () => {
          circle({ cx: 0, cy: 0, radius: 3, color: '#15E6C1', crop: false }, options, context);
          text({ x: 0, y: 20, text: time, color: '#ccc', crop: false }, options, context);
          line({ x0: 0, y0: -2000, x1: 0, y1: 2000, color: '#ddd' }, options, context);
        });
      });
  });
};