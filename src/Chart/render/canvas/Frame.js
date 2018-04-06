import React from 'react';
import PropTypes from 'prop-types';

// Since we need to keep track of canvas element
let globalCanvasContextsCount = 0;

/**
 * Canvas Frame
 */
class Frame extends React.Component {
  constructor () {
    super();

    this.canvasElementId = `canvas-${globalCanvasContextsCount++}`;
  }

  render () {
    const canvasElementId = this.canvasElementId;
    const { children } = this.props;

    return (
      <canvas id={canvasElementId} width="1000" height="1000">{children}</canvas>
    );
  }

  static childContextTypes = {
    canvasElementId: PropTypes.any
  }

  getChildContext () {
    const canvasElementId = this.canvasElementId;

    return { canvasElementId };
  }
}

export default Frame;
