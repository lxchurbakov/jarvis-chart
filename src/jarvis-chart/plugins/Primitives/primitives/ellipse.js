export default (context, { cx, cy, radiusx, radiusy, color, matrix, crop = true }) => {
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
        <ellipse cx='${cx}' cy='${cy}' rx='${radiusx}' ry='${radiusy}' fill='${color}' transform='${matrix ? matrix.toCss() : ''}' />
      `);

      break;
    case 'canvas':
      if (matrix) {
        context.matrix.push(matrix);
      }

      context.beginPath();
      context.ellipse(cx, cy, radiusx, radiusy, 0, 0, 2 * Math.PI);
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
