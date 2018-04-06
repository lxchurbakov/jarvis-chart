import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * A Provider that allows elements to access render
 *
 */
class RenderProvider extends React.Component {
  render () {
    const { children, render } = this.props;
    const { Frame } = render;

    return (<Frame>{children}</Frame>);
  }

  getChildContext () {
    const { render } = this.props;

    return { render };
  }

  static childContextTypes = {
    render: PropTypes.any
  };

  static propTypes = {
    render: PropTypes.any
  };
};

export default RenderProvider;
