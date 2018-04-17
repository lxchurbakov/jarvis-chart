const DEFAULT_CURSOR = 'auto';

/**
 * Cursor плагин
 *
 */
const Cursor = (p, options) => {
  let $node = null;
  let cursors = {};

  /* Сохраним ноду для будущего */
  p.on('mount', ({ node }) => {
    $node = node;

    return { node };
  });

  const updateCursor = () => {
    if ($node) {
      const cursor = Object.values(cursors)
        /* Отфильтруем нулевые значения */
        .filter(a => !!a)
        /* Отсортируем по приоритету */
        .sort((a, b) => (a.priority || 0) - (b.priority || 0))
        /* Возьмём последний или дефолтный */
        .pop() || { name: DEFAULT_CURSOR };

      $node.style.cursor = cursor.name;
    }
  };

  p.cursor = {
    set: (id, name, priority = 0) => {
      cursors[id] = { name, priority };
      updateCursor();
    },
    reset: (id) => {
      cursors[id] = null;
      updateCursor();
    },
  };
};

Cursor.plugin = {
  name: 'cursor',
  version: '1.0.0',
  dependencies: {
    'handler': '1.0.0',
  }
};

export default Cursor;
