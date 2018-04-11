import { getScreenBounds } from './helpers';

export default {

  inside: (p, context, { distance }) => {
    const { offset, count } = getScreenBounds;

    const values = p.values.get();

    const movingAverage = values.map((value, index, array) => {
      const sliceInstance = values.slice(Math.max(0, index - distance), Math.min(values.length - 1, index + distance));

      const ma = sliceInstance.reduce((acc, value) => acc + value.close, 0) / sliceInstance.length;

      const disp = sliceInstance.map(v => (v.close - ma) * (v.close - ma)).reduce((a, b) => a + b, 0) / sliceInstance.length;
      const ss = Math.sqrt(disp);

      const top = ma + ss * 2;
      const bottom = ma - ss * 2;

      // console.log({ ma, top, bottom, ss })

      return { top, bottom, ma };
    });

    movingAverage.forEach((value, index) => {
      if (index < 1) return;
      if (index < offset || index > offset + count) return;

      const prev = movingAverage[index - 1];

      /* Draw ma */
      {
        const x0 = 10 * (index - 1);
        const y0 = prev.ma;

        const x1 = 10 * (index);
        const y1 = value.ma;

        p.render.primitives.line(context, { x0, y0, x1, y1, color: '#7437e8', width: 1 });

      }

      /* Draw top */
      {
        const x0 = 10 * (index - 1);
        const y0 = prev.top;

        const x1 = 10 * (index);
        const y1 = value.top;

        p.render.primitives.line(context, { x0, y0, x1, y1, color: 'red', width: 1 });
      }



      /* Draw bottom */
      {
        const x0 = 10 * (index - 1);
        const y0 = prev.bottom;

        const x1 = 10 * (index);
        const y1 = value.bottom;

        p.render.primitives.line(context, { x0, y0, x1, y1, color: 'black', width: 1 });
      }

    });
  },

};
