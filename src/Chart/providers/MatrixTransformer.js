import React from 'react';
import PropTypes from 'prop-types';

import MatrixProvider from './MatrixProvider';

/**
 *
 * A Provider that internally transforms the matrix
 *
 */
class MatrixTransformer extends React.Component {
  static contextTypes = {
    matrix: PropTypes.any
  };

  render() {
    const { matrix } = this.context;
    const { transform, children } = this.props;

    return (
      <MatrixProvider matrix={transform(matrix)}>
        {children}
      </MatrixProvider>
    );
  }
}

export default MatrixTransformer;
