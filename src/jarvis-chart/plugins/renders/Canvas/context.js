import Transform from 'lib/transform';

export default (node, options) => {
  const width  = node.offsetWidth;
  const height = node.offsetHeight;

  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  options.width = width;
  options.height = height;

  node.appendChild(canvas);

  let context;

  /* Since we can support double buffering */

  if (options.doubleBuffer) {
    const buffer = document.createElement('canvas');

    buffer.width = width;
    buffer.height = height;

    const realContext = canvas.getContext('2d');
    context = buffer.getContext('2d');

    context.clear = () => {
      context.clearRect(0, 0, width, height);
      realContext.clearRect(0, 0, width, height);
    };

    context.flush = () => realContext.drawImage(buffer, 0, 0);
  } else {
    context = canvas.getContext('2d');

    context.clear = () => {
      context.clearRect(0, 0, width, height);
    };

    context.flush = () => { /* nope */ };
  }

  /* Attach Transform API */

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
    screen: {
      clip: (x, y, width, height) => {
        context.save();
        context.beginPath();
        context.rect(x, y, width, height);
        context.clip();
      },
      reclip: () => context.restore(),
    },
  });

  context.type = 'canvas';

  return context;
};
