import dataset from './dataset';
import grid from './grid';

/**
 * ChartContent плагин
 *
 * Добавляется в chart-window и рисует сетку и значения (собственно сам чарт)
 *
 * Использует сокеты: chart-window/inside
 * Создаёт сокеты: нет
 * Использует API: p.render (неявно)
 * Создаёт API: нет
 *
 */
const ChartContent = (p, options) => {
  p.on('chart-window/inside', ({ context, state }) => {

    const values = p.values.get();

    dataset(p, context, { values });
    grid(p, context, { values, showIndicator: false });

    return { context, state };
  });
};

ChartContent.plugin = {
  name: 'chart-content',
  version: '1.0.0',
  dependencies: {
    'chart-values': '1.0.0',
    'chart-window': '1.0.0',
    'state': '1.0.0',
  }
};

export default ChartContent;
