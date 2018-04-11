export default (context, { points, width, opacity = 1, color, matrix }) => {
  switch (context.type) {
    case 'canvas':
      if (matrix) {
        const { a, b, c, d, tx, ty } = matrix.getValues();
        context.save();
        context.transform(a, b, c, d, tx, ty);
      }

      context.beginPath();

      points.forEach((point, index) => {
        const { x, y } = point;

        if (index === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      });

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
      throw `Polyline is not implemented for ${context.type}`;
  }
};
