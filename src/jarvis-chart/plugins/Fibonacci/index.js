/**
 * Fibonacci plugin
 *
 */
const Fibonacci = (p) => {

  /* Register brush element */
  p.elements.register('fibonacci', (context, meta) => {
    // meta.forEach((curr, index) => {
    //   if (index > 0) {
    //     const prev = meta[index - 1];
    //
    //     p.render.primitives.line(context, { x0: prev.x, y0: prev.y, x1: curr.x, y1: curr.y, color: 'red' });
    //   }
    // });
  });

  /* Add the brush we currently draw to the state */
  p.on('state/default', (state) => ({ ...state, fibonacci: [] }));

  /* Render the brush we curently draw */
  p.on('chart-window/inside', ({ context, state }) => {

    const { fibonacci } = state;

    if (fibonacci) {
      const { start, end } = fibonacci;

      if (start && end) {
        const distance = Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y));

        // p.render.primitives.group(context, { matrix: })
        p.render.primitives.circle(context, { cx: start.x, cy: start.y, radius: distance, color: 'red' });
      }
      // brush.forEach((curr, index) => {
      //   if (index > 0) {
      //     const prev = brush[index - 1];
      //     p.render.primitives.line(context, { x0: prev.x, y0: prev.y, x1: curr.x, y1: curr.y, color: 'red' });
      //   }
      // });
    }

    return { context, state };
  });

  /* Process events */

  p.on('chart-modes/fibonacci/pathstart', ({ x, y, e }) => {
    const [ xreal, yreal ] = p.chartWindow.toWorld([x, y]);

    p.state.update((state) => {
      state.fibonacci = {
        start: { x: xreal, y: yreal },
        end: null
      };
      // state.brush = [];
      return state;
    });
  });

  p.on('chart-modes/fibonacci/pathend', ({ x, y, e }) => {
    // p.elements.push('brush', p.state.get().brush);
    p.state.update((state) => {
      // state.brush = null;
      return state;
    });
  });

  p.on('chart-modes/fibonacci/path', ({ x, y, e }) => {
    const [ xreal, yreal ] = p.chartWindow.toWorld([x, y]);

    p.state.update((state) => {
      state.fibonacci.end = { x: xreal, y: yreal };
      return state;
    });
  });
};

Fibonacci.plugin = {
  name: 'fibonacci',
  version: '1.0.0',
  dependencies: {
    'render': '1.0.0',
    'state': '1.0.0',
    'elements': '1.0.0',
    'chart-modes': '1.0.0',
    'chart-window': '1.0.0',
  }
};

export default Fibonacci;
