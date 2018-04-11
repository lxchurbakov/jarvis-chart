const textAlignToTextAnchor = (textAlign) => ({ 'left': 'start', 'center': 'middle', 'right': 'end' })[textAlign];

export default (context, { x, y, font = "13px arial", text, matrix, textAlign = 'center', color = 'black', opacity = 1, crop = true }) => {
  // if (
  //   crop &&
  //   !context.matrix.crop(x, y)
  // ) return;

  switch (context.type) {
    case 'svg':
      context.push(`
        <text x='${x}' y='${y}' text-anchor='${textAlignToTextAnchor(textAlign)}' fill='${color}' style='font: ${font}' transform='${matrix ? matrix.toCss() : ''}' fill-opacity='${opacity}' >
          ${text}
        </text>
      `);

      break;
    case 'canvas':
      if (matrix) {
        const { a, b, c, d, tx, ty } = matrix.getValues();
        context.save();
        context.transform(a, b, c, d, tx, ty);
      }

      context.font = font;
      context.textAlign = textAlign;
      context.globalAlpha = opacity;
      context.fillStyle = color;
      context.fillText(text, x, y);

      if (matrix) {
        context.restore();
      }

      break;
    default:
      throw `Text is not implemented for ${context.type}`;
  }
};
