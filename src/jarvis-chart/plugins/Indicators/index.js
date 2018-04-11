/**
 * Indicators плагин
 *
 */
const Indicators = (p) => {

  p.on('state/default', (state) => ({ ...state, indicators: [] }));

  p.on('render/draw', ({ context }) => {
    p.state.get().indicators.forEach(indicator => {
      const { type, meta } = indicator;

      indicatorConfigs[type].draw({ context });
    });

    return { context };
  });

  p.on('chart-window/inside', ({ context }) => {
    p.state.get().indicators.forEach(indicator => {
      const { type, meta } = indicator;

      indicatorConfigs[type].inside({ context });
    });

    return { context };
  });

  let indicatorConfigs = {};

  /* Indicators API */
  p.indicators = {
    register: (type, config) => {
      indicatorConfigs[type] = config;
    },
    push: (type, meta) => {
      console.log('push', p)
      p.state.update((state) => ({
        ...state,
        indicators: state.indicators.concat([{ type, meta }])
      }));
    },
  };

  p.on('mount', (data) => {
    p.emitSync('indicators/register');
    return data;
  });
};

Indicators.plugin = {
  name: 'indicators',
  version: '1.0.0',
  dependencies: {
    'chart-window': '1.0.0',
    'state': '1.0.0',
    'render': '1.0.0',
  }
};

export default Indicators;
