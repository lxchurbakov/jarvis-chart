import { Matrix } from 'lib/geometry';

const drawSegment = (p, context, segment) => {
  const { start, end } = segment;

  if (start && end) {
    p.render.primitives.line(context, { x0: start.x, y0: start.y, x1: end.x, y1: end.y, color: '#15E6C1' });

    context.api.matrix.push(Matrix.translate(start.x, start.y));
    context.api.matrix.push(Matrix.resetScale(context.api.matrix.get()));
    p.render.primitives.circle(context, { cx: 0, cy: 0, radius: 3, color: '#15E6C1' });
    context.api.matrix.pop();
    context.api.matrix.pop();

    context.api.matrix.push(Matrix.translate(end.x, end.y));
    context.api.matrix.push(Matrix.resetScale(context.api.matrix.get()));
    p.render.primitives.circle(context, { cx: 0, cy: 0, radius: 3, color: '#15E6C1' });
    context.api.matrix.pop();
    context.api.matrix.pop();

  }
};

const Segment = (p) => {
  /* Создаём элемент кисть */
  p.on('elements/register', () => {
    p.elements.register('segment', {
      inside: (context, segment) => {
        drawSegment(p, context, segment);
      }
    });
  });

  p.on('chart-windows/create', (w) => ({ ...w, segment: null }));

  /* Выводим кисть, которую мы сейчас редактируем  */
  p.on('chart-windows-content/entry', ({ context, id }) => {
    const { segment } = p.chartWindows.get(id);

    segment && drawSegment(p, context, segment);

    return { context, id };
  });

  /* Обрабатываем события для режима brush */

  p.on('handler/attach', () => {
    p.handler.on('chart-windows-modes/segment/pathstart', ({ x, y, e, id }) => {
      const matrix = Matrix.join(
        p.chartWindowsScaleTranslate.matrix.xy(id),
      );

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      p.chartWindows.update(id, (w) => ({ ...w, segment: { start: { x: xreal, y: yreal }, end: null } }));
    });

    p.handler.on('chart-windows-modes/segment/path', ({ x, y, e, id }) => {
      const matrix = Matrix.join(
        p.chartWindowsScaleTranslate.matrix.xy(id),
      );

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      p.chartWindows.update(id, (w) => ({ ...w, segment: { ...w.segment, end: { x: xreal, y: yreal } } }));
    });

    p.handler.on('chart-windows-modes/segment/pathend', ({ x, y, e, id }) => {
      const { segment } = p.chartWindows.get(id);

      p.elements.push(id, { type: 'segment', meta: segment });

      p.chartWindows.update(id, (w) => ({ ...w, segment: null }));
    });
  });
};

Segment.plugin = {
  name: 'segment',
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

export default Segment;
