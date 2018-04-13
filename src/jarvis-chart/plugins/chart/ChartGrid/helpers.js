import Matrix from 'lib/matrix';

/**
 * Построить матрицу для пространства внутри окна
 */
export const matrixForWindow = (translate, zoom, width, height) =>
  Matrix.join(
    /* Зуммируем относительно середины экрана */
    // Matrix.translate(translate.x - width / 2, 0),
    Matrix.translate(translate.x - width / 2, translate.y - height / 2),
    Matrix.scale(zoom.x, zoom.y),
    // Matrix.translate(-translate.x + width / 2, 0),
    Matrix.translate(-translate.x + width / 2, -translate.y + height / 2),

    Matrix.translate(translate.x, translate.y),
  );

/**
 * Построить матрицу для таймлайна (то же самое, что и для окна, только игнорируя перенос/зум по оси Х)
 */
export const matrixForTimeline = (translate, zoom, width, height) =>
  Matrix.join(
    /* Зуммируем относительно середины экрана, но только по X */
    Matrix.translate(translate.x - width / 2, 0),
    Matrix.scale(zoom.x, 1),
    Matrix.translate(-translate.x + width / 2, 0),

    Matrix.translate(translate.x, 0),
  );

/**
 * Построить матрицу для прайслайна (то же самое, что и для окна, только игнорируя перенос/зум по оси Y)
 */
export const matrixForPriceline = (translate, zoom, width, height) =>
  Matrix.join(
    Matrix.translate(0, translate.y - height / 2),
    Matrix.scale(1, zoom.y),
    // Matrix.translate(-translate.x + width / 2, 0),
    Matrix.translate(0, -translate.y + height / 2),

    Matrix.translate(0, translate.y),
  );

/**
 * Узнать конфигурацию сетки (видимых линий с подписями)
 */
export const getGridConfig = (context, translate, zoom, values) => {
  const width  = context.api.screen.width();
  const height = context.api.screen.height();

  const windowMatrix = matrixForWindow(translate, zoom, width, height)

  /* Найдём положение точек внутри окна */

  const [x0real, y0real] = Matrix.apply([ 0, 0 ], windowMatrix);
  const [x1real, y1real] = Matrix.apply([ 10, 10 ], windowMatrix);

  /* Priceline конфиг */
  const pricePointRealHeight = Math.abs(y1real - y0real) / 10;
  const pricePointsRealOffset = y0real;

  const visiblePricePointsCount = Math.abs(Math.ceil(height / pricePointRealHeight));
  const firstVisiblePricePointIndex = Math.floor(-pricePointsRealOffset / pricePointRealHeight);

  const pricePointsNth = Math.floor(visiblePricePointsCount / (height / 50)); /* Показываем цену каждые 50px */

  const priceline = (new Array(visiblePricePointsCount).fill(0))
    .map((v, i) => i + firstVisiblePricePointIndex)
    .map((y) => ({ y: y, text: y }))
    .filter((v, i) => (i + firstVisiblePricePointIndex) % pricePointsNth === 0);

  /* Timeline конфиг */
  const candleRealWidth = x1real - x0real;
  const candlesRealOffset = x0real;

  const visibleCandlesCount = Math.ceil(width / candleRealWidth);
  const firstVisibleCandleIndex = Math.max(0, Math.floor(-candlesRealOffset / candleRealWidth));

  const candlesNth = Math.floor(visibleCandlesCount / 10); /* Показываем только 10 линий */

  const timeline = values
    .slice(firstVisibleCandleIndex, firstVisibleCandleIndex + visibleCandlesCount + 1)
    .map(({ time }, index) => ({ x: (index + firstVisibleCandleIndex) * 10, text: time }))
    .filter((v, i) => (i + firstVisibleCandleIndex) % candlesNth === 0);

  return { priceline, timeline };
};

/**
 * Отрисовать саму сетку на заднем плане
 *
 */
export const drawGrid = (p, context, translate, zoom, config) => {
  /* Развернём конфиг */
  const { priceline, timeline } = config;

  /* Узнаем размеры экрана */
  const width = context.api.screen.width();
  const height = context.api.screen.height();

  context.api.matrix.push(matrixForPriceline(translate, zoom, width, height));
    priceline.forEach((pricepoint) => {
      const x0 = 0;
      const y0 = pricepoint.y;
      const x1 = width;
      const y1 = pricepoint.y;
      const color = '#ccc';

      p.render.primitives.line(context, { x0, y0, x1, y1, color });
    });
  context.api.matrix.pop();

  context.api.matrix.push(matrixForTimeline(translate, zoom, width, height));
      /* Отрисуем линии цены */
    timeline.forEach((timepoint) => {
      const x0 = timepoint.x;
      const y0 = 0;
      const x1 = timepoint.x;
      const y1 = height;
      const color = '#ccc';

      p.render.primitives.line(context, { x0, y0, x1, y1, color });
    });
  context.api.matrix.pop();
};

/**
 * Отрисовать таймлайн
 */
export const drawTimeline = (p, context, translate, zoom, config) => {
  /* Развернём конфиг */
  const { timeline } = config;

  /* Узнаем размеры экрана */
  const width  = context.api.screen.width();
  const height = context.api.screen.height();

  /* Отрисуем прямоугольник подложку */
  p.render.primitives.rectangle(context, { x: 0, y: 0, width: width, height: 50, color: 'white', opacity: 0.9 })
  p.render.primitives.line(context, { x0: 0, y0: 50, x1: width, y1: 50, color: '#ccc' })

  /* Отрисуем значения времени */
  context.api.matrix.push(matrixForTimeline(translate, zoom, width, height));
    timeline.forEach((timepoint) => {
      const x = timepoint.x;
      const y = 50;

      context.api.matrix.push(Matrix.translate(x, y)); /* Перенесёмся туда куда нужно выводить текст */
        context.api.matrix.push(Matrix.resetScale(context.api.matrix.get())); /* Уберём масштабирование */
          p.render.primitives.text(context, { x: 0, y: 20, text: timepoint.text, color: '#555', textAlign: 'center', font: '100 13px Open Sans' });
          p.render.primitives.circle(context, { cx: 0, cy: 0, radius: 2, color: '#15E6C1'});
        context.api.matrix.pop();
      context.api.matrix.pop();
    });
  context.api.matrix.pop();
};

/**
 * Отрисовка прайсланй
 */
export const drawPriceline = (p, context, translate, zoom, config) => {
  /* Развернём конфиг */
  const { priceline } = config;

  /* Узнаем размеры экрана */
  const width  = context.api.screen.width();
  const height = context.api.screen.height();

  const x = width - 50;
  const y = 0;

  p.render.primitives.rectangle(context, { x, y, width: 50, height: height, color: 'white', opacity: 0.9 });
  p.render.primitives.line(context, { x0: x, y0: 0, x1: x, y1: height, color: '#ccc' })

  /* Отрисуем каждое значение цены */
  context.api.matrix.push(matrixForPriceline(translate, zoom, width, height));
    priceline.forEach((pricepoint) => {
      const x = width - 50;
      const y = pricepoint.y;

      context.api.matrix.push(Matrix.translate(x, y)); /* Перенесёмся туда куда нужно выводить текст */
        context.api.matrix.push(Matrix.resetScale(context.api.matrix.get())); /* Уберём масштабирование */
          p.render.primitives.text(context, { x: 5, y: 0, text: pricepoint.text.toFixed(2), color: '#555', textAlign: 'left', font: '100 13px Open Sans'});
        context.api.matrix.pop();
      context.api.matrix.pop();
    });
  context.api.matrix.pop();
};
