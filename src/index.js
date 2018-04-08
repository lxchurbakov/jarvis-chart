import "./index.html";

import initChart from './jarvis-chart';

const node = document.getElementById('chart');

const options  = { render: 'svg' };
const api = initChart(node, options);
