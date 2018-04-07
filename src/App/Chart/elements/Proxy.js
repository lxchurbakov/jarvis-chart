import React from 'react';
import PropTypes from 'prop-types';

export default (name) => (

  class Proxy extends React.Component {
    static contextTypes = {
      render: PropTypes.any,
      matrix: PropTypes.any
    };

    render() {
      const { render, matrix } = this.context;

      const Element = render[name];
      const { children } = this.props;
      const props = this.props;

      return <Element matrix={matrix} {...props} />;
    }
  }

);
