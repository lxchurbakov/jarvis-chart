const Cursor = (p, options) => {
  let $node = null;

  p.cursor = {
    set: (name) => {
      if ($node) {
        $node.style.cursor = name;
      }
    },
  };

  p.on('mount', ({ node }) => {
    $node = node;

    return { node };
  });

  /* TODO это костыль */
  p.on('handler/attach', () => {
    p.handler.on('mousemove', () => {
      p.cursor.set('auto');
    }, 1000);
  });
};

Cursor.plugin = {
  name: 'cursor',
  version: '1.0.0',
  dependencies: {
    'handler': '1.0.0',
  }
};

export default Cursor;
