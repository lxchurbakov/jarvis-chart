const drawBrush = (p, context, brush) => {
  brush.forEach((curr, index) => {
    if (index > 0) {
      const prev = brush[index - 1];
      p.render.primitives.line(context, { x0: prev.x, y0: prev.y, x1: curr.x, y1: curr.y, color: 'red' });
    }
  });
};

/**
 * Brush плагин
 *
 * Создаёт инструмент "произвольная кисть" или просто "кисть":
 *   Добавляет режим работы "brush" (см ChartModes плагин)
 *   Добавляет brush поле в состояние (см State плагин)
 *   Добавляет элемент brush (см Elements плагин)
 *   Добавляет обработчики path* события для режима brush и редактирует в них элементы/поле brush (см ChartModes плагин)
 *
 * Использует сокеты: state/default, chart-window/inside, chart-modes/brush/path*
 * Создаёт сокеты: нет
 * Использует API: p.elements, p.render
 * Создаёт API: нет
 *
 */
const Brush = (p) => {
  /* Создаём элемент кисть */
  p.elements.register('brush', (context, brush) => {
    drawBrush(p, context, brush);
  });

  /* Создаём поле brush в стейте для хранения кисти, которую мы сейчас редактируем */
  p.on('state/default', (state) => ({ ...state, brush: null }));

  /* Выводим кисть, которую мы сейчас редактируем  */
  p.on('chart-window/inside', ({ context, state }) => {
    const { brush } = state;

    if (brush) {
      drawBrush(p, context, brush);
    }

    return { context, state };
  });

  /* Обрабатываем события для режима brush */

  p.on('chart-modes/brush/pathstart', ({ x, y, e }) => {
    p.state.update((state) => {
      state.brush = [];
      return state;
    });
  });

  p.on('chart-modes/brush/pathend', ({ x, y, e }) => {
    p.elements.push('brush', p.state.get().brush);
    p.state.update((state) => {
      state.brush = null;
      return state;
    });
  });

  p.on('chart-modes/brush/path', ({ x, y, e }) => {
    const [ xreal, yreal ] = p.chartWindow.toWorld([x, y]);

    p.state.update((state) => {
      state.brush.push({ x: xreal, y: yreal });
      return state;
    });
  });
};

Brush.plugin = {
  name: 'brush',
  version: '1.0.0',
  dependencies: {
    'render': '1.0.0',
    'state': '1.0.0',
    'elements': '1.0.0',
    'chart-modes': '1.0.0',
    'chart-window': '1.0.0',
  }
};

export default Brush;
