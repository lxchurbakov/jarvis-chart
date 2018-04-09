import "./index.html";

import Chart from './jarvis-chart';
import values from './values';

const node = document.getElementById('chart');

const api = Chart(node, {
  render: 'canvas',
  values: values,
  redrawContinuously: false,
  prices: new Array(1000).fill(0).map((v, i) => (i - 500) * 10),
  clickThreshold: 100
});

console.log('Chart initialized, API:', api);
