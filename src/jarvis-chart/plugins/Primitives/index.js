import circle from './primitives/circle';
import line from './primitives/line';
import polyline from './primitives/polyline';
import rectangle from './primitives/rectangle';
import text from './primitives/text';
import group from './primitives/group';
import ellipse from './primitives/ellipse';

/**
 * Primitives плагин
 *
 * TODO нормальный API для примитивов
 * TODO подумать насчёт переезжа на реакт
 *
 * Создаёт необходимые для рисования примитивы
 *
 * Использует сокеты: render/collect-primitives
 * Создаёт сокеты: нет
 * Использует API: p.render
 * Создаёт API: нет
 *
 */
const Primitives = (p) => {
  p.on('render/collect-primitives', () => {
    p.render.primitives = { circle, line, rectangle, text, group, ellipse, polyline };
  });
};

Primitives.plugin = {
  name: 'primitives',
  version: '1.0.0',
  dependencies: {
    'render': '1.0.0'
  }
};

export default Primitives;
