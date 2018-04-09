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

    const { values, prices } = options;

    group({ matrix: matrixForView(data) }, options, context, () => {

      dataset({ values }, options, context);
      grid({ values, prices, }, options, context);

      data.elements.forEach((element) => {
        circle({ cx: element.x, cy: element.y, radius: 20, color: 'red' }, options, context);
      });
    });

    context.flush();
  };
};

export default buildRender;
