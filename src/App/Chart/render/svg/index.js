import React from 'react';

const Transform = ({ matrix, children, origin = 'auto' }) => (
  <g style={{ transform: matrix.toCss(), transformOrigin: origin }}>
    {children}
  </g>
);

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

const Group = ({ children, ...props }) => (
  <g {...props}>
    {children}
  </g>
);

const Frame = ({ children }) => (
  <svg width="100%" height="100%">
    {children}
  </svg>
);

// const Text = ({ font, text, textAlign, color, matrix }) => (
//   <Transform matrix={matrix}>
//     <line x1={x0} y1={y0} x2={x1} y2={y1} style={{ stroke: color, strokeWidth: width }} />
//   </Transform>
// );

export default { Frame, Group, Line, Rectangle };
