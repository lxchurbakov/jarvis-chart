import Pluggable from 'extendme';

import Handler from './plugins/Handler';
import Render from './plugins/Render';
import State from './plugins/State';
import Primitives from './plugins/Primitives';

import AdvancedEvents from './plugins/AdvancedEvents';

import ChartModes from './plugins/ChartModes';
import ChartWindow from './plugins/ChartWindow';

import ChartValues from './plugins/ChartValues';
import ChartContent from './plugins/ChartContent';

import ViewMode from './plugins/ViewMode';

import Elements from './plugins/Elements';
import Brush from './plugins/Brush';
import Ellipse from './plugins/Ellipse';

import Indicators from './plugins/Indicators';

import Bollinger from './plugins/Bollinger';

import DebugInfo from './plugins/DebugInfo';

export default (node, options) => {
  const p = new Pluggable();

  /* Basic plugins */
  p.plugin(Handler, options);
  p.plugin(Render, options);
  p.plugin(State, options);

  p.plugin(AdvancedEvents, options);

  /* Primitive figures plugins */
  p.plugin(Primitives, options);

  p.plugin(ChartValues, options);

  /* Chart Window (translation, zoom) plugin */
  p.plugin(ChartWindow, options);
  p.plugin(ChartModes, options);

  /* Content */
  p.plugin(ChartContent, options);

  p.plugin(ViewMode, options);

  p.plugin(Elements, options);
  p.plugin(Brush, options);
  p.plugin(Ellipse, options);

  p.plugin(Indicators, options);

  p.plugin(Bollinger, options);

  p.plugin(DebugInfo, options);

  /* Emit mount action */

  p.emitSync('mount', { node });

  return p.emitSync('api', {});
};
