import circle from './primitives/circle';
import line from './primitives/line';
import rectangle from './primitives/rectangle';
import text from './primitives/text';
import group from './primitives/group';

import candles from './components/candles';
import timeline from './components/timeline';
import priceline from './components/priceline';

import Matrix from '../../matrix';

import values from '../values';

const buildMatrix = (data) => {
  return Matrix.join(
    Matrix.translate(0, data.translate.y),

    Matrix.translate(data.translate.x, -250),
    Matrix.scale(data.zoom, data.zoom),
    Matrix.translate(450, 250),

    Matrix.translate(0, - 500),
    Matrix.scale(1, -1),
  );
};

const prices = new Array(1000).fill(0).map((v, i) => (i - 500) * 10);

const buildRender = (context, options) => {
  return (data) => {
    context.clear();

    const matrix = buildMatrix(data);

    candles({ values, matrix }, options, context);
    timeline({ values, matrix }, options, context);
    priceline({ prices, matrix }, options, context);

    context.flush();
  };
};

export default buildRender;
