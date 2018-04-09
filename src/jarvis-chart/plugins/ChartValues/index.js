const ChartValues = (p, options) => {

  /* Add Chart Window parameters to state */
  p.on('state/default', (state) => {
    return { ...state, values: options.values };
  });

  p.values = {
    get: () => p.state.get().values,
    set: (values) => p.state.update(state => {
      state.values = values;
      return state;
    })
  }
};

ChartValues.plugin = {
  name: 'chart-values',
  version: '1.0.0',
  dependencies: {
    'state': '1.0.0'
  }
};

export default ChartValues;
