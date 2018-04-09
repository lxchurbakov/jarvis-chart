import Matrix from '../../lib/matrix'

const calcNormalMatrix = (state, options) =>
  Matrix.join(
    Matrix.translate(state.chartWindow.translate.x - options.width / 2, state.chartWindow.translate.y - options.height / 2),
    Matrix.scale(state.chartWindow.zoom.x, state.chartWindow.zoom.y),
    Matrix.translate(-state.chartWindow.translate.x + options.width / 2, -state.chartWindow.translate.y + options.height / 2),

    Matrix.translate(state.chartWindow.translate.x, state.chartWindow.translate.y),

    Matrix.translate(0, -options.height),
    Matrix.scale(1, -1),
  );

const calcAutoMatrix = (state, options) => {
  const normalMatrix = calcNormalMatrix(state, options);

  const [  screenFirst ] = Matrix.apply([  0, 0 ], normalMatrix);
  const [ screenSecond ] = Matrix.apply([ 10, 0 ], normalMatrix);

  const screenStart = -screenFirst;
  const screenWidth = screenSecond - screenFirst;

  const offset = Math.floor(screenStart / screenWidth);
  const count  = Math.ceil(options.width / screenWidth);

  const min = state.values.slice(Math.max(0, offset), offset + count).reduce((acc, value) => Math.min(acc, value.min), Infinity);
  const max = state.values.slice(Math.max(0, offset), offset + count).reduce((acc, value) => Math.max(acc, value.max), -Infinity);

  return Matrix.join(
    // Scale relative to screen center by X and at 0 by Y (since we translate on -min)
    Matrix.translate(-options.width / 2, -0),
    Matrix.translate(state.chartWindow.translate.x, -0),
    Matrix.scale(state.chartWindow.zoom.x, options.height / (max - min)),
    Matrix.translate(options.width / 2, 0),
    Matrix.translate(-state.chartWindow.translate.x, 0),

    // Move where we want
    Matrix.translate(state.chartWindow.translate.x, -(min * options.height / (max - min))),

    // Transform coordinate system
    Matrix.translate(0, -options.height),
    Matrix.scale(1, -1),
  );
};

const calcMatrix = (state, options) => state.chartWindow.autoZoom
  ? calcAutoMatrix(state, options)
  : calcNormalMatrix(state, options);

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

  let lastId;
  let lastMatrix;

  /* Render chart window and allow stuff inside to render */
  p.on('render/draw', ({ context, state }) => {

    /* Do not recalculate the matrix if nothing has changed */
    const matrix = (!lastId || lastId !== state.$id)
      ? calcMatrix(state, options)
      : lastMatrix;

    lastMatrix = matrix;
    lastId = state.$id;

    p.render.primitives.group(context, { matrix }, () => {
      p.emitSync('chart-window/inside', { context, state });
    });

    return { context, state };
  });

  p.chartWindow = {
    getMatrix: () => lastMatrix,
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
    toWorld: (a) => Matrix.apply(a, lastMatrix.reverse())
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
