import Matrix from '../../lib/matrix';

import { getScreenBounds } from './helpers';

export default {

  inside: (p, context, { distance, maDistance }) => {
    const { offset, count } = getScreenBounds;

    const values = p.values.get();

    const tp = values.map(value => (value.min + value.max + value.close) / 3);

    const movingAverageTP = tp.map((value, index, array) => {
      const sliceInstance = tp.slice(Math.max(0, index - distance), Math.min(tp.length - 1, index + distance));

      return sliceInstance.reduce((acc, value) => acc + value, 0) / sliceInstance.length;
    });

    const md = movingAverageTP.map((_, index) => {
      const sliceInstance = movingAverageTP.slice(Math.max(0, index - distance), Math.min(movingAverageTP.length - 1, index + distance));

      return sliceInstance.map((matp, index) => matp - tp[index]).reduce((acc, value) => acc + value, 0) / sliceInstance.length;
    });

    const cci = md.map((md, index) => {
      const TP = tp[index];
      const MATP = movingAverageTP[index];

      return (TP - MATP) / (0.015 * md) + 100;
    });

    const currentMatrix = context.matrix.get();

    const dropMatrix = Matrix.join(
      Matrix.scale(1, -1),
      Matrix.translate(0, context.matrix.screen.dimensions().height),
      Matrix.resetTranslate(currentMatrix, false, true),
      Matrix.resetScale(currentMatrix, false, true),
    );

    p.render.primitives.group(context, { matrix: dropMatrix }, () => {
      p.render.primitives.line(context, { x0: 0, y0: 200, x1: 50000, y1: 200, color: 'red', width: 1 });
      p.render.primitives.line(context, { x0: 0, y0: 100, x1: 50000, y1: 100, color: '#ccc', width: 1 });

      cci.forEach((value, index) => {
        if (index < 1) return;
        if (index < offset || index > offset + count) return;

        const prev = cci[index - 1];

        const x0 = 10 * (index - 1);
        const y0 = prev;

        const x1 = 10 * (index);
        const y1 = value;

        p.render.primitives.line(context, { x0, y0, x1, y1, color: '#7437e8', width: 1 });
      });
    });
  },

};
