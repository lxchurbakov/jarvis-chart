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

      config.inside(context, meta);
    });

    return { id, context };
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
