import React from 'react';
import PropTypes from 'prop-types';

/* Helper for transformations */
const Transform = ({ matrix, children, origin = 'auto' }) => matrix ? (
  <g style={{ transform: matrix.toCss(), transformOrigin: origin }}>
    {children}
  </g>
) : children;

/* Main SVG Frame */
const Frame = ({ children }) => (
  <svg width="100%" height="100%">
    {children}
  </svg>
);

/* Elements */

const Rectangle = ({ x, y, width, height, color, matrix }) => (
  <Transform matrix={matrix}>
    <rect x={x} y={y} width={width} height={height} style={{ fill: color }} />
  </Transform>
);

const Line = ({ x0, y0, x1, y1, width = 1 , color, matrix }) => (
  <Transform matrix={matrix}>
    <line x1={x0} y1={y0} x2={x1} y2={y1} style={{ stroke: color, strokeWidth: width }} />
  </Transform>
);

const Circle = ({ cx, cy, radius, color, matrix }) => (
  <Transform matrix={matrix}>
    <circle cx={cx} cy={cy} r={radius} fill={color} />
  </Transform>
);

const textAlignToTextAnchor = (textAlign) => ({ 'left': 'start', 'center': 'middle', 'right': 'end' })[textAlign];

const Text = ({ x, y, font, text, textAlign, color, matrix }) => (
  <Transform matrix={matrix}>
    <text x={x} y={y} textAnchor={textAlignToTextAnchor(textAlign)} fill={color} style={{ font, textAlign }}>{text}</text>
  </Transform>
);

/* Group */

const Group = ({ children, ...props }) => (
  <g {...props}>
    {children}
  </g>
);

class MatrixConsumer extends React.Component {
  static contextTypes = {
    matrix: PropTypes.any
  };

  render () {
    const { children } = this.props;
    const { matrix } = this.context;
    return (
      <Transform matrix={matrix}>
        {children}
      </Transform>
    );
  }

  getChildContext () {
    return { matrix: null };
  }

  static childContextTypes = {
    matrix: PropTypes.any
  };
}

export default { Frame, Group, Line, Rectangle, Circle, Text, MatrixConsumer };
