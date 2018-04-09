import buildContext from './main/context';
import buildRender from './main/render';

/**
 *
 */
export default (node, options) => {
  // console.log('Initializing Jarvis Chart ... ');

  const context = buildContext(node, options);
  const render  = buildRender(context, options);

  return render;
};
