import React from 'react';
import PropTypes from 'prop-types';

class CanvasElement extends React.Component {
  static contextTypes = {
    listeners: PropTypes.any
  }

  constructor () {
    super();

  }

  componentDidMount () {
    this.context.listeners.push((context) => this.updateCanvas(context, this.props));
  }

  updateCanvas () {
    throw 'not implemented';
  }

  render () {
    return [];
  }
}

export default CanvasElement;
