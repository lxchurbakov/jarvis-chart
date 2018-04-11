import bollinger from './bollinger';

/**
 * Bollinger plugin
 */
const Bollinger = (p) => {
  let distance = 5;

  p.on('indicators/register', () => {
    p.indicators.register('bollinger', {
      draw: () => { /* nope */ },
      inside: ({ context, }) => {
        const values = p.values.get();

        bollinger(p, context, { values, distance });
      },
    });

    p.indicators.push('bollinger', {})
  });

  p.on('api', (api) => ({ ...api, setBollingerDistance: (d) => distance = d }))
};

Bollinger.plugin = {
  name: 'bollinger',
  version: '1.0.0',
  dependencies: {
    'indicators': '1.0.0',
  }
};

export default Bollinger;
