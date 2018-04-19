import { Matrix, Trigonometry } from 'lib/geometry';

/**
 * Отрисуем эллипс
 */
 const drawEllipse = (p, context, { start, radiusx, radiusy }) => {
   p.render.primitives.ellipse(context, { cx: start.xreal, cy: start.yreal, radiusx, radiusy, color: '#FA2C50', opacity: 0.3 });
 };


/**
 * Ellipse плагин
 *
 */
const Ellipse = (p) => {
  /* Регистрируем завитушку */
  p.on('elements/register', () => {
    p.elements.register('ellipse', {
      inside: (context, ellipse) => {
        const { start, radiusx, radiusy } = ellipse;

        if (ellipse) {
          drawEllipse(p, context, ellipse);
        }
      }
    });
  });

  /* Добавим редактируемую завитушку в окно */
  p.on('chart-windows/create', (w) => ({ ...w, ellipse: null }));

  /* Выводим завитушку, которую мы сейчас редактируем  */
  p.on('chart-windows-content/entry', ({ context, id }) => {
    const { ellipse } = p.chartWindows.get(id);

    if (ellipse) {
      const { start, radiusx, radiusy } = ellipse;

      if (start && radiusx && radiusy ) {
        drawEllipse(p, context, ellipse);
      }
    }

    return { context, id };
  });

  /* Process events */
  p.on('handler/attach', () => {
    p.handler.on('chart-windows-modes/ellipse/pathstart', ({ id, x, y, e }) => {
      const matrix = p.chartWindowsScaleTranslate.matrix.xy(id)

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      const ellipse = {
        start: { x, y, xreal, yreal },
        radiusx: null,
        radiusy: null,
      };

      p.chartWindows.update(id, (w) => ({ ...w, ellipse }));
    });

    p.handler.on('chart-windows-modes/ellipse/path', ({ id, x, y, e }) => {
      const matrix = p.chartWindowsScaleTranslate.matrix.xy(id)

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      const { ellipse } = p.chartWindows.get(id);

      const radius = Trigonometry.distance(ellipse.start.x, ellipse.start.y, x, y);

      const radiusx = Math.abs(radius / matrix.getValues().a);
      const radiusy = Math.abs(radius / matrix.getValues().d);

      p.chartWindows.update(id, (w) => ({ ...w, ellipse: { ...w.ellipse, radiusx, radiusy }}));
    });

    p.handler.on('chart-windows-modes/ellipse/pathend', ({ id, e }) => {
      p.elements.push(id, { type: 'ellipse', meta: p.chartWindows.get(id).ellipse});

      p.chartWindows.update(id, (w) => ({ ...w, ellipse: null }));
    });
  });
};

Ellipse.plugin = {
  name: 'ellipse',
  version: '1.0.0',
  dependencies: {
    'render': '1.0.0',
    'state': '1.0.0',
    'elements': '1.0.0',
  }
};

export default Ellipse;
