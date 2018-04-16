import Matrix from 'lib/matrix';

const drawLine = (p, context, lineHorizontal) => {
  const { start } = lineHorizontal;

  if (start) {
    context.api.matrix.push(Matrix.translate(start.x, start.y));
    p.render.primitives.line(context, { x0: -999999, y0: 0, x1: 999999, y1: 0, color: '#15E6C1' });
    context.api.matrix.pop();
  }
};

const LineHorizontal = (p) => {
  /* Создаём элемент кисть */
  p.on('elements/register', () => {
    p.elements.register('line-horizontal', {
      inside: (context, lineHorizontal) => {
        drawLine(p, context, lineHorizontal);
      }
    });
  });

  p.on('chart-windows/create', (w) => ({ ...w, lineHorizontal: null }));

  /* Выводим кисть, которую мы сейчас редактируем  */
  p.on('chart-windows-content/entry', ({ context, id }) => {
    const { lineHorizontal } = p.chartWindows.get(id);

    lineHorizontal && drawLine(p, context, lineHorizontal);

    return { context, id };
  });

  /* Обрабатываем события для режима brush */

  p.on('handler/attach', () => {
    p.handler.on('chart-windows-modes/line-horizontal/path', ({ x, y, e, id }) => {
      const matrix = Matrix.join(
        p.chartWindowsScaleTranslate.matrix.xy(id),
      );

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      p.chartWindows.update(id, (w) => ({ ...w, lineHorizontal: { start: { x: xreal, y: yreal} } }));
    });

    p.handler.on('chart-windows-modes/line-horizontal/pathend', ({ x, y, e, id }) => {
      const { lineHorizontal } = p.chartWindows.get(id);

      p.elements.push(id, { type: 'line-horizontal', meta: lineHorizontal });

      p.chartWindows.update(id, (w) => ({ ...w, lineHorizontal: null }));
    });
  });
};

LineHorizontal.plugin = {
  name: 'line-horizontal',
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

export default LineHorizontal;
