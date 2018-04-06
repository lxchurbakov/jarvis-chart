import React from 'react';
import CanvasElement from './CanvasElement';

class Reactangle extends CanvasElement {
  canvasRender (context, props) {
    const { width, height, color, matrix } = props;

    const x0 = 0;
    const y0 = 0;
    const x1 = width;
    const y1 = height;

    const x0real = x0 * matrix.get(0, 0) + y0 * matrix.get(0, 1) + 1 * matrix.get(0, 2);
    const y0real = x0 * matrix.get(1, 0) + y0 * matrix.get(1, 1) + 1 * matrix.get(1, 2);

    const x1real = x1 * matrix.get(0, 0) + y1 * matrix.get(0, 1) + 1 * matrix.get(0, 2);
    const y1real = x1 * matrix.get(1, 0) + y1 * matrix.get(1, 1) + 1 * matrix.get(1, 2);

    context.beginPath();
    context.rect(x0real, y0real, x1real - x0real, y1real - y0real);
    context.fillStyle = color;
    context.fill();
  }
}

export default Reactangle;
