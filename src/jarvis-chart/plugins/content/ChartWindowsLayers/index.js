/**
 * ChartLayers плагин
 *
 * Разбивает содержимое окна на три слоя и отрисовывает окно послойно
 */
const ChartWindowsLayers = (p, options) => {
  p.on('chart-windows/inside', ({ context, id }) => {
    p.emitSync('chart-windows-layers/background', { context, id });
    p.emitSync('chart-windows-layers/content', { context, id });
    p.emitSync('chart-windows-layers/ui', { context, id });

    return { context, id };
  });
};

ChartWindowsLayers.plugin = {
  name: 'chart-windows-layers',
  version: '1.0.0',
  dependencies: {
    'chart-windows': '1.0.0'
  }
};

export default ChartWindowsLayers;
