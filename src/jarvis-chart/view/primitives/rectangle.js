export default ({ x, y, width, height, color, matrix }, options, context) => {
  switch (options.render) {
    case 'svg':
      context.push(`
        <rect x='${x}' y='${y}' width='${width}' height='${height}' style='fill: ${color}' transform='${matrix ? matrix.toCss() : ''}' />
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
      context.fillStyle = color;
      context.fill();

      if (matrix) {
        context.restore();
      }

      break;
    default:
      throw `Rectangle is not implemented for ${options.render}`;
  }
};