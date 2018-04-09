import Handler from './handler';
import Render from './render';

import view from './view';

/**
 * Jarvis Chart v1.0.0
 */
export default (node, options) => {

  /* Attach handler and render */
  const handler = Handler(node, options);
  const render  = Render(view, handler, node, options);

  /* Create Graph state */
  let state = {
    translate: { x: 0, y: 0 },
    zoom: { x: 1, y: 1 },
    elements: [],
    values: options.values,
    // autoZoomY: true
  };

  /* Chart API */

  const draw = () => {
    render.draw(state);

    if (options.redrawContinuously)
      requestAnimationFrame(draw);
  };

  const update = (updater) => {
    /* Do not lose state object since handler extensions in render may be attached to it */
    Object.assign(state, updater(state));
    draw();
  };

  /* Initial render */

  draw();

  return { on: handler.on, update, state: () => state };
};
