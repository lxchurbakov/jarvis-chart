/**
 * ViewMode плагин
 *
 * Добавляет режим просмотра
 *
 * Использует сокеты: chart-modes/default, chart-modes/view/drag, chart-modes/view/zoom
 * Создаёт сокеты: нет
 * Использует API: p.chartWindow
 * Создаёт API: нет
 *
 */
const ViewMode = (p) => {

  /* Пусть изначальный режим будет просмотр */

  p.on('chart-modes/default', (mode) => 'view');

  /* Обработчики */
  
  p.on('chart-modes/view/drag', ({ x, y, e }) => {
    const { x: tx, y: ty } = p.chartWindow.translate.get();
    const { x: zx, y: zy } = p.chartWindow.zoom.get();

    p.chartWindow.translate.set({
      x: tx + x / zx,
      y: ty - y / zy,
    });
  });

  p.on('chart-modes/view/zoom', ({ delta, e }) => {
    const { x: zx, y: zy } = p.chartWindow.zoom.get();

    p.chartWindow.zoom.set({
      x: zx - delta / 1000,
      y: zy - delta / 1000,
    });
  });
};

ViewMode.plugin = {
  name: 'view-mode',
  version: '1.0.0',
  dependencies: {
    'chart-window': '1.0.0',
    'chart-modes': '1.0.0',
  }
};

export default ViewMode;
