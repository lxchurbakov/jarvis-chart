/**
 * Brush plugin
 *
 */
const Brush = (p) => {

  /* Register brush element */
  p.elements.register('brush', (context, meta) => {
    meta.forEach((curr, index) => {
      if (index > 0) {
        const prev = meta[index - 1];

        p.render.primitives.line(context, { x0: prev.x, y0: prev.y, x1: curr.x, y1: curr.y, color: 'red' });
      }
    });
  });

  /* Add the brush we currently draw to the state */
  p.on('state/default', (state) => ({ ...state, brush: [] }));

  /* Render the brush we curently draw */
  p.on('chart-window/inside', ({ context, state }) => {

    const { brush } = state;

    if (brush) {
      brush.forEach((curr, index) => {
        if (index > 0) {
          const prev = brush[index - 1];
          p.render.primitives.line(context, { x0: prev.x, y0: prev.y, x1: curr.x, y1: curr.y, color: 'red' });
        }
      });
    }

    return { context, state };
  });

  /* Process events */

  p.on('chart-modes/brush/pathstart', ({ x, y, e }) => {
    p.state.update((state) => {
      state.brush = [];
      return state;
    });
  });

  p.on('chart-modes/brush/pathend', ({ x, y, e }) => {
    p.elements.push('brush', p.state.get().brush);
    p.state.update((state) => {
      state.brush = null;
      return state;
    });
  });

  p.on('chart-modes/brush/path', ({ x, y, e }) => {
    const [ xreal, yreal ] = p.chartWindow.toWorld([x, y]);

    p.state.update((state) => {
      state.brush.push({ x: xreal, y: yreal });
      return state;
    });
  });
};

Brush.plugin = {
  name: 'brush',
  version: '1.0.0',
  dependencies: {
    'render': '1.0.0',
    'state': '1.0.0',
    'elements': '1.0.0',
    'chart-modes': '1.0.0',
    'chart-window': '1.0.0',
  }
};

export default Brush;
