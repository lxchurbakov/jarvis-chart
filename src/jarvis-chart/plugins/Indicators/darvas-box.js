import { getScreenBounds } from './helpers';

export default {

  inside: (p, context, { tl, bl }) => {
    const { offset, count } = getScreenBounds;

    const values = p.values.get();

    const topLine = values.slice();
    const bottomLine = values.slice();

    // some meta
    let parameters = { topLine: tl, bottomLine: bl };

    for (let i = values.length - 1; i >=0; --i) {
      const value = values[i];
      let { min, max } = value;

      let currentParameters = { topLine: null, bottomLine: null };

      for (let j = 0; j < (parameters.bottomLine) && i - j >= 1; j++) {
        let position = j + 1;

        max = Math.max(max, values[i - j].max);
        min = Math.min(min, values[i - j].min);

        currentParameters.topLine = position === parameters.topLine ? max : currentParameters.topLine;
        currentParameters.bottomLine = parameters.bottomLine ? min : currentParameters.bottomLine;
      }

      topLine[i] = currentParameters.topLine;
      bottomLine[i] = currentParameters.bottomLine;
    }

    topLine.forEach((value, index) => {
      if (index < 1) return;
      if (index < offset || index > offset + count) return;

      const prev = topLine[index - 1];

      const x0 = 10 * (index - 1);
      const y0 = prev;

      const x1 = 10 * (index);
      const y1 = value;

      p.render.primitives.line(context, { x0, y0, x1, y1, color: '#7437e8', width: 1 });
    });

    bottomLine.forEach((value, index) => {
      if (index < 1) return;
      if (index < offset || index > offset + count) return;

      const prev = bottomLine[index - 1];

      const x0 = 10 * (index - 1);
      const y0 = prev;

      const x1 = 10 * (index);
      const y1 = value;

      p.render.primitives.line(context, { x0, y0, x1, y1, color: 'black', width: 1 });
    });
  },

};
