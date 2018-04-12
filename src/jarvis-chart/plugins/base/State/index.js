/**
 * State плагин
 *
 * Создаёт хранилище для данных чарта
 *
 * Использует сокеты: mount, api
 * Создаёт сокеты: state/default
 * Использует API: нет
 * Создаёт API: p.state
 *
 * state/default - для определения дефолтного состояния
 *
 */
const State = (p) => {
  p.on('mount', ({ node }) => {
    let state;

    p.state = {
      update: (updater) => {
        state = updater(state);
        p.emitSync('state/update', state);
        p.render.draw(state);
      },
      get: () => state,
    };

    state = p.emitSync('state/default', {});

    /* Для инициализации значений за стейтом */

    p.emitSync('state/ready');

    p.render.draw(state);

    return { node };
  });

  p.on('api', (api) => ({ ...api, state: p.state }));
};

State.plugin = {
  name: 'state',
  version: '1.0.0',
  dependencies: {
    'render': '1.0.0'
  }
};

export default State;
