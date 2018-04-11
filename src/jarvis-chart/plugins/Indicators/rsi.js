import Matrix from '../../lib/matrix';

import { getScreenBounds } from './helpers';

export default {

  inside: (p, context, { distance }) => {
    const { offset, count } = getScreenBounds;

    const values = p.values.get();

    const ud = values.map((value, index) => {
      if (index > 0) {
        const prev = values[index - 1];
        const u = Math.max(0, value.close - prev.close)
        const d = Math.max(0, prev.close - value.close)

        return { u, d };
      } else {
        return { u: 0, d: 0 };
      }
    });

    const rs = ud.map((value, index, array) => {
      const sliceInstance = ud.slice(Math.max(0, index - distance), Math.min(ud.length - 1, index + distance));

      const u = sliceInstance.reduce((acc, value) => acc + value.u, 0) / sliceInstance.length;
      const d = sliceInstance.reduce((acc, value) => acc + value.d, 0) / sliceInstance.length;

      return u / d;
    });

    const rsi = rs.map(rs => 100 - (100 / (1 + rs)));

    const currentMatrix = context.matrix.get();

    const dropMatrix = Matrix.join(
      Matrix.scale(1, -1),
      Matrix.translate(0, context.matrix.screen.dimensions().height),
      Matrix.resetTranslate(currentMatrix, false, true),
      Matrix.resetScale(currentMatrix, false, true),
    );

    p.render.primitives.group(context, { matrix: dropMatrix }, () => {
      p.render.primitives.line(context, { x0: 0, y0: 100, x1: 50000, y1: 100, color: 'red', width: 1 });

      rsi.forEach((value, index) => {
        if (index < 1) return;
        if (index < offset || index > offset + count) return;

        const prev = rsi[index - 1];

        const x0 = 10 * (index - 1);
        const y0 = prev;

        const x1 = 10 * (index);
        const y1 = value;

        p.render.primitives.line(context, { x0, y0, x1, y1, color: '#7437e8', width: 1 });
      });
    });
  },

};
