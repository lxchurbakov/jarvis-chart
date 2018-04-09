import initChart from './init';

export default (node, options) => {
  const chart = initChart(node, options);

  chart.on('wheel', ({ delta }) => {
    chart.update((state) => ({ ...state, zoom: state.zoom - delta / 1000 }))
  });

  chart.on('drag', ({ x, y }) => {
    chart.update((state) =>
      ({ ...state, translate: { x: state.translate.x + x / state.zoom, y: state.translate.y - y / state.zoom } }))
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
