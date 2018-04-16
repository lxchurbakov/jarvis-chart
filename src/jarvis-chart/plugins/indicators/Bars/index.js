import Matrix from 'lib/matrix';

const bar = (p, context, { x, y, min, max, open, close }) => {
  const marginBottom = min;
  const lineHeight = max - min;
  const bodyHeight = Math.abs(open - close);
  const paddingBottom = Math.min(open, close) - min;

  const direction = open > close ? 'down' : 'up';
  const color = direction === 'up' ? '#15E6C1' : '#FA2C50';

  p.render.primitives.line(context, { x0: 3.5 + x, y0: marginBottom + y, x1: 3.5 + x, y1: marginBottom + lineHeight + y, color });

  const bottomOffset = direction === 'up' ? 3.5 : 0;
  const topOffset = direction === 'up' ? 0 : 3.5;

  p.render.primitives.line(context, { width: 1.5, x0: x + topOffset, y0: marginBottom + paddingBottom + y, x1: 3.5 + x + topOffset, y1: marginBottom + paddingBottom + y, color });
  p.render.primitives.line(context, { width: 1.5, x0: x + bottomOffset, y0: marginBottom + paddingBottom + y + bodyHeight, x1: 3.5 + x + bottomOffset, y1: marginBottom + paddingBottom + y + bodyHeight, color });
};

const bars = (p, context, { first, count, values }) => {
  values.forEach(({ min, max, open, close }, index) => {
    if (index < first || index > first + count) return;

    bar(p, context, { x: index * 10 - 3.5, y: 0, min, max, open, close });
  });
};

/**
 * Bars Индикатор
 *
 * Простой индикатор - тип вывода
 */
const Bars = (p) => {
  p.on('indicators/register', () => {
    p.indicators.register('bars', {
      inside: (context, meta, id) => {
        const { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        const values = p.values.get();

        bars(p, context, { first: offset, count: count, values });
      },
      bounds: (meta, id) => {
        const { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        const values = p.values.get();
        const selection = values.slice(Math.max(0, offset), Math.max(0, offset + count));

        if (selection.length > 0) {
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

Bars.plugin = {
  name: 'bars',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
    'render': '1.0.0',
  }
};

export default Bars;
