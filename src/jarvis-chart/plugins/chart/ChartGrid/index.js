import Matrix from 'lib/matrix';

import { matrixForWindow, drawGrid, drawTimeline, drawPriceline, getGridConfig } from './helpers';

/**
 * ChartGrid плагин
 */
const ChartGrid = (p, options) => {
  p.on('state/default', (state) => ({ ...state, zoomX: 1, translateX: 0 }));
  p.on('chart-windows/create', (w) => ({ ...w, translateY: 0, zoomY: 1 }));

  /* Для каждого окна на момент отрисовки */
  p.on('chart-windows/inside', ({ context, top, id }) => {
    /* Передвинемся по нужным координатам */
    const { translateX, zoomX } = p.state.get();
    const { translateY, zoomY } = p.chartWindows.get(id);

    const translate = { x: translateX, y: translateY };
    const zoom      = { x: zoomX, y: zoomY };

    /* Один раз посчитаем конфигурацию сетки */
    const values = p.values.get();
    const gridConfig = getGridConfig(context, translate, zoom, options, values);

    /* Зарисуем сетку на заднем плане */
    drawGrid(p, context, translate, zoom, gridConfig);

    /* Позволим внедриться - отрисуем неизвестное содержимое */
    p.render.primitives.group(context, { matrix: matrixForWindow(translate, zoom, options) }, () => {
      p.emitSync('chart-grid/inside', { context, id });
    });

    /* Зарисуем шкалы */
    drawTimeline(p, context, translate, zoom, gridConfig);
    drawPriceline(p, context, translate, zoom, gridConfig);

    return { id, top, context };
  });

  /* Послушаем события */
  p.on('handler/attach', () => {
    console.todo('Слушать скролл на шкалах и масштабировать каждую отдельно')
    /* При drag событии */
    p.handler.on('chart-windows-events/drag', ({ x, y, e, id }) => {
      // const k =
      /* Изменим соответствующие значения */
      p.state.update((state) => ({ ...state, translateX: state.translateX - (x / state.zoomX) }));
      p.state.update((state) => ({ ...state, chartWindows: state.chartWindows.map((cw) => {
        return cw.id === id ? ({ ...cw, translateY: cw.translateY + y }) : cw
      }) }));
    });

    p.handler.on('chart-windows-events/zoom', ({ delta, x, y, e, id }) => {
      const k = delta / 1000;

      p.state.update((state) => ({ ...state, zoomX: state.zoomX - k }));
      p.state.update((state) => ({ ...state, chartWindows: state.chartWindows.map((cw) => {
        return cw.id === id ? ({ ...cw, zoomY: cw.zoomY -k }) : cw
      }) }));
    });
  });
};

ChartGrid.plugin = {
  name: 'chart-grid',
  version: '1.0.0',
  dependencies: {
    'chart-windows': '1.0.0',
    'render': '1.0.0',
  }
};

export default ChartGrid;
