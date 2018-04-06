import React from 'react';
import CanvasElement from './CanvasElement';

import Matrix from '../../../../matrix';

class Line extends CanvasElement {
  updateCanvas (context, props) {
    const { x0, y0, x1, y1, color, width, matrix } = props;

    const [ x0real, y0real ] = Matrix.apply([x0, y0], matrix);
    const [ x1real, y1real ] = Matrix.apply([x1, y1], matrix);

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
