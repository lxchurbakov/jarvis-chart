/**
 * Класс матрицы
 */
class Matrix {
  /**
   * Конструктор. Принимает шесть параметров, где
   *   a - scale по X
   *   b - поворот и искажение
   *   c - поворот и искажение
   *   d - scale по Y
   *   tx - перенос по X
   *   ty - перенос по Y
   */
  constructor (a, b, c, d, tx, ty) {
    this.matrix = [
      [ a,  b, 0],
      [ c,  d, 0],
      [tx, ty, 1],
    ];
  }
  /**
   * Получает одно из значений в матрице
   * TODO убрать
   */
  get (x, y) {
    return this.matrix[y][x];
  }
  /**
   * Получает все значения из матрицы
   */
  getValues () {
    const [
      [ a,  b, _0],
      [ c,  d, _1],
      [tx, ty, _2]
    ] = this.matrix;

    return { a, b, c, d, tx, ty };
  }
  /**
   * Генерирует CSS представление матрицы для SVG или HTML
   */
  toCss () {
    const [
      [ a,  b, _0],
      [ c,  d, _1],
      [tx, ty, _2]
    ] = this.matrix;

    return `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`;
  }
  /**
   * Находит детерминант матрицы. Уже соптимизировано чтобы не перемножать нули
   */
  determinator () {
    const [
      [ a,  b, _0],
      [ c,  d, _1],
      [tx, ty, _2]
    ] = this.matrix;

    return a * d  - c * b;
  }
  /**
   * Получить матрицу миноров из этой матрицы
   */
  minors () {
    const [
      [ a,  b, _0],
      [ c,  d, _1],
      [tx, ty, _2]
    ] = this.matrix;

    const result = Matrix.identity();

    result.matrix = [
      [  d,   c,   c * ty - d * tx],
      [  b,   a,   a * ty - b * tx],
      [  0,   0,   a *  d - c *  b]
    ];

    return result;
  }
  /**
   * Получить матрицу алгебраических дополнений из этой
   */
  additions () {
    const [
      [ a,  b, _0],
      [ c,  d, _1],
      [tx, ty, _2]
    ] = this.matrix;

    const result = Matrix.identity();

    result.matrix = [
      [ a,  -b, _0],
      [ -c,  d, -_1],
      [tx, -ty, _2]
    ];

    return result;
  }
  /**
   * Получить транспонированную матрицу из этой
   */
  transpose () {
    const [
      [ a,  b, _0],
      [ c,  d, _1],
      [tx, ty, _2]
    ] = this.matrix;

    const result = Matrix.identity();

    result.matrix = [
      [ a,  c, tx],
      [ b,  d, ty],
      [_0, _1, _2]
    ];

    return result;
  }
  /**
   * Получить обратную матрицу
   * TODO refactor вынести реализацию
   */
  reverse () {
    const k = 1 / this.determinator();

    const result = this.minors().additions().transpose();

    const [
      [ a,  b, _0],
      [ c,  d, _1],
      [tx, ty, _2]
    ] = result.matrix;

    result.matrix = [
      [ a * k,  b * k, _0 * k],
      [ c * k,  d * k, _1 * k],
      [tx * k, ty * k, _2 * k]
    ];

    return result;
  }
};

/**
 * Код постройки различных матриц
 */

/**
 * Построить единичную матрицу
 */
Matrix.identity  = (x, y) => new Matrix(1, 0, 0, 1, 0, 0);
/**
 * Построить матрицу масштабирования
 */
Matrix.scale     = (x, y) => new Matrix(x, 0, 0, y, 0, 0);
/**
 * Построить матрицу переноса
 */
Matrix.translate = (x, y) => new Matrix(1, 0, 0, 1, x, y);
/**
 * Построить матрицу поворота. Угол в радианах, если што
 */
Matrix.rotate = (alpha) => {
  const cos = Math.cos(alpha)
  const sin = Math.sin(alpha);

  return new Matrix(cos, sin, -sin, cos, 0, 0);
};

/**
 * Дополнительные методы для хитропопых преобразований
 */

/**
 * Делает матрицу, которая при умножении на matrix (первый параметр), вернёт
 * matrix, но без зума. (Да, сложно).
 *
 * Используется, например, при выводе текста, т.к. текст часто не надо масштабировать
 *
 * Пример:
 *   context.api.matrix.push( Matrix.resetScale(context.api.matrix.get()) );
 *   // Какой-то код рисования, которое должно случиться в текущем месте, но без текущего масштаба
 *   context.api.matrix.pop();
 *
 */
Matrix.resetScale = (matrix, x = true, y = true) => {
  const a = x ? (1 / matrix.get(0, 0)) : 1;
  const b = 0;
  const c = 0;
  const d = y ? (1 / matrix.get(1, 1)) : 1;
  const tx = 0;
  const ty = 0;

  return new Matrix(a, b, c, d, tx, ty);
};

/**
 * Функции умножения, сочетания и применения матриц
 */

/* Просто маленький хелпер для перемножения матриц */
const matrixMultiplicationStep = (A, B, x, y) =>
  A.get(0, y) * B.get(x, 0) +
  A.get(1, y) * B.get(x, 1) +
  A.get(2, y) * B.get(x, 2);

/**
 * Умножение двух матриц
 */
Matrix.multiply = (A, B) => {
  const a = matrixMultiplicationStep(A, B, 0, 0);
  const b = matrixMultiplicationStep(A, B, 1, 0);
  const c = matrixMultiplicationStep(A, B, 0, 1);
  const d = matrixMultiplicationStep(A, B, 1, 1);

  const tx = matrixMultiplicationStep(A, B, 0, 2);
  const ty = matrixMultiplicationStep(A, B, 1, 2);

  return new Matrix(a, b, c, d, tx, ty);
};

/**
 * Не костылями едиными...
 */
Array.prototype.reduceRight = function (predicate, defaultValue) {
  let result = defaultValue;

  for (let i = this.length - 1; i >= 0; --i)
    result = predicate(result, this[i], i, this);

  return result;
};

/**
 * Сочетаем все матрицы справа налево
 */
Matrix.join = (...matrixes) => matrixes.reduceRight((result, matrix) => Matrix.multiply(matrix, result), Matrix.identity());

/**
 * Умножаем вектор на матрицу
 */
Matrix.apply = (A, B) => {
  const [ a, b ] = A;

  const areal = a * B.get(0, 0) + b * B.get(0, 1) + 1 * B.get(0, 2);
  const breal = a * B.get(1, 0) + b * B.get(1, 1) + 1 * B.get(1, 2);

  return [ areal, breal ];
};

export default Matrix;
