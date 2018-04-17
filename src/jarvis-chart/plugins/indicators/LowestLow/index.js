import Matrix from 'lib/matrix';

import { actionOnSelection, movingAverage } from '../helpers';

const INDICATOR_TYPE = 'lowest-low';

/**
 * LowestLow индикатор
 */
const HighestHigh = (p) => {
  let data = null;

  p.on('indicators/create', (indicator) => {
    const { id, type, meta } = indicator;

    if (type === INDICATOR_TYPE && data === null) {
      const distance = 5;
      const values = p.values.get();

      data = actionOnSelection(values, distance, 0, (selection) =>
        selection.reduce((a, value) => Math.min(a, value.min), Infinity));
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

          const points = data.slice(offset, offset + count).map((value, index) => ({ x: 10 * (offset + index), y: value }));

          p.render.primitives.polyline(context, { points, color: '#7437e8', width: 1 });
        }
      },
    });
  });
};

HighestHigh.plugin = {
  name: 'lowest-low',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
    'render': '1.0.0',
  }
};

export default HighestHigh;