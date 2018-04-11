import { getScreenBounds, movingAverage } from './helpers';

export default {
  inside: (p, context, { distance }) => {
    const { offset, count } = getScreenBounds(context);

    const values = p.values.get();
    const valuesClose = values.map(value => value.close);
    const valuesCloseMA = movingAverage(valuesClose, distance);

    const points = valuesCloseMA.slice(offset, offset + count + 1).map((value, index) => ({ x: 10 * (index + offset), y: value }));

    p.render.primitives.polyline(context, { points, color: '#7437e8', width: 1 });
  },
};
