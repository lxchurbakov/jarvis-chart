import priceline from './priceline';
import timeline from './timeline';

export default (p, context, { values, prices, showIndicator }, cb) => {
  priceline(p, context, { }, () => {
    timeline(p, context, { values, showIndicator }, () => {
      cb();
    });
  });
};
