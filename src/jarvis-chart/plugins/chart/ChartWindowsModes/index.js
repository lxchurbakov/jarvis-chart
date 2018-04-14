/**
 * ChartModes плагин
 *
 * Добавляет "режимы работы" чарта - создаёт поле "режим" в состоянии чарта (см. State) и дублирует некоторые события с именем текущего режима
 *
 * Использует сокеты: state/default, handler/attach
 * Создаёт сокеты: chart-modes/default
 * Использует API: p.handler, p.state
 * Создаёт API: p.mode
 *
 * chart-modes/default - сокет для задания дефолтного "режима работы" чарта
 *
 */
const ChartWindowsModes = (p) => {

  /* Добавляем параметр "режим" в состояние чарта */
  p.on('state/default', (state) => {
    return { ...state, mode: p.emitSync('chart-windows-modes/default', null) };
  });

  /* Дублируем события из окон с именем режима */

  p.on('handler/attach', () => {
    const emitModeEvent = (name, data) => {
      const mode = p.chartWindowsModes.get();
      p.handler.emit(`chart-windows-modes/${mode}/${name}`, data);
    };

    ['drag', 'click', 'zoom', 'path', 'pathstart', 'pathend']
      .forEach((name) => {
        p.handler.on(`chart-windows-events/${name}`, (d) => emitModeEvent(name, d));
      })
  });

  /* Создаём API */

  p.chartWindowsModes = {
    set: (mode) => p.state.update((state) => ({ ...state, mode })),
    get: ()     => p.state.get().mode,
  };

  /* Добавляем методы во внешний API  */
  p.on('api', (api) => ({ ...api, chartWindowsModes: p.chartWindowsModes }));
};

ChartWindowsModes.plugin = {
  name: 'chart-windows-modes',
  version: '1.0.0',
  dependencies: {
    'handler': '1.0.0',
    'state': '1.0.0'
  }
};

export default ChartWindowsModes;
