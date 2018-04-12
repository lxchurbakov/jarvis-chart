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
};

Cursor.plugin = {
  name: 'cursor',
  version: '1.0.0',
  dependencies: {
    'handler': '1.0.0',
  }
};

export default Cursor;
