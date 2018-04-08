const buildSvgContext = (node, options) => {
  const width  = node.offsetWidth;
  const height = node.offsetHeight;

  const xmlns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(xmlns, "svg");

  svg.setAttributeNS(null, "width", width);
  svg.setAttributeNS(null, "height", height);

  node.appendChild(svg);

  const context = svg;

  let content;

  return {
    clear: () => content = '',
    flush: () => context.innerHTML = content,

    push: (figure) => content += figure,
  };
};

const buildCanvasContext = (node, options) => {
  const width  = node.offsetWidth;
  const height = node.offsetHeight;

  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  node.appendChild(canvas);

  const context = canvas.getContext('2d');

  context.clear = () => context.clearRect(0, 0, width, height);
  context.flush = () => { /* nope */ };

  return context;
};

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
