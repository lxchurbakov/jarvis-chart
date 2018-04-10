import Context from './context';

/**
 * Render plugin
 *
 * Creates a Context node (depending on render method)
 *
 * TODO add redrawContinuously option support
 *
 * Sockets Used: state/default, mount
 * Sockets Provided: render/draw, render/collect-primitives
 * API Provided: render
 *
 */
const Render = (p, options) => {

  /* Attach to the main node on mount */
  p.on('mount', ({ node }) => {

    /* Create context */
    const context = Context(node, options);

    let state = null;
    let requested = false;

    /* Declare Draw API - this is a mock for draw calls */
    p.render = {
      _draw: () => {
        context.clear();

        p.emitSync('render/draw', { context, state })

        context.flush();

        requestAnimationFrame(p.render._draw);
        requested = true;
      },
      draw: (_state) => {
        state = _state;

        if (!requested)
          p.render._draw();
      }
    };

    p.emitSync('render/collect-primitives');

    return { node };
  });
};

Render.plugin = {
  name: 'render',
  version: '1.0.0',
  dependencies: {}
};

export default Render;
