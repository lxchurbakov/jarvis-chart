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
const ChartModes = (p) => {

  /* Добавляем параметр "режим" в состояние чарта */
  p.on('state/default', (state) => {
    return { ...state, mode: p.emitSync('chart-modes/default', null) };
  });

  /* Дублируем события с именем режима */
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

  /* Создаём API */
  p.mode = {
    set: (mode) => p.state.update((state) => ({ ...state, mode })),
    get: ()     => p.state.get().mode,
  };

  /* Добавляем метод во внешний API (для работы с чартом извне) */
  p.on('api', (api) => ({ ...api, mode: p.mode }))
};

ChartModes.plugin = {
  name: 'chart-modes',
  version: '1.0.0',
  dependencies: {
    'handler': '1.0.0',
    'state': '1.0.0'
  }
};

export default ChartModes;
