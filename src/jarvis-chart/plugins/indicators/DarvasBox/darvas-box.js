export default (values, tl, bl) => {
  const topLine = values.slice();
  const bottomLine = values.slice();

  let parameters = { topLine: tl, bottomLine: bl };

  /* Sorry I just copy pasted it from modulus */

  for (let i = values.length - 1; i >=0; --i) {
    const value = values[i];
    let { min, max } = value;

    let currentParameters = { topLine: null, bottomLine: null };

    for (let j = 0; j < (parameters.bottomLine) && i - j >= 1; j++) {
      let position = j + 1;

      max = Math.max(max, values[i - j].max);
      min = Math.min(min, values[i - j].min);

      currentParameters.topLine = position === parameters.topLine ? max : currentParameters.topLine;
      currentParameters.bottomLine = parameters.bottomLine ? min : currentParameters.bottomLine;
    }

    topLine[i] = currentParameters.topLine;
    bottomLine[i] = currentParameters.bottomLine;
  }

  return { top: topLine, bottom: bottomLine };
};
