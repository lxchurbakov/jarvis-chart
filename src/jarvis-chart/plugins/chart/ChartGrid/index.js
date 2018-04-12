const ChartGrid = (p, options) => {
  let zoomX = options.width;

  p.on('chart-windows/create', (w) => ({ ...w, zoomY: options.height }));

  p.on('chart-windows/inside', ({ context, id }) => {
    const w = p.chartWindows.get(id);
    const values = p.values.get();

    const [  screenFirst ] = context.api.screen.inside([ 0, 0 ]);
    const [ screenSecond ] = context.api.screen.inside([ 10, 0 ]);

    const screenStart = -screenFirst;
    const screenWidth = screenSecond - screenFirst;

    const offset = Math.floor(Math.max(screenStart / screenWidth - 1, 0));
    const count  = Math.ceil(context.api.screen.width() / screenWidth) + 2;

    const nth = Math.floor(count / 10);

    values
      .forEach(({ time }, index) => {
        /* Draw only visible elements */
        if (index < offset || index > offset + count) return;
        /* Draw only every nth element */
        if (index % nth > 0) return;

        // p.render.primitives.group(context, { matrix: matrixForTimepoint(context.api.matrix.get(), index) }, () => {
          // p.render.primitives.circle(context, { cx: 0, cy: 0, radius: 3, color: '#15E6C1', crop: false });
          // p.render.primitives.text(context, { x: 0, y: 20, text: time, color: '#ccc', crop: false });
          p.render.primitives.line(context, { x0: index * 10, y0: -2000, x1: index * 10, y1: 2000, color: '#ddd' });
        // });
      });
    // const height = w.weight * context.api.screen.height();
    // const width = context.api.screen.width();
    // const color = `hsla(${(parseInt(w.id, 36) + 300) % 256}, 100%, 50%, 0.7)`;
    //
    // const currentMatrix = context.api.matrix.get();
    //
    // context.api.matrix.push(Matrix.translate(1, 1));
    // context.api.matrix.push(Matrix.resetScale(currentMatrix));
    // p.render.primitives.text(context, { x: -5, textAlign: 'right', y: 13 + 5, font: '300 13px Open Sans', text: `Window #${w.id} (${(100 * w.weight).toFixed(2)}%)`, opacity: 0.8 });
    // context.api.matrix.pop();
    // context.api.matrix.pop();
    //
    // p.render.primitives.rectangle(context, { x: 0, y: 0, width: 1, height: 1, color, opacity: 0.2 });
    return { context, id };
  });
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
//
// export const getScreenBounds = (context) => {
//   const [  screenFirst ] = context.api.screen.inside([ 0, 0 ]);
//   const [ screenSecond ] = context.api.screen.inside([ 10, 0 ]);
//
//   const screenStart = -screenFirst;
//   const screenWidth = screenSecond - screenFirst;
//
//   const offset = Math.floor(Math.max(screenStart / screenWidth - 1, 0));
//   const count  = Math.ceil(context.api.screen.width() / screenWidth) + 2;
//
//   return { offset, count };
// };
