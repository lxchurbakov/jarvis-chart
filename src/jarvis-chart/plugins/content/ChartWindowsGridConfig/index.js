import { Matrix } from 'lib/geometry';

/**
 * Собственно сам метод нахождения GridConfig'а
 */
const getGridConfig = (p, id) => {
  const values = p.values.get()
  const { width, height } = p.chartWindows.get(id);
  const windowMatrix = p.chartWindowsScaleTranslate.matrix.xy(id);

  /* Найдём положение точек внутри окна */
  let { offset: firstVisiblePricePointIndex, count: visiblePricePointsCount } = p.chartWindowsCrop.vertical(id, 0, 1);

  // firstVisiblePricePointIndex = firstVisiblePricePointIndex);
  visiblePricePointsCount  = Math.max(0, firstVisiblePricePointIndex + visiblePricePointsCount) - firstVisiblePricePointIndex;

  const pricePointsNth = Math.floor(visiblePricePointsCount / (height / 50)); /* Каждые 50px плотность сетки */

  const priceline = (new Array(visiblePricePointsCount).fill(0))
    .map((v, i) => (i + firstVisiblePricePointIndex))
    .map((y) => ({ y: y, text: y }))
    .filter((v, i) => (i + firstVisiblePricePointIndex) % pricePointsNth === 0);

  /* Timeline конфиг */
  let { offset: candlesOffset, count: candlesCount } = p.chartWindowsCrop.horizontal(id, 0, 10);

  candlesOffset = Math.max(0, candlesOffset);
  candlesCount  = Math.max(0, candlesOffset + candlesCount) - candlesOffset;

  const candlesNth = Math.floor(candlesCount / (width / 100)); /* Каждые 100px плотность сетки */

  const timeline = values
    .slice(candlesOffset, candlesOffset + candlesCount + 1)
    .map(({ time }, index) => ({ x: (index + candlesOffset) * 10, text: time }))
    .filter((v, i) => (i + candlesOffset) % candlesNth === 0);

  return { priceline, timeline, first: candlesOffset, count: candlesCount };
};

/**
 * ChartWindowsGridConfig плагин
 *
 * Строит GridConfig объект - дескриптор для сетки и значений, отображающихся на UI
 * Нужен в отдельном модуле, т.к. используется и в ChartWindowsGrid и в ChartWindowsUI.
 *
 */
const ChartWindowsGridConfig = (p, options) => {
  let gridConfigsCache = {};

  /* Если обновляется скейл транслэйт - инвалидируем кэш для всех окон */
  p.on('chart-windows-scale-translate/changed', (id) => {
    gridConfigsCache = {};
  });

  p.on('chart-windows-scale-translate/changed-all', () => {
    gridConfigsCache = {};
  });

  /* Если обновляется стейт окна - инвалидируем грид конфиг */
  p.on('chart-windows/updated', (id) => {
    gridConfigsCache[id] = null;
  });

  p.chartWindowsGridConfig = {
    get: (id) => {
      if (!gridConfigsCache[id]) {
        gridConfigsCache[id] = getGridConfig(p, id);
      }

      return gridConfigsCache[id];
    }
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
