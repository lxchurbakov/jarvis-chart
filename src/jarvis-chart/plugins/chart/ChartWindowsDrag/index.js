import { getWindowIdThatIsTouchedByBottomBorder, resizeWindowsIncreasingWindowWithId, bound } from './helpers';

/**
 * ChartWindowsDrag плагин
 *
 * Позволяет ресайзить окна ChartWindows
 */
const ChartWindowsDrag = (p, options) => {

  /* Переменные, хранящие ID и место начала ресайза окон */
  let dragId    = null;
  let dragStart = null;

  /* Присоединяем листенеры */
  p.on('handler/attach', () => {
    /* Обрабатываем pathstart */
    p.handler.on('pathstart', ({ x, y, e }) => {
      const windows = p.chartWindows.all();
      const yRelative = y / options.height;

      /* Высчитываем окно, нижняя граница которого находится под курсором */
      const wId = getWindowIdThatIsTouchedByBottomBorder(windows, yRelative);

      if (wId !== null) {
        /* Схороняем */
        dragId = wId;
        dragStart = yRelative;
        /* Заодно выставим курсор таскания */
        p.cursor.set('move');
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
      }
    });

    /* Обрабатываем pathend */
    p.handler.on('pathend', ({ e }) => {
      if (dragId !== null) {
        /* Если мы что-то тащили, то уберём курсор */
        p.cursor.set('auto');
        dragId = null;
      }
    });

    /* Поменяем курсор при движении над таскаемой линией */
    p.handler.on('mousemove', ({ x, y, e }) => {
      const { chartWindows } = p.state.get();

      const wId = getWindowIdThatIsTouchedByBottomBorder(chartWindows, y / options.height);

      if (wId !== null) {
        p.cursor.set('move');
      } else if (dragId === null) {
        p.cursor.set('auto');
      }
    });
  });
};

ChartWindowsDrag.plugin = {
  name: 'chart-windows-drag',
  version: '1.0.0',
  dependencies: {
    'chart-windows': '1.0.0',
    'handler': '1.0.0',
    'advanced-events': '1.0.0',
  }
};

export default ChartWindowsDrag;
