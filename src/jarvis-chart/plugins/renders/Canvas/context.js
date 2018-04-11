import Transform from 'lib/transform';

export default (node, options) => {
  const width  = node.offsetWidth;
  const height = node.offsetHeight;

  const canvas = document.createElement('canvas');
  const buffer = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  buffer.width = width;
  buffer.height = height;

  options.width = width;
  options.height = height;

  node.appendChild(canvas);

  const realContext = canvas.getContext('2d');
  const context = buffer.getContext('2d');
  // const context = canvas.getContext('2d');
  // const buffer  = document.createElement('canvas').getContext('2d');

  context.clear = () => {
    context.clearRect(0, 0, width, height);
    realContext.clearRect(0, 0, width, height);
  };

  // context.flush = () => { /* nope */ };
  context.flush = () => realContext.drawImage(buffer, 0, 0);

  /* Attach matrix API */

  context.api = Transform({
    matrix: {
      push: (matrix) => {
        const { a, b, c, d, tx, ty } = matrix.getValues();

        context.save();
        context.transform(a, b, c, d, tx, ty);
      },
      replace: (matrix) => {
        const { a, b, c, d, tx, ty } = matrix.getValues();

        context.save();
        context.setTransform(a, b, c, d, tx, ty);
      },
      pop: () => context.restore(),
    },
    width,
    height,
  });

  context.type = 'canvas';

  return context;
};
