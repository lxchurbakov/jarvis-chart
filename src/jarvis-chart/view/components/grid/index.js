import priceline from './priceline';
import timeline from './timeline';
import group from '../../primitives/group';

export default ({ values, prices, matrix }, options, context) => {
  group({ matrix }, options, context, () => {
    timeline({ values }, options, context);
    priceline({ prices }, options, context);
  });
};
