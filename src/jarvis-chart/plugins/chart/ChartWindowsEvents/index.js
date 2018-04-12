import { getWindowBorderTouch, getWindowTouch, resizeWindows } from './helpers';

/**
 * ChartWindowsEvents плагин
 */
const ChartWindowsEvents = (p, options) => {

  /* Обрабатываем события ресайза окон */

  let dragId    = null;
  let dragStart = null;

  let pathWindowId = null;

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
          p.handler.emit('chart-windows-events/pathend', { e });
          pathWindowId = null;
        } else {
          p.handler.emit('chart-windows-events/path', { x, y, e, id });
        }
      }
    });

    p.handler.on('pathend', ({ e }) => {
      if (dragId !== null) {
        p.cursor.set('auto');
      } else if (pathWindowId) {
        p.handler.emit('chart-windows-events/pathend', { e });
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
