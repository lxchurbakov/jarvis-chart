import { getScreenBounds } from './helpers';

export default {

  inside: (p, context, { distance }) => {
    // console.log('shit')
    const { offset, count } = getScreenBounds;

    const values = p.values.get();

    const lowestLow = values.map((value, index, array) => {
      const sliceInstance = values.slice(Math.max(0, index - distance), index + 1);

      return sliceInstance.reduce((acc, value) => Math.min(acc, value.min), Infinity);
    });

    lowestLow.forEach((value, index) => {
      if (index < 1) return;
      if (index < offset || index > offset + count) return;

      const prev = lowestLow[index - 1];

      const x0 = 10 * (index - 1);
      const y0 = prev;

      const x1 = 10 * (index);
      const y1 = value;

      p.render.primitives.line(context, { x0, y0, x1, y1, color: '#7437e8', width: 1 });
    });
  },

};
