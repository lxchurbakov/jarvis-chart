import React from 'react';
import CanvasElement from './CanvasElement';

class Line extends CanvasElement {
  updateCanvas (context, props) {
    const { x0, y0, x1, y1, color, width, matrix } = props;

    const x0real = x0 * matrix.get(0, 0) + y0 * matrix.get(0, 1) + 1 * matrix.get(0, 2);
    const y0real = x0 * matrix.get(1, 0) + y0 * matrix.get(1, 1) + 1 * matrix.get(1, 2);

    const x1real = x1 * matrix.get(0, 0) + y1 * matrix.get(0, 1) + 1 * matrix.get(0, 2);
    const y1real = x1 * matrix.get(1, 0) + y1 * matrix.get(1, 1) + 1 * matrix.get(1, 2);

    context.beginPath();
    context.moveTo(x0real, y0real);
    context.lineTo(x1real, y1real);
    context.lineWidth = width;

    // set line color
    context.strokeStyle = color;
    context.stroke();
  }
}

export default Line;
