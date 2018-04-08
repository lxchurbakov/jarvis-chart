import circle from './primitives/circle';
import line from './primitives/line';
import rectangle from './primitives/rectangle';
import text from './primitives/text';

import candles from './components/candles';

import Matrix from '../matrix';

import values from './values';

const buildMatrix = (data) => {
  return Matrix.join(
    Matrix.translate(data.x, -500),
    Matrix.scale(1, -1)
  );
};

const buildRender = (context, options) => {
  return (data) => {
    context.clear();

    candles({ values, matrix: buildMatrix(data) }, options, context);

    context.flush();
  };
};

export default buildRender;
