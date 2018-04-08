import React from 'react';
import PropTypes from 'prop-types';

const textAlignToTextAnchor = (textAlign) => ({ 'left': 'start', 'center': 'middle', 'right': 'end' })[textAlign];

class Text extends React.Component {
  static contextTypes = {
    options: PropTypes.any,
  };

  render () {
    const { options } = this.context;
    const { engine } = options;
    const{ x, y, font = "13px arial", text, textAlign = 'center', color, matrix } = this.props;

    switch (engine) {
      case 'svg':
        return (
          <text x={x} y={y} textAnchor={textAlignToTextAnchor(textAlign)} fill={color} style={{ font, textAlign }} transform={matrix ? matrix.toCss() : null} >
            {text}
          </text>
        );
      case 'canvas':
        return null;
      default:
        throw `Circle Component is not implemented for engine ${engine}`;
    }
  }
}

Text.renderCanvas = (context, props) => {
  const { x, y, font = "13px arial", text, matrix, textAlign = 'center', color = 'black' } = props;

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
}

export default Text;
