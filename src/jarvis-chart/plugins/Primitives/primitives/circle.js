const toTwo = (str) => str.length === 0 ? '00' : (str.length === 1 ? '0' + str : str);

export default (context, { cx, cy, radius, color, matrix, opacity = 1, crop = true }) => {
  /* Auto Crop Element when invisible */
  /* TODO does not work, screen coords are not calculated correctly */
  // if (
  //   crop &&
  //   !context.matrix.crop(cx - radius, cy - radius) &&
  //   !context.matrix.crop(cx + radius, cy + radius)
  // ) return;

  switch (context.type) {
    case 'svg':
      context.push(`
        <circle cx='${cx}' cy='${cy}' r='${radius}' fill='${color}' transform='${matrix ? matrix.toCss() : ''}' fill-opacity='${opacity}' />
      `);

      break;
    case 'canvas':
      if (matrix) {
        context.matrix.push(matrix);
      }

      context.beginPath();
      context.arc(cx, cy, radius, 0, 2 * Math.PI);
      context.globalAlpha = opacity;
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
