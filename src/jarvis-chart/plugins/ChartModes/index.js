const ChartModes = (p) => {

  /* Add Chart Window parameters to state */
  p.on('state/default', (state) => {
    return { ...state, mode: p.emitSync('chart-modes/default', null) };
  });

  /* Forward handlers to special mode related events */
  p.on('handler/attach', () => {
    const emitModeEvent = (event, data) => {
      const mode = p.state.get().mode;

      p.emitSync(`chart-modes/${mode}/${event}`, data);
    };

    p.handler.on('drag', (data) => emitModeEvent('drag', data));
    p.handler.on('click', (data) => emitModeEvent('click', data));
    p.handler.on('zoom', (data) => emitModeEvent('zoom', data));
    p.handler.on('path', (data) => emitModeEvent('path', data));
    p.handler.on('pathstart', (data) => emitModeEvent('pathstart', data));
    p.handler.on('pathend', (data) => emitModeEvent('pathend', data));
  });

  p.mode = {
    set: (mode) => p.state.update((state) => ({ ...state, mode })),
    get: ()     => p.state.get().mode,
  };

  p.on('api', (api) => ({ ...api, mode: p.mode }))
};

ChartModes.plugin = {
  name: 'chart-modes',
  version: '1.0.0',
  dependencies: {
    // 'render': '1.0.0',
    'handler': '1.0.0',
    'state': '1.0.0'
  }
};

export default ChartModes;
