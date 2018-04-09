const ViewMode = (p) => {

  /* Set default mode to view */
  p.on('chart-modes/default', (mode) => 'view');

  /* Handle drag when view mode */
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
