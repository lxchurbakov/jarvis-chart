import React from 'react';
import PropTypes from 'prop-types';

class Circle extends React.Component {
  static contextTypes = {
    options: PropTypes.any,
  };

  render () {
    const { options } = this.context;
    const { engine } = options;
    const { cx, cy, radius, color, matrix } = this.props;

    switch (engine) {
      case 'svg':
        return <circle cx={cx} cy={cy} r={radius} fill={color} transform={matrix ? matrix.toCss() : null}/>;
      case 'canvas':
        return null;
      default:
        throw `Circle Component is not implemented for engine ${engine}`;
    }
  }
}

Circle.renderCanvas = (context, props) => {
  const { cx, cy, radius, color, matrix } = props;

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
}

export default Circle;
