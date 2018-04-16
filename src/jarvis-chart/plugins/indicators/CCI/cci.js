import { movingAverage, actionOnSelection } from '../helpers';

/**
 * Функция подсчёта CCI индекса
 */
export default (values, distance = 5) => {
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

  return cci;
};
