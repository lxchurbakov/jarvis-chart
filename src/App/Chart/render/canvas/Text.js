import React from 'react';
import CanvasElement from './CanvasElement';

import Matrix from '../../../../matrix';

/**
 * Text Element implementations
 *
 * props:
 *   fontWeight
 *   fontSize
 *   fontFamily
 *   text
 *   textAlign
 *   color
 *   x
 *   y
 *
 */
class Text extends CanvasElement {
  updateCanvas (context, props) {
    const { font, text, matrix, textAlign = 'center', color = 'black' } = props;

    const { a, b, c, d, tx, ty } = matrix.getValues();

    context.save();
    context.transform(a, b, c, d, tx, ty);
    context.font = font;
    context.textAlign = textAlign;
    context.fillStyle = color;
    context.fillText(text, 0, 0);
    context.restore();
  }
}

export default Text;
