export const bound = (v, min, max) => Math.max(min, Math.min(max, v))

export const getWindowBorderTouch = (windows, yRelative, threshold = 0.01) => {
  let top = 0;
  let result = null;

  windows.forEach((w, i) => {
    if (i < windows.length - 1)
      if (Math.abs(yRelative - (w.weight + top)) < threshold)
        result = w.id;
    top += w.weight;
  });

  return result;
};

export const getWindowTouch = (windows, yRelative) => {
  let top = 0;
  let result = null;

  windows.forEach((w, i) => {
    if (i < windows.length - 1)
      if (yRelative > top && yRelative < (w.weight + top))
        result = w.id;
    top += w.weight;
  });

  return result;
};
