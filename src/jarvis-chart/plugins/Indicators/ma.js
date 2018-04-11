import { getScreenBounds } from './helpers';

export default {

  inside: (p, context, { distance }) => {
    const { offset, count } = getScreenBounds;

    const values = p.values.get();

    const movingAverage = values.map((value, index, array) => {
      const sliceInstance = values.slice(Math.max(0, index - distance), Math.min(values.length - 1, index + distance));

      return sliceInstance.reduce((acc, value) => acc + value.close, 0) / sliceInstance.length;
    });

    movingAverage.forEach((value, index) => {
      if (index < 1) return;
      if (index < offset || index > offset + count) return;

      const prev = movingAverage[index - 1];

      const x0 = 10 * (index - 1);
      const y0 = prev;

      const x1 = 10 * (index);
      const y1 = value;

      p.render.primitives.line(context, { x0, y0, x1, y1, color: '#7437e8', width: 1 });
    });
  },

};
