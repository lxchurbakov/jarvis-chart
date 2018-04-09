import circle from '../../primitives/circle';
import line from '../../primitives/line';
import rectangle from '../../primitives/rectangle';
import text from '../../primitives/text';
import group from '../../primitives/group';

import Matrix from '../../../../matrix';

const transformMatrixForTimeline = (matrix) =>
  Matrix.join(
    Matrix.translate(0, 450),
    Matrix.resetTranslate(matrix, false, true),
    Matrix.resetScale(matrix, false, true),
    matrix,
  );

export default ({ values, matrix, offset, count, nth }, options, context) => {
  const globalMatrix = transformMatrixForTimeline(matrix);

  group({ matrix: globalMatrix }, options, context, () => {
    line({ x0: -2000, y0: 0, x1: 2000, y1: 0, color: '#ccc' }, options, context);
    values.forEach(({ time }, index) => {
      if (index < offset || index > offset + count || index % nth !== 0) return;
      group({ matrix: Matrix.translate(index * 10 + 3.5, 0) }, options, context, () => {
        group({ matrix: Matrix.resetScale(globalMatrix) }, options, context, () => {
          circle({ cx: 0, cy: 0, radius: 3, color: '#15E6C1' }, options, context);
          text({ x: 0, y: 20, text: time, color: '#ccc' }, options, context);
        });
      });
    });
  });
};
