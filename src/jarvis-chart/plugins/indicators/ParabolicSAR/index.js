import Matrix from 'lib/matrix';

const INDICATOR_TYPE = 'parabolic-sar';

const ParabolicSAR = (p, options) => {
  let data = null;

  p.on('indicators/create', (indicator) => {
    const { id, type, meta } = indicator;

    if (type === INDICATOR_TYPE && data === null) {
      data = [];
      const distance = 5;
      const acceleration = 0.02 * distance + 0.02;

      const values = p.values.get();

      // let sar = 0;
      values.forEach((v, i) => {
        if (i > 0) {
          const start = Math.max(0, i - distance);
          const end   = Math.min(values.length - 1, start + distance);
          const h = values.slice(start, end).reduce((acc, v) => Math.max(acc, v.close), null);
          data[i] = data[i - 1] + acceleration * (h - data[i - 1]);
        } else {
          data[i] = 0;
        }
      });
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

          const points = data.slice(offset, offset + count + 1).map((value, index) => ({ x: 10 * (index + offset), y: value }));

          points.forEach((point) => {
            context.api.matrix.push(Matrix.translate(point.x, point.y));
            context.api.matrix.push(Matrix.resetScale(context.api.matrix.get()));
            p.render.primitives.circle(context, { cx: 0, cy: 0, color: '#7437e8', radius: 3 });
            context.api.matrix.pop()
            context.api.matrix.pop()
          });
        }
      },
    });
  });
};

ParabolicSAR.plugin = {
  name: 'parabolic-sar',
  version: '1.0.0',
  dependencies: {

  },
};

export default ParabolicSAR;
