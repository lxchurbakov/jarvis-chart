import React from 'react';
import PropTypes from 'prop-types';

class Group extends React.Component {
  static contextTypes = {
    render: PropTypes.any,
    matrix: PropTypes.any
  };

  render() {
    const { render, matrix } = this.context;

    const { Group } = render;
    const { children } = this.props;
    const props = this.props;

    return <Group matrix={matrix} {...props} />;
  }
}

export default Group;
