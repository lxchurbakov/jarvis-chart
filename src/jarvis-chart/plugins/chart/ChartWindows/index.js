import Matrix from 'lib/matrix';
// import calcMatrix from './calc-matrix';

const matrixForWindow = (width, height, top) => {
  return Matrix.join(
    Matrix.scale(width, height),
    Matrix.scale(1, -1),
    Matrix.translate(0, height),
    Matrix.translate(0, top),
  );
};

const ChartWindows = (p, options) => {
  p.on('state/default', (state) => {
    const defaultChartWindows = {
      position: {
        translateX: 0,
        zoomX: 1,
      },
      windows: [
        {
          id: 'main',
          indicators: [],
          elements: [],
          weight: 0.6,
          translateY: 0,
          zoomY: 1,
          autoZoom: false,
        },
        {
          id: 'second',
          indicators: [],
          elements: [],
          weight: 0.1,
          translateY: 0,
          zoomY: 1,
          autoZoom: false,
        },
        {
          id: 'third',
          indicators: [],
          elements: [],
          weight: 0.3,
          translateY: 0,
          zoomY: 1,
          autoZoom: false,
        },
      ],
    };

    return {
      ...state,
      chartWindows: defaultChartWindows
    };
  });



  p.on('handler/attach', () => {
    let dragId = null;
    let dragStart = null;

    // p.handler.on('click', ({ x, y, e }) => {
    //   console.log('click')
    // });

    p.handler.on('pathstart', ({ x, y, e }) => {
      const topRelative = y / options.height;

      const { chartWindows } = p.state.get();
      const { windows } = chartWindows;

      let top = 0;

      windows.forEach((w, i) => {
        if (i < windows.length - 1)
          if (Math.abs(topRelative -( w.weight + top)) < 0.01) {
            dragId = w.id;
            dragStart = topRelative;
          }

        top += w.weight;
      });
    });

    p.handler.on('pathend', ({ x, y, e }) => {
      dragId = null;
    });

    p.handler.on('path', ({ x, y, e }) => {
      if (dragId) {
        const topRelative = y / options.height;
        const diff = dragStart - topRelative;
        dragStart = topRelative;
        p.state.update((state) => ({
          ...state,
          chartWindows: {
            ...state.chartWindows,
            windows: state.chartWindows.windows.map((w, i) => {
              if (w.id === dragId) {
                w.weight -= diff;
                // if (i)
                state.chartWindows.windows[i + 1].weight += diff;
              }
              return w;
            })
          }
        }));
      }
    });
  });

  p.on('render/draw', ({ context }) => {
    const { chartWindows } = p.state.get();
    const { windows } = chartWindows;

    let top = 0;

    windows.forEach((w, i) => {
      const height = w.weight * context.api.screen.height();
      const width = context.api.screen.width();
      const color = `hsla(${parseInt(w.id, 36) % 256}, 100%, 50%, 1)`;

      p.render.primitives.group(context, { matrix: matrixForWindow(width, height, top) }, () => {
        context.api.matrix.replace(Matrix.identity());
        p.render.primitives.text(context, { x: width - 5, textAlign: 'right', y: top + 13 + 5, font: '300 13px Open Sans', text: `Window #${w.id} (${(100 * w.weight).toFixed(2)}%)`, opacity: 0.8 });
        context.api.matrix.pop();

        p.render.primitives.rectangle(context, { x: 0, y: 0, width: 1, height: 1, color, opacity: 0.2 });

        if (i === 0)
          p.render.primitives.line(context, { x0: 0, y0: 1, x1: 1, y1: 1, color: 'black', width: 2 });

        p.render.primitives.line(context, { x0: 0, y0: 0, x1: 1, y1: 0, color: 'black', width: 1 });

        p.emitSync(`chart-windows/${w.id}/inside`, { context });
      });

      top += height;
    });

    return { context };
  });
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
