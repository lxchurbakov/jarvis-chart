import Matrix from 'lib/matrix';

const calcNormalMatrix = (state, options) =>
  Matrix.join(
    Matrix.translate(state.chartWindow.translate.x - options.width / 2, state.chartWindow.translate.y - options.height / 2),
    Matrix.scale(state.chartWindow.zoom.x, state.chartWindow.zoom.y),
    Matrix.translate(-state.chartWindow.translate.x + options.width / 2, -state.chartWindow.translate.y + options.height / 2),

    Matrix.translate(state.chartWindow.translate.x, state.chartWindow.translate.y),

    Matrix.scale(1, -1),
    Matrix.translate(0, options.height),
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

export default calcMatrix;
