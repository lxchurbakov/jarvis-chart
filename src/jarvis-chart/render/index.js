import Context from './context';
import Transform from './transform';

/**
 *
 */
export default (view, node, options) => {

  /* Create context */
  const context = Context(node, options);

  /* Draw Function */
  const draw = (state) => {
    context.clear();

    view(state, options, context);

    context.flush();
  };

  return { draw };
};

//
//
// import circle from './primitives/circle';
// import line from './primitives/line';
// import rectangle from './primitives/rectangle';
// import text from './primitives/text';
// import group from './primitives/group';
//
// import dataset from './components/dataset';
// import grid from './components/grid';
//
// import Matrix from '../../matrix';
//
// const matrixForWorld = (data) =>
//   Matrix.join(
//     Matrix.translate(data.translate.x, data.translate.y - 250),
//     Matrix.scale(data.zoom, data.zoom),
//     Matrix.translate(450, -250),
//     Matrix.scale(1, -1),
//   );
//
// const buildRender = (context, options) => {
//   const render = (data) => {
//     context.clear();
//
//     const { values, prices } = options;
//
//     group({ matrix: matrixForWorld(data) }, options, context, () => {
//
//       dataset({ values }, options, context);
//       grid({ values, prices, }, options, context);
//
//       data.elements.forEach((element) => {
//         circle({ cx: element.x, cy: element.y, radius: 20, color: 'red' }, options, context);
//       });
//     });
//
//     context.flush();
//   };
//
//   render.matrix = (data) => matrixForWorld(data);
//
//   return render;
// };
//
// export default buildRender;
