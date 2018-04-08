/**
 * Matrix
 *
 * [ a,  b, 0]
 * [ c,  d, 0]
 * [tx, ty, 1]
 *
 */
class Matrix {
  constructor (a, b, c, d, tx, ty) {
    this.matrix = [
      [ a,  b, 0],
      [ c,  d, 0],
      [tx, ty, 1],
    ];
  }

  get (x, y) {
    return this.matrix[y][x];
  }

  getValues () {
    const [
      [ a,  b, _0],
      [ c,  d, _1],
      [tx, ty, _2]
    ] = this.matrix;

    return { a, b, c, d, tx, ty };
  }

  toCss () {
    const [
      [ a,  b, _0],
      [ c,  d, _1],
      [tx, ty, _2]
    ] = this.matrix;

    return `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`;
  }
}

Matrix.identity  = (x, y) => new Matrix(1, 0, 0, 1, 0, 0);

Matrix.scale     = (x, y) => new Matrix(x, 0, 0, y, 0, 0);
Matrix.translate = (x, y) => new Matrix(1, 0, 0, 1, x, y);

Matrix.rotate = (alpha) => {
  const cos = Math.cos(alpha)
  const sin = Math.sin(alpha);

  return new Matrix(cos, sin, -sin, cos, 0, 0);
};

Matrix.resetScale = (matrix, x = true, y = true) => {
  const a = x ? (1 / matrix.get(0, 0)) : 1;
  const b = 0;
  const c = 0;
  const d = y ? (1 / matrix.get(1, 1)) : 1;
  const tx = 0;
  const ty = 0;

  return new Matrix(a, b, c, d, tx, ty);
};

Matrix.dropScale = (matrix, x = true, y = true) => {
  let { a, b, c, d, tx, ty } = matrix.getValues();

  a = 1;
  d = 1;

  return new Matrix(a, b, c, d, tx, ty);
};

Matrix.resetTranslate = (matrix, x = true, y = true) =>
  Matrix.translate(x ? -matrix.get(0, 2) : 0, y ? -matrix.get(1, 2) : 0)

const matrixMultiplicationStep = (A, B, x, y) =>
  A.get(0, y) * B.get(x, 0) + A.get(1, y) * B.get(x, 1) + A.get(2, y) * B.get(x, 2);

Matrix.multiply = (A, B) => {
  const a = matrixMultiplicationStep(A, B, 0, 0);
  const b = matrixMultiplicationStep(A, B, 1, 0);
  const c = matrixMultiplicationStep(A, B, 0, 1);
  const d = matrixMultiplicationStep(A, B, 1, 1);

  const tx = matrixMultiplicationStep(A, B, 0, 2);
  const ty = matrixMultiplicationStep(A, B, 1, 2);

  return new Matrix(a, b, c, d, tx, ty);
};

Array.prototype.reduceRight = function (predicate, defaultValue) {
  let result = defaultValue;

  for (let i = this.length - 1; i >= 0; --i) {
    result = predicate(result, this[i], i, this);
  }

  return result;
};

Matrix.join = (...matrixes) => matrixes.reduceRight((result, matrix) => Matrix.multiply(matrix, result), Matrix.identity());

Matrix.apply = (A, B) => {
  const [a, b] = A;

  const areal = a * B.get(0, 0) + b * B.get(0, 1) + 1 * B.get(0, 2);
  const breal = a * B.get(1, 0) + b * B.get(1, 1) + 1 * B.get(1, 2);

  return [ areal, breal ];
};

Matrix.transformRight = (B) => (A) => Matrix.multiply(A, B);
Matrix.transformLeft  = (A) => (B) => Matrix.multiply(A, B);

Matrix.toRad = (alpha) => (alpha / 360) * Math.PI * 2;

export default Matrix;
