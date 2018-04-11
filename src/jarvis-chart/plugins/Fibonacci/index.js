import Matrix from '../../lib/matrix';

const distance = (x0, y0, x1, y1) => Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));

const drawFibonacci = (p, context, { x0, y0, x1, y1 }) => {
  const worldMatrix = context.matrix.get();

  const [ x0screen, y0screen ] = Matrix.apply([x0, y0], worldMatrix);
  const [ x1screen, y1screen ] = Matrix.apply([x1, y1], worldMatrix);

  const radius = distance(x0screen, y0screen, x1screen, y1screen);

  const dropMatrix = Matrix.join(
    Matrix.resetTranslate(worldMatrix),
    Matrix.resetScale(worldMatrix),
  );

  p.render.primitives.group(context, { matrix: dropMatrix }, () => {
    p.render.primitives.circle(context, { cx: x0screen, cy: y0screen, radius, color: '#aaa', opacity: 0.3 });
    p.render.primitives.circle(context, { cx: x0screen, cy: y0screen, radius: radius * 0.618, color: '#aaa', opacity: 0.3 });
    p.render.primitives.circle(context, { cx: x0screen, cy: y0screen, radius: radius * 0.5, color: '#aaa', opacity: 0.3 });
    p.render.primitives.circle(context, { cx: x0screen, cy: y0screen, radius: radius * 0.382, color: '#aaa', opacity: 0.3 });
    p.render.primitives.line(context, { x0: x0screen, y0: y0screen, x1: x1screen, y1: y1screen, color: 'red', opacity: 0.3 });
  });
};

/**
 * Fibonacci плагин
 *
 */
const Fibonacci = (p) => {

  /* Register brush element */
  p.on('elements/register', () => {
    p.elements.register('fibonacci', (context, meta) => {
      const { x0, y0, x1, y1 } = meta;

      if (x0 && y0 && x1 && y1) {
        drawFibonacci(p, context, { x0, y0, x1, y1 });
      }
    });
  });

  /* Add the brush we currently draw to the state */
  p.on('state/default', (state) => ({ ...state, fibonacci: null }));

  /* Render the brush we curently draw */
  p.on('chart-window/inside', ({ context }) => {
    const { fibonacci } = p.state.get();

    if (fibonacci) {
      const { x0, y0, x1, y1 } = fibonacci;

      if (x0 && y0 && x1 && y1) {
        drawFibonacci(p, context, { x0, y0, x1, y1 });
      }
    }

    return { context };
  });

  /* Process events */

  p.on('chart-modes/fibonacci/pathstart', ({ x, y, e }) => {
    const [ xreal, yreal ] = p.chartWindow.toWorld([x, y]);

    const fibonacci = { x0: xreal, y0: yreal };

    p.state.update((state) => ({ ...state, fibonacci }));
  });

  p.on('chart-modes/fibonacci/pathend', ({ x, y, e }) => {
    p.elements.push('fibonacci', p.state.get().fibonacci);

    p.state.update((state) => ({ ...state, fibonacci: null }));
  });

  p.on('chart-modes/fibonacci/path', ({ x, y, e }) => {
    const [ xreal, yreal ] = p.chartWindow.toWorld([x, y]);

    const { fibonacci } = p.state.get();

    p.state.update((state) => ({ ...state, fibonacci: { ...state.fibonacci, x1: xreal, y1: yreal }}));
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
