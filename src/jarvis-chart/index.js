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
import ChartWindowsModes from './plugins/chart/ChartWindowsModes';

/* Content плагины */

import ChartWindowsRemove from './plugins/content/ChartWindowsRemove';
import ChartWindowsLayers from './plugins/content/ChartWindowsLayers';
import ChartWindowsScaleTranslate from './plugins/content/ChartWindowsScaleTranslate';
import ChartWindowsCrop from './plugins/content/ChartWindowsCrop';
import ChartWindowsGridConfig from './plugins/content/ChartWindowsGridConfig';
import ChartWindowsGrid from './plugins/content/ChartWindowsGrid';
import ChartWindowsUI from './plugins/content/ChartWindowsUI';
import ChartWindowsContent from './plugins/content/ChartWindowsContent';
import Indicators from './plugins/content/Indicators';
import Elements from './plugins/content/Elements';
import ValuesPointer from './plugins/content/ValuesPointer';

/* Различные индикаторы */

import Lines from './plugins/indicators/Lines';
import Candles from './plugins/indicators/Candles';
import Bollinger from './plugins/indicators/Bollinger';
import Bars from './plugins/indicators/Bars';
import DarvasBox from './plugins/indicators/DarvasBox';
import Stochastic from './plugins/indicators/Stochastic';
import CCI from './plugins/indicators/CCI';
import RSI from './plugins/indicators/RSI';
import MovingAverage from './plugins/indicators/MovingAverage';
import HighestHigh from './plugins/indicators/HighestHigh';
import LowestLow from './plugins/indicators/LowestLow';
import MACD from './plugins/indicators/MACD';
import ParabolicSAR from './plugins/indicators/ParabolicSAR';
import Volume from './plugins/indicators/Volume';

/* Режимы */

import ViewMode from './plugins/modes/ViewMode';
import EraseMode from './plugins/modes/EraseMode';

/* Элементы */

import Brush from './plugins/elements/Brush';
import Line from './plugins/elements/Line';
import LineHorizontal from './plugins/elements/LineHorizontal';
import Segment from './plugins/elements/Segment';
import SegmentHorizontal from './plugins/elements/SegmentHorizontal';
import Rectangle from './plugins/elements/Rectangle';
import Fibonacci from './plugins/elements/Fibonacci';
import Ellipse from './plugins/elements/Ellipse';
import Triangle from './plugins/elements/Triangle';

/* Рендеры */

import RenderCanvas from './plugins/renders/Canvas';
import RenderSvg from './plugins/renders/Svg';
import RenderWebGL from './plugins/renders/WebGL';

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
  p.plugin(ChartWindowsModes, options);

  /* Content плагины */

  p.plugin(ChartWindowsRemove, options);
  p.plugin(ChartWindowsLayers, options);
  p.plugin(ChartWindowsScaleTranslate, options);
  p.plugin(ChartWindowsCrop, options);
  p.plugin(ChartWindowsGridConfig, options);
  p.plugin(ChartWindowsGrid, options);
  p.plugin(ChartWindowsUI, options);
  p.plugin(ChartWindowsContent, options);
  p.plugin(Indicators, options);
  p.plugin(Elements, options);
  p.plugin(ValuesPointer, options);

  /* Индикаторы */

  p.plugin(Lines, options);
  p.plugin(Candles, options);
  p.plugin(Bollinger, options);
  p.plugin(Bars, options);
  p.plugin(DarvasBox, options);
  p.plugin(Stochastic, options);
  p.plugin(CCI, options);
  p.plugin(RSI, options);
  p.plugin(MovingAverage, options);
  p.plugin(HighestHigh, options);
  p.plugin(LowestLow, options);
  p.plugin(MACD, options);
  p.plugin(ParabolicSAR, options);
  p.plugin(Volume, options);

  /* Режимы */

  p.plugin(ViewMode, options);
  p.plugin(EraseMode, options);

  /* Элементы */

  p.plugin(Brush, options);
  p.plugin(Line, options);
  p.plugin(LineHorizontal, options);
  p.plugin(Segment, options);
  p.plugin(SegmentHorizontal, options);
  p.plugin(Rectangle, options);
  p.plugin(Fibonacci, options);
  p.plugin(Ellipse, options);
  p.plugin(Triangle, options);

  /* Всякое */

  p.plugin(Debug, options);

  /* Render плагины */

  p.plugin(RenderCanvas, options);
  p.plugin(RenderSvg, options);
  p.plugin(RenderWebGL, options);

  /* Emit mount action */

  p.emitSync('mount', { node });

  return p.emitSync('api', {});
};
