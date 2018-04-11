import Matrix from '../../../lib/matrix';

import { getScreenBounds, getUD, movingAverage } from './helpers';

export default {

  inside: (p, context, { distance }) => {
    const { offset, count } = getScreenBounds(context);

    const values = p.values.get();

    /* Retrieve U and D from values */

    const ud = values.map((value, index) => index > 0 ? getUD(value, values[index - 1]) : ({ u: 0, d: 0 }));
    const u = ud.map(({ u }) => u);
    const d = ud.map(({ d }) => d);

    const uma = movingAverage(u, distance);
    const dma = movingAverage(d, distance);

    /* Get rs for every element */

    const rs = uma.map((_uma, index) => _uma / dma[index]);

    const rsi = rs.map(rs => 100 - (100 / (1 + rs)));

    /* Calculate matrix to get back to screen coords */

    const currentMatrix = context.matrix.get();

    const dropMatrix = Matrix.join(
      Matrix.scale(1, -1),
      Matrix.translate(0, context.matrix.screen.dimensions().height),
      Matrix.resetTranslate(currentMatrix, false, true),
      Matrix.resetScale(currentMatrix, false, true),
    );

    p.render.primitives.group(context, { matrix: dropMatrix }, () => {
      p.render.primitives.line(context, { x0: 0, y0: 100, x1: 50000, y1: 100, color: 'red', width: 1 });

      const points = rsi.slice(offset, offset + count + 1).map((value, index) => ({ x: 10 * (index + offset), y: value }));

      p.render.primitives.polyline(context, { points, color: '#7437e8', width: 1 })
    });
  },
};
