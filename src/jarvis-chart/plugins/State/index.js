/**
 * State Plugin
 *
 * Creates a Store for the application State
 *
 * Sockets Used: mount, api
 * Sockets Provided: 'state/default'
 * API Provided: state
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
