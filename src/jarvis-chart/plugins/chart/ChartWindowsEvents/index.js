import { getWindowBorderTouch, bound } from './helpers';

/**
 * ChartWindowsEvents плагин
 */
const ChartWindowsEvents = (p, options) => {

  /* Обрабатываем события ресайза окон */

  let dragId    = null;
  let dragStart = null;

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
        p.handler.emit('chart-windows-events/pathstart', { x, y, e });
      }
    });

    p.handler.on('pathend', ({ e }) => {
      if (dragId !== null)
        p.cursor.set('auto');
      else
        p.handler.emit('chart-windows-events/pathend', { e });
      dragId = null;
    });

    p.handler.on('path', ({ x, y, e }) => {
      if (dragId !== null) {
        const yRelative = y / options.height;
        const diff = dragStart - yRelative;

        dragStart = yRelative;

        p.state.update((state) => {
          const { chartWindows } = state;

          /* Изменяем размеры окна, которое ресайзится */
          chartWindows.forEach((w, i) => {
            if (w.id === dragId) {
              w.weight = bound(w.weight - diff, 0, 1);
              state.chartWindows[i + 1].weight = bound(state.chartWindows[i + 1].weight + diff, 0, 1);
            }
          });

          /* Исправляем размеры чтобы не выходить за пределы экрана */

          const sumw = chartWindows.reduce((acc, w) => acc + w.weight, 0);
          chartWindows.forEach(w => w.weight /= sumw);

          return { ...state, chartWindows: chartWindows.slice() };
        });
      } else {
        p.handler.emit('chart-windows-events/path', { x, y, e });
      }
    });

    /* Поменяем курсор над таскаемой линией */

    p.handler.on('mousemove', ({ x, y, e }) => {
      const { chartWindows } = p.state.get();
      const yRelative = y / options.height;

      const wId = getWindowBorderTouch(chartWindows, yRelative);

      if (wId !== null) {
        p.cursor.set('move');
      } else {
        if (dragId === null)
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
