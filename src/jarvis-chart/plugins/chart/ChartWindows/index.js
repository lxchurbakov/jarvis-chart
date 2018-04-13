import Matrix from 'lib/matrix';

/* Построить матрицу преобразований для окна */
const matrixForWindow = (width, height, top) => {
  return Matrix.join(
    // Matrix.translate(width / 2, height / 2), /* Делаем точку 0;0 центром окна */
    Matrix.scale(1, -1), /* Разворачиваем ось Y */
    Matrix.translate(0, top + height), /* 1. Переносим на top + height пикселей вниз */
  );
};

/* Отрисовываем окна */
const drawWindows = (p, context, { windows }) => {
  const len = windows.length;

  /* Делаем reduce чтобы сохранить top - Y верхней точки окна */
  windows.reduce((top, w, i) => {
    /* Высчитываем размеры нового окна */
    const height = w.weight * context.api.screen.height();
    const width  = context.api.screen.width();

    /* Применяем матрицу к контексту */
    context.api.matrix.push(matrixForWindow(width, height, top));
      /* Если это не последнее окно, рисуем линию, за которую можно будет таскать меняя размер */
      if (i < len - 1) {
        p.render.primitives.line(context, { x0: 0, y0: 0, x1: width, y1: 0, color: '#333', width: 1, opacity: 0.5 });
      }

      /* Клипаем по области окна */
      context.api.screen.clip(0, 0, width, height);
        p.emitSync(`chart-windows/inside`, { id: w.id, top, context });
      context.api.screen.reclip();
    /* Возвращаем всё обратно */
    context.api.matrix.pop();

    /* Передаём в следующую итерацию увеличенный top */
    return top + height;
  }, 0);
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

    drawWindows(p, context, { windows });

    return { context };
  });

  /* Проинициализируем окна когда состояние будет готово */
  p.on('state/ready', () => {
    p.emitSync('chart-windows/init');
  });

  /* Создадим Chart Windows API */

  let id = 0;

  p.chartWindows = {
    /* Получить все окна */
    all: ()   => p.state.get().chartWindows,

    /* Получить одно окно */
    get: (id) => p.state.get().chartWindows.filter((w) => w.id === id).pop(),

    /* Отмасштабировать окна правильно */
    fix: () => {
      p.state.update((state) => {
        const { chartWindows } = state;
        const sumw = chartWindows.reduce((acc, w) => acc + w.weight, 0);

        return { ...state, chartWindows: chartWindows.map((cw) => ({ ...cw, weight: cw.weight / sumw }))  };
      });
    },

    /* Создать новое окно */
    create: () => {
      const windows = p.chartWindows.all();
      const len     = windows.length;

      const weight    = 1 / (len + 1);
      const everymiss = len > 0 ? (weight / len) : 0;

      /* Позволим плагинам дополнять окна состоянием */
      const w = p.emitSync('chart-windows/create', { id: id++, weight });

      p.state.update((state) => ({ ...state, chartWindows: state.chartWindows.concat([ w ]) }));

      /* Исправляем размеры на случай превышения размера экрана */
      p.chartWindows.fix();

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
