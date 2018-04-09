import priceline from './priceline';
import timeline from './timeline';

export default ({ values, prices, matrix, offset, count}, options, context) => {
  const nth = Math.floor(count / 10);
  
  timeline({ values, matrix, offset, count, nth }, options, context);
  priceline({ prices, matrix }, options, context);
};
