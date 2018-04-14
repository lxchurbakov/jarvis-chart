import Matrix from 'lib/matrix';

const drawTimeline = (p, context, translate, zoom, config, id) => {
  /* Развернём конфиг */
  const { timeline } = config;

  /* Узнаем размеры экрана */
  const width  = context.api.screen.width();
  const height = context.api.screen.height();

  const areaHeight = 30;

  /* Отрисуем прямоугольник подложку */
  p.render.primitives.rectangle(context, { x: 0, y: 0, width: width, height: areaHeight, color: 'white', opacity: 0.5 })
  p.render.primitives.line(context, { x0: 0, y0: areaHeight, x1: width, y1: areaHeight, color: '#ccc' })

  /* Отрисуем значения времени */
  context.api.matrix.push(p.chartWindowsScaleTranslate.matrix.x(id));
    timeline.forEach((timepoint) => {
      const x = timepoint.x;
      const y = areaHeight;

      context.api.matrix.push(Matrix.translate(x, y)); /* Перенесёмся туда куда нужно выводить текст */
        context.api.matrix.push(Matrix.resetScale(context.api.matrix.get())); /* Уберём масштабирование */
          p.render.primitives.text(context, { x: 0, y: 20, text: timepoint.text, color: '#555', textAlign: 'center', font: '100 13px Open Sans' });
          p.render.primitives.circle(context, { cx: 0, cy: 0, radius: 2, color: '#15E6C1'});
        context.api.matrix.pop();
      context.api.matrix.pop();
    });
  context.api.matrix.pop();
};

const drawPriceline = (p, context, translate, zoom, config, id) => {
  /* Развернём конфиг */
  const { priceline } = config;

  /* Узнаем размеры экрана */
  const width  = context.api.screen.width();
  const height = context.api.screen.height();

  const x = width - 50;
  const y = 0;

  p.render.primitives.rectangle(context, { x, y, width: 50, height: height, color: 'white', opacity: 0.9 });
  p.render.primitives.line(context, { x0: x, y0: 0, x1: x, y1: height, color: '#ccc' })

  /* Отрисуем каждое значение цены */
  context.api.matrix.push(p.chartWindowsScaleTranslate.matrix.y(id));
    priceline.forEach((pricepoint) => {
      const x = width - 50;
      const y = pricepoint.y;

      context.api.matrix.push(Matrix.translate(x, y)); /* Перенесёмся туда куда нужно выводить текст */
        context.api.matrix.push(Matrix.resetScale(context.api.matrix.get())); /* Уберём масштабирование */
          p.render.primitives.text(context, { x: 5, y: 0, text: pricepoint.text.toFixed(2), color: '#555', textAlign: 'left', font: '100 13px Open Sans'});
        context.api.matrix.pop();
      context.api.matrix.pop();
    });
  context.api.matrix.pop();
};

/**
 * Отрисовывает UI
 *
 * TODO добавить курсор и его проекции на оси. (нужно отслеживать положение курсора)
 */
const ChartWindowsUI = (p, options) => {
  p.on('chart-windows-layers/ui', ({ context, id }) => {
    const gridConfig = p.chartWindowsGridConfig.get(id);
    const { translate, zoom } = p.chartWindowsScaleTranslate.get(id);

    drawTimeline(p, context, translate, zoom, gridConfig, id);
    drawPriceline(p, context, translate, zoom, gridConfig, id);
  });
};

ChartWindowsUI.plugin = {
  name: 'chart-windows-ui',
  version: '1.0.0',
  dependencies: {
    'chart-windows-layers': '1.0.0',
    'chart-windows-grid-config': '1.0.0',
  },
};

export default ChartWindowsUI;
