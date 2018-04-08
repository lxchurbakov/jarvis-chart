import React from 'react';
import PropTypes from 'prop-types';

class Circle extends React.Component {
  static contextTypes = {
    options: PropTypes.any,
  };

  render () {
    const { options } = this.context;
    const { engine } = options;

    const { children } = this.props;

    switch (engine) {
      case 'svg':
        return children;
      case 'canvas':
        return children;
      default:
        throw `Group Component is not implemented for engine ${engine}`;
    }
  }
}


export default Circle;
