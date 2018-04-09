export default ({ cx, cy, radius, color, matrix, crop = true }, options, context) => {
  /* Auto Crop Element when invisible */
  /* TODO does not work, screen coords are not calculated correctly */
  // if (
  //   crop &&
  //   !context.matrix.crop(cx - radius, cy - radius) &&
  //   !context.matrix.crop(cx + radius, cy + radius)
  // ) return;

  switch (options.render) {
    case 'svg':
      context.push(`
        <circle cx='${cx}' cy='${cy}' r='${radius}' fill='${color}' transform='${matrix ? matrix.toCss() : ''}' />
      `);

      break;
    case 'canvas':
      if (matrix) {
        context.matrix.push(matrix);
      }

      context.beginPath();
      context.arc(cx, cy, radius, 0, 2 * Math.PI);
      context.fillStyle = color;
      context.fill();

      if (matrix) {
        context.matrix.push(matrix);
      }

      break;
    default:
      throw `Circle is not implemented for ${options.render}`;
  }
};
