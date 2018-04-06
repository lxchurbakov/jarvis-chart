import React from 'react';
import PropTypes from 'prop-types';

class Line extends React.Component {
  static contextTypes = {
    render: PropTypes.any,
    matrix: PropTypes.any
  };

  render() {
    const { render, matrix } = this.context;

    const { Line } = render;
    const { children } = this.props;
    const props = this.props;

    return <Line matrix={matrix} {...props} />;
  }
}

export default Line;
