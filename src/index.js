import "./index.html";

import Chart from './jarvis-chart';
import values from './values';

const node = document.getElementById('chart');

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const chart = Chart(node, {
  render: getParameterByName('render') || 'canvas',
  values: values,
  redrawContinuously: false,
  prices: new Array(1000).fill(0).map((v, i) => (i - 500) * 10),
  clickThreshold: 100
});

console.log('Chart initialized, API:', chart);

document.getElementById('mode-view').addEventListener('click', () => {
  chart.setMode('view');
});

document.getElementById('mode-points').addEventListener('click', () => {
  chart.setMode('points');
});

document.getElementById('mode-brush').addEventListener('click', () => {
  chart.setMode('brush');
});

document.getElementById('auto-zoom').addEventListener('click', (e) => {
  chart.setAutoZoom(e.target.checked);
});

document.getElementById('show-indicator').addEventListener('click', (e) => {
  chart.setShowIndicator(e.target.checked);
});
