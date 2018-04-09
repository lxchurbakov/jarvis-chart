import "./index.html";

import initChart from './jarvis-chart';
import values from './values';

const node = document.getElementById('chart');

const api = initChart(node, {
  render: 'canvas',
  values: values,
  prices: new Array(1000).fill(0).map((v, i) => (i - 500) * 10)
});

console.log('Chart initialized, API:', api);
