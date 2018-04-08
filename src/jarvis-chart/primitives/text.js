const textAlignToTextAnchor = (textAlign) => ({ 'left': 'start', 'center': 'middle', 'right': 'end' })[textAlign];

export default ({ x, y, font = "13px arial", text, matrix, textAlign = 'center', color = 'black' }, options, context) => {
  switch (options.render) {
    case 'svg':
      context.push(`
        <text x='${x}' y='${y}' text-anchor='${textAlignToTextAnchor(textAlign)}' fill='${color}' style='font: ${font}' transform='${matrix ? matrix.toCss() : ''}' >
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
      context.fillStyle = color;
      context.fillText(text, x, y);

      if (matrix) {
        context.restore();
      }

      break;
    default:
      throw `Text is not implemented for ${options.render}`;
  }
};
