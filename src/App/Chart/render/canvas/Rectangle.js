import React from 'react';
import CanvasElement from './CanvasElement';

import Matrix from '../../../../matrix';

class Rectangle extends CanvasElement {
  updateCanvas (context, props) {
    const { x, y, width, height, color, matrix } = props;

    const { a, b, c, d, tx, ty } = matrix.getValues();

    context.save();
    context.transform(a, b, c, d, tx, ty);
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = color;
    context.fill();
    context.restore();
  }
}

export default Rectangle;
