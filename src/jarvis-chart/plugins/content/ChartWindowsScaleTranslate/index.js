import Matrix from 'lib/matrix';

/**
 * Построить матрицу для пространства внутри окна
 */
const matrixForWindow = (translate, zoom, width, height) =>
  Matrix.join(
    /* Зуммируем относительно середины экрана */
    Matrix.translate(translate.x - width / 2, translate.y - height / 2),
    Matrix.scale(zoom.x, zoom.y),
    Matrix.translate(-translate.x + width / 2, -translate.y + height / 2),

    Matrix.translate(translate.x, translate.y),
  );

/**
 * Построить матрицу для таймлайна (то же самое, что и для окна, только игнорируя перенос/зум по оси Х)
 */
const matrixForTimeline = (translate, zoom, width, height) =>
  Matrix.join(
    /* Зуммируем относительно середины экрана, но только по X */
    Matrix.translate(translate.x - width / 2, 0),
    Matrix.scale(zoom.x, 1),
    Matrix.translate(-translate.x + width / 2, 0),

    Matrix.translate(translate.x, 0),
  );

/**
 * Построить матрицу для прайслайна (то же самое, что и для окна, только игнорируя перенос/зум по оси Y)
 */
const matrixForPriceline = (translate, zoom, width, height) =>
  Matrix.join(
    Matrix.translate(0, translate.y - height / 2),
    Matrix.scale(1, zoom.y),
    Matrix.translate(0, -translate.y + height / 2),

    Matrix.translate(0, translate.y),
  );

/**
 *
 */
const ChartWindowsScaleTranslate = (p, options) => {
  p.on('state/default', (state) => ({ ...state, chartWindowsScaleTranslate: { translateX: 0, zoomX: 1 }}));
  p.on('chart-windows/create', (w) => ({ ...w, chartWindowsScaleTranslate: { translateY: 0, zoomY: 1 }}));

  p.on('handler/attach', () => {
    p.handler.on('chart-windows-events/drag', ({ x, y, e, id }) => {
      p.state.update((state) => {
        let { chartWindowsScaleTranslate, chartWindows } = state;

        chartWindowsScaleTranslate.translateX = chartWindowsScaleTranslate.translateX - (x / state.chartWindowsScaleTranslate.zoomX);

        chartWindows = chartWindows.map((cw) => {
          if (cw.id === id) {
            cw.chartWindowsScaleTranslate = {
              ...cw.chartWindowsScaleTranslate,
              translateY: cw.chartWindowsScaleTranslate.translateY + (y / cw.chartWindowsScaleTranslate.zoomY)
            };
            return cw;
          } else {
            return cw;
          }
        });

        return { ...state, chartWindowsScaleTranslate, chartWindows };
      });

      p.emitSync('chart-windows-scale-translate/change', id);
    });

    p.handler.on('chart-windows-events/zoom', ({ delta, x, y, e, id }) => {
      const k = delta / 1000;

      p.state.update((state) => ({
        ...state,
        chartWindowsScaleTranslate: {
          ...state.chartWindowsScaleTranslate,
          zoomX: state.chartWindowsScaleTranslate.zoomX - k,
        },
        chartWindows: state.chartWindows.map((cw) => cw.id === id ? ({
          ...cw,
          chartWindowsScaleTranslate: {
            ...cw.chartWindowsScaleTranslate,
            zoomY: cw.chartWindowsScaleTranslate.zoomY -k
          },
         }) : cw )
      }));

      p.emitSync('chart-windows-scale-translate/change', id);
    });
  });

  p.chartWindowsScaleTranslate = {
    matrix: {
      window: matrixForWindow,
      timeline: matrixForTimeline,
      priceline: matrixForPriceline,
    },
    get: (id) => {
      const { chartWindowsScaleTranslate: { translateX, zoomX }  } = p.state.get();
      const { chartWindowsScaleTranslate: { translateY, zoomY } } = p.chartWindows.get(id);

      const translate = { x: translateX, y: translateY };
      const zoom      = { x: zoomX, y: zoomY };

      return { translate, zoom };
    }
  };
};

ChartWindowsScaleTranslate.plugin = {
  name: 'chart-windows-scale-translate',
  version: '1.0.0',
  dependencies: {
    'chart-windows': '1.0.0',
    'chart-windows-events': '1.0.0',
    'handler': '1.0.0',
  },
};

export default ChartWindowsScaleTranslate;
