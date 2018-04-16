/**
 * Indicators плагин
 *
 * Добавляет поддержку индикаторов
 */
const Indicators = (p) => {

  /* Добавляем в каждое новое окно поле индикаторов */
  p.on('chart-windows/create', (w) => ({ ...w, indicators: [] }));

  /* Indicators API */
  let indicatorsConfig = {};
  let indicatorId = 0;

  p.indicators = {
    register: (type, config) => {
      indicatorsConfig[type] = config;
    },
    push: (id, type, meta) => {
      indicatorId++;
      p.chartWindows.update(id, (w) => ({
        ...w,
        indicators: w.indicators.concat([{ type, meta, indicatorId }]),
      }));

      return indicatorId;
    },
    remove: (id, indicatorId) => {
      p.chartWindows.update(id, (w) => ({
        ...w,
        indicators: w.indicators.filter(i => i.indicatorId !== indicatorId),
      }));
    },
  };

  /* Отрисовывем индикаторы */
  p.on('chart-windows-content/entry', ({ id, context }) => {
    const { indicators } = p.chartWindows.get(id);

    indicators.forEach(({ type, meta }) => {
      const config = indicatorsConfig[type];

      if (config && config.inside) {
        config.inside(context, meta, id);
      } else {
        console.warnOnce(`Индикатор ${type} не имеет метода вывода`)
      }
    });

    return { id, context };
  });

  /* Найдём границы индикаторов */
  p.on('chart-windows-scale-translate/autozoom', ({ id, min, max }) => {
    const { indicators } = p.chartWindows.get(id);

    indicators.forEach(({ type, meta }) => {
      const config = indicatorsConfig[type];

      if (config.bounds) {
        const { min: n, max: x } = config.bounds(meta, id);

        min = min !== null ? Math.min(min, n) : n;
        max = max !== null ? Math.max(max, x) : x;
      }
    });

    return { id, min, max };
  });

  p.on('state/ready', () => {
    p.emitSync('indicators/register');
  });
};

Indicators.plugin = {
  name: 'indicators',
  version: '1.0.0',
  dependencies: {
    'chart-windows': '1.0.0',
  }
};

export default Indicators;
