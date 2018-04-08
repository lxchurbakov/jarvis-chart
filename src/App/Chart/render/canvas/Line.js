import React from 'react';
import CanvasElement from './CanvasElement';

import Matrix from '../../../../matrix';

class Line extends CanvasElement {
  updateCanvas (context, props) {
    const { x0, y0, x1, y1, color, width, matrix } = props;

    const { a, b, c, d, tx, ty } = matrix.getValues();

    context.save();
    context.transform(a, b, c, d, tx, ty);

    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineWidth = width;

    // set line color
    context.strokeStyle = color;
    context.stroke();

    context.restore();
  }
}

export default Line;
