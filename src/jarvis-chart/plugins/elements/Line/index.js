import { Matrix } from 'lib/geometry';

const drawLine = (p, context, line) => {
  const { start, angle } = line;

  if (start && angle) {
    context.api.matrix.push(Matrix.translate(start.x, start.y));
    p.render.primitives.line(context, { x0: -Math.cos(angle) * 999999, y0: -Math.sin(angle) * 999999, x1: Math.cos(angle) * 999999, y1: Math.sin(angle) * 999999, color: '#15E6C1' });
    context.api.matrix.pop();
  }
};

const Line = (p) => {
  /* Создаём элемент кисть */
  p.on('elements/register', () => {
    p.elements.register('line', {
      inside: (context, line) => {
        drawLine(p, context, line);
      }
    });
  });

  p.on('chart-windows/create', (w) => ({ ...w, line: null }));

  /* Выводим кисть, которую мы сейчас редактируем  */
  p.on('chart-windows-content/entry', ({ context, id }) => {
    const { line } = p.chartWindows.get(id);

    line && drawLine(p, context, line);

    return { context, id };
  });

  /* Обрабатываем события для режима brush */

  p.on('handler/attach', () => {
    p.handler.on('chart-windows-modes/line/pathstart', ({ x, y, e, id }) => {
      const matrix = p.chartWindowsScaleTranslate.matrix.xy(id)

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      p.chartWindows.update(id, (w) => ({ ...w, line: { start: { x: xreal, y: yreal } } }));
    });

    p.handler.on('chart-windows-modes/line/path', ({ x, y, e, id }) => {
      const matrix = p.chartWindowsScaleTranslate.matrix.xy(id)

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());
      const newPoint = { x: xreal, y: yreal };

      const { line } = p.chartWindows.get(id);
      const { start } = line;

      const angle = Math.atan2(newPoint.y - start.y, newPoint.x - start.x);

      p.chartWindows.update(id, (w) => ({ ...w, line: { ...w.line, angle } }));
    });

    p.handler.on('chart-windows-modes/line/pathend', ({ x, y, e, id }) => {
      const { line } = p.chartWindows.get(id);

      console.warn('Line инструмент не оптимизирован');

      p.elements.push(id, { type: 'line', meta: line });

      p.chartWindows.update(id, (w) => ({ ...w, line: null }));
    });
  });
};

Line.plugin = {
  name: 'line',
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

export default Line;
