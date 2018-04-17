import { Matrix } from 'lib/geometry';
import cci from './cci';

const INDICATOR_TYPE = 'cci';

/**
 * CCI индикатор
 */
const CCI = (p) => {
  /* Кэшируем данные */
  let data = null;

  /* В момент создания индикатора подсчитываем данные */
  p.on('indicators/create', (indicator) => {
    const { id, type, meta } = indicator;

    if (type === INDICATOR_TYPE && data === null) {
      const values = p.values.get();
      const distance = 5;

      data = cci(values, distance);
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

          const points = data
            .slice(offset, offset + count)
            .map((value, index) => ({ x: 10 * (index + offset), y: value }));

          p.render.primitives.polyline(context, { points, color: '#7437e8', width: 1 });
        }      
      },
      bounds: (meta, id) => ({ min: 0, max: 300 }),
    });
  });
};

CCI.plugin = {
  name: 'cci',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
    'render': '1.0.0',
  }
};

export default CCI;
