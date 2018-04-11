import Matrix from '../../lib/matrix';

import { getScreenBounds, actionOnSelection, movingAverage } from './helpers';

export default {
  inside: (p, context, { distance, maDistance }) => {
    const { offset, count } = getScreenBounds(context);

    const values = p.values.get();

    const stochastic = actionOnSelection(values, distance, 0, (selection, index) => {
      const value = values[index];

      const min = selection.reduce((acc, value) => Math.min(acc, value.min), Infinity);
      const max = selection.reduce((acc, value) => Math.max(acc, value.max), -Infinity);

      return 100 * (value.close - min) / (max - min);
    });

    const stochasticMA = movingAverage(stochastic, distance);

    const stochasticPoints = stochastic.slice(offset, offset + count).map((value, index) => ({ x: 10 * (index + offset), y: value }));
    const stochasticMAPoints = stochasticMA.slice(offset, offset + count).map((value, index) => ({ x: 10 * (index + offset), y: value }));

    const currentMatrix = context.matrix.get();

    const dropMatrix = Matrix.join(
      Matrix.scale(1, -1),
      Matrix.translate(0, context.matrix.screen.dimensions().height),
      Matrix.resetTranslate(currentMatrix, false, true),
      Matrix.resetScale(currentMatrix, false, true),
    );

    p.render.primitives.group(context, { matrix: dropMatrix }, () => {
      p.render.primitives.line(context, { x0: 0, y0: 100, x1: 50000, y1: 100, color: '#ccc', width: 1 });

      p.render.primitives.polyline(context, { points: stochasticPoints, color: '#7437e8', width: 1 });
      p.render.primitives.polyline(context, { points: stochasticMAPoints, color: 'red', width: 1 });
    });
  },

};
