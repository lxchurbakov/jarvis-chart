import Pluggable from 'extendme';

import Handler from './plugins/base/Handler';
import Render from './plugins/base/Render';
import State from './plugins/base/State';
import AdvancedEvents from './plugins/base/AdvancedEvents';
import Cursor from './plugins/base/Cursor';

import ChartValues from './plugins/chart/ChartValues';
import ChartWindows from './plugins/chart/ChartWindows';
import ChartWindowsEvents from './plugins/chart/ChartWindowsEvents';
import ChartGrid from './plugins/chart/ChartGrid';
import Indicators from './plugins/chart/Indicators';

import Candles from './plugins/indicators/Candles';

// import ChartWindow from './plugins/chart/ChartWindow';
// import ChartModes from './plugins/chart/ChartModes';
// import ChartContent from './plugins/chart/ChartContent';
// import Elements from './plugins/chart/Elements';

import ViewMode from './plugins/modes/ViewMode';

// import Brush from './plugins/elements/Brush';
// import Ellipse from './plugins/elements/Ellipse';
// import Fibonacci from './plugins/elements/Fibonacci';

import Debug from './plugins/other/Debug';

import RenderCanvas from './plugins/renders/Canvas';
import RenderSvg from './plugins/renders/Svg';

export default (node, options) => {
  const p = new Pluggable();

  /* Basic plugins */
  p.plugin(Handler, options);
  p.plugin(Render, options);
  p.plugin(State, options);

  p.plugin(AdvancedEvents, options);
  p.plugin(Cursor, options);

  p.plugin(ChartValues, options);
  p.plugin(ChartWindows, options);
  p.plugin(ChartWindowsEvents, options);
  p.plugin(ChartGrid, options);
  p.plugin(Indicators, options);

  p.plugin(Candles, options);
  // p.plugin(ChartModes, options);

  /* Chart Window (translation, zoom) plugin */
  // p.plugin(ChartWindow, options);

  /* Content */
  // p.plugin(ChartContent, options);

  // p.plugin(ViewMode, options);

  // p.plugin(Elements, options);
  // p.plugin(Brush, options);
  // p.plugin(Ellipse, options);
  // p.plugin(Fibonacci, options);

  // p.plugin(Indicators, options);

  p.plugin(Debug, options);

  p.plugin(RenderCanvas, options);
  p.plugin(RenderSvg, options);

  /* Emit mount action */

  p.emitSync('mount', { node });

  return p.emitSync('api', {});
};
