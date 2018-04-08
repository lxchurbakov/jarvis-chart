import React from 'react';
import styled from 'styled-components';

import Chart from './Chart';
import Description from './Description';

class App extends React.Component {
  render () {
    return (
      <div>
        <Description />
        <div>
          <Chart ref={chart => this.chart = chart}/>
        </div>
      </div>
    );
  }
};

export default App;
