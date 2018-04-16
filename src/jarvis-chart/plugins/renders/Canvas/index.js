import Context from './context';
import primitives from './primitives';

const RenderCanvas = (p) => {
  p.on('render/init/canvas', () => ({ Context, primitives }));
};

RenderCanvas.plugin = {
  name: 'render-canvas',
  version: '1.0.0',
  dependencies: {
    'render': '1.0.0'
  }
};

export default RenderCanvas;
