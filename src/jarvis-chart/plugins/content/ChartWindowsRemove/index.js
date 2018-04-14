const ChartWindowsRemove = (p, options) => {
  p.on('chart-windows-layers/ui', ({ context, id }) => {
    const { top, height } = p.chartWindows.get(id);

    p.render.primitives.rectangle(context, { x: 10, y: height - 30, width: 20, height: 20, color: 'red' })

    return { context, id };
  });

  // p.on('handler/attach', () => {
  //   p.handler.on('chart-windows-events/click', ({ x, y, e, id }) => {
  //     // const { top, height } =
  //     // console.log('click', id, x, y)
  //   });
  // });
};

ChartWindowsRemove.plugin = {
  name: 'chart-windows-remove',
  version: '1.0.0',
  dependencies: {

  },
};

export default ChartWindowsRemove;
