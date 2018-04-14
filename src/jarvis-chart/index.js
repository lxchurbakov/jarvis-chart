import Pluggable from 'extendme';

/* Base плагины */

import Handler from './plugins/base/Handler';
import Render from './plugins/base/Render';
import State from './plugins/base/State';
import AdvancedEvents from './plugins/base/AdvancedEvents';
import Cursor from './plugins/base/Cursor';

/* Chart плагины */

import ChartValues from './plugins/chart/ChartValues';
import ChartWindows from './plugins/chart/ChartWindows';
import ChartWindowsEvents from './plugins/chart/ChartWindowsEvents';
import ChartWindowsDrag from './plugins/chart/ChartWindowsDrag';
import ChartWindowsCrop from './plugins/chart/ChartWindowsCrop';
import ChartWindowsModes from './plugins/chart/ChartWindowsModes';

/* Content плагины */

import ChartWindowsLayers from './plugins/content/ChartWindowsLayers';
import ChartWindowsScaleTranslate from './plugins/content/ChartWindowsScaleTranslate';
import ChartWindowsGridConfig from './plugins/content/ChartWindowsGridConfig';
import ChartWindowsGrid from './plugins/content/ChartWindowsGrid';
import ChartWindowsUI from './plugins/content/ChartWindowsUI';
import ChartWindowsContent from './plugins/content/ChartWindowsContent';
import Indicators from './plugins/content/Indicators';
import Elements from './plugins/content/Elements';

/* Различные индикаторы */

import Lines from './plugins/indicators/Lines';
import Candles from './plugins/indicators/Candles';
import Bollinger from './plugins/indicators/Bollinger';
import Bars from './plugins/indicators/Bars';
import DarvasBox from './plugins/indicators/DarvasBox';
import Stochastic from './plugins/indicators/Stochastic';

/* Режимы */

import ViewMode from './plugins/modes/ViewMode';

/* Элементы */

import Brush from './plugins/elements/Brush';

/* Рендеры */

import RenderCanvas from './plugins/renders/Canvas';
import RenderSvg from './plugins/renders/Svg';

/* Всякое */

import Debug from './plugins/other/Debug';

/* Код приложеия */

export default (node, options) => {
  console.todo('Добавить chart-windows/resize событие')

  const p = new Pluggable();

  /* Basic плагины */

  p.plugin(Handler, options);
  p.plugin(Render, options);
  p.plugin(State, options);
  p.plugin(AdvancedEvents, options);
  p.plugin(Cursor, options);

  /* Chart плагины */

  p.plugin(ChartValues, options);
  p.plugin(ChartWindows, options);
  p.plugin(ChartWindowsEvents, options);
  p.plugin(ChartWindowsDrag, options);
  p.plugin(ChartWindowsCrop, options);
  p.plugin(ChartWindowsModes, options);

  /* Content плагины */

  p.plugin(ChartWindowsLayers, options);
  p.plugin(ChartWindowsScaleTranslate, options);
  p.plugin(ChartWindowsGridConfig, options);
  p.plugin(ChartWindowsGrid, options);
  p.plugin(ChartWindowsUI, options);
  p.plugin(ChartWindowsContent, options);
  p.plugin(Indicators, options);
  p.plugin(Elements, options);

  /* Индикаторы */

  p.plugin(Lines, options);
  p.plugin(Candles, options);
  p.plugin(Bollinger, options);
  p.plugin(Bars, options);
  p.plugin(DarvasBox, options);
  p.plugin(Stochastic, options);

  /* Режимы */

  p.plugin(ViewMode, options);

  /* Элементы */

  p.plugin(Brush, options);

  /* Всякое */

  p.plugin(Debug, options);

  /* Render плагины */

  p.plugin(RenderCanvas, options);
  p.plugin(RenderSvg, options);

  /* Emit mount action */

  p.emitSync('mount', { node });

  return p.emitSync('api', {});
};
