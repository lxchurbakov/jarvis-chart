import Matrix from '../../../lib/matrix';

import { getScreenBounds, movingAverage, actionOnSelection } from './helpers';

export default {

  inside: (p, context, { distance }) => {
    const { offset, count } = getScreenBounds(context);

    const values = p.values.get();

    const typicalValues = values.map(value => (value.min + value.max + value.close) / 3);
    const typicalValuesMA = movingAverage(typicalValues, distance);

    const meanDeviation = actionOnSelection(typicalValuesMA, distance, distance, (selection) => {
      const deviation = selection.map((v, index) => v - typicalValues[index])
      const deviationSum = deviation.reduce((acc, value) => acc + value, 0);

      return deviationSum / selection.length;
    });

    const cci = meanDeviation.map((md, index) => {
      const TP   = typicalValues[index];
      const MATP = typicalValuesMA[index];

      return (TP - MATP) / (0.015 * md) + 100;
    });

    const points = cci.slice(offset, offset + count).map((value, index) => ({ x: 10 * (index + offset), y: value }));

    const currentMatrix = context.matrix.get();

    const dropMatrix = Matrix.join(
      Matrix.scale(1, -1),
      Matrix.translate(0, context.matrix.screen.dimensions().height),
      Matrix.resetTranslate(currentMatrix, false, true),
      Matrix.resetScale(currentMatrix, false, true),
    );

    p.render.primitives.group(context, { matrix: dropMatrix }, () => {
      p.render.primitives.line(context, { x0: 0, y0: 200, x1: 50000, y1: 200, color: 'red', width: 1 });
      p.render.primitives.line(context, { x0: 0, y0: 100, x1: 50000, y1: 100, color: '#ccc', width: 1 });

      p.render.primitives.polyline(context, { points, color: '#7437e8', width: 1 });
    });
  },
};
