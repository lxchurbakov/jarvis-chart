import Matrix from 'lib/matrix';

/**
 * ChartCrop плагин
 *
 */
const ChartCrop = (p, options) => {
  const horizontal = (id, start, len) => {
    const matrix = p.chartWindowsScaleTranslate.matrix.x(id);

    const [x0real, y0real] = Matrix.apply([ start, 0 ], matrix);
    const [x1real, y1real] = Matrix.apply([   len, 0 ], matrix);

    const width = x1real - x0real;
    const offset = x0real;

    const visibleCandlesCount = Math.ceil(options.width / width);
    const firstVisibleCandleIndex = Math.floor(-offset / width);

    return { offset: firstVisibleCandleIndex, count: visibleCandlesCount };
  };

  p.chartCrop = { horizontal };
};

ChartCrop.plugin = {
  name: 'chart-crop',
  dependencies: {
    'chart-windows': '1.0.0',
  },
};

export default ChartCrop;
