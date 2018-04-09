import priceline from './priceline';
import timeline from './timeline';
import group from '../../primitives/group';

export default ({ values, prices, matrix, showIndicator }, options, context) => {
  group({ matrix }, options, context, () => {
    timeline({ values, showIndicator }, options, context);
    priceline({ prices }, options, context);
  });
};
