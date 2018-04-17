import { Matrix } from 'lib/geometry';

const candle = (p, context, { x, y, min, max, open, close }) => {
  const marginBottom = min;
  const lineHeight = max - min;
  const bodyHeight = Math.abs(open - close);
  const paddingBottom = Math.min(open, close) - min;

  const direction = open > close ? 'down' : 'up';
  const color = direction === 'up' ? '#15E6C1' : '#FA2C50';

  p.render.primitives.line(context, { x0: 3.5 + x, y0: marginBottom + y, x1: 3.5 + x, y1: marginBottom + lineHeight + y, color });
  p.render.primitives.rectangle(context, { x, y: marginBottom + paddingBottom + y, width: 7, height: bodyHeight, color });
};

const candles = (p, context, { first, count, values }) => {
  values.forEach(({ min, max, open, close }, index) => {
    if (index < first || index > first + count) return;

    candle(p, context, { x: index * 10 - 3.5, y: 0, min, max, open, close });
  });
};

/**
 * Candles Индикатор
 *
 * Простой индикатор - тип вывода
 */
const Candles = (p) => {
  p.on('indicators/register', () => {
    p.indicators.register('candles', {
      inside: (context, meta, id) => {
        const { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        const values = p.values.get();

        candles(p, context, { first: offset, count: count, values });
      },
      bounds: (meta, id) => {
        const { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        const values = p.values.get();
        const selection = values.slice(Math.max(0, offset), Math.max(0, offset + count));

        if (selection.length) {
          const min = selection.reduce((acc, v) => Math.min(v.min, acc), Infinity);
          const max = selection.reduce((acc, v) => Math.max(v.max, acc), -Infinity);

          return { min, max };
        } else {
          return { min: null, max: null };
        }
      },
    });
  });
};

Candles.plugin = {
  name: 'candles',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
    'render': '1.0.0',
  }
};

export default Candles;
