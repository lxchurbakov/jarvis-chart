const EraseMode = (p, options) => {
  /* Пусть изначальный режим будет просмотр */
  // p.on('chart-windows-modes/default', (mode) => 'view');

  /* Обработчики */
  p.on('handler/attach', () => {
    p.handler.on('chart-windows-modes/erase/click', ({ x, y, e, id }) => {
      const { elements } = p.chartWindows.get(id);

      elements.forEach((element, i) => {
        const hovers = p.elements.hovers(id, x, y, element);

        if (hovers) {
          p.chartWindows.update(id, (w) => ({ ...w, elements: w.elements.filter((_, _i) => i !== _i) }));
        }
      });
    });

    // p.handler.on('chart-windows-modes/erase/mousemove', ({ x, y, e, id }) => {
    //   let { translate, zoom } = p.chartWindowsScaleTranslate.raw.xy(id);
    //
    //   translate.x -= x / zoom.x;
    //   translate.y += y;
    //
    //   p.chartWindowsScaleTranslate.set.xy(id, { translate, zoom });
    // });
    //
    // p.handler.on('chart-windows-modes/view/zoom', ({ delta, x, y, e, id }) => {
    //   const k = delta / 1000;
    //
    //   let { translate, zoom } = p.chartWindowsScaleTranslate.raw.xy(id);
    //
    //   zoom.x -= k;
    //   zoom.y -= k;
    //
    //   p.chartWindowsScaleTranslate.set.xy(id, { translate, zoom });
    // });
  });
};

EraseMode.plugin = {
  name: 'erase-mode',
  version: '1.0.0',
  dependencies: {
    'chart-windows': '1.0.0',
    'chart-windows-modes': '1.0.0',
  }
};

export default EraseMode;
