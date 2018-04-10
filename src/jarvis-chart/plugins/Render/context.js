import Transform from './transform';

/**
 * Svg Render Context
 */
const buildSvgContext = (node, options) => {
  const width  = node.offsetWidth;
  const height = node.offsetHeight;

  const xmlns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(xmlns, "svg");

  svg.setAttributeNS(null, "width", width);
  svg.setAttributeNS(null, "height", height);

  options.width = width;
  options.height = height;

  node.appendChild(svg);

  let content;

  const element = svg;
  const context = {};

  context.clear = () => content = '';
  context.flush = () => element.innerHTML = content;

  context.push = (figure) => content += figure;

  /* Attach matrix API */
  context.matrix = Transform({
    width, height,
    push: (matrix) => context.push(`<g transform='${matrix.toCss()}'>`),
    pop:  ()       => context.push('</g>'),
  });

  context.type = 'svg';

  return context;
};

/**
 * Canvas Render Context
 */
const buildCanvasContext = (node, options) => {
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

/**
 * Facade for context
 */
const buildContext = (node, options) => {
  switch (options.render) {
    case 'svg':
      return buildSvgContext(node, options);
    case 'canvas':
      return buildCanvasContext(node, options);
    default:
      throw `Context is not implemented for ${options.render}`;
  }
};

export default buildContext;
