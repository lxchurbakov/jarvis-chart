import { Matrix } from 'lib/geometry';

const drawSegment = (p, context, segmentHorizontal) => {
  const { start, end } = segmentHorizontal;

  if (start && end) {
    p.render.primitives.line(context, { x0: start.x, y0: start.y, x1: end.x, y1: start.y, color: '#15E6C1' });

    context.api.matrix.push(Matrix.translate(start.x, start.y));
    context.api.matrix.push(Matrix.resetScale(context.api.matrix.get()));
    p.render.primitives.circle(context, { cx: 0, cy: 0, radius: 3, color: '#15E6C1' });
    context.api.matrix.pop();
    context.api.matrix.pop();

    context.api.matrix.push(Matrix.translate(end.x, start.y));
    context.api.matrix.push(Matrix.resetScale(context.api.matrix.get()));
    p.render.primitives.circle(context, { cx: 0, cy: 0, radius: 3, color: '#15E6C1' });
    context.api.matrix.pop();
    context.api.matrix.pop();

  }
};

const SegmentHorizontal = (p) => {
  /* Создаём элемент кисть */
  p.on('elements/register', () => {
    p.elements.register('segment-horizontal', {
      inside: (context, segmentHorizontal, id) => {
        const { start, end } = segmentHorizontal;

        if (
          p.chartWindowsCrop.point(id, start.x, start.y) ||
          p.chartWindowsCrop.point(id, end.x, end.y, true, false)
        ) {
          drawSegment(p, context, segmentHorizontal);
        }
      }
    });
  });

  p.on('chart-windows/create', (w) => ({ ...w, segmentHorizontal: null }));

  /* Выводим кисть, которую мы сейчас редактируем  */
  p.on('chart-windows-content/entry', ({ context, id }) => {
    const { segmentHorizontal } = p.chartWindows.get(id);

    segmentHorizontal && drawSegment(p, context, segmentHorizontal);

    return { context, id };
  });

  /* Обрабатываем события для режима brush */

  p.on('handler/attach', () => {
    p.handler.on('chart-windows-modes/segment-horizontal/pathstart', ({ x, y, e, id }) => {
      const matrix = Matrix.join(
        p.chartWindowsScaleTranslate.matrix.xy(id),
      );

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      p.chartWindows.update(id, (w) => ({ ...w, segmentHorizontal: { start: { x: xreal, y: yreal }, end: null } }));
    });

    p.handler.on('chart-windows-modes/segment-horizontal/path', ({ x, y, e, id }) => {
      const matrix = Matrix.join(
        p.chartWindowsScaleTranslate.matrix.xy(id),
      );

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      p.chartWindows.update(id, (w) => ({ ...w, segmentHorizontal: { ...w.segmentHorizontal, end: { x: xreal, y: yreal } } }));
    });

    p.handler.on('chart-windows-modes/segment-horizontal/pathend', ({ x, y, e, id }) => {
      const { segmentHorizontal } = p.chartWindows.get(id);

      p.elements.push(id, { type: 'segment-horizontal', meta: segmentHorizontal });

      p.chartWindows.update(id, (w) => ({ ...w, segmentHorizontal: null }));
    });
  });
};

SegmentHorizontal.plugin = {
  name: 'segment-horizontal',
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

export default SegmentHorizontal;
