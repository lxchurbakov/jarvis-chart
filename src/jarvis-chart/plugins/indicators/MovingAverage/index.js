import Matrix from 'lib/matrix';

import { actionOnSelection, movingAverage } from '../helpers';

/**
 * Bollinger индикатор
 */
const MovingAverage = (p) => {
  p.on('indicators/register', () => {
    const distance = 5;

    const values = p.values.get();
    const valuesClose = values.map(value => value.close);
    const valuesCloseMA = movingAverage(valuesClose, distance);

    p.indicators.register('moving-average', {
      inside: (context, { distance = 5 }, id) => {
        let { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        offset = Math.max(0, offset);
        count  = Math.max(0, offset + count) - offset;

        const points = valuesCloseMA.slice(offset, offset + count + 1).map((value, index) => ({ x: 10 * (index + offset), y: value }));

        p.render.primitives.polyline(context, { points, color: '#7437e8', width: 1 });
      },
    });
  });
};

MovingAverage.plugin = {
  name: 'moving-average',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
    'render': '1.0.0',
  }
};

export default MovingAverage;
