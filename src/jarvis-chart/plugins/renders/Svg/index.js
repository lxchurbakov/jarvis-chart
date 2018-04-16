import Context from './context';
import primitives from './primitives';

const RenderSvg = (p) => {
  p.on('render/init/svg', () => ({ Context, primitives }));
};

RenderSvg.plugin = {
  name: 'render-svg',
  version: '1.0.0',
  dependencies: {
    'render': '1.0.0'
  }
};

export default RenderSvg;
