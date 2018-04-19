import { Matrix, Trigonometry } from 'lib/geometry';

/**
 * Отрисуем завитушку
 */
const drawFibonacci = (p, context, { x0, y0, x1, y1 }) => {
  const worldMatrix = context.api.matrix.get();

  const [ x0screen, y0screen ] = Matrix.apply([x0, y0], worldMatrix);
  const [ x1screen, y1screen ] = Matrix.apply([x1, y1], worldMatrix);

  const radius = Trigonometry.distance(x0screen, y0screen, x1screen, y1screen);

  context.api.matrix.push(Matrix.translate(x0, y0));
  context.api.matrix.push(Matrix.resetScale(context.api.matrix.get()));
  p.render.primitives.circle(context, { cx: 0, cy: 0, radius, color: '#aaa', opacity: 0.3 });
  p.render.primitives.circle(context, { cx: 0, cy: 0, radius: radius * 0.618, color: '#aaa', opacity: 0.3 });
  p.render.primitives.circle(context, { cx: 0, cy: 0, radius: radius * 0.5, color: '#aaa', opacity: 0.3 });
  p.render.primitives.circle(context, { cx: 0, cy: 0, radius: radius * 0.382, color: '#aaa', opacity: 0.3 });
  p.render.primitives.line(context, { x0: 0, y0: 0, x1: x1screen - x0screen, y1: y1screen - y0screen, color: 'red', opacity: 0.3 });
  context.api.matrix.pop();
  context.api.matrix.pop();
};

/**
 * Fibonacci плагин
 *
 */
const Fibonacci = (p) => {
  /* Регистрируем завитушку */
  p.on('elements/register', () => {
    p.elements.register('fibonacci', {
      inside: (context, fibonacci) => {
        if (fibonacci) {
          const { x0, y0, x1, y1 } = fibonacci;

          drawFibonacci(p, context, fibonacci);
        }
      }
    });
  });

  /* Добавим редактируемую завитушку в окно */
  p.on('chart-windows/create', (w) => ({ ...w, fibonacci: null }));

  /* Выводим завитушку, которую мы сейчас редактируем  */
  p.on('chart-windows-content/entry', ({ context, id }) => {
    const { fibonacci } = p.chartWindows.get(id);

    if (fibonacci) {
      const { x0, y0, x1, y1 } = fibonacci;

      drawFibonacci(p, context, fibonacci);
    }

    return { context, id };
  });

  /* Process events */
  p.on('handler/attach', () => {
    p.handler.on('chart-windows-modes/fibonacci/pathstart', ({ id, x, y, e }) => {
      const matrix = p.chartWindowsScaleTranslate.matrix.xy(id)

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      const fibonacci = { x0: xreal, y0: yreal };

      p.chartWindows.update(id, (w) => ({ ...w, fibonacci }));
    });

    p.handler.on('chart-windows-modes/fibonacci/path', ({ id, x, y, e }) => {
      const matrix = p.chartWindowsScaleTranslate.matrix.xy(id)

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      p.chartWindows.update(id, (w) => ({ ...w, fibonacci: { ...w.fibonacci, x1: xreal, y1: yreal }}));
    });

    p.handler.on('chart-windows-modes/fibonacci/pathend', ({ id, e }) => {
      p.elements.push(id, { type: 'fibonacci', meta: p.chartWindows.get(id).fibonacci});

      p.chartWindows.update(id, (w) => ({ ...w, fibonacci: null }));
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
  }
};

export default Fibonacci;
