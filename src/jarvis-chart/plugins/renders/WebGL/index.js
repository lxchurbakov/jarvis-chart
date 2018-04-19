import Context from './context';
import primitives from './primitives';

const RenderWebGL = (p) => {
  p.on('render/init/webgl', () => ({ Context, primitives }));
};

RenderWebGL.plugin = {
  name: 'render-webgl',
  version: '1.0.0',
  dependencies: {
    'render': '1.0.0'
  }
};

export default RenderWebGL;
