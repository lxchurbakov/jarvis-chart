import Matrix from 'lib/matrix';

const ChartWindowsRemove = (p, options) => {
  let hoveredId = null;

  p.on('chart-windows-layers/ui', ({ context, id }) => {
    const { top, height } = p.chartWindows.get(id);

    // p.render.primitives.rectangle(context, { x: 10, y: height - 30, width: 20, height: 20, color: 'blue', opacity: 0.2 })

    context.api.matrix.push(Matrix.translate(26, height - 27.5));
    context.api.matrix.push(Matrix.rotate(Matrix.toRad(45)));

    const opacity = hoveredId === id ? 0.5 : 0.2;

    p.render.primitives.rectangle(context, { x: 0, y: 0, width: 3, height: 20, color: '#FA2C50', opacity })
    p.render.primitives.rectangle(context, { x: -10 + 1.5, y: 10 - 1.5, width: 20, height: 3, color: '#FA2C50', opacity })
    // context.api.matrix.push(Matrix.resetScale(context.api.matrix.get()));
    // p.render.primitives.text(context, { x: 0, y: 0, text: 'Close Window', color: 'blue', font: '100 13px Open Sans', textAlign: 'left' });
    context.api.matrix.pop();
    context.api.matrix.pop();
    // context.api.matrix.pop();

    return { context, id };
  });

  p.on('handler/attach', () => {
    p.handler.on('chart-windows-events/mousemove', ({ x, y, e, id }) => {
      const { height } = p.chartWindows.get(id);
      const yFromTop = height - y;
      const clicksRemoveIcon = x >= 10 && x <= 30 && yFromTop >= 10 && yFromTop <= 30;

      if (clicksRemoveIcon) {
        // p.chartWindows.remove(id);
        // console.log('hover')
        p.cursor.set('pointer');
        hoveredId = id;
      } else {
        hoveredId = null;
        // p.cursor.set('auto');
      }
    });

    p.handler.on('chart-windows-events/click', ({ x, y, e, id }) => {
      const { height } = p.chartWindows.get(id);
      const yFromTop = height - y;
      const clicksRemoveIcon = x >= 10 && x <= 30 && yFromTop >= 10 && yFromTop <= 30;

      if (clicksRemoveIcon) {
        p.chartWindows.remove(id);
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
