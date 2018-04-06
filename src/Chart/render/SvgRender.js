import React from 'react';

const Group = ({ children, ...props }) => (
  <g {...props}>
    {children}
  </g>
);

const Transform = ({ matrix, children, origin = 'auto' }) => (
  <Group style={{ transform: matrix.toCss(), transformOrigin: origin }}>
    {children}
  </Group>
);

// const Rectangle = ({ width, height, color }) => (
//   <rect width={width} height={height} style={{ fill: color }} />
// );

const Circle = ({ cx, cy, radius, color, matrix }) => (
  <Transform matrix={matrix}>
    <circle cx={cx} cy={cy} r={radius} fill={color} />
  </Transform>
);

// const Line = ({ x0, y0, x1, y1, width = 1 , color }) => (
//   <line x1={x0} y1={y0} x2={x1} y2={y1} style={{ stroke: color, strokeWidth: width }} />
// );

const Frame = ({ children }) => (
  <svg width="500" height="500">
    {children}
  </svg>
);

// const Svg = { Rectangle, Circle, Line, Transform };
const Svg = { Frame, Circle };

export default Svg;
