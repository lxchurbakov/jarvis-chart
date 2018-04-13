/**
 * Lines Индикатор
 */
const Lines = (p) => {
  p.on('indicators/register', () => {
    p.indicators.register('lines', {
      inside: (context, meta, id) => {
        const { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        const values = p.values.get();
        const selection = values.slice(Math.max(0, offset), Math.max(0, offset + count));
        const points = selection.map(({ open, close }, index) => ({ x: (index + offset) * 10, y: close }));

        p.render.primitives.polyline(context, { points, width: 1, color: 'red' });

        // candles(p, context, { first: offset, count: count, values });
      },
      bounds: (meta, id) => {
        const { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        const values = p.values.get();
        const selection = values.slice(Math.max(0, offset), Math.max(0, offset + count));

        const min = selection.reduce((acc, v) => Math.min(v.min, acc), Infinity);
        const max = selection.reduce((acc, v) => Math.max(v.max, acc), -Infinity);

        return { min, max };
      },
    });
  });
};

Lines.plugin = {
  name: 'lines',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
    'render': '1.0.0',
  }
};

export default Lines;
