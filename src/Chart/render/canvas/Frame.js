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

    this.listeners = [];
  }

  renderFrame = (time) => {
    const element = this.element;
    const context = element.getContext("2d");

    context.clearRect(0, 0, 1000, 1000);

    this.listeners.forEach(listener => listener(context));

    this.requestID = requestAnimationFrame(this.renderFrame);
  }

  componentDidMount () {
    this.renderFrame();
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.requestID);
  }

  render () {
    const canvasElementId = this.canvasElementId;
    const { children } = this.props;

    return (
      <canvas ref={element => this.element = element} width="1000" height="1000">{children}</canvas>
    );
  }

  static childContextTypes = {
    listeners: PropTypes.any
  }

  getChildContext () {
    return { listeners: this.listeners };
  }
}

export default Frame;
