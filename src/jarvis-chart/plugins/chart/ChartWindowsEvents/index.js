import { getWindowBorderTouch, getWindowTouch, resizeWindows } from './helpers';


/**
 * ChartWindowsEvents плагин
 *
 * Плагин, обрабатывающий события для окон чарта. Позволяет ресайзить окна и пробрасывает события в окна чарта
 *
 */
const ChartWindowsEvents = (p, options) => {

  console.todo('Нужно пробросить события click и mousemove из ChartWindowsEvents')
  /* Переменные, хранящие ID и место начала ресайза окон */

  let dragId    = null;
  let dragStart = null;

  /* Переменные, хранящие ID и место начала PATH на одном окне */

  let pathWindowId = null;
  let pathWindowStart = null;

  p.on('handler/attach', () => {
    p.handler.on('pathstart', ({ x, y, e }) => {
      const windows = p.chartWindows.all();
      const yRelative = y / options.height;

      const wId = getWindowBorderTouch(windows, yRelative);

      if (wId !== null) {
        dragId = wId;
        dragStart = yRelative;
        p.cursor.set('move');
      } else {
        const id = getWindowTouch(windows, yRelative);
        p.handler.emit('chart-windows-events/pathstart', { x, y, e, id });
        pathWindowId = id;
        pathWindowStart = { x, y };
      }
    });

    p.handler.on('path', ({ x, y, e }) => {
      const yRelative = y / options.height;
      const windows = p.chartWindows.all();

      if (dragId !== null) {
        const diff = dragStart - yRelative;

        p.state.update((state) => ({ ...state, chartWindows: resizeWindows(state.chartWindows, dragId, diff) }));
        p.chartWindows.fix();

        dragStart = yRelative;
      } else if (pathWindowId !== null) {
        const id = getWindowTouch(windows, yRelative);

        if (id !== pathWindowId) {
          p.handler.emit('chart-windows-events/pathend', { e, id: pathWindowId });
          pathWindowId = null;
        } else {
          p.handler.emit('chart-windows-events/path', { x, y, e, id });
          p.handler.emit('chart-windows-events/drag', { x: pathWindowStart.x - x, y: pathWindowStart.y - y, e, id });
          pathWindowStart = { x, y };
        }
      }
    });

    p.handler.on('pathend', ({ e }) => {
      if (dragId !== null) {
        p.cursor.set('auto');
      } else if (pathWindowId) {
        p.handler.emit('chart-windows-events/pathend', { e, id: pathWindowId });
        pathWindowId = null;
      }
      dragId = null;
    });

    /* Поменяем курсор над таскаемой линией */

    p.handler.on('mousemove', ({ x, y, e }) => {
      const { chartWindows } = p.state.get();

      const wId = getWindowBorderTouch(chartWindows, y / options.height);

      if (wId !== null) {
        p.cursor.set('move');
      } else if (dragId === null) {
        p.cursor.set('auto');
      }
    });

    p.handler.on('zoom', ({ delta, x, y, e }) => {
      const { chartWindows } = p.state.get();

      const id = getWindowTouch(chartWindows, y / options.height);

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
