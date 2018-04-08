const buildSvgContext = (node, options) => {
  const width  = node.offsetWidth;
  const height = node.offsetHeight;

  node.innerHTML = `
    <svg width='${width}' height='${height}'></svg>
  `;

  const context = node.children[0];

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

  node.innerHTML = `
    <canvas id='canvas-0' width='${width}' height='${height}'></canvas>
  `;

  const context = node.children[0].getContext('2d');

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
