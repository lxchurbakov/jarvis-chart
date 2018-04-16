// import Matrix from 'lib/matrix';
//
// import { getScreenBounds, getUD, movingAverage } from './helpers';
//
// export default {
//
//   inside: (p, context, { distance }) => {
//     const { offset, count } = getScreenBounds(context);
//
//
//
//     /* Calculate matrix to get back to screen coords */
//
//     const currentMatrix = context.api.matrix.get();
//
//     const dropMatrix = Matrix.join(
//       Matrix.scale(1, -1),
//       Matrix.translate(0, context.api.screen.height()),
//       Matrix.resetTranslate(currentMatrix, false, true),
//       Matrix.resetScale(currentMatrix, false, true),
//     );
//
//     p.render.primitives.group(context, { matrix: dropMatrix }, () => {
//       p.render.primitives.line(context, { x0: 0, y0: 100, x1: 50000, y1: 100, color: 'red', width: 1 });
//
//       const points = rsi.slice(offset, offset + count + 1).map((value, index) => ({ x: 10 * (index + offset), y: value }));
//
//       p.render.primitives.polyline(context, { points, color: '#7437e8', width: 1 })
//     });
//   },
// };



import Matrix from 'lib/matrix';

import { movingAverage, actionOnSelection, getUD } from '../helpers';

const INDICATOR_TYPE = 'rsi';

/**
 * Stochastic индикатор
 */
const RSI = (p) => {

  let data = null;

  p.on('indicators/create', (indicator) => {
    const { id, type, meta } = indicator;

    if (type === INDICATOR_TYPE && data === null) {
      const distance = 5;

      const values = p.values.get();

      /* Retrieve U and D from values */

      const ud = values.map((value, index) => index > 0 ? getUD(value, values[index - 1]) : ({ u: 0, d: 0 }));
      const u = ud.map(({ u }) => u);
      const d = ud.map(({ d }) => d);

      const uma = movingAverage(u, distance);
      const dma = movingAverage(d, distance);

      /* Get rs for every element */
      const rs = uma.map((_uma, index) => _uma / dma[index]);

      data = rs.map(rs => 100 - (100 / (1 + rs)));
    }

    return indicator;
  });

  p.on('indicators/register', () => {
    p.indicators.register(INDICATOR_TYPE, {
      inside: (context, meta, id) => {
        if (data !== null) {
          let { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
          offset = Math.max(0, offset);
          count  = Math.max(0, offset + count) - offset;

          const points = data.slice(offset, offset + count + 1).map((value, index) => ({ x: 10 * (index + offset), y: value }));

          p.render.primitives.polyline(context, { points, color: '#7437e8', width: 1 })
        }
      },
      bounds: (meta, id) => {
        return { min: 0, max: 100 };
      },
    });
  });
};

RSI.plugin = {
  name: 'rsi',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
    'render': '1.0.0',
  }
};

export default RSI;
