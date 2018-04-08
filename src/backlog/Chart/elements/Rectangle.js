import React from 'react';
import PropTypes from 'prop-types';

class Rectangle extends React.Component {
  static contextTypes = {
    options: PropTypes.any,
  };

  render () {
    const { options } = this.context;
    const { engine } = options;
    const{ x, y, width, height, color, matrix } = this.props;

    switch (engine) {
      case 'svg':
        return <rect x={x} y={y} width={width} height={height} style={{ fill: color }} transform={matrix ? matrix.toCss() : null} />
        return <circle cx={cx} cy={cy} r={radius} fill={color} />;
      case 'canvas':
        return null;
      default:
        throw `Circle Component is not implemented for engine ${engine}`;
    }
  }
}

Rectangle.renderCanvas = (context, props) => {
    const { x, y, width, height, color, matrix } = props;

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
}

export default Rectangle;
