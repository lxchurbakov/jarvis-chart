import { Matrix } from 'lib/geometry';

const drawBrush = (p, context, brush) => {
  const { points } = brush;

  points.forEach((curr, index) => {
    if (index > 0) {
      const prev = points[index - 1];
      p.render.primitives.line(context, { x0: prev.x, y0: prev.y, x1: curr.x, y1: curr.y, color: '#FA2C50' });
    }
  });
};

/**
 * Brush плагин
 *
 * Создаёт инструмент "произвольная кисть" или просто "кисть":
 *   Добавляет режим работы "brush" (см ChartModes плагин)
 *   Добавляет brush поле в состояние (см State плагин)
 *   Добавляет элемент brush (см Elements плагин)
 *   Добавляет обработчики path* события для режима brush и редактирует в них элементы/поле brush (см ChartModes плагин)
 *
 * Использует сокеты: state/default, chart-window/inside, chart-modes/brush/path*
 * Создаёт сокеты: нет
 * Использует API: p.elements, p.render
 * Создаёт API: нет
 *
 */
const Brush = (p) => {
  /* Создаём элемент кисть */
  p.on('elements/register', () => {
    p.elements.register('brush', {
      inside: (context, brush, id) => {
        const { bounds } = brush;

        if (bounds) {
          const { mx, mn } = bounds;

          if (
            !(p.chartWindowsCrop.point(id, mx.x, mx.y) || p.chartWindowsCrop.point(id, mn.x, mn.y))
          ) return;
        }

        drawBrush(p, context, brush);
      }
    });
  });

  p.on('chart-windows/create', (w) => ({ ...w, brush: null }));

  /* Выводим кисть, которую мы сейчас редактируем  */
  p.on('chart-windows-content/entry', ({ context, id }) => {
    const { brush } = p.chartWindows.get(id);

    brush && drawBrush(p, context, brush);

    return { context, id };
  });

  /* Обрабатываем события для режима brush */

  p.on('handler/attach', () => {
    p.handler.on('chart-windows-modes/brush/pathstart', ({ x, y, e, id }) => {
      p.chartWindows.update(id, (w) => ({ ...w, brush: { points: [], bounds: null } }));
    });

    p.handler.on('chart-windows-modes/brush/path', ({ x, y, e, id }) => {
      const matrix = Matrix.join(
        p.chartWindowsScaleTranslate.matrix.xy(id),
      );

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      const newPoint = { x: xreal, y: yreal };

      p.chartWindows.update(id, (w) => ({ ...w, brush: { ...w.brush, points: w.brush.points.concat([ newPoint ]) } }));
    });

    p.handler.on('chart-windows-modes/brush/pathend', ({ x, y, e, id }) => {
      const { brush } = p.chartWindows.get(id);

      const { points } = brush;

      const mx = {
        x: points.reduce((acc, point) => Math.max(acc, point.x), -Infinity),
        y: points.reduce((acc, point) => Math.max(acc, point.y), -Infinity),
      };

      const mn = {
        x: points.reduce((acc, point) => Math.min(acc, point.x), Infinity),
        y: points.reduce((acc, point) => Math.min(acc, point.y), Infinity),
      };

      brush.bounds = { mx, mn };

      p.elements.push(id, { type: 'brush', meta: brush });

      p.chartWindows.update(id, (w) => ({ ...w, brush: null }));
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
    'chart-windows-modes': '1.0.0',
    'chart-windows': '1.0.0',
    'chart-windows-scale-translate': '1.0.0',
  }
};

export default Brush;
