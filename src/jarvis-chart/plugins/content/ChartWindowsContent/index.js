const ChartWindowsContent = (p, options) => {
  p.on('chart-windows-layers/content', ({ context, id }) => {
    const width = context.api.screen.width();
    const height = context.api.screen.height();

    const { translate, zoom } = p.chartWindowsScaleTranslate.get(id);
    const windowMatrix = p.chartWindowsScaleTranslate.matrix.xy(id);

    context.api.matrix.push(windowMatrix);
      p.emitSync('chart-windows-content/entry', { context, id });
    context.api.matrix.pop();
  });
};

ChartWindowsContent.plugin = {
  name: 'chart-windows-content',
  version: '1.0.0',
  dependencies: {
    'chart-windows-layers': '1.0.0',
    'chart-windows-grid-config': '1.0.0',
  },
};

export default ChartWindowsContent;
