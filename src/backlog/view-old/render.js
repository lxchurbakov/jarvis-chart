// import Matrix from '../matrix';

// import buildContext from './view/context';
// import buildRender from './view/render';

// const context = buildContext(node, options);
// const render  = buildRender(context, options);

// handler.on('click', ({ x, y, e }) => {
//   const matrix = render.matrix(state).reverse();
//
//   const [xreal, yreal] = Matrix.apply([ x, y ], matrix);
//
//   handler.emit('world-click', { x: xreal, y: yreal });
// });
//
// handler.on('drag', ({ x, y, e }) => {
//   const matrix = render.matrix(state).reverse();
//
//   const [xreal, yreal] = Matrix.apply([ x, y ], matrix);
//
//   handler.emit('world-drag', { x: xreal, y: yreal });
// });
//
// handler.on('path', ({ x, y, e }) => {
//   const matrix = render.matrix(state).reverse();
//
//   const [xreal, yreal] = Matrix.apply([ x, y ], matrix);
//
//   handler.emit('world-path', { x: xreal, y: yreal });
// });

import circle from './primitives/circle';
import line from './primitives/line';
import rectangle from './primitives/rectangle';
import text from './primitives/text';
import group from './primitives/group';

import dataset from './components/dataset';
import grid from './components/grid';

import Matrix from '../../matrix';

const matrixForWorld = (data) =>
  Matrix.join(
    Matrix.translate(data.translate.x, data.translate.y - 250),
    Matrix.scale(data.zoom, data.zoom),
    Matrix.translate(450, -250),
    Matrix.scale(1, -1),
  );

const buildRender = (context, options) => {
  const render = (data) => {
    context.clear();

    const { values, prices } = options;

    group({ matrix: matrixForWorld(data) }, options, context, () => {

      dataset({ values }, options, context);
      grid({ values, prices, }, options, context);

      data.elements.forEach((element) => {
        circle({ cx: element.x, cy: element.y, radius: 20, color: 'red' }, options, context);
      });
    });

    context.flush();
  };

  render.matrix = (data) => matrixForWorld(data);

  return render;
};

export default buildRender;
