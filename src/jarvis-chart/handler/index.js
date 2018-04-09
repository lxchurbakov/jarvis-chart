import EventEmitter from '../lib/event-emitter';

export default (node, options) => {
  const div = document.createElement('div');

  div.style.width  = "100%";
  div.style.height = "100%";
  div.style.position = "absolute";

  node.appendChild(div);

  const eventEmitter = EventEmitter();

  let inside = false;
  let mousedown = false;
  let lastpos = null;
  let lasttime = null;

  div.addEventListener('wheel', (e) => {
    eventEmitter.emit('wheel', { delta: e.deltaY, e });
  });

  div.addEventListener('click', (e) => {
    if ((new Date()) - lasttime > options.clickThreshold) return;

    const rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    eventEmitter.emit('click', { x, y, e });
  });

  div.addEventListener('mousedown', (e) => {
    eventEmitter.emit('mousedown', e);
    mousedown = true;
    lastpos = { x: e.clientX, y: e.clientY };
    lasttime = new Date();
  });

  div.addEventListener('mouseup', (e) => {
    eventEmitter.emit('mouseup', e);
    mousedown = false;
    lastpos = false;
  });

  div.addEventListener('mousemove', (e) => {
    eventEmitter.emit('mousemove', e);

    {
      const rect = e.target.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      eventEmitter.emit('path', { x, y, e });
    }

    if (mousedown) {
      if (lastpos) {
        const x = e.clientX - lastpos.x;
        const y = e.clientY - lastpos.y;

        eventEmitter.emit('drag', { x, y, e });
      }

      lastpos = { x: e.clientX, y: e.clientY };
    }
  });

  div.addEventListener('mouseover', (e) => {
    eventEmitter.emit('mouseover', e);
    inside = true;
  });

  div.addEventListener('mouseout', (e) => {
    eventEmitter.emit('mouseout', e);
    mousedown = false;
    inside = false;
  });

  return eventEmitter;
};
