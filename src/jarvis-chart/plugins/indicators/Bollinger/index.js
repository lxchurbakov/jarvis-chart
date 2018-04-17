import { Matrix } from 'lib/geometry';
import { actionOnSelection } from '../helpers';

const INDICATOR_TYPE = 'bollinger';

/**
 * Bollinger индикатор
 */
const Bollinger = (p) => {
  /* Закэшируем данные */
  let data = null;

  /* Когда будет создаваться индикатор */
  p.on('indicators/create', (indicator) => {
    const { type, id, meta } = indicator;
    const distance = 5;

    /* Если создаётся боллинджер, вычисляем его данные */
    if (type === INDICATOR_TYPE && data === null) {
      const values = p.values.get();

      data = actionOnSelection(values, distance, distance, (selection) => {
        const ma = selection.reduce((acc, value) => acc + value.close, 0) / selection.length;

        const disp = selection.map(v => (v.close - ma) * (v.close - ma)).reduce((a, b) => a + b, 0) / selection.length;
        const ss = Math.sqrt(disp);

        const top = ma + ss * 2;
        const bottom = ma - ss * 2;

        return { top, bottom, ma };
      });
    }

    return indicator;
  });

  p.on('indicators/register', () => {
    p.indicators.register(INDICATOR_TYPE, {
      inside: (context, meta, id) => {
        if (data) {
          let { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
          offset = Math.max(0, offset);
          count  = Math.max(0, offset + count) - offset;

          const dataVisible = data.slice(offset, offset + count);

          const topLine = dataVisible.map(({ top }, index) => ({ x: 10 * (index + offset), y: top }))
          const middleLine = dataVisible.map(({ ma }, index) => ({ x: 10 * (index + offset), y: ma }))
          const bottomLine = dataVisible.map(({ bottom }, index) => ({ x: 10 * (index + offset), y: bottom }))

          p.render.primitives.polyline(context, { points: topLine, color: 'red', width: 1 });
          p.render.primitives.polyline(context, { points: middleLine, color: '#7437e8', width: 1 });
          p.render.primitives.polyline(context, { points: bottomLine, color: 'black', width: 1 });
        }
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
