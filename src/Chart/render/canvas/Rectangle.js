import React from 'react';
import CanvasElement from './CanvasElement';

import Matrix from '../../../matrix';

class Reactangle extends CanvasElement {
  updateCanvas (context, props) {
    const { width, height, color, matrix } = props;

    const x0 = 0;
    const y0 = 0;
    const x1 = width;
    const y1 = height;

    const [ x0real, y0real ] = Matrix.apply([x0, y0], matrix);
    const [ x1real, y1real ] = Matrix.apply([x1, y1], matrix);

    context.beginPath();
    context.rect(x0real, y0real, x1real - x0real, y1real - y0real);
    context.fillStyle = color;
    context.fill();
  }
}

export default Reactangle;
