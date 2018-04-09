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

// import Matrix from '../matrix';

import Handler from './handler';
import Render from './render';

import view from './view';

/**
 * Jarvis Chart v1.0.0
 */
export default (node, options) => {
  
  /* Attach handler and render */
  const handler = Handler(node, options);
  const render  = Render(view, node, options);

  /* Create Graph state */
  let state = {
    translate: { x: 0, y: 0 },
    zoom: 1,
    elements: []
  };

  /* Chart API */

  const on = (event, listener) => handler.on(event, listener);

  const draw = () => {
    render.draw(state);

    if (options.redrawContinuously)
      requestAnimationFrame(draw);
  };

  const update = (updater) => {
    state = updater(state);
    draw();
  };

  /* Forward some events to render */

  handler.on('click', (data) => render.emit('click', data));

  /* Initial render */

  draw();

  return { on, update, state: () => state };
};
