import Transform from 'lib/transform';

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

  /* Предупреждения для будущих поколений */
  console.warnOnce('CLIP не работает на SVG');
  console.todo('Починить clip на SVG');

  /* Attach matrix API */
  context.api = Transform({
    width,
    height,
    matrix: {
      push: (matrix) => context.push(`<g transform='${matrix.toCss()}'>`),
      pop:  ()       => context.push('</g>'),
      replace: (matrix) => {
        context.api.matrix.push(context.api.matrix.get().reverse());
      },
    },
    screen: {
      clip: (x, y, width, height) => {
        /* CLIP не работает на SVG TODO */
      },
      reclip: () => {
        /* CLIP не работает на SVG TODO */
      },
    },
  });

  console.warn('CLIP для SVG канвы не реализован')

  context.type = 'svg';

  return context;
};
