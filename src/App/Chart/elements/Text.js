import React from 'react';
import PropTypes from 'prop-types';

class Text extends React.Component {
  static contextTypes = {
    render: PropTypes.any,
    matrix: PropTypes.any
  };

  render() {
    const { render, matrix } = this.context;

    const { Text } = render;
    const { children } = this.props;
    const props = this.props;

    return <Text matrix={matrix} {...props} />;
  }
}

export default Text;
