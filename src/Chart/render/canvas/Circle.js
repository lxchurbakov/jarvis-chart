import React from 'react';
import CanvasElement from './CanvasElement';

class Circle extends CanvasElement {
  canvasRender (ctx, props) {
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

export default Circle;
