/* */
const Elements = (p) => {
  /* Elements handlers */
  let elementsHandlers = {};

  /* Elements API */
  p.elements = {
    register: (type, handler) => elementsHandlers[type] = handler,
    push: (type, meta) => p.state.update((state) => {
      state.elements.push({ type, meta });
      return state;
    })
  };

  /* Add elements array to the state */
  p.on('state/default', (state) => ({ ...state, elements: [] }));

  /* Render all elements from the state inside the chart window */
  p.on('chart-window/inside', ({ context, state }) => {

    const { elements } = state;

    elements.forEach((element) => {
      const { type, meta } = element;

      elementsHandlers[type](context, meta);
    });

    return { context, state };
  });
};

Elements.plugin = {
  name: 'elements',
  version: '1.0.0',
  dependencies: {
    'state': '1.0.0',
    'chart-window': '1.0.0'
  }
};

export default Elements;
