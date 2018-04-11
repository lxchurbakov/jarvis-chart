export default (context, { x, y, width, height, opacity = 1, color, matrix }) => {
  switch (context.type) {
    case 'svg':
      context.push(`
        <rect x='${x}' y='${y}' width='${width}' height='${height}' style='fill: ${color}' transform='${matrix ? matrix.toCss() : ''}' fill-opacity='${opacity}' />
      `);

      break;
    case 'canvas':
      if (matrix) {
        const { a, b, c, d, tx, ty } = matrix.getValues();
        context.save();
        context.transform(a, b, c, d, tx, ty);
      }

      context.beginPath();
      context.rect(x, y, width, height);
      context.globalAlpha = opacity;
      context.fillStyle = color;
      context.fill();

      if (matrix) {
        context.restore();
      }

      break;
    default:
      throw `Rectangle is not implemented for ${context.type}`;
  }
};
