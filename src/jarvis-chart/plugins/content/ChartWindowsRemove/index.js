const ChartWindowsRemove = (p, options) => {
  p.on('chart-windows-layers/ui', ({ context, id }) => {
    const { top, height } = p.chartWindows.get(id);

    p.render.primitives.rectangle(context, { x: 10, y: height - 30, width: 20, height: 20, color: 'red' })

    return { context, id };
  });

  p.on('handler/attach', () => {
    p.handler.on('chart-windows-events/click', ({ x, y, e, id }) => {
      const { height } = p.chartWindows.get(id);
      const yFromTop = height - y;
      const clicksRemoveIcon = x >= 10 && x <= 30 && yFromTop >= 10 && yFromTop <= 30;

      if (clicksRemoveIcon) {
        p.chartWindows.remove(id);
        // console.log('remove', id)
      }
    });
  });
};

ChartWindowsRemove.plugin = {
  name: 'chart-windows-remove',
  version: '1.0.0',
  dependencies: {

  },
};

export default ChartWindowsRemove;
