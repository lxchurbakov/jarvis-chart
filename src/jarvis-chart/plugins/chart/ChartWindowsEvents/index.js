import { getWindowIdThatIsTouchedByBottomBorder, getWindowIdThatIsTouched, resizeWindowsIncreasingWindowWithId } from './helpers';

/**
 * ChartWindowsEvents плагин
 *
 * Плагин, обрабатывающий события для окон чарта. Позволяет ресайзить окна и пробрасывает события в окна чарта
 * Один из самых больших плагинов, т.к. соединяет в себе по сути два разных плагина
 *
 */
const ChartWindowsEvents = (p, options) => {

  console.todo('Нужно пробросить события click и mousemove | ChartWindowsEvents')

  /* Переменные, хранящие ID и место начала ресайза окон */
  let dragId    = null;
  let dragStart = null;

  /* Переменные, хранящие ID и место начала PATH на одном окне */
  let pathWindowId = null;
  let pathWindowStart = null;

  /* Присоединяем листенеры */
  p.on('handler/attach', () => {
    /* Обрабатываем pathstart */
    p.handler.on('pathstart', ({ x, y, e }) => {
      const windows = p.chartWindows.all();
      const yRelative = y / options.height;

      /* Высчитываем окно, нижняя граница которого находится под курсором */
      const wId = getWindowIdThatIsTouchedByBottomBorder(windows, yRelative);

      if (wId !== null) {
        /* Если такое есть */
        dragId = wId;
        dragStart = yRelative;
        /* Заодно выставим курсор таскания */
        p.cursor.set('move');
      } else {
        /* Если нет, находим окно, над которым курсор */
        const id = getWindowIdThatIsTouched(windows, yRelative);

        p.handler.emit('chart-windows-events/pathstart', { x, y, e, id });

        /* Схороняем */
        pathWindowId = id;
        pathWindowStart = { x, y };
      }
    });

    /* Обрабатываем path */
    p.handler.on('path', ({ x, y, e }) => {
      const yRelative = y / options.height;
      const windows = p.chartWindows.all();

      if (dragId !== null) {
        /* Если мы уже тащим какое-то окно за его нижнюю границу */
        const diff = dragStart - yRelative;

        /* Обновим его размеры */
        p.state.update((state) => ({
          ...state,
          chartWindows: resizeWindowsIncreasingWindowWithId(state.chartWindows, dragId, diff),
        }));
        p.chartWindows.fix();

        dragStart = yRelative;
      } else if (pathWindowId !== null) {
        /* Если мы уже вазюкаем мышью по какому-то окну */
        const id = getWindowIdThatIsTouched(windows, yRelative);

        if (id !== pathWindowId) {
          /* Если мы вдруг завазюкали на другое окно */
          p.handler.emit('chart-windows-events/pathend', { e, id: pathWindowId });
          pathWindowId = null;
        } else {
          p.handler.emit('chart-windows-events/path', { x, y, e, id });
          p.handler.emit('chart-windows-events/drag', { x: pathWindowStart.x - x, y: pathWindowStart.y - y, e, id });

          pathWindowStart = { x, y };
        }
      }
    });

    /* Обрабатываем pathend */
    p.handler.on('pathend', ({ e }) => {
      if (dragId !== null) {
        /* Если мы что-то тащили, то уберём курсор */
        p.cursor.set('auto');
        dragId = null;
      } else if (pathWindowId) {
        /* Если мы вазюкали по окну, сообщим об окончании */
        p.handler.emit('chart-windows-events/pathend', { e, id: pathWindowId });
        pathWindowId = null;
      }
    });

    /* Поменяем курсор над таскаемой линией */
    p.handler.on('mousemove', ({ x, y, e }) => {
      const { chartWindows } = p.state.get();

      const wId = getWindowIdThatIsTouchedByBottomBorder(chartWindows, y / options.height);

      if (wId !== null) {
        p.cursor.set('move');
      } else if (dragId === null) {
        p.cursor.set('auto');
      }
    });

    /* Пробрасываем зум, игнорим попадание на границу */
    p.handler.on('zoom', ({ delta, x, y, e }) => {
      const { chartWindows } = p.state.get();

      const id = getWindowIdThatIsTouched(chartWindows, y / options.height);

      if (id !== null) {
        p.handler.emit('chart-windows-events/zoom', { delta, x, y, e, id });
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
