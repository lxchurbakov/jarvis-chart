import React from 'react';
import PropTypes from 'prop-types';

/**
 * Svg Stage
 */
class SvgStage extends React.Component {
  render () {
    const { children } = this.props;

    return (
      <svg width="100%" height="100%">
        {children}
      </svg>
    );
  }
}

/**
 * Canvas Stage
 */
class CanvasStage extends React.Component {
  updateRenderingContext = () => {
    this.renderingContext = this.element.getContext("2d");
  }

  updateDimensions = () => {
    const parentNode = this.element.parentNode;

    const parentWidth = parentNode.offsetWidth;
    const parentHeight = parentNode.offsetHeight;

    this.element.width = parentWidth;
    this.element.height = parentHeight;
  }

  componentDidUpdate () {
    this.updateRenderingContext();
    this.renderFrame();
  }

  componentDidMount () {
    this.updateRenderingContext();
    this.updateDimensions();
    this.renderFrame();
  }

  /* Render One Frame */
  renderFrame = () => {
    // Clear Rect
    this.renderingContext.clearRect(0, 0, 1000, 1000); // this.element.dimensions

    this.renderCanvasElement(this);
  }

  /**
   * Call render for all the children who has renderCanvas method implemented
   */
  renderCanvasElement = (element) => {
    /* If we have a speicifc canvas oriented implementation */
    if (typeof(element.type) === 'function' && element.type.renderCanvas) {
      element.type.renderCanvas(this.renderingContext, element.props);
    } else {
      // const e = React.createElement(element.type, element.props);


    }

    // if (typeof(element.type) === 'function' && element.type.renderEasy) {
      // React.Children.forEach(element.type.renderEasy(element.props), child => this.renderCanvasElement(child));
      // element.type.renderCanvas(this.renderingContext, element.props);
    // }

    if (element.props && element.props.children)
      React.Children.forEach(element.props.children, child => this.renderCanvasElement(child));
  }

  render () {
    const { children } = this.props;

    return (
      <canvas ref={element => this.element = element} width="1" height="1"></canvas>
    );
  }
}

class Stage extends React.Component {
  static contextTypes = {
    options: PropTypes.any,
  };

  render() {
    const { options } = this.context;
    const { children } = this.props;

    const { engine } = options;

    switch (engine) {
      case 'svg':
        return <SvgStage>{children}</SvgStage>;
      case 'canvas':
        return <CanvasStage>{children}</CanvasStage>;
      default:
        throw `Stage Component is not implemented for engine ${engine}`;
    }
  }
}

export default Stage;
