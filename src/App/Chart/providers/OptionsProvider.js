import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * A Provider that allows elements to access render
 *
 */
class OptionsProvider extends React.Component {
  render () {
    const { children } = this.props;

    return children;
  }

  getChildContext () {
    const { options } = this.props;

    return { options };
  }

  static childContextTypes = {
    options: PropTypes.any
  };

  static propTypes = {
    options: PropTypes.any
  };
};

export default RenderProvider;
