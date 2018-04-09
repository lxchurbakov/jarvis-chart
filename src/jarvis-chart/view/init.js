import buildContext from './main/context';
import buildRender from './main/render';

/**
 * Jarvis Chart Render
 */
export default (node, options) => {
  const context = buildContext(node, options);
  const render  = buildRender(context, options);

  return render;
};
