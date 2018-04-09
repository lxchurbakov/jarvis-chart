import createRender from './view/init';
import createEventsWindow from './events-window';

import Matrix from '../matrix';

const matrixForView = (data) =>
  Matrix.join(
    Matrix.translate(data.translate.x, data.translate.y - 250),
    Matrix.scale(data.zoom, data.zoom),
    Matrix.translate(450, -250),
    Matrix.scale(1, -1),
  );

/**
 * Jarvis Chart v1.0.0
 */
export default (node, options) => {
  const eventEmitter = createEventsWindow(node, options);
  const render = createRender(node, options);

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

  frame();

  eventEmitter.on('click', ({x, y, e}) => {
    const matrix = matrixForView(state).reverse();

    const [xreal, yreal] = Matrix.apply([x, y], matrix);

    state.elements.push({ x: xreal, y: yreal });

    frame()
  });

  eventEmitter.on('drag', ({ x, y, e }) => {
    state.translate.x += x / state.zoom;
    state.translate.y -= y / state.zoom;
    frame();
  });

  eventEmitter.on('wheel', ({ delta, e }) => {
    state.zoom += -delta / 1000;
    frame();
  });

  /* Chart API */

  return {
    ping: () => console.log('pong')
  };
};
