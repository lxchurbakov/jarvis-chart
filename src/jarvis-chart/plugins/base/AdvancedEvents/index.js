/* TODO optimize do not retrieve rect every time */
const getCoords = (e) => {
  const rect = e.target.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  return { x, y };
};

/**
 * AdvancedEvents плагин
 *
 * Добавляет "продвинутые" ивенты на шину событий (p.handler), такие как pathstart, pathend, zoom, drag
 * Также пробрасывает "обычные" на p.handler ивенты: click, mousedown, mouseup, mousemove
 *
 * Чтобы подписаться на ивенты используйте p.handler.on('click', () => console.log('click')). См Handler плагин
 *
 * Использует сокеты: handler/attack
 * Использует API: p.handler
 * Создаёт сокеты: нет
 * Создаёт API: нет
 *
 */
const AdvancedEvents = (p, options) => {

  /* Текущее состояние устройства ввода */
  let inside    = false;
  let mousedown = false;
  let lastpos   = null;
  let lasttime  = null;

  let pathStarted = false;

  p.on('handler/attach', () => {
    p.handler.attach('wheel', (e) => {
      e.preventDefault();
      p.handler.emit('zoom', { delta: e.deltaY, e });
    });

    p.handler.attach('click', (e) => {
      if ((new Date()) - lasttime > options.clickThreshold) return;

      const rect = e.target.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      p.handler.emit('click', { x, y, e });
    });

    p.handler.attach('mousedown', (e) => {
      const { x, y } = getCoords(e);
      p.handler.emit('mousedown', { x, y, e });
      p.handler.emit('pathstart', { x, y, e });

      pathStarted = true;

      mousedown = true;
      lastpos = { x, y };
      lasttime = new Date();
    });

    p.handler.attach('mouseup', (e) => {
      const { x, y } = getCoords(e);
      mousedown = false;
      lastpos = false;
      p.handler.emit('mouseup', { x, y, e });
      if (pathStarted) {
        p.handler.emit('pathend', { x, y, e });
        pathStarted = false;
      }
    });

    p.handler.attach('mouseover', (e) => {
      p.handler.emit('mouseover', e);
      inside = true;
    });

    p.handler.attach('mouseout', (e) => {
      p.handler.emit('mouseout', e);
      mousedown = false;
      inside = false;
    });

    p.handler.attach('mousemove', (e) => {
      const { x, y } = getCoords(e);

      p.handler.emit('mousemove', { x, y, e });

      if (mousedown) {
        if (lastpos) {
          if (pathStarted) p.handler.emit('path', { x, y, e });
          p.handler.emit('drag', { x: x - lastpos.x, y: y - lastpos.y, e });
        }

        lastpos = { x, y };
      }
    });
  });
};

AdvancedEvents.plugin = {
  name: 'advanced-events',
  version: '1.0.0',
  dependencies: {
    'handler': '1.0.0',
  }
};

export default AdvancedEvents;
