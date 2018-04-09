import buildContext from './view/context';
import buildRender from './view/render';

import createEventsWindow from './events-window';

import Matrix from '../matrix';

/**
 * Jarvis Chart v1.0.0
 */
export default (node, options) => {
  const eventEmitter = createEventsWindow(node, options);

  const context = buildContext(node, options);
  const render  = buildRender(context, options);

  let state = {
    translate: { x: 0, y: 0 },
    zoom: 1,
    elements: []
  };

  const frame = () => {
    render(state);

    if (options.redrawContinuously)
      requestAnimationFrame(frame);
  };

  eventEmitter.on('click', ({ x, y, e }) => {
    const matrix = render.matrix(state).reverse();

    const [xreal, yreal] = Matrix.apply([ x, y ], matrix);

    eventEmitter.emit('world-click', { x: xreal, y: yreal });
  });

  eventEmitter.on('drag', ({ x, y, e }) => {
    const matrix = render.matrix(state).reverse();

    const [xreal, yreal] = Matrix.apply([ x, y ], matrix);

    eventEmitter.emit('world-drag', { x: xreal, y: yreal });
  });

  eventEmitter.on('path', ({ x, y, e }) => {
    const matrix = render.matrix(state).reverse();

    const [xreal, yreal] = Matrix.apply([ x, y ], matrix);

    eventEmitter.emit('world-path', { x: xreal, y: yreal });
  });

  frame();

  /* Chart API */

  /* Attach listener */

  const on = (event, listener) => eventEmitter.on(event, listener);

  /* Update state */

  const update = (updater) => {
    // console.log(state.translate.x);
    state = updater(state);
    // console.log(state.translate.x);
    frame();
  };

  return { frame, on, update, render, state: () => state };
};
