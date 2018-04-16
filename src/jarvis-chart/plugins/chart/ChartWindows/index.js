import Matrix from 'lib/matrix';

/**
 * Построить матрицу преобразований для окна
 */
const matrixForWindow = (top, left, width, height) =>
  Matrix.join(
    Matrix.scale(1, -1), /* Разворачиваем ось Y */
    Matrix.translate(left, top + height), /* 1. Переносим на top + height пикселей вниз */
  );

/**
 * Отрисовываем окна
 */
const drawWindows = (p, context, { windows }) => {
  const len = windows.length;

  windows.forEach((w, i) => {
    const { top, left, width, height } = w;

    context.api.matrix.push(matrixForWindow(top, left, width, height));
      /* Рисуем нижнюю границу окна */
      if (i < len - 1) {
        p.render.primitives.line(context, { x0: 0, y0: 0, x1: width, y1: 0, color: '#333', width: 1, opacity: 0.5 });
      }

      /* Клипаем по области окна */
      context.api.screen.clip(0, 0, width, height);
        p.emitSync(`chart-windows/inside`, { id: w.id, top, context });
      context.api.screen.reclip();
    context.api.matrix.pop();
  });
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
     *
     */
    matrix: (id) => {
      const { top, left, width, height } = p.chartWindows.get(id);

      return matrixForWindow(top, left, width, height);
    },
    /**
     * Создать новое окно и вернуть его ID
     */
    create: () => {
      /* Вычислим новый вес */
      const windows = p.chartWindows.all();
      const weight  = 1 / (windows.length + 1);

      const newWindow = {
        id: id++,
        top: options.height * (1 - weight),
        left: 0,
        width: options.width,
        height: options.height * weight
      };

      /* Позволим плагинам дополнять окна состоянием */
      const w = p.emitSync('chart-windows/create', newWindow);

      /* Дополняем стейт этим новым окном */
      p.state.update((state) => ({
        ...state,
        chartWindows: state.chartWindows
          .map((w) => ({
            ...w,
            height: w.height * (1 - weight),
            top: w.top * (1 - weight),
          }))
          .concat([ w ])
      }));

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
     * Удаляет окно
     */
    remove: (id) => {
      const { height } = p.chartWindows.get(id);
      const weight = height / options.height;
      const k = 1 / (1 - weight);

      let top = 0;

      p.state.update((state) => ({
        ...state,
        chartWindows: state.chartWindows
          .filter((w) => w.id !== id)
          .map((w) => {
            const newHeight = w.height * k;
            const newTop = top;

            top += newHeight;

            return {
              ...w,
              height: newHeight,
              top: newTop,
            };
          })
      }));
    },
    /**
     * Переводит экранные координаты в "экранные координаты окна"
     */
    screenToWindow: (id, x, y) => {
      const { top, left, width, height } = p.chartWindows.get(id);

      return {
        x: x - left,
        y: height - (y - top)
      };
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
