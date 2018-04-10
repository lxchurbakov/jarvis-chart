import Matrix from '../../lib/matrix';

import calcMatrix from './calc-matrix';

const ChartWindow = (p, options) => {

  /* Add Chart Window parameters to state */
  p.on('state/default', (state) => {
    const defaultChartWindowState = {
      translate: { x: 0, y: 0 },
      zoom: { x: 1, y: 1 },
      autoZoom: false,
    };

    return { ...state, chartWindow: defaultChartWindowState };
  });

  let matrix;

  /* Update matrix only when state got updated (or when default state) */

  const recalcMatrix = (state) => {
    matrix = calcMatrix(state, options);
  };

  p.on('state/update', (state) => {
    recalcMatrix(state);
  });

  p.on('state/default', (state) => {
    recalcMatrix(state);
    return state;
  }, -1000);

  /* Render chart window and allow stuff inside to render */

  p.on('render/draw', ({ context, state }) => {
    p.render.primitives.group(context, { matrix }, () => {
      p.emitSync('chart-window/inside', { context, state });
    });

    return { context, state };
  });

  p.chartWindow = {
    getMatrix: () => matrix,
    setAutoZoom: (autoZoom) => p.state.update((state) => {
      state.chartWindow.autoZoom = autoZoom;
      return state;
    }),
    translate: {
      get: () => p.state.get().chartWindow.translate,
      set: (t) => p.state.update((state) => {
        state.chartWindow.translate = t;
        return state;
      }),
    },
    zoom: {
      get: () => p.state.get().chartWindow.zoom,
      set: (z) => p.state.update((state) => {
        state.chartWindow.zoom = z;
        return state;
      }),
    },
    toWorld: (a) => Matrix.apply(a, matrix.reverse())
  };

  p.on('api', (api) => ({ ...api, chartWindow: p.chartWindow }))
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
