import Matrix from '../lib/matrix'

/**
 * Since we need to keep track of what is the current matrix, we need
 * to substitue native contexts' APIs with our custom one.
 *
 */
export default (options) => {
  let transforms = [];

  const push = (matrix) => {
    transforms.push({ matrix, acc: null, crop: null });

    options.push(matrix);
  };

  const pop = () => {
    transforms.pop();

    options.pop();
  };

  /**
   * The reason - ability to have access to currently applied matrix.
   * We need it to be able to resetScale to default when drawing text or circles
   */
  const get = () => {
    if (transforms.length === 0)
      return Matrix.identity();

    const last = transforms[transforms.length - 1];

    if (!last.acc) {
      transforms.forEach((transform, index) => {
        if (index === 0) {
          transform.acc = transform.matrix;
        } else {
          if (!transform.acc) {
            transform.acc = Matrix.multiply(transforms[index - 1].acc, transform.matrix);
          }
        }
      });
    }

    return last.acc;
  };

  /**
   * Map point to the screen coords
   */
  const screen = (point) => Matrix.apply(point, get());

  screen.dimensions = () => ({ width: options.width, height: options.height });

  /**
   * Check point for visibility
   *
   * TODO works not right
   */
  const crop = (x, y) => {
    const point = [x, y];

    const [ x1, y1 ] = screen(point);

    return crop.raw(x1, y1);
  };

  /**
   * Raw check for point in screen coords
   */
  crop.raw = (x, y) => (
    x >= 0 &&
    x <= options.width &&
    y >= 0 &&
    y <= options.height
  );

  return { push, pop, get, crop, screen };
};
