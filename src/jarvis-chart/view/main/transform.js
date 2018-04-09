import Matrix from '../../../matrix'

/**
 * Since we need to keep track of what is the current matrix, we need
 * to substitue native contexts' APIs with our custom one.
 *
 */
export default (options) => {
  let transforms = [];

  const push = (matrix) => {
    transforms.push({ matrix, acc: null });

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

    if (last.acc)
      return last.acc;

    transforms.forEach((transform, index) => {
      if (index === 0) {
        transform.acc = transform.matrix;
      } else {
        if (!transform.acc) {
          transform.acc = Matrix.multiply(transforms[index - 1].acc, transform.matrix);
        }
      }
    });

    return last.acc;
  };

  return { push, pop, get };
};
