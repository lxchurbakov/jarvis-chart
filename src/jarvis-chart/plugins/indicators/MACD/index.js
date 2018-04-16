import Matrix from 'lib/matrix';

import { actionOnSelection, movingAverage } from '../helpers';

const INDICATOR_TYPE = 'macd';

/**
 * MACD индикатор
 */
const MACD = (p) => {
  let data = null;

  p.on('indicators/create', (indicator) => {
    const { id, type, meta } = indicator;

    if (type === INDICATOR_TYPE && data === null) {
      const distance = 5;

      const values = p.values.get();
      const valuesClose = values.map(value => value.close);

      const emas = movingAverage(valuesClose, 7);
      const emal = movingAverage(valuesClose, 20);
      const macd = emas.map((_, i) => emas[i] - emal[i]);
      const signal = movingAverage(macd, 5);
      // const

      data = { macd, signal };
    }

    return indicator;
  });

  p.on('indicators/register', () => {
    p.indicators.register(INDICATOR_TYPE, {
      inside: (context, { distance = 5 }, id) => {
        if (data !== null) {
          let { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
          offset = Math.max(0, offset);
          count  = Math.max(0, offset + count) - offset;

          const { macd, signal } = data;

          const macdPoints = macd.slice(offset, offset + count + 1).map((value, index) => ({ x: 10 * (index + offset), y: value }));
          const signalPoints = signal.slice(offset, offset + count + 1).map((value, index) => ({ x: 10 * (index + offset), y: value }));

          p.render.primitives.polyline(context, { points: macdPoints, color: '#7437e8', width: 1 });
          p.render.primitives.polyline(context, { points: signalPoints, color: '#FA2C50', width: 1 });
        }
      },
      bounds: (meta, id) => {
        let { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        offset = Math.max(0, offset);
        count  = Math.max(0, offset + count) - offset;

        const { macd } = data;

        const min = macd.slice(offset, offset + count + 1).reduce((acc, v) => Math.min(acc, v), Infinity);
        const max = macd.slice(offset, offset + count + 1).reduce((acc, v) => Math.max(acc, v), -Infinity);

        return { min, max };
      },
    });
  });
};

MACD.plugin = {
  name: 'macd',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
    'render': '1.0.0',
  }
};

export default MACD;
