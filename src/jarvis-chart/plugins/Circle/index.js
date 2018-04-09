import Matrix from '../../lib/matrix'

const Circle = (p) => {
  p.on('chart-window/inside', ({ context, state }) => {
    (new Array(500)).fill(0).forEach(() => {
      p.render.primitives.circle(context, { cx: 10, cy: 10, radius: 20, color: 'red' });
    });

    return { context, state };
  });
};

Circle.plugin = {
  name: 'circle',
  version: '1.0.0',
  dependencies: {
    'chart-window': '1.0.0',
  }
};

export default Circle;
