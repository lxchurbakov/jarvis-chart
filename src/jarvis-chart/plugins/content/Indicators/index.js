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

  p.indicators = {
    register: (type, config) => {
      indicatorsConfig[type] = config;
    },
  };

  /* Отрисовывем индикаторы */
  p.on('chart-windows-content/entry', ({ id, context }) => {
    const { indicators } = p.chartWindows.get(id);

    indicators.forEach(({ type, meta }) => {
      const config = indicatorsConfig[type];
      
      if (config.inside) {
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

  /* Создаём хук для индикаторов чтобы зарегистрироваться */
  p.on('mount', ({ node }) => {
    p.emitSync('indicators/register');
    return { node };
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
