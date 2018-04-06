import React from 'react';
import PropTypes from 'prop-types';

class Rectangle extends React.Component {
  static contextTypes = {
    render: PropTypes.any,
    matrix: PropTypes.any
  };

  render() {
    const { render, matrix } = this.context;

    const { Rectangle } = render;
    const { children } = this.props;
    const props = this.props;

    return <Rectangle matrix={matrix} {...props} />;
  }
}

export default Rectangle;
