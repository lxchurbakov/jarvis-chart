import React from 'react';
import PropTypes from 'prop-types';

class CanvasElement extends React.Component {
  static contextTypes = {
    canvasElementId: PropTypes.any
  }

  canvasRender () {
    throw 'not implemented';
  }

  render () {
    const { canvasElementId } = this.context;

    const canvasElement = document.getElementById(canvasElementId);

    if (canvasElement) {
      this.canvasRender(canvasElement.getContext("2d"), this.props);
    } else {
      setTimeout(() => {
        this.canvasRender(document.getElementById(canvasElementId).getContext("2d"), this.props);
      }, 100);
    }

    return null;
  }
}

export default CanvasElement;
