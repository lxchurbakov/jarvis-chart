import Matrix from 'lib/matrix';

import { actionOnSelection, movingAverage } from '../helpers';

/**
 * Bollinger индикатор
 */
const HighestHigh = (p) => {
  p.on('indicators/register', () => {
    const distance = 5;

    const values = p.values.get();

    const highestHigh = actionOnSelection(values, distance, 0, (selection) =>
      selection.reduce((a, value) => Math.max(a, value.max), -Infinity));

    p.indicators.register('highest-high', {
      inside: (context, { distance = 5 }, id) => {
        let { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        offset = Math.max(0, offset);
        count  = Math.max(0, offset + count) - offset;

        const points = highestHigh.slice(offset, offset + count).map((value, index) => ({ x: 10 * (offset + index), y: value }));

        p.render.primitives.polyline(context, { points, color: '#7437e8', width: 1 });
      },
    });
  });
};

HighestHigh.plugin = {
  name: 'highest-high',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
    'render': '1.0.0',
  }
};

export default HighestHigh;
