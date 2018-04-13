const DarvasBox = (p, options) => {
  p.on('indicators/register', () => {
    p.indicators.register('darvas-box', {
      inside: (context, { tl, bl }, id) => {
        let { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        offset = Math.max(0, offset);
        count  = Math.max(0, offset + count) - offset;

        const values = p.values.get();

        const topLine = values.slice();
        const bottomLine = values.slice();

        let parameters = { topLine: tl, bottomLine: bl };

        /* Sorry I just copy pasted it from modulus */

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

        const topPoints = topLine.slice(offset, offset + count + 1).map((value, index) => ({ x: 10 * (index + offset), y: value }));
        const bottomPoints = bottomLine.slice(offset, offset + count + 1).map((value, index) => ({ x: 10 * (index + offset), y: value }));

        p.render.primitives.polyline(context, { points: topPoints, color: '#7437e8', width: 1 });
        p.render.primitives.polyline(context, { points: bottomPoints, color: 'black', width: 1 });
      },
    });
  });
};

DarvasBox.plugin = {
  name: 'darvas-box',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
  },
};

export default DarvasBox;
