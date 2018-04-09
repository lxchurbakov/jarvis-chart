export default (context, { matrix }, cb) => {
  switch (context.type) {
    case 'canvas':
    case 'svg':
      if (matrix) {
        context.matrix.push(matrix);
      }

      cb(matrix);

      if (matrix) {
        context.matrix.pop();
      }

      break;
    default:
      throw `Group is not implemented for ${options.render}`;
  }
};
