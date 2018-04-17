import { getWindowIdThatIsTouchedByBottomBorder, resizeWindowsIncreasingWindowWithId } from './helpers';
import { bound } from 'lib/lodash';

/**
 * ChartWindowsDrag плагин
 *
 * Позволяет ресайзить окна ChartWindows
 *
 * TODO не учитывает left и width окна
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

      /* Высчитываем окно, нижняя граница которого находится под курсором */
      const wId = getWindowIdThatIsTouchedByBottomBorder(windows, y);

      if (wId !== null) {
        /* Схороняем */
        dragId = wId;
        dragStart = y;
        /* Заодно выставим курсор таскания */
        p.cursor.set('drag', 'move');
      }
    });

    /* Обрабатываем path */
    p.handler.on('path', ({ x, y, e }) => {
      const windows = p.chartWindows.all();

      if (dragId !== null) {
        /* Если мы уже тащим какое-то окно за его нижнюю границу */
        const diff = dragStart - y;

        const windows = p.chartWindows.all();
        const newWindows = resizeWindowsIncreasingWindowWithId(windows, dragId, diff);

        newWindows.forEach((w) => {
          p.chartWindows.update(w.id, (_w) => w);
        });

        dragStart = y;
      }
    });

    /* Обрабатываем pathend */
    p.handler.on('pathend', ({ e }) => {
      if (dragId !== null) {
        /* Если мы что-то тащили, то уберём курсор */
        p.cursor.reset('drag');
        dragId = null;
      }
    });

    /* Поменяем курсор при движении над таскаемой линией */
    p.handler.on('mousemove', ({ x, y, e }) => {
      const { chartWindows } = p.state.get();

      const wId = getWindowIdThatIsTouchedByBottomBorder(chartWindows, y);

      if (wId !== null) {
        p.cursor.set('drag', 'move');
      } else if (dragId === null) {
        p.cursor.reset('drag');
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
