import buildContext from './context';
import buildRender from './render';

/**
 *
 */
export default (node, options) => {
  // console.log('Initializing Jarvis Chart ... ');

  const context = buildContext(node, options);
  const render  = buildRender(context, options);

  return render;
};
