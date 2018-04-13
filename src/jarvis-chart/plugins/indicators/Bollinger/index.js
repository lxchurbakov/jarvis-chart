import Matrix from 'lib/matrix';

import { actionOnSelection } from '../helpers';

/**
 * Bollinger индикатор
 */
const Bollinger = (p) => {
  p.on('indicators/register', () => {
    p.indicators.register('bollinger', {
      inside: (context, meta, id) => {
        let { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
        offset = Math.max(0, offset);
        count  = Math.max(0, offset + count) - offset;
        
        const values = p.values.get();
        const { distance } = meta;


        const bollinger = actionOnSelection(values, distance, distance, (selection) => {
          const ma = selection.reduce((acc, value) => acc + value.close, 0) / selection.length;

          const disp = selection.map(v => (v.close - ma) * (v.close - ma)).reduce((a, b) => a + b, 0) / selection.length;
          const ss = Math.sqrt(disp);

          const top = ma + ss * 2;
          const bottom = ma - ss * 2;

          return { top, bottom, ma };
        });

        const bollingerVisible = bollinger.slice(offset, offset + count);

        const topLine = bollingerVisible.map(({ top }, index) => ({ x: 10 * (index + offset), y: top }))
        const middleLine = bollingerVisible.map(({ ma }, index) => ({ x: 10 * (index + offset), y: ma }))
        const bottomLine = bollingerVisible.map(({ bottom }, index) => ({ x: 10 * (index + offset), y: bottom }))

        p.render.primitives.polyline(context, { points: topLine, color: 'red', width: 1 });
        p.render.primitives.polyline(context, { points: middleLine, color: '#7437e8', width: 1 });
        p.render.primitives.polyline(context, { points: bottomLine, color: 'black', width: 1 });
      },
    });
  });
};

Bollinger.plugin = {
  name: 'bollinger',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
    'render': '1.0.0',
  }
};

export default Bollinger;
