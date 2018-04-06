import React from 'react';
import PropTypes from 'prop-types';

// const Group = ({ children, ...props }) => (
//   <g {...props}>
//     {children}
//   </g>
// );

// const Transform = ({ matrix, children, origin = 'auto' }) => (
//   <Group style={{ transform: matrix.toCss(), transformOrigin: origin }}>
//     {children}
//   </Group>
// );

// const Rectangle = ({ width, height, color }) => (
//   <rect width={width} height={height} style={{ fill: color }} />
// );

// const Circle = ({ cx, cy, radius, color, matrix }) => (
//   <Transform matrix={matrix}>
//     <circle cx={cx} cy={cy} r={radius} fill={color} />
//   </Transform>
// );

// const Line = ({ x0, y0, x1, y1, width = 1 , color }) => (
//   <line x1={x0} y1={y0} x2={x1} y2={y1} style={{ stroke: color, strokeWidth: width }} />
// );

class Circle extends React.Component {
  static contextTypes = {
    canvasElementId: PropTypes.any
  }

  render () {
    const { canvasElementId } = this.context;

    console.log(canvasElementId);

    const canvasElement = document.getElementById(canvasElementId);

    if (canvasElement) {
      var ctx = canvasElement.getContext("2d");

      console.log('render');

      ctx.beginPath();
      ctx.arc(95, 50, 40, 0, 2 * Math.PI);
      ctx.stroke();
    } else {
      setTimeout(() => {
        var ctx = document.getElementById(canvasElementId).getContext("2d");

        console.log('render');

        ctx.beginPath();
        ctx.arc(95, 50, 40, 0, 2 * Math.PI);
        ctx.stroke();
      }, 100);
    }

    return null;
  }
}

let globalCanvasContextsCount = 0;

class Frame extends React.Component {
  constructor () {
    super();

    this.canvasElementId = `canvas-${globalCanvasContextsCount++}`;
  }

  static childContextTypes = {
    canvasElementId: PropTypes.any
  }

  getChildContext () {
    const canvasElementId = this.canvasElementId;

    return { canvasElementId };
  }

  render () {
    const canvasElementId = this.canvasElementId;
    const { children } = this.props;

    return (
      <canvas id={canvasElementId} width="500" height="500">{children}</canvas>
    );
  }
}

const CanvasRender = { Frame, Circle };

export default CanvasRender;
