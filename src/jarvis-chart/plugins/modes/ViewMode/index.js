const bound = (value, min, max) => Math.min(max, Math.max(min, value));

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
const ViewMode = (p, options) => {
  /* Пусть изначальный режим будет просмотр */
  p.on('chart-windows-modes/default', (mode) => 'view');

  /* Обработчики */
  p.on('handler/attach', () => {
    p.handler.on('chart-windows-modes/view/drag', ({ x, y, e, id }) => {
      let { translate, zoom } = p.chartWindowsScaleTranslate.raw.xy(id);

      translate.x -= x / zoom.x;
      translate.y += y;

      p.chartWindowsScaleTranslate.set.xy(id, { translate, zoom });
    });

    p.handler.on('chart-windows-modes/view/zoom', ({ delta, x, y, e, id }) => {
      const k = delta / 1000;

      let { translate, zoom } = p.chartWindowsScaleTranslate.raw.xy(id);

      zoom.x -= k;
      zoom.y -= k;

      p.chartWindowsScaleTranslate.set.xy(id, { translate, zoom });
    });
  });
};

ViewMode.plugin = {
  name: 'view-mode',
  version: '1.0.0',
  dependencies: {
    'chart-windows': '1.0.0',
    'chart-windows-modes': '1.0.0',
  }
};

export default ViewMode;
