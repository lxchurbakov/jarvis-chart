import createRender from './view/init';
import createEventsWindow from './events-window';

/**
 * Jarvis Chart v1.0.0
 */
export default (node, options) => {
  const eventEmitter = createEventsWindow(node, options);
  const render = createRender(node, options);

  let state = {
    translate: { x: 0, y: 0 },
    zoom: 1
  };

  const frame = () => {
    render(state);

    if (options.redrawContinuously)
      requestAnimationFrame(frame);
  };

  frame();

  eventEmitter.on('click', () => {
    // console.log('clicked');
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
