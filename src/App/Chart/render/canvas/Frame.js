import React from 'react';
import PropTypes from 'prop-types';

// Since we need to keep track of canvas element
let globalCanvasContextsCount = 0;

class Frame extends React.Component {
  constructor () {
    super();

    this.listeners = [];
    this.transform = { a: null, b: null, c: null, d: null, tx: null, ty: null };
  }

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

  /* Render all the listeners */
  renderFrame = (time) => {
    this.renderingContext.clearRect(0, 0, 1000, 1000);
    this.listeners.forEach(listener => listener && listener(this.renderingContext));
    this.requestID = requestAnimationFrame(this.renderFrame);
  }

  /* Since updating changes the element */
  componentDidUpdate () {
    this.updateRenderingContext();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount () {
    this.updateRenderingContext();
    this.updateDimensions();
    this.renderFrame();
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.requestID);
  }

  render () {
    const { children } = this.props;

    return (
      <canvas ref={element => this.element = element} width="1" height="1">{children}</canvas>
    );
  }

  /* Optimization for canvas transformations: do not apply already existing transform */
  setCanvasTransform = (a, b, c, d, tx, ty) => {
    if (
      this.transform.a !== a ||
      this.transform.b !== b ||
      this.transform.c !== c ||
      this.transform.d !== d ||
      this.transform.tx !== tx ||
      this.transform.ty !== ty
    ) {
      this.transform = { a, b, c, d, tx, ty };

      this.renderingContext.transform(a, b, c, d, tx, ty);
    }
  }

  // Put listeners array and setCanvasTransform down to the children

  static childContextTypes = {
    listeners: PropTypes.any
  }

  getChildContext () {
    return { listeners: this.listeners };
  }
}

export default Frame;
