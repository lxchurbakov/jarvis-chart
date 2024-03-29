/**
 * ChartWindowsGrid плагин
 *
 * Отрисовывает сетку позади графика
 */
const ChartWindowsGrid = (p, options) => {
  p.on('chart-windows-layers/background', ({ context, id }) => {
    const { priceline, timeline } = p.chartWindowsGridConfig.get(id);
    const { translate, zoom } = p.chartWindowsScaleTranslate.get(id);

    /* Узнаем размеры экрана */
    const width = context.api.screen.width();
    const height = context.api.screen.height();

    /* Отрисуем линии цены */
    context.api.matrix.push(p.chartWindowsScaleTranslate.matrix.y(id));
      priceline.forEach((pricepoint) => {
        const x0 = 0;
        const y0 = pricepoint.y;
        const x1 = width;
        const y1 = pricepoint.y;
        const color = '#ccc';

        p.render.primitives.line(context, { x0, y0, x1, y1, color, dash: [3, 5] });
      });
    context.api.matrix.pop();

    /* Отрисуем линии времени */
    context.api.matrix.push(p.chartWindowsScaleTranslate.matrix.x(id));
      timeline.forEach((timepoint) => {
        const x0 = timepoint.x;
        const y0 = 0;
        const x1 = timepoint.x;
        const y1 = height;
        const color = '#ccc';

        p.render.primitives.line(context, { x0, y0, x1, y1, color, dash: [3, 5] });
      });
    context.api.matrix.pop();
  });
};

ChartWindowsGrid.plugin = {
  name: 'chart-windows-grid',
  version: '1.0.0',
  dependencies: {
    'chart-windows-layers': '1.0.0',
    'chart-windows-grid-config': '1.0.0',
  },
};

export default ChartWindowsGrid;
