import Matrix from 'lib/matrix';

/**
 * Построить матрицу преобразований для окна
 */
const matrixForWindow = (width, height, top) =>
  Matrix.join(
    Matrix.scale(1, -1), /* Разворачиваем ось Y */
    Matrix.translate(0, top + height), /* 1. Переносим на top + height пикселей вниз */
  );

/**
 * Отрисовываем окна
 */
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
 *
 * Добавляет множественные окна для графика.
 *
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

  /* ID новоиспеченного окна */
  let id = 0;

  /* Создадим Chart Windows API */
  p.chartWindows = {
    /**
     * Получить все окна
     */
    all: ()   => p.state.get().chartWindows,
    /**
     * Получить одно окно
     */
    get: (id) => p.state.get().chartWindows.filter((w) => w.id === id).pop(),
    /**
     * Пофиксить веса окон, так, чтобы в сумме они давали 1
     */
    fix: () => {
      p.state.update((state) => {
        const { chartWindows } = state;
        const sumw = chartWindows.reduce((acc, w) => acc + w.weight, 0);

        return { ...state, chartWindows: chartWindows.map((cw) => ({ ...cw, weight: cw.weight / sumw }))  };
      });
    },
    /**
     * Создать новое окно и вернуть его ID
     */
    create: () => {
      /* Вычислим новый вес */
      const windows = p.chartWindows.all();
      const weight  = 1 / (windows.length + 1);

      /* Позволим плагинам дополнять окна состоянием */
      const w = p.emitSync('chart-windows/create', { id: id++, weight });

      /* Дополняем стейт этим новым окном */
      p.state.update((state) => ({ ...state, chartWindows: state.chartWindows.concat([ w ]) }));

      /* Исправляем размеры на случай превышения размера экрана */
      p.chartWindows.fix();

      return id - 1;
    },
    /**
     * Обновляет окно
     */
    update: (id, updater) => {
      p.state.update((state) => ({
        ...state,
        chartWindows: state.chartWindows.map(cw => cw.id === id ? updater(cw) : cw)
      }));
    },
    /**
     * TODO удаляет окно
     */
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
