import priceline from './priceline';
import timeline from './timeline';

export default (p, context, { values, prices, showIndicator }) => {
  timeline(p, context, { values, showIndicator });
  priceline(p, context, { });
};
