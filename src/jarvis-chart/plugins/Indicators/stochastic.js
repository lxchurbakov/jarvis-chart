import Matrix from '../../lib/matrix';

import { getScreenBounds } from './helpers';

export default {

  inside: (p, context, { distance, maDistance }) => {
    const { offset, count } = getScreenBounds;

    const values = p.values.get();

    const stochastic = values.map((value, index) => {
      const stochasticSlice = values.slice(Math.max(0, index - distance), index + 1);

      const min = stochasticSlice.reduce((acc, value) => Math.min(acc, value.min), Infinity);
      const max = stochasticSlice.reduce((acc, value) => Math.max(acc, value.max), -Infinity);

      return 100 * (value.close - min) / (max - min);
    });

    const movingAverage = stochastic.map((value, index, array) => {
      const sliceInstance = values.slice(Math.max(0, index - distance), Math.min(values.length - 1, index + distance));

      return sliceInstance.reduce((acc, value) => acc + value, 0) / sliceInstance.length;
    });

    const currentMatrix = context.matrix.get();

    const dropMatrix = Matrix.join(
      Matrix.scale(1, -1),
      Matrix.translate(0, context.matrix.screen.dimensions().height),
      Matrix.resetTranslate(currentMatrix, false, true),
      Matrix.resetScale(currentMatrix, false, true),
    );

    p.render.primitives.group(context, { matrix: dropMatrix }, () => {
      p.render.primitives.line(context, { x0: 0, y0: 100, x1: 50000, y1: 100, color: '#ccc', width: 1 });

      stochastic.forEach((value, index) => {
        if (index < 1) return;
        if (index < offset || index > offset + count) return;

        const prev = stochastic[index - 1];

        const x0 = 10 * (index - 1);
        const y0 = prev;

        const x1 = 10 * (index);
        const y1 = value;

        p.render.primitives.line(context, { x0, y0, x1, y1, color: '#7437e8', width: 1 });
      });

      movingAverage.forEach((value, index) => {
        if (index < 1) return;
        if (index < offset || index > offset + count) return;

        const prev = stochastic[index - 1];

        const x0 = 10 * (index - 1);
        const y0 = prev;

        const x1 = 10 * (index);
        const y1 = value;

        p.render.primitives.line(context, { x0, y0, x1, y1, color: '#7437e8', width: 1 });
      });
    });
  },

};
