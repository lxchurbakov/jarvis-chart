import Transform from '../transform';

/**
 * Svg Render Context
 */
export default (node, options) => {
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
