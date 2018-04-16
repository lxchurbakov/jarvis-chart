import Matrix from 'lib/matrix';

const VALUES_POINTER_COLOR = '#FA2C50';

const ValuesPointer = (p, options) => {
  let xLine = null;
  let yLine = null;
  let wId = null;

  let yValue = null
  let xValue = null;

  p.on('handler/attach', () => {
    p.handler.on('chart-windows-events/mousemove', ({ x, y, e, id }) => {
      xLine = x;
      yLine = y;
      wId = id;

      [xValue, yValue] = Matrix.apply([x, y], p.chartWindowsScaleTranslate.matrix.xy(id).reverse());

      const values = p.values.get();

      xValue = Math.floor((xValue + 5) / 10);
      xValue = (values[xValue] || { time: null }).time;
    });
  });

  p.on('chart-windows-layers/ui', ({ context, id }) => {
    if (xLine !== null) {
      const { height } = p.chartWindows.get(id);

      p.render.primitives.line(context, { x0: xLine, y0: 0, x1: xLine, y1: height, color: VALUES_POINTER_COLOR, width: 1, opacity: 0.4 });
    }

    return { context, id };
  });

  p.on('chart-windows-layers/ui', ({ context, id }) => {
    if (id === wId && yLine !== null && yValue !== null) {
      const { width, height } = p.chartWindows.get(id);

      p.render.primitives.line(context, { x0: 0, y0: yLine, x1: width, y1: yLine, color: VALUES_POINTER_COLOR, width: 1, opacity: 0.4 });

      /* Отрисуем значение справа */
      context.api.matrix.push(Matrix.translate(width - 50, yLine));
      context.api.matrix.push(Matrix.resetScale(context.api.matrix.get()));
      p.render.primitives.rectangle(context, { x: 0, y: -10, width: 50, height: 20, color: VALUES_POINTER_COLOR });
      p.render.primitives.text(context, { x: 5, y: 5, font: '400 13px Open Sans', textAlign: 'left', color: 'white', text: yValue.toFixed(2) });
      context.api.matrix.pop();
      context.api.matrix.pop();

      /* Отрисуем значение снизу */
      if (xValue !== null) {
        context.api.matrix.push(Matrix.translate(xLine - 25, 15));
        context.api.matrix.push(Matrix.resetScale(context.api.matrix.get()));
        p.render.primitives.rectangle(context, { x: 0, y: -10, width: 50, height: 20, color: VALUES_POINTER_COLOR });
        p.render.primitives.text(context, { x: 25, y: 5, font: '400 13px Open Sans', textAlign: 'center', color: 'white', text: xValue });
        context.api.matrix.pop();
        context.api.matrix.pop();
      }
    }

    return { context, id };
  });
};

ValuesPointer.plugin = {
  name: 'values-pointer',
  version: '1.0.0',
  dependencies: {
    'chart-windows-layers': '1.0.0',
    'chart-windows-events': '1.0.0',
  },
};

export default ValuesPointer;
