import React from 'react';

import values from './values';

import Chart from '../jarvis-chart/react';
import UI from './UI';

import { getParameterByName } from './helpers';

const render = getParameterByName('render') || 'canvas';
const doubleBuffer = (getParameterByName('double-buffer') || 'on') === 'on';
const clickThreshold = 100;

class App extends React.Component {
  render () {
    const width = '100%';
    const height = '600px';

    const options = {
      render, values, doubleBuffer, clickThreshold,
      width, height
    };

    return (
      <div>
        <h1>Jarvis Chart Example</h1>
        <UI>
          <Chart options={options} />
        </UI>
      </div>
    );
  }
}

export default App;
