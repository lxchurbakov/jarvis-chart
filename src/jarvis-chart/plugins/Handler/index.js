import EventEmitter from '../../lib/event-emitter';

/**
 * Handler Plugin
 *
 * Attaches handler node to the parent node and captures events.
 *
 * Sockets Used: mount
 * Sockets Provided: handler/attach
 * API Provided: handler
 */
const Handler = (p) => {
  /* Attach to the main node on mount */
  p.on('mount', ({ node, options }) => {
    const div = document.createElement('div');

    div.style.width  = "100%";
    div.style.height = "100%";
    div.style.position = "absolute";

    node.appendChild(div);

    const ee = EventEmitter();

    /* Attach listeners API. Since we may need to add events later then now... */
    p.handler = {
      /* Listen to synthetic events */
      on: ee.on,
      /* Emit a synthetic event */
      emit: ee.emit,
      /* Listen to native event */
      attach: (name, listener) => div.addEventListener(name, listener),
    };

    p.emitSync('handler/attach');

    return { node };
  });
};

Handler.plugin = {
  name: 'handler',
  version: '1.0.0',
  dependencies: {}
};

export default Handler;
