import initChart from './init';

export default (node, options) => {
  const chart = initChart(node, options);

  chart.on('wheel', ({ delta }) => {
    if (chart.state().mode === 'view')
      chart.update((state) => ({ ...state, zoom: { x: state.zoom.x - delta / 1000, y: state.zoom.y - delta / 1000} }))
  });

  chart.on('drag', ({ x, y }) => {
    if (chart.state().mode === 'view')
      chart.update((state) =>
        ({ ...state, translate: { x: state.translate.x + x / state.zoom.x, y: state.translate.y - y / state.zoom.y } }))
  });

  chart.on('world-click', ({ x, y }) => {
    if (chart.state().mode === 'points') {
      chart.update((state) =>
        ({ ...state, elements: state.elements.concat([{ x, y, type: 'point' }])}))
    }
  });

  chart.on('world-mousedown', ({ x, y }) => {
    if (chart.state().mode === 'brush') {
      chart.update((state) =>
        ({
          ...state,
          brush: [{ x, y }]
        })
      )
    }
  });

  chart.on('world-mouseup', ({ x, y }) => {
    if (chart.state().mode === 'brush') {
      chart.update((state) =>
        ({
          ...state,
          elements: state.elements.concat({ type: 'brush', points: state.brush }),
          brush: null
        })
      )
    }
  });

  chart.on('world-path', ({ x, y }) => {
    if (chart.state().mode === 'brush') {
      chart.update((state) =>
        ({
          ...state,
          brush: state.brush.concat([{ x, y }])
        })
      )
    }
  });

  chart.setMode = (mode) => chart.update((state) => ({ ...state, mode }));
  chart.setAutoZoom = (autoZoomY) => chart.update((state) => ({ ...state, autoZoomY }));
  chart.setShowIndicator = (showIndicator) => chart.update((state) => ({ ...state, showIndicator }));

  return chart;
};
