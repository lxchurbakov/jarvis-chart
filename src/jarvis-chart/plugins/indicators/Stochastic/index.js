import Matrix from 'lib/matrix';

import { movingAverage, actionOnSelection } from '../helpers';

const INDICATOR_TYPE = 'stochastic';

/**
 * Stochastic индикатор
 */
const Stochastic = (p) => {

  let data = null;

  p.on('indicators/create', (indicator) => {
    const { id, type, meta } = indicator;

    if (type === INDICATOR_TYPE && data === null) {
      const distance = 5;
      const values = p.values.get();

      const stochastic = actionOnSelection(values, distance, 0, (selection, index) => {
        const value = values[index];

        const min = selection.reduce((acc, value) => Math.min(acc, value.min), Infinity);
        const max = selection.reduce((acc, value) => Math.max(acc, value.max), -Infinity);

        return 100 * (value.close - min) / (max - min);
      });

      const stochasticMA = movingAverage(stochastic, distance);

      data = { stochastic, stochasticMA };
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

          const { stochastic, stochasticMA } = data;

          const stochasticPoints = stochastic.slice(offset, offset + count).map((value, index) => ({ x: 10 * (index + offset), y: value }));
          const stochasticMAPoints = stochasticMA.slice(offset, offset + count).map((value, index) => ({ x: 10 * (index + offset), y: value }));

          p.render.primitives.polyline(context, { points: stochasticPoints, color: '#7437e8', width: 1 });
          p.render.primitives.polyline(context, { points: stochasticMAPoints, color: '#FA2C50', width: 1 });
        }
      },
      bounds: (meta, id) => {
        return { min: 0, max: 100 };
      },
    });
  });
};

Stochastic.plugin = {
  name: 'stochastic',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
    'render': '1.0.0',
  }
};

export default Stochastic;
