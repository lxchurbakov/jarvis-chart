import Pluggable from 'extendme';

import Handler from './plugins/base/Handler';
import Render from './plugins/base/Render';
import State from './plugins/base/State';
import AdvancedEvents from './plugins/base/AdvancedEvents';

import ChartModes from './plugins/chart/ChartModes';
import ChartWindow from './plugins/chart/ChartWindow';
import ChartWindows from './plugins/chart/ChartWindows';
import ChartContent from './plugins/chart/ChartContent';
import ChartValues from './plugins/chart/ChartValues';
import Elements from './plugins/chart/Elements';
import Indicators from './plugins/chart/Indicators';

import ViewMode from './plugins/modes/ViewMode';

import Brush from './plugins/elements/Brush';
import Ellipse from './plugins/elements/Ellipse';
import Fibonacci from './plugins/elements/Fibonacci';

import DebugInfo from './plugins/other/DebugInfo';
import DebugRect from './plugins/other/DebugRect';

import RenderCanvas from './plugins/renders/Canvas';
import RenderSvg from './plugins/renders/Svg';

export default (node, options) => {
  const p = new Pluggable();

  /* Basic plugins */
  p.plugin(Handler, options);
  p.plugin(Render, options);
  p.plugin(State, options);

  p.plugin(AdvancedEvents, options);

  p.plugin(ChartValues, options);
  p.plugin(ChartWindows, options);
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

  p.plugin(DebugInfo, options);
  p.plugin(DebugRect, options);

  p.plugin(RenderCanvas, options);
  p.plugin(RenderSvg, options);

  /* Emit mount action */

  p.emitSync('mount', { node });

  return p.emitSync('api', {});
};
