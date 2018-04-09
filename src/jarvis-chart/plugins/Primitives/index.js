import circle from './primitives/circle';
import line from './primitives/line';
import rectangle from './primitives/rectangle';
import text from './primitives/text';
import group from './primitives/group';
import ellipse from './primitives/ellipse';

/**
 * Primitives plugin
 *
 * Attaches primitives to render API
 *
 * Sockets Used: render/collect-primitives
 *
 */
const Primitives = (p) => {
  /* Extends render API */
  p.on('render/collect-primitives', () => {
    p.render.primitives = { circle, line, rectangle, text, group, ellipse };
  });
};

Primitives.plugin = {
  name: 'primitives',
  version: '1.0.0',
  dependencies: {
    'render': '1.0.0'
  }
};

export default Primitives;