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
 * render/init/${render} - сокет, получающий рендер. Должен вернуть объект типа { Context, primitives }
 * render/draw - сокет, выполняющийся в момента рендеринга сцены
 * render/collect-primitives - сокет, выполняющийся в
 *
 */
const Render = (p, options) => {
  p.on('mount', ({ node }) => {

    /* Получаем render */
    const render = p.emitSync(`render/init/${options.render}`);

    if (!render)
      throw `Рендер типа ${options.render} не зарегистрирован`;

    /* Создаём контекст */

    const context = render.Context(node, options);

    let requested = false;

    const draw = () => {
      context.clear();

      p.emitSync('render/draw', { context })

      context.flush();

      requestAnimationFrame(draw);
      requested = true;
    };

    p.render = {
      /*
        Этот метод вызывается каждый раз, когда нужно перерисоваться
        но на данный момент мы поддерживаем только continuous режим и рисуемся по animationFrame для любого рендера
        TODO
      */
      draw: () => {
        if (!requested)
          draw();
      },
      primitives: render.primitives,
    };

    return { node };
  });
};

Render.plugin = {
  name: 'render',
  version: '1.0.0',
  dependencies: {}
};

export default Render;
