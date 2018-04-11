import { getScreenBounds, actionOnSelection } from './helpers';

export default {
  inside: (p, context, { distance }) => {
    const { offset, count } = getScreenBounds(context);

    const values = p.values.get();

    const highestHigh = actionOnSelection(values, distance, 0, (selection) =>
      selection.reduce((a, value) => Math.max(a, value.max), -Infinity));

    const points = highestHigh.slice(offset, offset + count).map((value, index) => ({ x: 10 * (offset + index), y: value }));

    p.render.primitives.polyline(context, { points, color: '#7437e8', width: 1 });
  },
};
