const distance = (x0, y0, x1, y1) => Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));

const drawEllipse = (p, context, { start, radiusx, radiusy }) => {
  p.render.primitives.ellipse(context, { cx: start.xreal, cy: start.yreal, radiusx, radiusy, color: '#ccc' });
};

/**
 * Ellipse плагин
 *
 * Добавляет Инструмент Эллипс
 *
 */
const Ellipse = (p) => {

  /* Register brush element */
  p.on('elements/register', () => {
    p.elements.register('ellipse', (context, meta) => {
      const { start, radiusx, radiusy } = meta;

      if (start && radiusx && radiusy) {
        drawEllipse(p, context, { start, radiusx, radiusy });
      }
    });
  });

  /* Add the brush we currently draw to the state */
  p.on('state/default', (state) => ({ ...state, ellipse: [] }));

  /* Render the brush we curently draw */
  p.on('chart-window/inside', ({ context }) => {
    const { ellipse } = p.state.get();

    if (ellipse) {
      const { start, radiusx, radiusy } = ellipse;

      if (start && radiusx && radiusy) {
        drawEllipse(p, context, { start, radiusx, radiusy });
      }
    }

    return { context };
  });

  /* Process events */

  p.on('chart-modes/ellipse/pathstart', ({ x, y, e }) => {
    const [ xreal, yreal ] = p.chartWindow.toWorld([x, y]);
    const ellipse = {
      start: { x, y, xreal, yreal },
      radiusx: null,
      radiusy: null,
    };

    p.state.update((state) => ({ ...state, ellipse }));
  });

  p.on('chart-modes/ellipse/pathend', ({ x, y, e }) => {
    p.elements.push('ellipse', p.state.get().ellipse);

    p.state.update((state) => ({ ...state, ellipse: null }));
  });

  p.on('chart-modes/ellipse/path', ({ x, y, e }) => {
    const [ xreal, yreal ] = p.chartWindow.toWorld([x, y]);

    const { ellipse } = p.state.get();

    const radius = distance(ellipse.start.x, ellipse.start.y, x, y);

    const radiusx = Math.abs(radius / p.chartWindow.getMatrix().getValues().a);
    const radiusy = Math.abs(radius / p.chartWindow.getMatrix().getValues().d);

    p.state.update((state) => ({ ...state, ellipse: { ...state.ellipse, radiusx, radiusy }}));
  });
};

Ellipse.plugin = {
  name: 'ellipse',
  version: '1.0.0',
  dependencies: {
    'render': '1.0.0',
    'state': '1.0.0',
    'elements': '1.0.0',
    'chart-modes': '1.0.0',
    'chart-window': '1.0.0',
  }
};

export default Ellipse;
