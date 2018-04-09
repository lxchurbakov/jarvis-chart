import circle from '../../primitives/circle';
import line from '../../primitives/line';
import rectangle from '../../primitives/rectangle';
import text from '../../primitives/text';
import group from '../../primitives/group';

import Matrix from '../../../../matrix';

const transformMatrixForTimeline = (matrix) =>
  Matrix.join(
    Matrix.translate(850, 0),
    Matrix.resetTranslate(matrix, true, false),
    Matrix.resetScale(matrix, true, false),
    matrix,
  );

export default ({ prices, matrix }, options, context) => {
  const globalMatrix = transformMatrixForTimeline(matrix);

  const [_1, zeroAt] = Matrix.apply([0, 0], globalMatrix);
  const [_2, firstAt] = Matrix.apply([0, 10], globalMatrix);

  const start = 500 - zeroAt;
  const height = zeroAt - firstAt;

  const offset = (-start) / height;
  const last   = (500 / height) + offset;

  group({ matrix: globalMatrix }, options, context, () => {
    line({ x0: 0, y0: -2000, x1: 0, y1: 2000, color: '#ccc' }, options, context);
    prices.forEach((price, index) => {
      if ((price / 10) < offset || (price / 10) > last) return;
      group({ matrix: Matrix.multiply(Matrix.resetScale(globalMatrix), Matrix.translate(0, price)) }, options, context, () => {
        text({ x: 20, y: 0, text: price, color: '#4A4A4A', textAlign: 'left' }, options, context);
      });
    });
  });
};
