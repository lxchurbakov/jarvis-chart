import Matrix from 'lib/matrix';

const matrixForWindow = (width, height, top) => {
  return Matrix.join(
    // Matrix.scale(width, height),
    Matrix.scale(1, -1),
    Matrix.translate(0, height),
    Matrix.translate(0, top),
  );
};

/**
 * ChartWindows плагин
 */
const ChartWindows = (p, options) => {

  /* Дополняем состояние окнами */

  p.on('state/default', (state) => ({ ...state, chartWindows: [] }));

  /* Отрисовываем окна */

  p.on('render/draw', ({ context }) => {
    const windows = p.chartWindows.all();
    const len     = windows.length;

    let top = 0;

    windows.forEach((w, i) => {
      const height = w.weight * context.api.screen.height();
      const width  = context.api.screen.width();

      p.render.primitives.group(context, { matrix: matrixForWindow(width, height, top) }, () => {
        if (i < len - 1) {
          p.render.primitives.line(context, { x0: 0, y0: 0, x1: width, y1: 0, color: '#333', width: 1, opacity: 0.5 });
        }

        context.api.screen.clip(0, 0, width, height);
        p.emitSync(`chart-windows/inside`, { id: w.id, context });
        context.api.screen.reclip();
      });

      top += height;
    });

    return { context };
  });

  /* Проинициализируем окна */

  p.on('state/ready', () => {
    p.emitSync('chart-windows/init');
  });

  /* Chart Windows API */

  let id = 0;

  p.chartWindows = {
    all: ()   => p.state.get().chartWindows,
    get: (id) => p.state.get().chartWindows.filter((w) => w.id === id).pop(),
    create: () => {
      console.log('creat')

      const windows = p.chartWindows.all();
      const len     = windows.length;



      const weight    = 1 / (len + 1);
      const everymiss = len > 0 ? (weight / len) : 0;

      const w = p.emitSync('chart-windows/create', { id: id++, weight });

      console.log(w)

      /* Исправляем размеры на случай превышения размера экрана */

      const correctedWindows = windows.map(w => ({ ...w, weight: w.weight * (len / (len + 1)) }));

      p.state.update((state) => ({ ...state, chartWindows: correctedWindows.concat([ w ]) }));

      console.log(p)

      return id - 1;
    },
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
