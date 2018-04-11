import Context from './context';

/**
 * Render плагин
 *
 * Создаёт контекст вывода и API рендера
 *
 * TODO добавить поддержку опции для конфигурирования requestAnimationFrame
 *
 * Использует сокеты: state/default, mount
 * Создаёт сокеты: render/draw, render/collect-primitives
 * Использует API: нет
 * Создаёт API: render
 *
 * render/draw - сокет, выполняющийся в момента рендеринга сцены
 * render/collect-primitives - сокет, выполняющийся в
 *
 */
const Render = (p, options) => {
  p.on('mount', ({ node }) => {
    const context = Context(node, options);

    let requested = false;

    const draw = () => {
      context.clear();

      p.emitSync('render/draw', { context })

      context.flush();

      requestAnimationFrame(draw);
      requested = true;
    };

    p.render = {
      draw: () => {
        if (!requested)
          draw();
      }
    };

    /* TODO нормальный API для примитивов */

    p.emitSync('render/collect-primitives');

    return { node };
  });
};

Render.plugin = {
  name: 'render',
  version: '1.0.0',
  dependencies: {}
};

export default Render;
