export default ({ cx, cy, radius, color, matrix }, options, context) => {
  switch (options.render) {
    case 'svg':
      context.push(`
        <circle cx='${cx}' cy='${cy}' r='${radius}' fill='${color}' matrix='${matrix ? matrix.toCss() : ''}' />
      `);

      break;
    case 'canvas':
      if (matrix) {
        const { a, b, c, d, tx, ty } = matrix.getValues();
        context.save();
        context.transform(a, b, c, d, tx, ty);
      }

      context.beginPath();
      context.arc(cx, cy, radius, 0, 2 * Math.PI);
      context.fillStyle = color;
      context.fill();

      if (matrix) {
        context.restore();
      }

      break;
    default:
      throw `Circle is not implemented for ${options.render}`;
  }
};
