const DebugRect = (p, options) => {
  p.on('chart-windows/main/inside', ({ context }) => {
    p.render.primitives.rectangle(context, { x: 0, y: 0, width: 0.5, height: 0.5, color: 'red', opacity: 0.5 });
    p.render.primitives.text(context, { text: 'Debug 100x100', x: 103, y: 193, color: 'white', opacity: 0.9, textAlign: 'left' , font: '300 13px Open Sans'});

    return { context };
  });
};

DebugRect.plugin = {
  name: 'debug-rect',
  version: '1.0.0',
  dependencies: {
    'render': '1.0.0',
  }
};

export default DebugRect;
