import React from 'react';
import styled from 'styled-components';

import Chart from './Chart';
import Description from './Description';

import UI from './UI';

class App extends React.Component {
  render () {
    return (
      <div>
        <Description />
        <div>
          <Chart ref={chart => this.chart = chart}/>
          <UI />
        </div>
      </div>
    );
  }
};

export default App;
