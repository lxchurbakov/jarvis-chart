import initChart from './init';

export default (node, options) => {
  const chart = initChart(node, options);

  chart.on('wheel', ({ delta }) => {
    chart.update((state) => ({ ...state, zoom: { x: state.zoom.x - delta / 1000, y: state.zoom.y - delta / 1000} }))
  });

  chart.on('drag', ({ x, y }) => {
    chart.update((state) =>
      ({ ...state, translate: { x: state.translate.x + x / state.zoom.x, y: state.translate.y - y / state.zoom.y } }))
  });

  chart.on('world-click', ({ x, y }) => {
    chart.update((state) =>
      ({ ...state, elements: state.elements.concat([{ x, y }])}))
  });

  chart.on('world-path', ({ x, y }) => {
    chart.update((state) =>
      ({ ...state, elements: state.elements.concat([{ x, y }])}))
  });

  return chart;
};
