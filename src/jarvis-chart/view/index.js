import circle from './primitives/circle';
import line from './primitives/line';
import rectangle from './primitives/rectangle';
import text from './primitives/text';
import group from './primitives/group';

import Matrix from '../../matrix'

import dataset from './components/dataset';
import grid from './components/grid';

const matrixForWorld = (data) =>
  Matrix.join(
    Matrix.translate(data.translate.x, data.translate.y - 250),
    Matrix.scale(data.zoom, data.zoom),
    Matrix.translate(450, -250),
    Matrix.scale(1, -1),
  );

export default (state, options, context) => {

  const { values, prices } = options;
  const { elements } = state;

  group({ matrix: matrixForWorld(state) }, options, context, () => {

    dataset({ values }, options, context);
    grid({ values, prices, }, options, context);

    elements.forEach((element) => {
      circle({ cx: element.x, cy: element.y, radius: 20, color: 'red' }, options, context);
    });
  });

};
