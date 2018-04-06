import React from 'react';
import PropTypes from 'prop-types';

class Circle extends React.Component {
  static contextTypes = {
    render: PropTypes.any,
    matrix: PropTypes.any
  };

  render() {
    const { render, matrix } = this.context;

    const { Circle } = render;
    const props = this.props;

    return <Circle matrix={matrix} {...props} />;
  }
}

export default Circle;
