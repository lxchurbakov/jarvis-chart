import { Matrix } from 'lib/geometry';

const drawRectangle = (p, context, rectangle) => {
  const { start, end } = rectangle;

  if (start && end) {
    const width = end.x - start.x;
    const height = end.y - start.y;

    p.render.primitives.rectangle(context, { x: start.x, y: start.y, width, height, color: '#FA2C50', opacity: 0.3 });
  }
};

const Rectangle = (p) => {
  /* Создаём элемент кисть */
  p.on('elements/register', () => {
    p.elements.register('rectangle', {
      inside: (context, rectangle, id) => {
        const { start, end } = rectangle;

        if (
          p.chartWindowsCrop.point(id, start.x, start.y) ||
          p.chartWindowsCrop.point(id, end.x, end.y)
        ) {
          drawRectangle(p, context, rectangle);
        }
      },
      hovers: (id, x, y, meta) => {
        const { start, end } = meta;

        if (start && end) {
          const matrix = p.chartWindowsScaleTranslate.matrix.xy(id);

          const [xreal, yreal] = Matrix.apply([x, y], matrix.reverse());

          return (
            (
              (xreal > start.x && xreal < end.x) ||
              (xreal < start.x && xreal > end.x)
            ) && (
              (yreal > start.y && yreal < end.y) ||
              (yreal < start.y && yreal > end.y)
            )
          );
        } else {
          return false;
        }
      },
    });
  });

  p.on('chart-windows/create', (w) => ({ ...w, rectangle: null }));

  /* Выводим кисть, которую мы сейчас редактируем  */
  p.on('chart-windows-content/entry', ({ context, id }) => {
    const { rectangle } = p.chartWindows.get(id);

    rectangle && drawRectangle(p, context, rectangle);

    return { context, id };
  });

  /* Обрабатываем события для режима brush */

  p.on('handler/attach', () => {
    p.handler.on('chart-windows-modes/rectangle/pathstart', ({ x, y, e, id }) => {
      const matrix = Matrix.join(
        p.chartWindowsScaleTranslate.matrix.xy(id),
      );

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      p.chartWindows.update(id, (w) => ({ ...w, rectangle: { start: { x: xreal, y: yreal }, end: null } }));
    });

    p.handler.on('chart-windows-modes/rectangle/path', ({ x, y, e, id }) => {
      const matrix = Matrix.join(
        p.chartWindowsScaleTranslate.matrix.xy(id),
      );

      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());

      p.chartWindows.update(id, (w) => ({ ...w, rectangle: { ...w.rectangle, end: { x: xreal, y: yreal } } }));
    });

    p.handler.on('chart-windows-modes/rectangle/pathend', ({ x, y, e, id }) => {
      const { rectangle } = p.chartWindows.get(id);

      p.elements.push(id, { type: 'rectangle', meta: rectangle });

      p.chartWindows.update(id, (w) => ({ ...w, rectangle: null }));
    });
  });
};

Rectangle.plugin = {
  name: 'rectangle',
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

export default Rectangle;
