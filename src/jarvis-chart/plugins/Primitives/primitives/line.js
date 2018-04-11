export default (context, { x0, y0, x1, y1, width, opacity = 1, color, matrix }) => {
  switch (context.type) {
    case 'svg':
      context.push(`
        <line x1='${x0}' y1='${y0}' x2='${x1}' y2='${y1}' style='stroke: ${color}; strokeWidth: ${width}' transform='${matrix ? matrix.toCss() : ''}' stroke-opacity='${opacity}' />
      `);

      break;
    case 'canvas':
      if (matrix) {
        const { a, b, c, d, tx, ty } = matrix.getValues();
        context.save();
        context.transform(a, b, c, d, tx, ty);
      }

      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.lineWidth = width === 1 ? 0.6 : width;
      context.globalAlpha = opacity;
      context.strokeStyle = color;

      /* Descale line */
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);

      context.stroke();

      context.restore();

      if (matrix) {
        context.restore();
      }

      break;
    default:
      throw `Line is not implemented for ${options.render}`;
  }
};
