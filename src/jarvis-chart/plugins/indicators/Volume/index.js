import { Matrix } from 'lib/geometry';

import { movingAverage, actionOnSelection } from '../helpers';

const INDICATOR_TYPE = 'volume';

/**
 * Volume индикатор
 */
const Volume = (p) => {
  p.on('indicators/register', () => {
    p.indicators.register(INDICATOR_TYPE, {
      inside: (context, meta, id) => {
        let { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        offset = Math.max(0, offset);
        count  = Math.max(0, offset + count) - offset;

        const values = p.values.get();
        const selection = values.slice(offset, offset + count);

        selection.forEach(({volume}, index) => {
          const realIndex = index + offset;
          p.render.primitives.rectangle(context, { x: realIndex * 10 - 3.5, y: 0, width: 7, height: volume, color: '#8ea0bb', opacity: 0.6 });
        });
      },
      bounds: (meta, id) => {
        let { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        offset = Math.max(0, offset);
        count  = Math.max(0, offset + count) - offset;

        const values = p.values.get();
        const selection = values.slice(offset, offset + count);

        if (selection.length) {
          // const min = selection.reduce((acc, v) => Math.min(v.volume, acc), Infinity);
          const max = selection.reduce((acc, v) => Math.max(v.volume, acc), -Infinity);

          return { min: 0, max };
        } else {
          return { min: null, max: null };
        }
      },
    });
  });
};

Volume.plugin = {
  name: 'volume',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
    'render': '1.0.0',
  }
};

export default Volume;
