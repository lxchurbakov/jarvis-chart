import Matrix from 'lib/matrix';

/**
 * Построить матрицу для пространства внутри окна
 *
 * Важно! точка масштабирования по Y также влияет на позиционирование автозума
 */
const matrixForWindow = (translate, zoom, width, height) =>
  Matrix.join(
    /* Зуммируем относительно середины экрана */
    Matrix.translate(translate.x - width / 2, 0),
    Matrix.scale(zoom.x, zoom.y),
    Matrix.translate(-translate.x + width / 2, 0),
    /* Переносим по x куда надо */
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
    /* Переносим по x куда надо */
    Matrix.translate(translate.x, 0),
  );

/**
 * Построить матрицу для прайслайна (то же самое, что и для окна, только игнорируя перенос/зум по оси Y)
 */
const matrixForPriceline = (translate, zoom, width, height) =>
  Matrix.join(
    Matrix.scale(1, zoom.y),
    Matrix.translate(0, translate.y),
  );

/**
 * ChartWindowsScaleTranslate плагин
 *
 * Добавляет окнам масштаб и перенос. Создаёт API для получения этих значений и соответствующих матриц
 * Также ловит события drag и zoom, но это пока. В будущем перейти на ViewMode
 *
 * Важное замечание: этот плагин реализует режим работы автозума. При вызове метода get.xy() или matrix.xy() или аналогично но с y(),
 * происходит подсчёт автозума, который в свою очередь вызывает определение границ индикаторов. В коде определения границ индикаторы не должны использовать
 * небезопасные для автозума методы этого модуля. Безопасными считаются *.x() методы.
 *
 */
const ChartWindowsScaleTranslate = (p, options) => {
  /* Добавляем значения зума и смещения в стейт и каждое окно */
  /* По X окна движутся вместе, по Y по отдельности */
  p.on('state/default', (state) => ({ ...state, chartWindowsScaleTranslate: { translateX: 0, zoomX: 1 }}));
  p.on('chart-windows/create', (w) => ({ ...w, chartWindowsScaleTranslate: { translateY: 0, zoomY: 1, autoZoom: true }}));

  /* Добавляем слушаетелй (перенесу в ViewMode) */
  p.on('handler/attach', () => {
    console.todo('Перенести обработку drag и zoom в view mode');

    p.handler.on('chart-windows-events/drag', ({ x, y, e, id }) => {
      p.state.update((state) => {
        let { chartWindowsScaleTranslate, chartWindows } = state;

        chartWindowsScaleTranslate.translateX = chartWindowsScaleTranslate.translateX - (x / state.chartWindowsScaleTranslate.zoomX);

        chartWindows = chartWindows.map((cw) => {
          if (cw.id === id) {
            cw.chartWindowsScaleTranslate = {
              ...cw.chartWindowsScaleTranslate,
              translateY: cw.chartWindowsScaleTranslate.translateY + (y)
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
  
  /* chartWindowsScaleTranslate API */
  p.chartWindowsScaleTranslate = {
    /* Методы для работы с сырыми значениями */
    raw: {
      /**
       * Получить translate и zoom по X 
       */
      x: () => p.state.get().chartWindowsScaleTranslate,
      /**
       * Получить translate и zoom по Y - не может быть вызван в момент определения автозума
       */
      y: (id) => p.chartWindows.get(id).chartWindowsScaleTranslate,
      /**
       * Получить translate и zoom по всем осям - не может быть вызван в момент определения автозума
       */
      xy: (id) => {
        const { chartWindowsScaleTranslate: { translateX, zoomX } } = p.state.get();
        const { chartWindowsScaleTranslate: { translateY, zoomY } } = p.chartWindows.get(id);

        const translate = { x: translateX, y: translateY };
        const zoom      = { x: zoomX, y: zoomY };

        return { translate, zoom };
      },
    },
    /**
     * Получить translate и zoom по всем осям с автозумом. - не может быть вызван в момент определения автозума
     */
    get: (id) => {
      const { translate, zoom } = p.chartWindowsScaleTranslate.raw.xy(id);
      const { weight, chartWindowsScaleTranslate: { autoZoom } } = p.chartWindows.get(id);

      if (autoZoom) {
        const { min, max } = p.emitSync('chart-windows-scale-translate/autozoom', { id, min: null, max: null });
        
        if (min !== null && max !== null) {
          const height = options.height * weight;
          
          /* Важно! зависит от точка масштабирования по Y */
          zoom.y = (height) / (max - min);
          translate.y = -min * zoom.y;
        } else {
          console.warnOnce(`Auto Zoom включён, но ни один индикатор не вернул границ, окно ${id}`)
        }

        return { translate, zoom };
      } else {
        return { translate, zoom };
      }
    },
    /* Матрицы масштабирования/переноса */
    matrix: {
      /* Только для X (использует raw x, т.к. не нужен автозум) - остальные не используют raw */
      /* Можно использовать в ChartCrop и в индикаторах и везде */
      /**
       * Получить матрицу для переноса и масштаба только по оси X. Y остаётся неизменен
       */
      x: () => {
        const { translateX, zoomX } = p.chartWindowsScaleTranslate.raw.x();
        const translate = { x: translateX };
        const zoom = { x: zoomX };
        const { width, height } = options;

        return matrixForTimeline(translate, zoom, width, height);
      },
      /**
       * Аналогичная матрица, только для Y - не может быть вызвана в режиме определения автозума
       */
      y: (id) => {
        const { translate, zoom } = p.chartWindowsScaleTranslate.get(id);
        const { width, height } = options;

        return matrixForPriceline(translate, zoom, width, height);
      },
      /**
       * Аналогичная матрица, только для всего окна - не может быть вызвана в режиме определения автозума
       */
      xy: (id) => {
        const { translate, zoom } = p.chartWindowsScaleTranslate.get(id);
        const { width, height } = options;

        return matrixForWindow(translate, zoom, width, height);
      },
    },
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
