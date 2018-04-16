import darvasBox from './darvas-box';

const INDICATOR_TYPE = 'darvas-box';

/**
 * DarvasBox индикатор
 */
const DarvasBox = (p, options) => {
  /* Кэшируем данные */
  let data = null;

  /* В момент создания индикатора */
  p.on('indicators/create', (indicator) => {
    const { id, type, meta } = indicator;

    if (type === INDICATOR_TYPE && data === null) {
      /* Вычисляем данные */
      const tl = 5;
      const bl = 5;

      const values = p.values.get();

      data = darvasBox(values, tl, bl);
    }

    return indicator;
  });

  p.on('indicators/register', () => {
    p.indicators.register(INDICATOR_TYPE, {
      inside: (context, meta, id) => {
        if (data !== null) {
          let { offset, count } = p.chartWindowsCrop.horizontal(id, 0, 10);
          offset = Math.max(0, offset);
          count  = Math.max(0, offset + count) - offset;

          const topPoints = data.top.slice(offset, offset + count + 1).map((value, index) => ({ x: 10 * (index + offset), y: value }));
          const bottomPoints = data.bottom.slice(offset, offset + count + 1).map((value, index) => ({ x: 10 * (index + offset), y: value }));

          p.render.primitives.polyline(context, { points: topPoints, color: '#7437e8', width: 1 });
          p.render.primitives.polyline(context, { points: bottomPoints, color: 'black', width: 1 });
        }
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
