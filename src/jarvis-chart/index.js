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

/* Content плагины */

import ChartWindowsLayers from './plugins/content/ChartWindowsLayers';
import ChartWindowsScaleTranslate from './plugins/content/ChartWindowsScaleTranslate';
import ChartWindowsGridConfig from './plugins/content/ChartWindowsGridConfig';
import ChartWindowsGrid from './plugins/content/ChartWindowsGrid';
import ChartWindowsUI from './plugins/content/ChartWindowsUI';
import ChartWindowsContent from './plugins/content/ChartWindowsContent';
import Indicators from './plugins/content/Indicators';

/* Различные индикаторы */

import Candles from './plugins/indicators/Candles';
import Bollinger from './plugins/indicators/Bollinger';

/* Режимы */


/* Элементы */


/* Рендеры */

import RenderCanvas from './plugins/renders/Canvas';
import RenderSvg from './plugins/renders/Svg';

/* Всякое */

import Debug from './plugins/other/Debug';

/* Код приложеия */

export default (node, options) => {
  console.todo('Необходимо реализовать элементы')
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

  /* Content плагины */

  p.plugin(ChartWindowsLayers, options);
  p.plugin(ChartWindowsScaleTranslate, options);
  p.plugin(ChartWindowsGridConfig, options);
  p.plugin(ChartWindowsGrid, options);
  p.plugin(ChartWindowsUI, options);
  p.plugin(ChartWindowsContent, options);
  p.plugin(Indicators, options);

  /* Индикаторы */

  p.plugin(Candles, options);
  p.plugin(Bollinger, options);

  /* Всякое */

  p.plugin(Debug, options);

  /* Render плагины */

  p.plugin(RenderCanvas, options);
  p.plugin(RenderSvg, options);

  /* Emit mount action */

  p.emitSync('mount', { node });

  return p.emitSync('api', {});
};
