import React from 'react';
import CanvasElement from './CanvasElement';

import Matrix from '../../../../matrix';

class Circle extends CanvasElement {
  updateCanvas (context, props) {
    const { radius, color, matrix } = props;

    const { a, b, c, d, tx, ty } = matrix.getValues();

    context.save();
    context.transform(a, b, c, d, tx, ty);
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    context.restore();
  }
}

export default Circle;
