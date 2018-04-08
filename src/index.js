import "./index.html";

import ReactDOM from 'react-dom';
import React from 'react';

import App from "./App";

import initChart from './jarvis-chart';

const root = document.getElementById('root');

ReactDOM.render(<App />, root);

const chart = document.getElementById('chart');

/* Initialize Chart */
const options  = { render: 'canvas' };
const render = initChart(chart, options);

let x = 1;

render({ x: 1 })

setInterval(() => {
  render({ x: x++});
}, 10);
