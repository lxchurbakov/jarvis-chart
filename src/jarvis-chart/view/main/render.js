import circle from '../primitives/circle';
import line from '../primitives/line';
import rectangle from '../primitives/rectangle';
import text from '../primitives/text';
import group from '../primitives/group';

import dataset from '../components/dataset';
import grid from '../components/grid';

import Matrix from '../../../matrix';

const matrixForView = (data) =>
  Matrix.join(
    Matrix.translate(data.translate.x, data.translate.y - 250),
    Matrix.scale(data.zoom, data.zoom),
    Matrix.translate(450, -250),
    Matrix.scale(1, -1),
  );

const buildRender = (context, options) => {
  return (data) => {
    context.clear();

    /* Calculate crop Area */
    // const matrix = ;

    // const [x0, y0] = Matrix.apply([ 0,  0], matrix);
    // const [x1, y1] = Matrix.apply([10, 10], matrix);

    // const start = x0;
    // const width = x1 - x0;

    // const offset = (-start) / width - 1;
    // const count  = (900 / width) + 1;

    const { values, prices } = options;

    group({ matrix: matrixForView(data) }, options, context, () => {
      dataset({ values }, options, context);
      grid({ values, prices, }, options, context);
    });

    context.flush();
  };
};

export default buildRender;
