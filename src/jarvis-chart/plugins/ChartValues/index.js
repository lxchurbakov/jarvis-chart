/**
 * ChartValues плагин
 *
 * Добавляет поле values в стейт. Values являются хранилищем для значений чарта
 * Дефолтное значение values подхватывается из опций
 *
 * Использует сокеты: state/default
 * Создаёт сокеты: нет
 * Использует API: нет
 * Создаёт API: p.values
 *
 */
const ChartValues = (p, options) => {
  p.on('state/default', (state) => ({ ...state, values: options.values }));

  p.values = {
    get: () => p.state.get().values,
    set: (values) => p.state.update(state => ({ ...state, values })),
  };
};

ChartValues.plugin = {
  name: 'chart-values',
  version: '1.0.0',
  dependencies: {
    'state': '1.0.0'
  }
};

export default ChartValues;
