import Matrix from 'lib/matrix';

/**
 * ChartWindowsRemove плагин
 *
 * Добавляет крестик в каждое окно, при клике на этот крестик удаляет окно
 *
 */
const ChartWindowsRemove = (p, options) => {
  let hoveredId = null;

  p.on('chart-windows-layers/ui', ({ context, id }) => {
    const { top, height } = p.chartWindows.get(id);
    const opacity = hoveredId === id ? 0.5 : 0.2;

    context.api.matrix.push(Matrix.translate(26, height - 27.5));
    context.api.matrix.push(Matrix.rotate(Matrix.toRad(45)));
    p.render.primitives.rectangle(context, { x: 0, y: 0, width: 3, height: 20, color: '#FA2C50', opacity })
    p.render.primitives.rectangle(context, { x: -10 + 1.5, y: 10 - 1.5, width: 20, height: 3, color: '#FA2C50', opacity })
    context.api.matrix.pop();
    context.api.matrix.pop();

    return { context, id };
  });

  p.on('handler/attach', () => {
    p.handler.on('chart-windows-events/mousemove', ({ x, y, e, id }) => {
      const { height } = p.chartWindows.get(id);
      const yFromTop = height - y;
      const hoversRemoveIcon = x >= 10 && x <= 30 && yFromTop >= 10 && yFromTop <= 30;

      if (hoversRemoveIcon) {
        p.cursor.set('remove', 'pointer');
        hoveredId = id;
      } else {
        p.cursor.reset('remove');
        hoveredId = null;
      }
    });

    p.handler.on('chart-windows-events/click', ({ x, y, e, id }) => {
      const { height } = p.chartWindows.get(id);
      const yFromTop = height - y;
      const clicksRemoveIcon = x >= 10 && x <= 30 && yFromTop >= 10 && yFromTop <= 30;

      if (clicksRemoveIcon) {
        p.chartWindows.remove(id);
        p.cursor.reset('remove');
        hoveredId = null;
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
