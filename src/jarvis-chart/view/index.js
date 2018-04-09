import circle from './primitives/circle';
import line from './primitives/line';
import rectangle from './primitives/rectangle';
import text from './primitives/text';
import group from './primitives/group';

import Matrix from '../lib/matrix'
import doOnce from '../lib/do-once';

import dataset from './components/dataset';
import grid from './components/grid';

const autoZoomMatrix = (state, options) => {
  const simpleMatrix = simpleMatrixForWorld(state, options);

  const [  screenFirst ] = Matrix.apply([ 0, 0 ], simpleMatrix);
  const [ screenSecond ] = Matrix.apply([ 10, 0 ], simpleMatrix);

  const screenStart = -screenFirst;
  const screenWidth = screenSecond - screenFirst;

  const offset = Math.floor(screenStart / screenWidth);
  const count  = Math.ceil(options.width / screenWidth);

  const min = state.values.slice(Math.max(0, offset), offset + count).reduce((acc, value) => Math.min(acc, value.min), Infinity);
  const max = state.values.slice(Math.max(0, offset), offset + count).reduce((acc, value) => Math.max(acc, value.max), -Infinity);

  return Matrix.join(
    // Scale relative to screen center by X and at 0 by Y (since we translate on -min)
    Matrix.translate(-options.width / 2, -0),
    Matrix.translate(state.translate.x, -0),
    Matrix.scale(state.zoom.x, options.height / (max - min)),
    Matrix.translate(options.width / 2, 0),
    Matrix.translate(-state.translate.x, 0),

    // Move where we want
    Matrix.translate(state.translate.x, -min),

    // Transform coordinate system
    Matrix.scale(1, -1),
    Matrix.translate(0, options.height),
  );
};

const simpleMatrixForWorld = (state, options) =>
  Matrix.join(
    // Scale relative to screen center
    Matrix.translate(-options.width / 2, -options.height / 2),
    Matrix.translate(state.translate.x, state.translate.y),
    Matrix.scale(state.zoom.x, state.zoom.y),
    Matrix.translate(options.width / 2, options.height / 2),
    Matrix.translate(-state.translate.x, -state.translate.y),

    // Move where we want
    Matrix.translate(state.translate.x, state.translate.y),

    // Transform coordinate system
    Matrix.scale(1, -1),
    Matrix.translate(0, options.height),
  );

const matrixForWorld = (state, options) =>
  state.autoZoomY
    ? autoZoomMatrix(state, options)
    : simpleMatrixForWorld(state, options);

const attachEvents = doOnce((state, options, handler) => {
  handler.on('click', ({ x, y }) => {
    const [ xworld, yworld ] = Matrix.apply([x, y], matrixForWorld(state, options).reverse());

    handler.emit('world-click', { x: xworld, y: yworld });
  });
});

export default (state, options, context, handler) => {

  attachEvents(state, options, handler);

  const { values, elements } = state;

  group({ matrix: matrixForWorld(state, options) }, options, context, () => {

    dataset({ values }, options, context);
    grid({ values }, options, context);

    elements.forEach((element) => {
      group({ matrix: Matrix.join(Matrix.resetScale(context.matrix.get(), true, true), Matrix.translate(element.x, element.y)) }, options, context, () => {
        circle({ cx: 0, cy: 0, radius: 20, color: 'red' }, options, context);
      });
    });
  });
};
