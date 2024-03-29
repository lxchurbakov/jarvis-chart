import { Matrix } from 'lib/geometry';

const fpsColor = (fps) => {
  const hue = 113 * (fps / 60);

  return `hsla(${hue}, 50%, 50%, 1)`;
};

function getBrowser() {
  var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(M[1])){
      tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
      return {name:'IE',version:(tem[1]||'')};
      }
  if(M[1]==='Chrome'){
      tem=ua.match(/\bOPR|Edge\/(\d+)/)
      if(tem!=null)   {return {name:'Opera', version:tem[1]};}
      }
  M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
  return {
    name: M[0],
    version: M[1]
  };
}

const DebugInfo = (p, options) => {
  let fps = 0;
  let lastTime = 0;

  const browser = getBrowser();

  // p.on(/(.*)/, (data, ...args) => {
  //   console.log('Event', data, args)
  //   return data;
  // });

  p.on('render/draw', ({ context, state }) => {

    const time = performance.now();

    fps = ((fps * 50 + 1 / ((time - lastTime) / 1000)) / 51).toFixed(1);

    lastTime = time;

    p.render.primitives.text(context, { x: 5, y: 5 + 13, textAlign: 'left', text: 'DebugInfo:', color: '#555', font: '100 13px Open Sans' });
    p.render.primitives.text(context, { x: 5, y: 2 * (5 + 13), textAlign: 'left', text: 'FPS: ' + fps, color: fpsColor(fps), font: '800 13px Open Sans' });
    p.render.primitives.text(context, { x: 5, y: 3 * (5 + 13), textAlign: 'left', text: 'Browser: ' + browser.name + ' ' + browser.version, color: '#555', font: '800 13px Open Sans' });
    p.render.primitives.text(context, { x: 5, y: 5 * (5 + 13), textAlign: 'left', text: 'Render: ' + options.render, color: '#555', font: '300 13px Open Sans' });

    const doubleBuffer = (options.render === 'canvas' ? (options.doubleBuffer ? 'on' : 'off') : 'no support for this render');
    p.render.primitives.text(context, { x: 5, y: 6 * (5 + 13), textAlign: 'left', text: 'Double Buffer: ' + doubleBuffer, color: '#555', font: '300 13px Open Sans' });

    return { context };
  });

  /* Highlight windows */

  p.on('chart-windows/inside', ({ context, id }) => {
    const w = p.chartWindows.get(id);

    const height = context.api.screen.height();
    const width  = context.api.screen.width();
    const color = `hsla(${(parseInt(w.id, 36) * 137) % 256}, 100%, 50%, 0.3)`;

    const currentMatrix = context.api.matrix.get();

    context.api.matrix.push(Matrix.resetScale(currentMatrix));
      p.render.primitives.text(context, {
        x: width - 5, textAlign: 'right', y: -height + 13 + 5, font: '300 13px Open Sans',
        text: `Window #${w.id} (${w.height.toFixed(0)}x${w.width.toFixed(0)} at ${w.left.toFixed(0)};${w.top.toFixed(0)})`,
        opacity: 0.8
      });
    context.api.matrix.pop();

    return { context, id };
  });

  p.on('indicators/register', () => {
    p.chartWindows.create();

    p.indicators.create(0, 'candles', {});
  });

  const indicatorsOnMain = ['bollinger', 'highest-high', 'darvas-box', 'lowest-low', 'moving-average', 'parabolic-sar'];

  p.on('api', (api) => ({ ...api, debug: {
    update: (indicators, graph) => {
      p.chartWindows.all().forEach(w => (w.id !== 0) && p.chartWindows.remove(w.id));

      p.chartWindows.get(0).indicators = [];
      p.indicators.create(0, graph, {});

      indicators.forEach(i => {
        if (indicatorsOnMain.indexOf(i) > -1) {
          p.indicators.create(0, i, {});
        } else {
          const id = p.chartWindows.create();
          p.indicators.create(id, i, {});
        }
      });
    },
  }}));
};

DebugInfo.plugin = {
  name: 'debug-info',
  version: '1.0.0',
  dependencies: {
    // 'render': '1.0.0',
  }
};

export default DebugInfo;
