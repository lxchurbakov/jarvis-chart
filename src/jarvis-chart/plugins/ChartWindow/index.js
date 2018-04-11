import Matrix from '../../lib/matrix';
import calcMatrix from './calc-matrix';

/**
 * ChartWindow плагин
 *
 * Создаёт "окно" чарта, через которое его можно таскать
 *
 * Использует сокеты: state/default, state/update, render/draw, api
 * Создаёт сокеты: chart-window/inside
 * Использует API: p.render
 * Создаёт API: p.chartWindow
 *
 * chart-window/inside - сокет, предназначенный для вывода всего внутри графика
 *
 */
const ChartWindow = (p, options) => {

  /* Добавляем параметры "окна" графика в стейт  */

  p.on('state/default', (state) => {
    const defaultChartWindowState = {
      translate: { x: 0, y: 0 },
      zoom: { x: 1, y: 1 },
      autoZoom: false,
    };

    return { ...state, chartWindow: defaultChartWindowState };
  });

  /* Создаём матрицу преобразований и кэшируем её */

  const recalcMatrix = (state) => matrix = calcMatrix(state, options)

  let matrix;
  let lastState;

  p.on('state/update', (state) => {
    /* Обновляем матрицу только если изменилось состояние chartWindow */
    if (lastState !== state && lastState.chartWindow !== state.chartWindow) {
      recalcMatrix(state);
      lastState = state;
    }
  });

  p.on('state/default', (state) => {
    lastState = state;
    recalcMatrix(state);
    return state;
  }, -1000);

  /* Выводим примитивы для трансформации "окна" графика */

  p.on('render/draw', ({ context }) => {
    p.render.primitives.group(context, { matrix }, () => {
      p.emitSync('chart-window/inside', { context });
    });

    return { context };
  });

  /* Регистрируем внешний API */

  p.chartWindow = {
    getMatrix: () => matrix,
    setAutoZoom: (autoZoom) => p.state.update((state) => {
      return {
        ...state,
        chartWindow: { ...state.chartWindow, autoZoom },
      };
    }),
    translate: {
      get: () => p.state.get().chartWindow.translate,
      set: (translate) => p.state.update((state) => {
        return {
          ...state,
          chartWindow: { ...state.chartWindow, translate },
        };
      }),
    },
    zoom: {
      get: () => p.state.get().chartWindow.zoom,
      set: (zoom) => p.state.update((state) => {
        return {
          ...state,
          chartWindow: { ...state.chartWindow, zoom },
        };
      }),
    },
    toWorld: (a) => Matrix.apply(a, matrix.reverse()),
  };

  p.on('api', (api) => ({ ...api, chartWindow: p.chartWindow }));
};

ChartWindow.plugin = {
  name: 'chart-window',
  version: '1.0.0',
  dependencies: {
    'chart-values': '1.0.0',
    'render': '1.0.0',
    'state': '1.0.0'
  }
};

export default ChartWindow;
