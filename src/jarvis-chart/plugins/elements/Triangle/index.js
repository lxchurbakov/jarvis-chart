import { Matrix } from 'lib/geometry';

const renderTriangle = (p, context, triangle) => {
  p.render.primitives.polygone(context, { points: triangle, color: '#FA2C50', opacity: 0.3 });
  p.render.primitives.polyline(context, { points: triangle.concat([ triangle[0] ]), color: '#FA2C50' });
};

const Triangle = (p, options) => {

  p.on('elements/register', () => {
    p.elements.register('triangle', {
      inside: (context, triangle, id) => {
        renderTriangle(p, context, triangle);
      },
    });
  });

  /* Дополняем состояние окна треугольником */
  p.on('chart-windows/create', (w) => ({ ...w, triangle: null }));

  p.on('chart-windows-content/entry', ({ context, id }) => {
    const { triangle } = p.chartWindows.get(id);

    if (triangle) {
      renderTriangle(p, context, triangle);
    }

    return { context, id };
  });

  p.on('handler/attach', () => {
    p.handler.on('chart-windows-modes/triangle/click', ({ x, y, e, id }) => {
      const matrix = p.chartWindowsScaleTranslate.matrix.xy(id);
      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());
      const point = { x: xreal, y: yreal };
      const { triangle } = p.chartWindows.get(id);

      if (triangle === null) {
        p.chartWindows.update(id, (w) => ({ ...w, triangle: [point, point] }));
      }

      if (triangle !== null && triangle.length <= 3) {
        p.chartWindows.update(id, (w) => ({ ...w, triangle: w.triangle.concat([ point ]) }));
      }

      if (triangle !== null && triangle.length === 3) {
        p.elements.push(id, { type: 'triangle', meta: triangle });
        // console.log('finish', triangle);
        p.chartWindows.update(id, (w) => ({ ...w, triangle: null }));
      }

    });

    p.handler.on('chart-windows-modes/triangle/mousemove', ({ x, y, e, id }) => {
      const matrix = p.chartWindowsScaleTranslate.matrix.xy(id);
      const [ xreal, yreal ] = Matrix.apply([x, y], matrix.reverse());
      const point = { x: xreal, y: yreal };
      const { triangle } = p.chartWindows.get(id);

      if (triangle !== null && triangle.length <= 3) {
        p.chartWindows.update(id, (w) => ({ ...w, triangle: w.triangle.slice(0, -1).concat([ point ]) }));
      }
    });
  });
};

Triangle.plugin = {
  name: 'triangle',
  version: '1.0.0',
  dependencies: {

  },
};

export default Triangle;
