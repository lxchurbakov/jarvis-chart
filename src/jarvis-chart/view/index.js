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

  handler.on('path', ({ x, y }) => {
    const [ xworld, yworld ] = Matrix.apply([x, y], matrixForWorld(state, options).reverse());

    handler.emit('world-path', { x: xworld, y: yworld });
  });

  handler.on('mousedown', ({ x, y }) => {
    const [ xworld, yworld ] = Matrix.apply([x, y], matrixForWorld(state, options).reverse());

    handler.emit('world-mousedown', { x: xworld, y: yworld });
  });

  handler.on('mouseup', ({ x, y }) => {
    const [ xworld, yworld ] = Matrix.apply([x, y], matrixForWorld(state, options).reverse());

    handler.emit('world-mouseup', { x: xworld, y: yworld });
  });
});

const modes = {
  'view': 'Режим просмотра',
  'points': 'Режим добавления точек',
  'brush': 'Режим кисти',
};

export default (state, options, context, handler) => {

  attachEvents(state, options, handler);

  const { values, elements, brush, showIndicator } = state;



  group({ matrix: matrixForWorld(state, options) }, options, context, () => {

    dataset({ values }, options, context);
    grid({ values, showIndicator }, options, context);

    elements.forEach((element) => {
      if (element.type === 'point') {
        group({ matrix: Matrix.join(Matrix.resetScale(context.matrix.get(), true, true), Matrix.translate(element.x, element.y)) }, options, context, () => {
          circle({ cx: 0, cy: 0, radius: 5, color: 'black' }, options, context);
        });
      } else if (element.type === 'brush') {
        element.points.forEach((point, index) => {
          if (index > 1) {
            const prev = element.points[index - 1];

            line({ x0: prev.x, y0: prev.y, x1: point.x, y1: point.y, color: '#ccc', width: 2 }, options, context);
          }
        });
      }
    });

    if (brush)
      brush.forEach((point, index) => {
        if (index > 1) {
          const prev = brush[index - 1];

          line({ x0: prev.x, y0: prev.y, x1: point.x, y1: point.y, color: '#ccc', width: 2 }, options, context);
        }
      });
  });

  /* Метка режима */
  text({ x: 15, y: 28, font: '100 13px Open Sans', textAlign: 'left', text: modes[state.mode] }, options, context);

  /* Метка Автозума */
  text({ x: 15, y: 45, font: '100 13px Open Sans', textAlign: 'left', text: 'Автоматический вертикальный зум ' + (state.autoZoomY ? 'включен' : 'выключен') }, options, context);

  /* Метка Индикаторов */
  text({ x: 15, y: 62, font: '100 13px Open Sans', textAlign: 'left', text: 'Индикатор ' + (state.showIndicator ? 'включен' : 'выключен') }, options, context);

  /* Метка Индикаторов */
  text({ x: 15, y: 79, font: '100 13px Open Sans', textAlign: 'left', text: 'Средство отрисовки: ' + (options.render) }, options, context);
};
