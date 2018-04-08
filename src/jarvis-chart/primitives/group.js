export default ({ matrix }, options, context, cb) => {
  switch (options.render) {
    case 'svg':
      if (matrix) {
        context.push(`
          <g transform='${matrix.toCss()}'>
        `);
      }

      cb();

      if (matrix) {
        context.push('</g>');
      }

      break;
    case 'canvas':
      if (matrix) {
        const { a, b, c, d, tx, ty } = matrix.getValues();
        context.save();
        context.transform(a, b, c, d, tx, ty);
      }

      cb();

      if (matrix) {
        context.restore();
      }

      break;
    default:
      throw `Group is not implemented for ${options.render}`;
  }
};
