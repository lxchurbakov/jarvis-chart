import React from 'react';
import CanvasElement from './CanvasElement';

import Matrix from '../../../../matrix';

class Circle extends CanvasElement {
  updateCanvas (context, props) {
    const { cx, cy, radius, color, matrix } = props;

    const { a, b, c, d, tx, ty } = matrix.getValues();

    context.save();
    context.transform(a, b, c, d, tx, ty);
    context.beginPath();
    context.arc(cx, cy, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    context.restore();
  }
}

export default Circle;
