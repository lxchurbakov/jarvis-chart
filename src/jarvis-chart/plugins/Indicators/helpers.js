export const getScreenBounds = (context) => {
  const [  screenFirst ] = context.matrix.screen([ 0, 0 ]);
  const [ screenSecond ] = context.matrix.screen([ 10, 0 ]);

  const screenStart = -screenFirst;
  const screenWidth = screenSecond - screenFirst;

  const offset = Math.floor(Math.max(screenStart / screenWidth - 1, 0));
  const count  = Math.ceil(context.matrix.screen.dimensions().width / screenWidth) + 2;

  return { offset, count };
};

export const actionOnSelection = (values, left, right, predicate) => {
  return values.map((value, index) => {
    const sliceInstance = values.slice(Math.max(0, index - left), Math.min(values.length - 1, index + right + 1));

    return predicate(sliceInstance, index);
  });
};

/* Different moving average operations */

const movingAverageOperation = (selection) => selection.reduce((acc, value) => acc + value, 0) / selection.length;

export const movingAverage = (values, distance) => actionOnSelection(values, distance, distance, movingAverageOperation)

export const getUD = (value, prev) => ({ u: Math.max(0, value.close - prev.close), d: Math.max(0, prev.close - value.close) });
