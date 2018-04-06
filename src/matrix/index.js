/**
 * Matrix
 *
 * [ a,  b, 0]
 * [ c,  d, 0]
 * [tx, ty, 1]
 *
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

  toCss () {
    const [
      [ a,  b, _0],
      [ c,  d, _1],
      [tx, ty, _2]
    ] = this.matrix;

    return `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`;
  }
}

Matrix.identity = (x, y) => {
  const a = 1;
  const b = 0;
  const c = 0;
  const d = 1;
  const tx = 0;
  const ty = 0;

  return new Matrix(a, b, c, d, tx, ty);
};

Matrix.scale = (x, y) => {
  const a = x;
  const b = 0;
  const c = 0;
  const d = y;
  const tx = 0;
  const ty = 0;

  return new Matrix(a, b, c, d, tx, ty);
};

Matrix.translate = (x, y) => {
  const a = 1;
  const b = 0;
  const c = 0;
  const d = 1;
  const tx = x;
  const ty = y;

  return new Matrix(a, b, c, d, tx, ty);
};

Matrix.rotate = (alpha) => {
  const cos = Math.cos(alpha)
  const sin = Math.sin(alpha);

  const a = cos;
  const b = sin;
  const c = -sin;
  const d = cos;
  const tx = 0;
  const ty = 0;

  return new Matrix(a, b, c, d, tx, ty);
};

Matrix.resetScale = (matrix, x = true, y = true) => {
  const a = x ? (1 / matrix.get(0, 0)) : matrix.get(0, 0);
  const b = matrix.get(1, 0);
  const c = matrix.get(0, 1);
  const d = y ? (1 / matrix.get(1, 1)) : matrix.get(1, 1);
  const tx = matrix.get(0, 2);
  const ty = matrix.get(1, 2);

  return new Matrix(a, b, c, d, tx, ty);
};

const matrixMultiplicationStep = (A, B, x, y) =>
  A.get(x, 0) * B.get(0, y) + A.get(x, 1) * B.get(1, y) + A.get(x, 2) * B.get(2, y);

Matrix.multiply = (A, B) => {
  const a = matrixMultiplicationStep(A, B, 0, 0);
  const b = matrixMultiplicationStep(A, B, 1, 0);
  const c = matrixMultiplicationStep(A, B, 0, 1);
  const d = matrixMultiplicationStep(A, B, 1, 1);

  const tx = matrixMultiplicationStep(A, B, 0, 2);
  const ty = matrixMultiplicationStep(A, B, 1, 2);

  return new Matrix(a, b, c, d, tx, ty);
};

Matrix.apply = (A, B) => {
  const [a, b] = A;

  const areal = a * B.get(0, 0) + b * B.get(0, 1) + 1 * B.get(0, 2);
  const breal = a * B.get(1, 0) + b * B.get(1, 1) + 1 * B.get(1, 2);

  return [ areal, breal ];
};

Matrix.toRad = (alpha) => (alpha / 360) * Math.PI * 2;

export default Matrix;
