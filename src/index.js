import "./index.html";

import Chart from './jarvis-chart';
import values from './values';

const node = document.getElementById('chart');

/* Just copy pasted from internet, ignore it */
const getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;

  name = name.replace(/[\[\]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/* Retrieve render from url */
const render = getParameterByName('render') || 'canvas';

const chart = Chart(node, {
  render: render,
  values: values,
  /* Do not request animation frame */
  // redrawContinuously: false,
  /* Do not process clicks less then 100ms long */
  clickThreshold: 100
});

console.log(chart);

/* Attach events to UI */

document.getElementById('mode-view').addEventListener('click', () => {
  chart.mode.set('view');
});

// document.getElementById('mode-points').addEventListener('click', () => {
//   chart.mode.set('points');
// });

document.getElementById('mode-brush').addEventListener('click', () => {
  chart.mode.set('brush');
});

document.getElementById('mode-ellipse').addEventListener('click', () => {
  chart.mode.set('ellipse');
});

document.getElementById('auto-zoom').addEventListener('click', (e) => {
  chart.chartWindow.setAutoZoom(e.target.checked);
});

document.getElementById('bollinger-distance').addEventListener('input', (e) => {
  chart.setBollingerDistance(parseInt(e.target.value));
  chart.state.update(v => v);
});

// document.getElementById('show-indicator').addEventListener('click', (e) => {
//   chart.setShowIndicator(e.target.checked);
// });
