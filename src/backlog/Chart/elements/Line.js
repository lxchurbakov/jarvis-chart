import React from 'react';
import PropTypes from 'prop-types';

class Line extends React.Component {
  static contextTypes = {
    options: PropTypes.any,
  };

  render () {
    const { options } = this.context;
    const { engine } = options;
    const { x0, y0, x1, y1, width = 1, color, matrix } = this.props;

    switch (engine) {
      case 'svg':
        return <line x1={x0} y1={y0} x2={x1} y2={y1} style={{ stroke: color, strokeWidth: width }} transform={matrix ? matrix.toCss() : null} />
      case 'canvas':
        return null;
      default:
        throw `Circle Component is not implemented for engine ${engine}`;
    }
  }
}

Line.renderCanvas = (context, props) => {
  const { x0, y0, x1, y1, color, width = 1, matrix } = props;

  if (matrix) {
    const { a, b, c, d, tx, ty } = matrix.getValues();
    context.save();
    context.transform(a, b, c, d, tx, ty);
  }

  context.beginPath();
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.lineWidth = width === 1 ? 0.6 : width;
  context.strokeStyle = color;
  context.stroke();

  if (matrix) {
    context.restore();
  }
}

export default Line;
