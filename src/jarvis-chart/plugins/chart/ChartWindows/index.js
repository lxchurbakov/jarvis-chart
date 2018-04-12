import Matrix from 'lib/matrix';

const matrixForWindow = (width, height, top) => {
  return Matrix.join(
    Matrix.scale(width, height),
    Matrix.scale(1, -1),
    Matrix.translate(0, height),
    Matrix.translate(0, top),
  );
};

const getWindowBorderTouch = (windows, yRelative, threshold = 0.01) => {
  let top = 0;
  let result = null;

  windows.forEach((w, i) => {
    if (i < windows.length - 1)
      if (Math.abs(yRelative - (w.weight + top)) < threshold)
        result = w.id;
    top += w.weight;
  });

  return result;
};

const getWindowTouch = (windows, yRelative) => {
  let top = 0;
  let result = null;

  windows.forEach((w, i) => {
    if (i < windows.length - 1)
      if (yRelative > top && yRelative < (w.weight + top))
        result = w.id;
    top += w.weight;
  });

  return result;
};

const ChartWindows = (p, options) => {
  /* Collect default chart windows */

  p.on('state/default', (state) => ({ ...state, chartWindows: p.emitSync('chart-windows/default', [{ id: 'main', weight: 0.5 }, { id: 'not-main', weight: 0.5 }]) }));

  /* Process dragging and forward some events to chart windows */

  p.on('handler/attach', () => {
    let dragId    = null;
    let dragStart = null;

    p.handler.on('pathstart', ({ x, y, e }) => {
      const { chartWindows } = p.state.get();
      const yRelative = y / options.height;

      const wId = getWindowBorderTouch(chartWindows, yRelative);

      if (wId) {
        dragId = wId;
        dragStart = yRelative;
        p.cursor.set('move');
      }
    });

    p.handler.on('mousemove', ({ x, y, e }) => {
      const { chartWindows } = p.state.get();
      const yRelative = y / options.height;

      const wId = getWindowBorderTouch(chartWindows, yRelative);

      if (wId) {
        p.cursor.set('move');
      } else {
        if (!dragId)
          p.cursor.set('auto');
      }
    });

    p.handler.on('pathend', ({ x, y, e }) => {
      if (dragId)
        p.cursor.set('auto');
      dragId = null;
    });

    p.handler.on('path', ({ x, y, e }) => {
      if (dragId) {
        const yRelative = y / options.height;
        const diff = dragStart - yRelative;

        dragStart = yRelative;

        p.state.update((state) => ({
          ...state,
          chartWindows: state.chartWindows.map((w, i) => {
            if (w.id === dragId) {
              w.weight -= diff;
              state.chartWindows[i + 1].weight += diff;
            }
            return w;
          })
        }));
      }
    });
  });

  p.on('render/draw', ({ context }) => {
    const { chartWindows } = p.state.get();

    let top = 0;

    chartWindows.forEach((w, i) => {
      const height = w.weight * context.api.screen.height();
      const width = context.api.screen.width();
      const color = `hsla(${parseInt(w.id, 36) % 256}, 100%, 50%, 1)`;

      p.render.primitives.group(context, { matrix: matrixForWindow(width, height, top) }, () => {
        /* Draw the line we can drag */
        if (i < chartWindows.length - 1)
          p.render.primitives.line(context, { x0: 0, y0: 0, x1: 1, y1: 0, color: '#333', width: 1, opacity: 0.5 });

        p.emitSync(`chart-windows/inside`, { id: w.id, context });
      });

      top += height;
    });

    return { context };
  });

  p.chartWindows = {
    get: (id) => p.state.get().chartWindows.filter((w) => w.id === id).pop(),
  };
};

ChartWindows.plugin = {
  name: 'chart-windows',
  version: '1.0.0',
  dependencies: {
    'chart-values': '1.0.0',
    'render': '1.0.0',
    'state': '1.0.0'
  }
};

export default ChartWindows;
