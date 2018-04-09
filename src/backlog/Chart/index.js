import React from 'react';

import Matrix from '../../matrix';

import OptionsProvider from './providers/OptionsProvider';

import Data from './components/Data';
// import Timeline from './components/Timeline';
// import Priceline from './components/Priceline';
import EventsWindow from './components/EventsWindow';

import Stage from './elements/Stage';

import { values } from './values';

class Chart extends React.Component {
  constructor () {
    super();

    this.state = { translate: 0 };
  }

  getMatrix = () => Matrix.join(
    Matrix.translate(this.state.translate, 0),
    Matrix.scale(1, -1),
    Matrix.translate(0, 500),
  )

  onDrag = (x, y, e) => {
    this.setState({ translate: this.state.translate + x })
  }

  render () {
    return (
      <div style={{ width: 900, height: 500, border: '1px dashed #ccc', overflow: 'hidden', margin: '0 auto' }}>
        <EventsWindow onDrag={this.onDrag} onPath={() => {/* */}} onClick={() => {/* */}} onPath={() => {/* */}}>
          <OptionsProvider options={{ engine: 'canvas' }}>
            <Stage>
              <Data matrix={this.getMatrix()} values={values} />
            </Stage>
          </OptionsProvider>
        </EventsWindow>
      </div>
    );
  }
};

export default Chart;
