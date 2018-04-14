import Matrix from 'lib/matrix';

/**
 * ChartCrop плагин
 *
 * Добавляет API для проверки вхождения тех или иных элементов в видимую область
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

  const vertical = (id, start, len) => {
    const matrix = p.chartWindowsScaleTranslate.matrix.y(id);

    const { height: windowHeight } = p.chartWindows.get(id);

    const [x0real, y0real] = Matrix.apply([ 0, start ], matrix);
    const [x1real, y1real] = Matrix.apply([ 0,   len ], matrix);

    const height = Math.abs(y1real - y0real);
    const offset = -y0real;

    const visibleCandlesCount = Math.ceil(windowHeight / height);
    const firstVisibleCandleIndex = Math.floor(offset / height);

    return { offset: firstVisibleCandleIndex, count: visibleCandlesCount };
  };

  p.chartWindowsCrop = { horizontal, vertical };
};

ChartCrop.plugin = {
  name: 'chart-crop',
  dependencies: {
    'chart-windows': '1.0.0',
  },
};

export default ChartCrop;
