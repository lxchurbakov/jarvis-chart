/* */
const Elements = (p) => {

  /* Добавляем массив элементов к состоянию */

  p.on('state/default', (state) => ({ ...state, elements: [] }));

  /* Выводим все элементы */

  p.on('chart-window/inside', ({ context }) => {

    const { elements } = p.state.get();

    elements.forEach((element) => {
      const { type, meta } = element;

      elementsHandlers[type](context, meta);
    });

    return { context };
  });

  /* Elements handlers */

  let elementsHandlers = {};

  /* Создаём API для элементов */

  p.elements = {
    register: (type, handler) => elementsHandlers[type] = handler,
    push: (type, meta) => p.state.update((state) => ({ ...state, elements: state.elements.concat([{ type, meta }])})),
  };

  p.on('mount', (data) => {
    p.emitSync('elements/register');
    return data;
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
