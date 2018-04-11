import Transform from '../transform';

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
  context.flush = () => { /* nope */ };
  context.flush = () => realContext.drawImage(buffer, 0, 0);

  /* Attach matrix API */
  context.matrix = Transform({
    width, height,
    push: (matrix) => {
      const { a, b, c, d, tx, ty } = matrix.getValues();

      context.save();
      context.transform(a, b, c, d, tx, ty);
    },
    pop: () => context.restore(),
  });

  context.type = 'canvas';

  return context;
};
