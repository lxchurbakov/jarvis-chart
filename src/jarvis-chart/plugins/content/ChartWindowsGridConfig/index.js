import Matrix from 'lib/matrix';

/**
 * Собственно сам метод нахождения GridConfig'а
 */
const getGridConfig = (width, height, windowMatrix, values) => {
  /* Найдём положение точек внутри окна */
  const [x0real, y0real] = Matrix.apply([ 0, 0 ], windowMatrix);
  const [x1real, y1real] = Matrix.apply([ 10, 10 ], windowMatrix);

  /* Priceline конфиг */
  const pricePointRealHeight = Math.abs(y1real - y0real) / 10;
  const pricePointsRealOffset = y0real;

  const visiblePricePointsCount = Math.abs(Math.ceil(height / pricePointRealHeight));
  const firstVisiblePricePointIndex = Math.floor(-pricePointsRealOffset / pricePointRealHeight);

  const pricePointsNth = Math.floor(visiblePricePointsCount / (height / 50)); /* Показываем цену каждые 50px */

  const priceline = (new Array(visiblePricePointsCount).fill(0))
    .map((v, i) => i + firstVisiblePricePointIndex)
    .map((y) => ({ y: y, text: y }))
    .filter((v, i) => (i + firstVisiblePricePointIndex) % pricePointsNth === 0);

  /* Timeline конфиг */
  const candleRealWidth = x1real - x0real;
  const candlesRealOffset = x0real;

  const visibleCandlesCount = Math.ceil(width / candleRealWidth);
  const firstVisibleCandleIndex = Math.max(0, Math.floor(-candlesRealOffset / candleRealWidth));

  const candlesNth = Math.floor(visibleCandlesCount / 10); /* Показываем только 10 линий */

  const timeline = values
    .slice(firstVisibleCandleIndex, firstVisibleCandleIndex + visibleCandlesCount + 1)
    .map(({ time }, index) => ({ x: (index + firstVisibleCandleIndex) * 10, text: time }))
    .filter((v, i) => (i + firstVisibleCandleIndex) % candlesNth === 0);

  return { priceline, timeline, first: firstVisibleCandleIndex, count: visibleCandlesCount };
};

const getGridConfigForWindow = (p, options, id) => {
  const { width, height: h } = options;
  const height = h * p.chartWindows.get(id).weight;
  const values = p.values.get()

  const windowMatrix = p.chartWindowsScaleTranslate.matrix.xy(id);
  const gridConfig = getGridConfig(width, height, windowMatrix, values);

  return gridConfig;
};

/**
 * ChartWindowsGridConfig плагин
 *
 * Строит GridConfig объект - дескриптор для сетки и значений, отображающихся на UI
 * Нужен в отдельном модуле, т.к. используется и в ChartWindowsGrid и в ChartWindowsUI.
 *
 */
const ChartWindowsGridConfig = (p, options) => {
  console.todo('Кэшировать значения конфигурации сетки');
  console.todo('Перевести построение конфигурации сетки на ChartCrop');

  p.chartWindowsGridConfig = {
    get: (id) => getGridConfigForWindow(p, options, id)
  };
};

ChartWindowsGridConfig.plugin = {
  name: 'chart-windows-grid-config',
  version: '1.0.0',
  dependencies: {
    'chart-windows-scale-translate': '1.0.0',
  },
};

export default ChartWindowsGridConfig;
