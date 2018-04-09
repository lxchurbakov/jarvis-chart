import EventEmitter from '../lib/event-emitter';

import Context from './context';
import Transform from './transform';

export default (view, handler, node, options) => {

  /* Create context */
  const context = Context(node, options);

  /* Draw Function */
  const draw = (state) => {
    context.clear();

    view(state, options, context, handler);

    context.flush();
  };

  return { draw };
};
