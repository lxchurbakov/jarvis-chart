import ma from './ma';
import rsi from './rsi';
import bollinger from './bollinger';
import darvasBox from './darvas-box';
import highestHigh from './highest-high';
import lowestLow from './lowest-low';
import stochastic from './stochastic';
import cci from './cci';


/**
 * Indicators плагин
 *
 * Внимание! Эта версия - демонстрационное решение, здесь поддерживается только 1 индиктор из ограниченного набора
 *
 */
const Indicators = (p) => {

  let indicatorConfigs = {};

  p.indicators = {
    register: (type, config) => indicatorConfigs[type] = config,
    set: (type, meta) => p.state.update((state) => ({ ...state, indicator: { type, meta }})),
  };

  p.on('state/default', (state) => ({ ...state, indicator: null }));

  p.on('render/draw', ({ context }) => {
    const { indicator } = p.state.get();

    if (indicator) {
      const { type, meta } = indicator;

      if (indicatorConfigs[type])
        if (indicatorConfigs[type].draw)
          indicatorConfigs[type].draw(p, context, meta);
    }

    return { context };
  });

  p.on('chart-window/inside', ({ context }) => {
    const { indicator } = p.state.get();

    if (indicator) {
      const { type, meta } = indicator;

      if (indicatorConfigs[type])
        if (indicatorConfigs[type].inside)
          indicatorConfigs[type].inside(p, context, meta);
    }

    return { context };
  });

  p.on('mount', (data) => {

    p.indicators.register('ma', ma);
    p.indicators.register('darvas-box', darvasBox);
    p.indicators.register('highest-high', highestHigh);
    p.indicators.register('lowest-low', lowestLow);
    p.indicators.register('stochastic', stochastic);
    p.indicators.register('bollinger', bollinger);
    p.indicators.register('rsi', rsi);
    p.indicators.register('cci', cci);

    return data;
  });

  p.on('api', (api) => ({ ...api, indicators: p.indicators }))
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
