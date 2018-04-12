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
const doubleBuffer = (getParameterByName('double-buffer') || 'on') === 'on';
const clickThreshold = 100;

const chart = Chart(node, {
  render, values, doubleBuffer, clickThreshold
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

document.getElementById('mode-fibonacci').addEventListener('click', () => {
  chart.mode.set('fibonacci');
});

document.getElementById('auto-zoom').addEventListener('click', (e) => {
  chart.chartWindow.setAutoZoom(e.target.checked);
});

// document.getElementById('bollinger-distance').addEventListener('input', (e) => {
//   chart.setBollingerDistance(parseInt(e.target.value));
//   chart.state.update(v => v);
// });

// document.getElementById('show-indicator').addEventListener('click', (e) => {
//   chart.setShowIndicator(e.target.checked);
// });

document.getElementById('indicator-button').addEventListener('click', () => {
  // chart.mode.set('fibonacci');
  const value = document.getElementById('indicator').value;
  try {
    const { type, meta } = JSON.parse(value);

    console.log(type, meta)

    chart.indicators.set(type, meta);
  } catch (e) {
    console.log('Не удалось применить индикатор, возможна опечатка в инпуте', e)
  }
});

Array.from(document.getElementsByClassName('indicator-preset')).forEach(element => {
  element.addEventListener('click', () => {
    const preset = element.getAttribute('data-preset');

    document.getElementById('indicator').value = preset;
    // alert(preset)
  });
});

// document.getElementById('indicator-button')
//
// div class="flexblock" style="display: block">
//   <p>Выберите инидкатор:</p>
//   <input type="text" id="indicator" value='ma({"distance":5})' /> <button value="" id="indicator-button">Выбрать</button>
//   <p>
//     Доступные варианты:
//     <span class="indicator-preset" data-value='ma({"distance":5})'>Скользящее среднее</span>
//   </p>
// </div>
