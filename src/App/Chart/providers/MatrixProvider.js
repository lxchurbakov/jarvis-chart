import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * A Provider to push matrix down the tree till elements that draw.
 *
 */
class MatrixProvider extends React.Component {
  render () {
    const { children } = this.props;

    return children;
  }

  getChildContext () {
    const { matrix } = this.props;

    return { matrix };
  }

  static childContextTypes = {
    matrix: PropTypes.any
  };

  static propTypes = {
    matrix: PropTypes.any
  };
};

export default MatrixProvider;
