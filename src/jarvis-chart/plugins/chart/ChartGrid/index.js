import Matrix from 'lib/matrix';

const ChartGrid = (p, options) => {
  p.on('state/default', (state) => ({ ...state, zoomX: 1, translateX: 0 }));
  p.on('chart-windows/create', (w) => ({ ...w, zoomY: options.height }));

  /* Нарисуем таймлайн */

  p.on('chart-windows/inside', ({ context, id }) => {
    context.api.matrix.push(Matrix.translate(p.state.get().translateX, 0));
    context.api.matrix.push(Matrix.scale(p.state.get().zoomX, 1));

    const w = p.chartWindows.get(id);
    const values = p.values.get();

    const [  screenFirst ] = context.api.screen.inside([ 0, 0 ]);
    const [ screenSecond ] = context.api.screen.inside([ 10, 0 ]);

    const screenStart = -screenFirst;
    const screenWidth = screenSecond - screenFirst;

    const offset = Math.floor(Math.max(screenStart / screenWidth - 1, 0));
    const count  = Math.ceil(context.api.screen.width() / screenWidth) + 2;

    const nth = Math.floor(count / 10);

    values.forEach(({ time }, index) => {
      /* Draw only visible elements */
      if (index < offset || index > offset + count) return;
      /* Draw only every nth element */
      if (index % nth > 0) return;

      context.api.matrix.push(Matrix.translate(index * 10, 0));
        p.render.primitives.line(context, { x0: 0, y0: -2000, x1: 0, y1: 2000, color: '#ddd' });
        context.api.matrix.push(Matrix.resetScale(context.api.matrix.get()));
        p.render.primitives.text(context, { x: 0, y: -20, text: time, color: '#ccc', crop: false });
        context.api.matrix.pop();
      context.api.matrix.pop();
    });

    context.api.matrix.pop();
    context.api.matrix.pop();

    return { context, id };
  });

  p.on('handler/attach', () => {
    // let
    p.handler.on('chart-windows-events/pathstart', ({ x, y, e, id }) => {
      // console.log('pathstart', { x, y, e, id });
    });

    p.handler.on('chart-windows-events/pathend', ({ x, y, e, id }) => {
      // console.log('pathend', { x, y, e, id });
    });

    p.handler.on('chart-windows-events/path', ({ x, y, e, id }) => {
      // console.log('path', { x, y, e, id });
      // p.state.update((state) => ({ ...state, translateX: state.translateX - delta / 1000 }));
    });

    p.handler.on('chart-windows-events/drag', ({ x, y, e, id }) => {
      // console.log('path', { x, y, e, id });
      p.state.update((state) => ({ ...state, translateX: state.translateX - x }));
    });

    p.handler.on('chart-windows-events/zoom', ({ delta, x, y, e, id }) => {
      // console.log('path', { x, y, e, id });
      p.state.update((state) => ({ ...state, zoomX: state.zoomX - delta / 1000 }))
      // console.log('zoom', { delta, id })
    });
  });


  /* Нарисуем прайслайн */

  // p.on('chart-windows/inside', ({ context, id }) => {
  //   const w = p.chartWindows.get(id);
  //   const values = p.values.get();
  //
  //   // /* Do not draw elements that are outside the screen */
  //   // const [ _0,  screenFirst ] = context.api.screen.inside([ 0, 0 ]);
  //   // const [ _1, screenSecond ] = context.api.screen.inside([ 0, 1 ]);
  //   //
  //   // const screenStart = screenFirst; // context.api.screen.height() * w.weight - screenFirst;
  //   // const screenHeight = screenFirst - screenSecond;
  //   //
  //   // console.log({screenStart, screenHeight})
  //   //
  //   // const offset = Math.floor(-screenStart / screenHeight) - 1;
  //   // const count  = Math.max(Math.ceil((context.api.screen.height() * w.weight) / screenHeight) + 2, 1);
  //   //
  //   // console.log(offset, count)
  //
  //   const offset = 10;
  //   const count = 1000;
  //
  //   const nth = Math.abs(Math.floor(count / 10));
  //
  //   const bb = (new Array(count)).fill(0).map((v, i) => i + offset);
  //
  //   bb.forEach((price) => {
  //     if (Math.abs(price) % nth > 0) return;
  //
  //     // p.render.primitives.group(context, { matrix: matrixForTimepoint(context.api.matrix.get(), price) }, () => {
  //     context.api.matrix.push(Matrix.translate(context.api.screen.width() - 100, 0));
  //       context.api.matrix.push(Matrix.resetScale(context.api.matrix.get()));
  //       p.render.primitives.text(context, { x: 0, y: price, text: price.toFixed(2), font: '100 13px Open Sans', color: '#4A4A4A', textAlign: 'left', crop: false });
  //       context.api.matrix.pop();
  //     context.api.matrix.pop();
  //       // p.render.primitives.line(context, { x0: -context.api.screen.width(), y0: 0, x1: 0, y1: 0, color: '#dddddd' });
  //     // });
  //   })
  //   return { context, id };
  // });
};

ChartGrid.plugin = {
  name: 'chart-grid',
  version: '1.0.0',
  dependencies: {
    'chart-windows': '1.0.0',
    'render': '1.0.0',
  }
};

export default ChartGrid;
