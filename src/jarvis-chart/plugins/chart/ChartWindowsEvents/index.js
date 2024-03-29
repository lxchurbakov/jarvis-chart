import { getWindowIdThatIsTouched } from './helpers';

/**
 * ChartWindowsEvents плагин
 *
 * Плагин, обрабатывающий события для окон чарта. Пробрасывает события в окна чарта
 *
 */
const ChartWindowsEvents = (p, options) => {
  /* Переменные, хранящие ID и место начала PATH на одном окне */
  let pathWindowId = null;
  let pathWindowStart = null;

  /* Присоединяем листенеры */
  p.on('handler/attach', () => {
    /* Обрабатываем pathstart */
    p.handler.on('pathstart', ({ x, y, e }) => {
      const windows = p.chartWindows.all();

      const id = getWindowIdThatIsTouched(windows, y);

      if (id !== null) {
        const { x: windowX, y: windowY } = p.chartWindows.screenToWindow(id, x, y);

        p.handler.emit('chart-windows-events/pathstart', { x: windowX, y: windowY, e, id });

        pathWindowId = id;
        pathWindowStart = { x, y };
      }
    });

    /* Обрабатываем path */
    p.handler.on('path', ({ x, y, e }) => {
      const windows = p.chartWindows.all();

      if (pathWindowId !== null) {
        /* Если мы уже вазюкаем мышью по какому-то окну */
        const id = getWindowIdThatIsTouched(windows, y);

        if (id !== pathWindowId) {
          /* Если мы вдруг завазюкали на другое окно */
          p.handler.emit('chart-windows-events/pathend', { e, id: pathWindowId });
          pathWindowId = null;
        } else {
          const { x: windowX, y: windowY } = p.chartWindows.screenToWindow(id, x, y);

          p.handler.emit('chart-windows-events/path', { x: windowX, y: windowY, e, id });
          p.handler.emit('chart-windows-events/drag', { x: pathWindowStart.x - x, y: pathWindowStart.y - y, e, id });

          pathWindowStart = { x, y };
        }
      }
    });

    /* Обрабатываем pathend */
    p.handler.on('pathend', ({ e }) => {
      if (pathWindowId !== null) {
        /* Если мы вазюкали по окну, сообщим об окончании */
        p.handler.emit('chart-windows-events/pathend', { e, id: pathWindowId });
        pathWindowId = null;
      }
    });

    /* Пробрасываем зум, игнорим попадание на границу */
    p.handler.on('zoom', ({ delta, x, y, e }) => {
      const { chartWindows } = p.state.get();

      const id = getWindowIdThatIsTouched(chartWindows, y);

      if (id !== null) {
        const { x: windowX, y: windowY } = p.chartWindows.screenToWindow(id, x, y);

        p.handler.emit('chart-windows-events/zoom', { delta, x: windowX, y: windowY, e, id });
      }
    });

    /* Пробросим клик */
    p.handler.on('click', ({ x, y, e }) => {
      const { chartWindows } = p.state.get();

      const id = getWindowIdThatIsTouched(chartWindows, y);

      if (id !== null) {
        const { x: windowX, y: windowY } = p.chartWindows.screenToWindow(id, x, y);

        p.handler.emit('chart-windows-events/click', { x: windowX, y: windowY, e, id });
      }
    });

    /* Пробросим mousemove */
    p.handler.on('mousemove', ({ x, y, e }) => {
      const { chartWindows } = p.state.get();

      const id = getWindowIdThatIsTouched(chartWindows, y);

      if (id !== null) {
        const { x: windowX, y: windowY } = p.chartWindows.screenToWindow(id, x, y);

        p.handler.emit('chart-windows-events/mousemove', { x: windowX, y: windowY, e, id });
      }
    });
  });
};

ChartWindowsEvents.plugin = {
  name: 'chart-windows-events',
  version: '1.0.0',
  dependencies: {
    'chart-windows': '1.0.0',
    'handler': '1.0.0',
    'advanced-events': '1.0.0',
  }
};

export default ChartWindowsEvents;
