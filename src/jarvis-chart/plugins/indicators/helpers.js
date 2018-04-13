export const actionOnSelection = (values, left, right, predicate) => {
  return values.map((value, index) => {
    const sliceInstance = values.slice(Math.max(0, index - left), Math.min(values.length - 1, index + right + 1));

    return predicate(sliceInstance, index);
  });
};

const movingAverageOperation = (selection) => selection.reduce((acc, value) => acc + value, 0) / selection.length;

export const movingAverage = (values, distance) => actionOnSelection(values, distance, distance, movingAverageOperation)

export const getUD = (value, prev) => ({ u: Math.max(0, value.close - prev.close), d: Math.max(0, prev.close - value.close) });
